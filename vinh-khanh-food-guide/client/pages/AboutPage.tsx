/**
 * AboutPage.tsx - Trang Giới thiệu
 * 
 * Trang này giới thiệu về Phố Ẩm Thực Vĩnh Khánh.
 * Bao gồm: Hero section, lịch sử, đặc điểm nổi bật, và call-to-action.
 */

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Utensils, Users, Clock, Star, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Component đã có sẵn */}
      <Header />

      {/* ========== HERO SECTION ========== */}
      {/* Phần đầu trang với tiêu đề lớn và mô tả ngắn */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Icon */}
            <span className="text-6xl mb-6 block">🍜</span>
            
            {/* Tiêu đề chính */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Về Phố Ẩm Thực Vĩnh Khánh
            </h1>
            
            {/* Mô tả ngắn */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Khám phá thiên đường ẩm thực với hơn 50 quán ăn đặc sắc, 
              nơi hội tụ tinh hoa ẩm thực Việt Nam từ Bắc chí Nam.
            </p>
          </div>
        </div>
      </section>

      {/* ========== LỊCH SỬ SECTION ========== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Hình ảnh bên trái */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                {/* Placeholder image - có thể thay bằng ảnh thật */}
                <span className="text-8xl">🏪</span>
              </div>
              {/* Badge trang trí */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl shadow-lg">
                <p className="text-2xl font-bold">20+</p>
                <p className="text-sm">Năm hoạt động</p>
              </div>
            </div>

            {/* Nội dung bên phải */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Lịch Sử Hình Thành
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Phố Ẩm Thực Vĩnh Khánh được hình thành từ những năm 2000, 
                  bắt đầu từ một vài quán ăn nhỏ phục vụ người dân địa phương.
                </p>
                <p>
                  Qua thời gian, với sự đa dạng về món ăn và chất lượng phục vụ, 
                  nơi đây đã trở thành điểm đến ẩm thực nổi tiếng thu hút đông đảo 
                  thực khách trong và ngoài thành phố.
                </p>
                <p>
                  Ngày nay, Vĩnh Khánh là một trong những con phố ẩm thực sầm uất nhất, 
                  với hơn 50 quán ăn đa dạng từ phở, bún, đến hải sản và các món đặc sản vùng miền.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ĐẶC ĐIỂM NỔI BẬT SECTION ========== */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Tại Sao Chọn Vĩnh Khánh?
          </h2>

          {/* Grid 3 cột với các đặc điểm */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Đặc điểm 1: Đa dạng */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-6">
                <Utensils className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Ẩm Thực Đa Dạng
              </h3>
              <p className="text-gray-600">
                Hơn 100 món ăn từ khắp các vùng miền Việt Nam, 
                từ phở Bắc đến bún bò Huế, hải sản tươi sống đến các món nướng đặc sắc.
              </p>
            </div>

            {/* Đặc điểm 2: Giá cả */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-6">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Chất Lượng Đảm Bảo
              </h3>
              <p className="text-gray-600">
                Mỗi quán ăn đều được đánh giá và kiểm định chất lượng. 
                Đảm bảo vệ sinh an toàn thực phẩm và hương vị tuyệt vời.
              </p>
            </div>

            {/* Đặc điểm 3: Giờ hoạt động */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Phục Vụ Cả Ngày
              </h3>
              <p className="text-gray-600">
                Mở cửa từ sáng sớm đến khuya, phục vụ bữa sáng, trưa, tối 
                và cả những bữa ăn đêm cho thực khách.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== THỐNG KÊ SECTION ========== */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {/* Số liệu 1 */}
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">50+</p>
              <p className="text-white/80">Quán ăn</p>
            </div>
            {/* Số liệu 2 */}
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">100+</p>
              <p className="text-white/80">Món ăn</p>
            </div>
            {/* Số liệu 3 */}
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">10K+</p>
              <p className="text-white/80">Khách/tháng</p>
            </div>
            {/* Số liệu 4 */}
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">4.8</p>
              <p className="text-white/80">Đánh giá ★</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CALL TO ACTION ========== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sẵn Sàng Khám Phá?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Hãy bắt đầu hành trình ẩm thực của bạn tại Phố Ẩm Thực Vĩnh Khánh ngay hôm nay!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Khám Phá Ngay
            </a>
            <a 
              href="/contact" 
              className="px-8 py-3 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition"
            >
              Liên Hệ
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Component đã có sẵn */}
      <Footer />
    </div>
  );
}
