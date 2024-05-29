import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
// Importing icons for each item
import { FaHome } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";

export const NavigationBar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="flex flex-col h-screen p-5 bg-[#1a1a1a] items-start border-r text-xl fixed overflow-y-auto">
      <ul className="hidden md:flex flex-col gap-6 text-white font-bold overflow-y-auto">
        <Link to="/Home" className="hover:text-purple-600 flex items-center">
          <FaHome className="mr-2" />
        </Link>
        <Link to="/product" className="hover:text-purple-600 flex items-center">
          <AiOutlineProduct className="mr-2" />
        </Link>
        <Link
          to="/translate"
          className="hover:text-purple-600 flex items-center"
        >
          <MdGTranslate className="mr-2" />
        </Link>
      </ul>
      <div className="md:hidden" onClick={handleNav}>
        {nav ? (
          <FaTimes className="text-yellow-300 text-3xl" />
        ) : (
          <GiHamburgerMenu className="text-yellow-300 text-3xl" />
        )}
      </div>
      <ul
        className={`${
          nav
            ? "text-white opacity-100 transform translate-x-0"
            : "opacity-0 transform -translate-x-full"
        } translate-transform fixed top-0 left-0 w-full h-screen bg-zinc-800/80 flex flex-col justify-center items-start text-2xl p-5 overflow-y-auto`}
        onClick={() => setNav(false)}
      >
        <Link to="/Home" className="hover:text-purple-600 flex items-center">
          <FaHome className="mr-2" />
        </Link>
        <Link to="/product" className="hover:text-purple-600 flex items-center">
          <AiOutlineProduct className="mr-2" />
        </Link>
        <Link
          to="/translate"
          className="hover:text-purple-600 flex items-center"
        >
          <MdGTranslate className="mr-2" />
        </Link>
      </ul>
    </nav>
  );
};
