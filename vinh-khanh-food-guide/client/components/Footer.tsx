import { Heart, MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-2">Vĩnh Khánh</h3>
            <p className="text-sm text-gray-400">Phố Ẩm Thực - Hướng dẫn tự động</p>
            <p className="text-xs text-gray-500 mt-3">Khám phá các quán ăn ngon nhất tại phố ẩm thực Vĩnh Khánh</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition">Khám Phá</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Danh Mục</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Về Chúng Tôi</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Liên Hệ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Vĩnh Khánh, Cần Thơ</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>0292.3.XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>info@vinhmkhanhfood.vn</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Giờ Hoạt Động</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span>Thứ Hai - Chủ Nhật</span></li>
              <li className="text-orange-500 font-medium">05:00 - 23:30</li>
              <li className="text-xs text-gray-500 mt-2">*Giờ hoạt động từng quán khác nhau</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 Vĩnh Khánh Phố Ẩm Thực. Tất cả quyền được bảo lưu.</p>
            <div className="flex items-center gap-1">
              Được làm với <Heart className="w-4 h-4 text-red-500 fill-red-500" /> cho cộng đồng
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
