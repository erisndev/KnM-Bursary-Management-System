import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 🔧 DEMO: Change this value to test different authentication states
  // Set to `true` to show "Log Out" button
  // Set to `false` to show "Log In" button
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 👈 CHANGE THIS FOR DEMO

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/apply", label: "Apply" },
    { to: "/dashboard", label: "MyDashboard" },
    { to: "/contact", label: "Contact Us" },
  ];

  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-cyan-800 font-semibold"
      : "text-gray-700 hover:text-cyan-800";

  // 🔧 DEMO: Logout handler - replace with your actual logout logic
  const handleLogout = () => {
    setIsLoggedIn(false);
    // 👇 ADD YOUR ACTUAL LOGOUT LOGIC HERE
    // Example: clear tokens, redirect, call API, etc.
    console.log("User logged out");
  };

  // 🔧 DEMO: Login handler - replace with your actual login logic
  const handleLogin = () => {
    setIsLoggedIn(true);
    // 👇 ADD YOUR ACTUAL LOGIN LOGIC HERE
    // Example: redirect to login page, open modal, etc.
    console.log("User logged in");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#">
          <img src=".\Logo.png" alt="Logo" className="w-32" />
        </a>

        {/* Mobile Menu Toggle */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer md:hidden"
          >
            <HiMenu size={30} />
          </div>
        )}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="cursor-pointer md:hidden z-50"
          >
            <IoClose size={30} />
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen ? (
          <div className="bg-white overflow-y-hidden fixed z-10 top-0 left-0 w-screen min-h-screen flex justify-center items-center flex-col gap-10 duration-300 ease-in px-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={getLinkClass(link.to)}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* 🔧 CONDITIONAL RENDERING: Shows logout if logged in, login if not */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="cursor-pointer  px-6 py-2  text-black flex items-center gap-1 rounded-md bg-white border border-cyan-800 hover:bg-cyan-50"
              >
                Log Out
                <IoIosLogOut className="text-lg mt-1" />
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button
                  className="cursor-pointer border border-cyan-800 text-cyan-800 bg-white hover:bg-cyan-50 px-6 py-2 rounded-md"
                  onClick={handleLogin}
                >
                  Log In
                </button>
              </Link>
            )}
          </div>
        ) : null}
        <div className="items-center gap-5 hidden md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={getLinkClass(link.to)}>
              {link.label}
            </Link>
          ))}

          {/* 🔧 CONDITIONAL RENDERING: Shows logout if logged in, login if not */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer  px-6 py-2  text-black flex items-center gap-1 rounded-md bg-white border border-cyan-800 hover:bg-cyan-50"
            >
              Log Out
              <IoIosLogOut className="text-lg mt-1" />
            </button>
          ) : (
            <Link to="/login">
              <button
                className="cursor-pointer bg-cyan-800 hover:bg-cyan-700 px-6 py-2 rounded-md text-white"
                onClick={handleLogin}
              >
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
