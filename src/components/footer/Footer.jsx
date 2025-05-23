import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-28 text-gray-700 py-10 mb-[-20px] px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Brand + Newsletter */}
        <div className="text-center mb-16 px-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-cyan-700">
            KnM Bursary
          </h2>
          <p className="mt-4 font-medium text-sm sm:text-base">
            Stay updated with new bursary opportunities
          </p>
          <div className="flex flex-col sm:flex-row justify-center mt-4 gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-md h-10 sm:h-10 min-h-[2.5rem] bg-white flex-1"
            />
            <Button className="h-10 sm:h-10 min-h-[2.5rem] bg-cyan-700 hover:bg-cyan-800 cursor-pointer w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-center sm:text-left px-2">
          <div>
            <h3 className="font-semibold mb-4 text-cyan-700">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Bursaries</a>
              </li>
              <li>
                <a href="#">Universities</a>
              </li>
              <li>
                <a href="#">Courses</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-cyan-700">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Our Mission</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-cyan-700">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Guides</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-cyan-700">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="mt-12 border-t pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4 text-center sm:text-left">
          {/* Language selector */}
          <div>
            <button className="border rounded px-3 py-1 hover:bg-gray-200 transition">
              English
            </button>
          </div>

          {/* Copyright */}
          <div>
            © {currentYear} KnM Bursary • <a href="#">Contact</a> •{" "}
            <a href="#">Support</a> • <a href="#">Careers</a>
          </div>

          {/* Icons */}
          <div className="flex justify-center sm:justify-end gap-4 text-lg">
            <span role="img" aria-label="User">
              👤
            </span>
            <span role="img" aria-label="Bell">
              🛎️
            </span>
            <span role="img" aria-label="Document">
              📄
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
