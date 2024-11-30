import React from "react";

const Header = () => {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="font-black text-6xl bg-clip-text themeClrText">
            Password Manager.
          </div>
          <p className="w-2/4 font-bold md:text-2xl sm:text-xl text-lg">
            Secure your digital world with ease. Our Password Manager keeps all
            your credentials safe, organized, and accessible, so you can focus
            on what matters most. Say goodbye to forgotten passwords and hello
            to peace of mind.
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
