/**
 * ThemeContext.tsx - Quản lý Dark/Light Mode
 * 
 * Context này cho phép:
 * - Lưu trữ theme hiện tại (dark/light)
 * - Chuyển đổi giữa các theme
 * - Lưu preference vào localStorage
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ========== TYPES ==========
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// ========== CONTEXT ==========
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ========== PROVIDER ==========
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Khởi tạo theme từ localStorage hoặc system preference
  const [theme, setThemeState] = useState<Theme>(() => {
    // Kiểm tra localStorage trước
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme) {
        return savedTheme;
      }
      // Nếu không có, kiểm tra system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });

  // Effect để apply theme vào document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove class cũ và thêm class mới
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Lưu vào localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle giữa dark và light
  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Set theme cụ thể
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ========== HOOK ==========
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
