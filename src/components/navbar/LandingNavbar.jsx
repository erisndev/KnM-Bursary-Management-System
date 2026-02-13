import { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import ThemeToggle from "@/components/ui/ThemeToggle";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", sectionId: "home" },
    { label: "About", sectionId: "about" },
    { label: "How to Apply", sectionId: "how-to-apply" },
    { label: "Contact", sectionId: "contact" },
  ];

  /* ── Track which section is in view ── */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionIds = ["about", "how-to-apply", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        } else {
          // If no tracked section is visible, we're at the top → "home"
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          if (scrollY < 300) {
            setActiveSection("home");
          }
        }
      },
      {
        // Trigger when at least 15% of the section is visible
        threshold: [0, 0.15, 0.3, 0.5],
        // Offset for the sticky navbar height (64px)
        rootMargin: "-64px 0px -40% 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));

    // Also listen for scroll to detect when we're at the very top (hero)
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY < 300) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  /** Scroll to a section. If we're not on "/", navigate there first. */
  const scrollTo = useCallback(
    (sectionId) => {
      setIsOpen(false);

      if (sectionId === "home") {
        if (location.pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          navigate("/");
        }
        setActiveSection("home");
        return;
      }

      if (location.pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    },
    [location.pathname, navigate],
  );

  const isActive = (sectionId) =>
    location.pathname === "/" && activeSection === sectionId;

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0" onClick={() => setActiveSection("home")}>
            <img
              src="./Logo.png"
              alt="KNP Bursary"
              className="h-10 w-auto dark:brightness-0 dark:invert"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.sectionId)}
                className={`text-sm font-medium transition-colors duration-200 relative ${
                  isActive(link.sectionId)
                    ? "text-violet-600 dark:text-violet-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400"
                }`}
              >
                {link.label}
                {/* Active indicator dot */}
                {isActive(link.sectionId) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-600 dark:bg-violet-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <IoClose size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.sectionId)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.sectionId)
                    ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-100 dark:border-slate-800 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
