import { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Button from "./Button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <a href="/" className="flex items-center gap-4 text-2xl font-bold">
        <img
          src="ftlogo.png"
          alt="Form Theory Logo"
          className="w-30 h-14"
        />
      </a>
      {/* MOBILE MENU */}
      <div className="md:hidden pr-4">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* Change Hamburger Icon */}
          {/* {open ? "X" : "☰"} */}
          <div className="flex flex-col gap-[5.4px]">
            <div
              className={`h-[3px] rounded-md w-6 bg-white origin-left transition-all ease-in-out ${
                open && "rotate-45"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-white transition-all ease-in-out ${
                open && "opacity-0"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-white origin-left transition-all ease-in-out ${
                open && "-rotate-45"
              }`}
            ></div>
          </div>
        </div>
        {/* MOBILE LINK LIST */}
        <div
          className={`w-full h-screen bg-[#0d0b02] z-50 top-16 text-white flex flex-col items-center justify-center gap-8 font-medium text-lg fixed right-0 transition-all duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full overflow-hidden"
          }`}
        >
          <Link to="/" className="nav-link" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/posts?sort=trending" onClick={() => setOpen(false)}>
            Trending
          </Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>
            Most Popular
          </Link>
          <Link to="" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button />
          </Link>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 text-lg text-white">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className=""
        >
          <span className="relative z-10">Home</span>
          <span className=""></span>
        </Link>
        <Link
          to="/posts?sort=trending"
          onClick={() => setOpen(false)}
          className=""
        >
          <span className="relative z-10">Trending</span>
          <span className=""></span>
        </Link>
        <Link
          to="/posts?sort=popular"
          onClick={() => setOpen(false)}
          className=""
        >
          <span className="relative z-10">Most Popular</span>
          <span className=""></span>
        </Link>
        <Link
          to="http://accesscodepro.com/services"
          onClick={() => setOpen(false)}
          className=""
        >
          <span className="relative z-10">Services</span>
          <span className=""></span>
        </Link>

        <SignedOut>
          <Link to="/login">
            <Button />
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
