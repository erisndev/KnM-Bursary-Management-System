import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  /** Scroll to a section on the landing page without showing # in URL */
  const scrollTo = useCallback(
    (sectionId) => {
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

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-300 border-t border-gray-800 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <img
              src="./Logo.png"
              alt="KNP Bursary"
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering students through accessible educational funding
              opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 hover:text-violet-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="text-sm text-gray-400 hover:text-violet-400 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("how-to-apply")}
                  className="text-sm text-gray-400 hover:text-violet-400 transition-colors"
                >
                  How to Apply
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-sm text-gray-400 hover:text-violet-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-gray-400 cursor-default">
                  FAQ
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-400 cursor-default">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-400 cursor-default">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li className="text-sm text-gray-400">150 Bryanston Drive</li>
              <li className="text-sm text-gray-400">Sandton, 2191</li>
              <li className="text-sm text-gray-400">011-462-6269</li>
              <li>
                <a
                  href="mailto:info@knpbursary.co.za"
                  className="text-sm text-gray-400 hover:text-violet-400 transition-colors"
                >
                  info@knpbursary.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-6 border-t border-gray-800 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} Erisn Africa & KnM Bursary. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-500">Privacy</span>
            <span className="text-xs text-gray-500">Terms</span>
            <span className="text-xs text-gray-500">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
