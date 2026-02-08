/**
 * Footer.tsx - Component Footer (Nâng cấp Phase 2)
 * 
 * Các tính năng mới:
 * - Layout 4 cột responsive
 * - Logo và brand
 * - Social media links với hover effects
 * - Newsletter signup form
 * - Hover animation cho links
 */

import { Link } from "react-router-dom";
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube,
  ChefHat,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* ========== MAIN FOOTER CONTENT ========== */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* ========== CỘT 1: BRAND ========== */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Vĩnh Khánh</h3>
                <p className="text-sm text-orange-400">Phố Ẩm Thực</p>
              </div>
            </Link>
            
            {/* Mô tả */}
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Khám phá các quán ăn ngon nhất tại phố ẩm thực Vĩnh Khánh. 
              Hướng dẫn tự động với audio guide đa ngôn ngữ.
            </p>

            {/* Social Links với hover effect */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* ========== CỘT 2: QUICK LINKS ========== */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-3">
              {/* Link với animation mũi tên khi hover */}
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-400 transition flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-400 transition flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Liên Hệ
                </Link>
              </li>
              <li>
                <Link to="/qr-scanner" className="text-gray-400 hover:text-orange-400 transition flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Quét QR Code
                </Link>
              </li>
            </ul>
          </div>

          {/* ========== CỘT 3: CONTACT INFO ========== */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liên Hệ</h4>
            <ul className="space-y-4">
              {/* Địa chỉ */}
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-gray-400 text-sm">
                  Phố Vĩnh Khánh, Quận 4<br />
                  TP. Hồ Chí Minh
                </p>
              </li>
              {/* Điện thoại */}
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-gray-400 text-sm">028.3943.XXXX</p>
              </li>
              {/* Email */}
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-gray-400 text-sm">info@vinhkhanhfood.vn</p>
              </li>
            </ul>
          </div>

          {/* ========== CỘT 4: NEWSLETTER ========== */}
          <div>
            <h4 className="font-semibold text-white mb-4">Đăng Ký Nhận Tin</h4>
            <p className="text-sm text-gray-400 mb-4">
              Nhận thông tin mới nhất về các quán ăn và ưu đãi đặc biệt.
            </p>
            
            {/* Form đăng ký email */}
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email của bạn"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
              />
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 px-4">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Giờ hoạt động */}
            <div className="mt-6 p-4 rounded-lg bg-gray-800/50">
              <p className="text-sm text-gray-400">
                <span className="text-white font-medium">Giờ hoạt động:</span><br />
                Hàng ngày: <span className="text-orange-400">05:00 - 23:30</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== COPYRIGHT BAR ========== */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2024 Vĩnh Khánh Phố Ẩm Thực. Tất cả quyền được bảo lưu.</p>
            <div className="flex items-center gap-1">
              Được làm với <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" /> cho cộng đồng
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
