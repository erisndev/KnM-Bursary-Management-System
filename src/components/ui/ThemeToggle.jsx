import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
        theme === "dark"
          ? "bg-slate-700 text-amber-400 hover:bg-slate-600"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      } ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
