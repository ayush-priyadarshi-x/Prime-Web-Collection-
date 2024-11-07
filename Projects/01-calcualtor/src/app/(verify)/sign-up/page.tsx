"use client";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [IsSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      confirmPassword: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.email,
      };
      const response = await axios.post(
        "/api/sign-up",
        JSON.stringify(payload)
      );
      if (response.status >= 200 || response.status < 300) {
        toast({
          title: "Successfully signed up",
          description: "User sign up successful",
          variant: "default",
        });
        return router.replace(`/verify/${response.data.data.username}`);
      }
      return toast({
        title: "Error ",
        description: "Error signing up user. ",
      });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="w-full flex justify-center items-center my-[10vh]">
        <div className="border-black w-full md:w-[40vw] bg-[#82ccdd] rounded-lg mx-auto sm:px-[5vh]  py-[4vh] flex flex-col items-center justify-between gap-6 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onsubmit)}
              className="flex flex-col gap-6"
            >
              <div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <input
                          className="w-full rounded-lg p-3 w-[80vw] sm:w-[60vw] md:w-[30vw]"
                          type="text"
                          placeholder="Enter you name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </div>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <input
                          className="w-full rounded-lg p-3 w-[80vw] sm:w-[60vw] md:w-[30vw]"
                          type="email"
                          placeholder="Enter you email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </div>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <FormLabel>Passoword</FormLabel>
                      <FormControl>
                        <input
                          className="w-full rounded-lg p-3 w-[80vw] sm:w-[60vw] md:w-[30vw]"
                          type="password"
                          placeholder="Enter you password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </div>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <FormLabel>Confirm Password </FormLabel>
                      <FormControl>
                        <input
                          className="w-full rounded-lg p-3 w-[80vw] sm:w-[60vw] md:w-[30vw]"
                          type="password"
                          placeholder="Confirm the password. "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </div>
                  )}
                />
              </div>
              <button
                type="submit"
                className="bg-[#74b9ff] border border-[#74b9ff] px-3 py-1 text-white hover:text-[#74b9ff] hover:bg-white rounded-lg duration:200"
                disabled={IsSubmitting}
              >
                {!IsSubmitting ? "Submit " : "Submiting..."}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
