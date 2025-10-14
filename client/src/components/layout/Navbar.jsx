import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { BsPersonCircle } from "react-icons/bs";


function Navbar() {
  return (
    <nav className="w-full md:px-15 fixed left-0 top-0 z-[999] py-8 flex items-center justify-between">
      <h3>getPrompt</h3>
      <div className="nav-links hidden md:flex items-center justify-center gap-8">
        {["home", "popular", "midjourney", "gemini", "open ai"].map((text) => (
          <h3 className="capitalize" key={text}>{text}</h3>
        ))}
      </div>
      <div className="right">
        <BsPersonCircle />

      </div>
    </nav>
  );
}

export default Navbar;
