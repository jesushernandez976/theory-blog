import { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Button from "./Button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full mt-5 h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <a href="https://formtheoryrehab.com/" className="flex items-center gap-4 text-2xl font-bold">
        <img
          src="https://formtheoryrehab.com/assets/formlogo.png"
          alt="Form Theory Logo"
          className="w-45 h-16"
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
          className={`w-full h-screen bg-[#000000] z-50 mt-10 text-white flex flex-col items-center justify-center gap-8 font-medium text-lg fixed right-0 transition-all duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full overflow-hidden"
          }`}
        >
          <Link to="https://formtheoryrehab.com/" className="nav-link" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>
            Most Popular
          </Link>
          <Link to="https://formtheoryrehab.com/services" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link to="https://formtheoryrehab.com/doc" onClick={() => setOpen(false)}>
            Meet The Doc
          </Link>
          <Link to="https://formtheoryrehab.com/contact" onClick={() => setOpen(false)}>
            Contact Us
          </Link>
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button />
          </Link>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div
        className="hidden md:flex items-center justify-center flex-1 text-white"
        style={{ fontSize: "18px" }}
      >
        <div className="flex items-center" style={{ gap: "65px" }}>
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-white no-underline px-[10px] py-[5px] transition-all duration-300 rounded hover:bg-white hover:bg-opacity-20"
          >
            <span className="relative z-10">Home</span>
            <span className=""></span>
          </Link>

          <Link
            to="/posts?sort=popular"
            onClick={() => setOpen(false)}
            className="text-white no-underline px-[10px] py-[5px] transition-all duration-300 rounded hover:bg-white hover:bg-opacity-20"
          >
            <span className="relative z-10">Most Popular</span>
            <span className=""></span>
          </Link>

          {/* <Link
            to="/posts?sort=trending"
            onClick={() => setOpen(false)}
            className="text-white no-underline px-[10px] py-[5px] transition-all duration-300 rounded hover:bg-white hover:bg-opacity-20"
          >
            <span className="relative z-10">Trending</span>
            <span className=""></span>
          </Link> */}
          <Link
            to="https://formtheoryrehab.com/services"
            onClick={() => setOpen(false)}
            className="text-white no-underline px-[10px] py-[5px] transition-all duration-300 rounded hover:bg-white hover:bg-opacity-20"
          >
            <span className="relative z-10">Services</span>
            <span className=""></span>
          </Link>
          <Link
            to="https://formtheoryrehab.com/doc"
            onClick={() => setOpen(false)}
            className="text-white no-underline px-[10px] py-[5px] transition-all duration-300 rounded hover:bg-white hover:bg-opacity-20"
          >
            <span className="relative z-10">Meet The Doc</span>
            <span className=""></span>
          </Link>
          <Link
            to="https://formtheoryrehab.com/contact"
            onClick={() => setOpen(false)}
            className="text-white no-underline px-[10px] py-[5px] transition-all duration-300 rounded hover:bg-white hover:bg-opacity-20"
          >
            <span className="relative z-10">Contact Us</span>
            <span className=""></span>
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE - AUTH */}
      <div className="hidden md:flex items-center flex-shrink-0">
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
