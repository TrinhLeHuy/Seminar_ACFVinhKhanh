/**
 * Index.tsx - Trang chủ (Nâng cấp Phase 3)
 * 
 * Các tính năng mới:
 * - Hero Section với animation
 * - Categories Section (danh mục ẩm thực)
 * - Testimonials Section (đánh giá khách hàng)
 * - Cải thiện UI tổng thể
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocationCard } from "@/components/LocationCard";
import { SkeletonList } from "@/components/SkeletonCard";
import { useLocationController } from "@/controllers/useLocationController";
import { 
  Search, 
  MapPin, 
  Users, 
  Award, 
  QrCode,
  Utensils,
  Coffee,
  Fish,
  Flame,
  Soup,
  Star,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();
  const { locations, isLoading, locationsError } = useLocationController();
  const [searchInput, setSearchInput] = useState("");

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Filter locations by search
  const filteredLocations = locations.filter((location) => {
    if (!searchInput.trim()) return true;
    const query = searchInput.toLowerCase();
    return (
      location.name.toLowerCase().includes(query) ||
      location.description?.toLowerCase().includes(query)
    );
  });

  // ========== DỮ LIỆU DANH MỤC ẨM THỰC ==========
  const categories = [
    { icon: Soup, name: "Phở & Bún", count: 15, color: "from-red-500 to-orange-500" },
    { icon: Fish, name: "Hải Sản", count: 12, color: "from-blue-500 to-cyan-500" },
    { icon: Flame, name: "Nướng & BBQ", count: 8, color: "from-orange-500 to-yellow-500" },
    { icon: Coffee, name: "Đồ Uống", count: 10, color: "from-amber-600 to-yellow-500" },
    { icon: Utensils, name: "Cơm & Món Chính", count: 20, color: "from-green-500 to-emerald-500" },
  ];

  // ========== DỮ LIỆU ĐÁNH GIÁ KHÁCH HÀNG ==========
  const testimonials = [
    {
      name: "Nguyễn Văn A",
      avatar: "👨",
      rating: 5,
      comment: "Phở ở đây ngon tuyệt vời! Nước dùng đậm đà, thịt bò mềm. Sẽ quay lại lần sau.",
      location: "TP. Hồ Chí Minh"
    },
    {
      name: "Trần Thị B",
      avatar: "👩",
      rating: 5,
      comment: "Hải sản tươi sống, giá cả hợp lý. Nhân viên phục vụ nhiệt tình và thân thiện.",
      location: "Hà Nội"
    },
    {
      name: "Lê Văn C",
      avatar: "👨‍💼",
      rating: 4,
      comment: "Không khí náo nhiệt, đồ ăn đa dạng. Rất thích tính năng audio guide của app!",
      location: "Đà Nẵng"
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* ========== HERO SECTION (Cải thiện) ========== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🍜</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-bounce delay-300">🥢</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-10">🍲</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-10">🥡</div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Quận 4, TP. Hồ Chí Minh</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Phố Ẩm Thực <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Vĩnh Khánh
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Khám phá những quán ăn ngon nhất, từ phở truyền thống đến hải sản tươi sống. 
              Hướng dẫn tự động cho mọi bữa ăn của bạn.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm quán ăn, món ăn..."
                  value={searchInput}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
              <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                Tìm Kiếm
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button
                onClick={() => navigate('/qr-scanner')}
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Quét QR Code
              </Button>
              <Button
                onClick={() => navigate('/about')}
                variant="ghost"
                className="text-gray-600 hover:text-orange-600"
              >
                Tìm hiểu thêm →
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Địa Điểm</p>
                  <p className="text-4xl font-bold text-gray-900">{locations.length || "50"}+</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-2xl shadow-lg">
                  🏪
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Khách Hài Lòng</p>
                  <p className="text-4xl font-bold text-gray-900">10K+</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                  <Users className="w-7 h-7" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Xếp Hạng</p>
                  <p className="text-4xl font-bold text-gray-900">4.8★</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-lg">
                  <Award className="w-7 h-7" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES SECTION (Mới) ========== */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Danh Mục Ẩm Thực
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá đa dạng các loại hình ẩm thực tại phố Vĩnh Khánh
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 group"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} quán</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LOCATIONS GRID ========== */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Khám Phá Địa Điểm
              </h2>
              <p className="text-gray-600">
                Tìm thấy <span className="font-semibold text-orange-600">{filteredLocations.length}</span> địa điểm
              </p>
            </div>
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
              >
                ✕ Xóa bộ lọc
              </button>
            )}
          </div>

          {/* Loading State - Sử dụng Skeleton thay vì spinner */}
          {isLoading && <SkeletonList count={6} />}

          {/* Error State */}
          {locationsError && (
            <div className="text-center py-16 bg-red-50 rounded-2xl">
              <p className="text-4xl mb-4">⚠️</p>
              <p className="text-red-600 font-medium mb-2">Có lỗi xảy ra khi tải dữ liệu</p>
              <p className="text-sm text-gray-500">Vui lòng kiểm tra kết nối backend</p>
            </div>
          )}

          {/* Locations Grid */}
          {!isLoading && !locationsError && filteredLocations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <LocationCard
                  key={location.locationId}
                  location={location}
                  onViewDetails={(id) => navigate(`/location/${id}`)}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !locationsError && filteredLocations.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-gray-900 font-medium mb-2">Không tìm thấy địa điểm nào</p>
              <p className="text-sm text-gray-500">Thử thay đổi từ khóa tìm kiếm</p>
            </div>
          )}
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION (Mới) ========== */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khách Hàng Nói Gì?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những đánh giá chân thực từ thực khách đã trải nghiệm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-orange-200 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Comment */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CALL TO ACTION ========== */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="text-8xl absolute top-4 left-10 animate-pulse">🍜</div>
          <div className="text-8xl absolute bottom-4 right-10 animate-pulse delay-500">🥢</div>
          <div className="text-6xl absolute top-1/2 left-1/3">🍲</div>
          <div className="text-6xl absolute bottom-1/3 right-1/4">🥡</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sẵn Sàng Khám Phá?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tải ứng dụng di động để nhận thông báo mới nhất, đặt hàng trực tuyến 
            và tận hưởng những ưu đãi độc quyền
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all">
              📱 Tải iOS
            </button>
            <button className="px-8 py-4 bg-white/20 text-white border-2 border-white rounded-xl font-semibold hover:bg-white/30 transition-all">
              🤖 Tải Android
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
