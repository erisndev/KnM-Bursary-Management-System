import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);

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

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#">
          <img src="src\assets\Logo.png" alt="Logo" className="w-32" />
        </a>
        {!isOpen && (
          <div onClick={toggleMenu} className="cursor-pointer md:hidden">
            <HiMenu size={30} />
          </div>
        )}
        {isOpen && (
          <div onClick={toggleMenu} className="cursor-pointer md:hidden z-50">
            <IoClose size={30} />
          </div>
        )}
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
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="cursor-pointer bg-cyan-800 hover:bg-cyan-700 px-6 py-2 rounded-md text-white ">
                Log In
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white overflow-y-hidden fixed z-50 top-0 left-[-150%] w-screen min-h-screen flex justify-center items-center flex-col gap-10 duration-300 ease-in px-8"></div>
        )}
        <div className="items-center gap-5 hidden md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={getLinkClass(link.to)}>
              {link.label}
            </Link>
          ))}
          <Link to="/login">
            <button className="cursor-pointer bg-cyan-800 hover:bg-cyan-700 px-6 py-2 rounded-md text-white ">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
