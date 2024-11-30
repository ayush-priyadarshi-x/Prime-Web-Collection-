import Link from "next/link";

const Navbar = () => {
  const isLogged: boolean = true;
  return (
    <>
      <div>
        <div className="w-full flex justify-around items-center">
          <div className="text-transparent bg-clip-text themeClrText  ">
            <Link href={"/"}>
              <div className="text-2xl font-black">PM</div>
            </Link>
          </div>
          <div>
            {!isLogged ? (
              <ul className="flex space-x-3">
                <li>
                  <Link href={"/sign-up"}>Sign up</Link>
                </li>
                <li>
                  <Link href={"/sign-in"}>Log In</Link>
                </li>
              </ul>
            ) : (
              <ul className="flex space-x-3">
                <li>
                  <Link href={"/sing-out"}>Sign Out</Link>
                </li>
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
