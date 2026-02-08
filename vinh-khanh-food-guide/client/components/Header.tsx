/**
 * Header.tsx - Component Navigation Header (Nâng cấp Phase 2)
 * 
 * Các tính năng:
 * - Logo và brand
 * - Navigation links (desktop)
 * - Mobile menu với hamburger button
 * - Active link highlighting
 */

// ========== IMPORTS ==========
import { useState } from "react";  // Hook để quản lý state
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChefHat, QrCode, Info, Phone, Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook để biết đang ở trang nào
  
  // ========== STATE ==========
  // useState giúp lưu trạng thái menu mở/đóng
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ========== DANH SÁCH NAVIGATION LINKS ==========
  // Tạo array để dễ quản lý và loop
  const navLinks = [
    { href: "/", label: "Trang Chủ", icon: Home },
    { href: "/about", label: "Giới Thiệu", icon: Info },
    { href: "/contact", label: "Liên Hệ", icon: Phone },
    { href: "/qr-scanner", label: "Quét QR", icon: QrCode },
  ];

  // ========== HELPER FUNCTIONS ==========
  // Kiểm tra link có đang active không (để highlight)
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  // Đóng menu khi click vào link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Toggle menu mở/đóng
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* ===== LOGO ===== */}
          <Link to="/" className="flex items-center gap-2" onClick={handleLinkClick}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-md">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">Vĩnh Khánh</h1>
              <p className="text-xs text-orange-600">Phố Ẩm Thực</p>
            </div>
          </Link>
          
          {/* ===== DESKTOP NAVIGATION ===== */}
          {/* hidden = ẩn trên mobile, md:flex = hiện trên tablet/desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button 
                  variant="ghost" 
                  className={`
                    ${isActiveLink(link.href) 
                      ? "text-orange-600 bg-orange-50" 
                      : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }
                  `}
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* ===== DESKTOP CTA BUTTON ===== */}
          <div className="hidden md:block">
            <Button
              onClick={() => navigate('/qr-scanner')}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Quét QR
            </Button>
          </div>

          {/* ===== MOBILE MENU BUTTON (Hamburger) ===== */}
          {/* md:hidden = chỉ hiện trên mobile, ẩn trên desktop */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition"
            aria-label="Toggle menu"
          >
            {/* Đổi icon dựa trên trạng thái menu */}
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* ===== MOBILE MENU DROPDOWN ===== */}
        {/* Chỉ render khi isMenuOpen = true */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${isActiveLink(link.href)
                      ? "bg-orange-50 text-orange-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="pt-2 mt-2 border-t border-gray-100">
                <Button
                  onClick={() => {
                    navigate('/qr-scanner');
                    handleLinkClick();
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Quét QR Ngay
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
