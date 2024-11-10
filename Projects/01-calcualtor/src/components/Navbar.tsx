"use client";
import Link from "next/link";
import { useState } from "react";

import { useSession, signOut } from "next-auth/react";

import { User } from "next-auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();
  const user: User = session?.user as User;

  const isLogged: boolean = !user ? false : true;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-[#1dd1a1] w-full flex justify-between items-center px-[9vw]">
        <div className="logo text-center font-black text-2xl py-3 flex-1">
          <Link href={"/"}>!Calculator</Link>
        </div>

        {/* Menu Button for smaller screens */}
        <button
          className="md:hidden text-black font-bold px-4 py-2 rounded-lg border border-black rounded-lg px-3 py-1"
          onClick={toggleMenu}
        >
          ≡
        </button>

        {/* Navigation items */}
        <div
          className={`navigation ${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center`}
        >
          {isLogged ? (
            <ul className="flex flex-col md:flex-row items-center justify-around gap-8">
              <Link
                href={"/"}
                className="font-bold transform hover:translate-y-[-2px] duration-200"
              >
                <li>Home</li>
              </Link>
              <Link
                href={"/history"}
                className="font-bold transform hover:translate-y-[-2px] duration-200"
              >
                <li>History</li>
              </Link>
              <button
                className="font-bold transform hover:translate-y-[-2px] duration-200"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </ul>
          ) : (
            <ul className="flex flex-col md:flex-row items-center justify-around gap-8">
              <Link
                href={"/sign-in"}
                className="font-bold transform hover:translate-y-[-2px] duration-200"
              >
                <li>Login</li>
              </Link>
              <Link
                href={"/sign-up"}
                className="font-bold transform hover:translate-y-[-2px] duration-200"
              >
                <li>Sign up</li>
              </Link>
            </ul>
          )}
        </div>
      </nav>

      {/* Overlay for the menu in smaller screens */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;
