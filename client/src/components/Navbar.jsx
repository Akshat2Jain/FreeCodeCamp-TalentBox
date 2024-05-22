import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images.jpg";

const Navbar = () => {
  return (
    <>
      <div
        style={{ backgroundColor: "rgb(10, 10, 35)" }}
        className="bg-gray-950 text-white font-body"
      >
        <header className="py-1 px-4">
          <nav className="container mx-auto flex justify-between items-center">
            <div className="relative">
              <input
                type="text"
                className="bg-searchBoxColor text-white pl-10 pr-4 py-1.5 w-80 focus:outline-none placeholder-custom"
                placeholder="Search 10,700+ tutorials"
                style={{ borderRadius: 0 }}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
              />
            </div>
            <div className="flex-grow flex justify-center">
              <img src={logo} alt="Logo" className="h-8" />
            </div>
            <div className="flex space-x-4">
              <div className="border border-white px-2 py-1 hover:bg-white hover:text-black hover:cursor-pointer transition-colors duration-300">
                Menu
              </div>
              <div
                className="bg-yellow-500 text-black px-2 py-1 hover:cursor-pointer"
                style={{ backgroundColor: "rgb(255, 193, 67)" }}
              >
                <Link to="/signIn">Sign In</Link>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;
