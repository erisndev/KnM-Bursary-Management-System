import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/apply", label: "Apply" },
    { to: "/dashboard", label: "MyDashboard" },
    { to: "/contact", label: "Contact Us" },
  ];

  // Check authentication status on component mount and when location changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); // Convert to boolean
    };

    checkAuthStatus();

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, [location]);

  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-cyan-800 font-semibold"
      : "text-gray-700 hover:text-cyan-800";

  // Real logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.removeItem("user");

    console.log("User logged out");
    toast.success("Logout successful!");
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
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

            {/* Conditional rendering based on real auth state */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="cursor-pointer px-6 py-2 text-black flex items-center gap-1 rounded-md bg-white  hover:bg-cyan-100"
              >
                Log Out
                <IoIosLogOut className="text-lg mt-1" />
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLoginRedirect();
                  setIsOpen(false);
                }}
                className="cursor-pointer bg-cyan-800 hover:bg-cyan-700 px-6 py-2 rounded-md text-white"
              >
                Log In
              </button>
            )}
          </div>
        ) : null}

        <div className="items-center gap-5 hidden md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={getLinkClass(link.to)}>
              {link.label}
            </Link>
          ))}

          {/* Conditional rendering based on real auth state */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer px-6 py-2 text-black flex items-center gap-1 rounded-md bg-white  hover:bg-cyan-100"
            >
              Log Out
              <IoIosLogOut className="text-lg mt-1" />
            </button>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="cursor-pointer bg-cyan-800 hover:bg-cyan-700 px-6 py-2 rounded-md text-white"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
