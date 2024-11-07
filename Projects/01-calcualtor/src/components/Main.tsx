import React from "react";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen bg-[#b8e994]">{children}</div>
    </>
  );
};

export default Main;
