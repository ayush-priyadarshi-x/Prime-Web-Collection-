"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import operation from "../../../../Types/operation";

const Page = () => {
  const { data: session } = useSession();
  const user: User | undefined = session?.user as User | undefined;
  const { toast } = useToast();

  const [operations, setOperations] = useState<operation[]>();
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  // Use useEffect to call getOperations only once when user is available
  useEffect(() => {
    if (!user || !user._id) return; // Ensure user and user._id are defined

    const getOperations = async () => {
      try {
        const response = await axios.get(`/api/operations?_id=${user._id}`);
        console.log(response);
        setOperations(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast({
            title: error.response.data.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "There was some error",
            description: "There was some error while verifying user.",
            variant: "destructive",
          });
          console.log("Error in verify code page: ", error);
        }
      } finally {
        setIsDataLoading(false);
      }
    };

    getOperations();
  }, [user, toast]); // Ensure user is available before running the effect

  return (
    <>
      <div className="w-full p-[5vh]">
        {!isDataLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {operations?.map((operation: operation, index) => (
              <div key={index}>
                <Card className="bg-[#636e72] border-0 transform hover:scale-110 duration-200">
                  <CardHeader className="font-black text-2xl text-center text-white">
                    {" "}
                    {operation.prompt}
                  </CardHeader>
                  <CardContent className="font-bold text-xl text-center text-white">
                    {" "}
                    {operation.result}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Page;
