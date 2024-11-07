"use client";

import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { verifyCodeSchema } from "@/schemas/verifyCodeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Page = () => {
  const [IsSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      verifyCode: "",
    },
  });
  const onsubmit = (data: z.infer<typeof verifyCodeSchema>) => {
    setIsSubmitting(true);
    try {
    } catch (error) {
      return toast({
        title: "There was some error ",
        description: "Error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="w-full flex justify-center items-center my-[10vh]">
        <div className="border-black w-full md:w-[40vw] bg-[#82ccdd] rounded-lg mx-auto sm:px-[5vh]  py-[4vh] flex flex-col items-center justify-between gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="w-2/3">
              <FormField
                name="verifyCode"
                control={form.control}
                render={({ field }) => (
                  <>
                    <div className="flex flex-col gap-2">
                      <FormLabel>Verification Code</FormLabel>
                      <input
                        {...field}
                        type="text"
                        className="rounded-lg p-3"
                      />
                      <FormMessage></FormMessage>
                    </div>
                  </>
                )}
              />
              <button
                type="submit"
                className="bg-[#74b9ff] border border-[#74b9ff] px-3 py-1 text-white hover:text-[#74b9ff] hover:bg-white rounded-lg duration:200 w-full my-5"
                disabled={false}
              >
                {IsSubmitting ? "Verifying..." : "Verify"}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
