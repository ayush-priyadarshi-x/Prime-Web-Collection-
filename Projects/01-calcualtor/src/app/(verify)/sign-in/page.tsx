"use client";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { signInInterface, signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Page = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (data: signInInterface) => {
    console.log("Data : ", data);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center my-[10vh]">
        <div className="border-black w-full md:w-[40vw] bg-[#82ccdd] rounded-lg mx-auto sm:px-[5vh]  py-[4vh] flex flex-col items-center justify-between gap-6 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div>
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <div className="flex flex-col gap-3">
                      <FormLabel>Username // Email</FormLabel>
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
              <button
                type="submit"
                className="bg-[#74b9ff] border border-[#74b9ff] px-3 py-1 text-white hover:text-[#74b9ff] hover:bg-white rounded-lg duration:200"
              >
                Submit
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
