"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Calculator = () => {
  const buttons: string[] = "C/%/789*456-123+0.=".split("");
  const [prompt, setPrompt] = useState<string>("");
  const { toast } = useToast(); // Using the toast function from the custom hook

  // Handle the click event to append button value to the prompt
  const handleOnClick = (btn: string) => {
    setPrompt((prevPrompt) => prevPrompt + btn);
  };

  // Reset the prompt when 'C' is clicked
  const handleOnReset = () => {
    setPrompt("");
  };

  // Perform the operation when '=' is clicked
  const handleOnOperate = () => {
    try {
      setPrompt(eval(prompt).toString()); // Evaluate the expression (avoid eval in production)
    } catch (error) {
      console.log("There was some error", error);
      toast({
        title: "Syntax Error.",
        description: "There was some error performing the operation",
        variant: "destructive", // You can use the variant here for styling purposes
      });
      setPrompt("Error");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center my-[10vh]">
        <div className="border-black bg-[#82ccdd] rounded-lg mx-auto px-[8vh] py-[4vh] flex flex-col items-center justify-between gap-6">
          <div className="w-full">
            <input
              type="text"
              className="border border-0 focus:border-0 rounded-lg p-2 w-full"
              value={prompt}
            />
          </div>
          <div className="grid grid-cols-4 grid-rows-5 gap-6">
            {buttons.map((btn, index) => {
              const color: string =
                index < 3
                  ? "bg-[#596275]"
                  : index === 3 || index === 7 || index === 11 || index === 15
                  ? "bg-[#c44569]"
                  : "bg-[#1B9CFC]";
              const size: string = btn === "0" ? "col-span-2" : "col-span-1";

              return (
                <button
                  key={index}
                  className={`rounded-full px-5 py-3 ${color} ${size}`}
                  onClick={() => {
                    if (btn === "C") {
                      handleOnReset(); // Handle reset
                    } else if (btn === "=") {
                      handleOnOperate(); // Handle calculation
                    } else {
                      handleOnClick(btn); // Handle number/operator click
                    }
                  }}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
