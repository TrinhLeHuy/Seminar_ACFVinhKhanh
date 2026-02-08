/**
 * ThemeToggle.tsx - Nút chuyển đổi Dark/Light Mode
 * 
 * Button với animation đẹp để toggle theme.
 */

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors"
      title={theme === "light" ? "Chuyển sang Dark Mode" : "Chuyển sang Light Mode"}
    >
      {/* Sun icon - hiện khi light mode */}
      <Sun 
        className={`
          h-5 w-5 text-orange-500 absolute
          transition-all duration-300
          ${theme === "light" 
            ? "rotate-0 scale-100 opacity-100" 
            : "rotate-90 scale-0 opacity-0"
          }
        `}
      />
      
      {/* Moon icon - hiện khi dark mode */}
      <Moon 
        className={`
          h-5 w-5 text-yellow-400 absolute
          transition-all duration-300
          ${theme === "dark" 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
          }
        `}
      />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
