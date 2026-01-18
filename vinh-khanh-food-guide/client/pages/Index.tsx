import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocationCard } from "@/components/LocationCard";
import { useLocationController } from "@/controllers/useLocationController";
import { Search, MapPin, Users, Award, QrCode } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-4xl md:text-5xl">🍜</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Phố Ẩm Thực Vĩnh Khánh
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Khám phá những quán ăn ngon nhất, từ phở truyền thống đến hải sản tươi sống. 
              Hướng dẫn tự động cho mọi bữa ăn của bạn.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm quán ăn..."
                  value={searchInput}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition">
                Tìm
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Địa Điểm</p>
                  <p className="text-3xl font-bold text-gray-900">{locations.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xl">
                  🏪
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Khách Hàng Hài Lòng</p>
                  <p className="text-3xl font-bold text-gray-900">2,500+</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xl">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Xếp Hạng</p>
                  <p className="text-3xl font-bold text-gray-900">4.7★</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white text-xl">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Scanner Button */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => navigate('/qr-scanner')}
            className="w-full md:w-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
          >
            <QrCode className="h-4 w-4 mr-2" />
            Quét QR Code
          </Button>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              Tìm thấy <span className="font-semibold text-gray-900">{filteredLocations.length}</span> địa điểm
            </p>
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Xóa Bộ Lọc
              </button>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-600">Đang tải địa điểm...</p>
            </div>
          )}

          {/* Error State */}
          {locationsError && (
            <div className="text-center py-12">
              <p className="text-2xl mb-2">⚠️</p>
              <p className="text-red-600 mb-2">Có lỗi xảy ra khi tải dữ liệu</p>
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
            <div className="text-center py-12">
              <p className="text-2xl mb-2">😔</p>
              <p className="text-gray-600">Không tìm thấy địa điểm nào phù hợp</p>
              <p className="text-sm text-gray-500 mt-2">Thử thay đổi từ khóa tìm kiếm</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="text-6xl absolute top-4 left-10">🍜</div>
          <div className="text-6xl absolute bottom-4 right-10">🥢</div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn Sàng Khám Phá?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Tải ứng dụng di động để nhận thông báo mới nhất, đặt hàng trực tuyến 
            và tận hưởng những ưu đãi độc quyền
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:shadow-lg transition">
              Tải iOS
            </button>
            <button className="px-8 py-3 bg-white/20 text-white border-2 border-white rounded-lg font-semibold hover:bg-white/30 transition">
              Tải Android
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
