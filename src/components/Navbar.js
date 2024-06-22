import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo2.svg";

const Navbar = () => {
  return (
    <nav className= "sticky top-0 bg-blue-100 p-4 flex items-center justify-center">
      {/* Left side of the navbar */}
      <div className="items-center">
        <Link to="/" className="flex items-center text-black mr-4">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <span className="text-5xl font-bold">API Quest</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
