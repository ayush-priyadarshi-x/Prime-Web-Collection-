"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  // TODO: Create a getName

  return (
    <>
      <div>
        <div className="w-full flex justify-center items-center themeColour">
          <div className="logo flex-grow">
            <div className="text-3xl font-black text-center">
              <Link href={"/"}>Password Manager.</Link>
            </div>
          </div>
          <div className="flex justify-end space-x-5 py-4  px-9">
            <button className="rounded-md text-white bg-black px-3 py-1 border border-black hover:text-black hover:bg-white duration-200 font-bold">
              <Link href={"/sign-in"}>Sign In </Link>
            </button>
            <button className="rounded-md text-white bg-black px-3 py-1 border border-black hover:text-black hover:bg-white duration-200 font-bold">
              <Link href={"/sign-up"}>Sign Up </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
