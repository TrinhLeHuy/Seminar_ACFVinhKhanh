/**
 * LocationDetail.tsx - Trang chi tiết địa điểm (Nâng cấp Phase 4)
 * 
 * Các tính năng mới:
 * - Header và Footer
 * - Hero image với overlay
 * - Layout đẹp hơn với sections
 * - Food cards với giá
 * - Audio guides section
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  MapPin, 
  Utensils, 
  Headphones, 
  Star, 
  Clock, 
  Phone,
  Share2,
  Heart,
  Image as ImageIcon
} from 'lucide-react';
import { locationApi } from '@shared/api';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const locationId = id ? parseInt(id, 10) : null;

  const {
    data: locationDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['location', locationId],
    queryFn: () => locationApi.getById(locationId!),
    enabled: locationId !== null,
  });

  // Loading State với Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8">
          {/* Skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6" />
            <div className="aspect-[21/9] bg-gray-200 rounded-2xl mb-8" />
            <div className="h-10 bg-gray-200 rounded w-2/3 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-gray-200 rounded-xl" />
              <div className="h-32 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error || !locationDetail) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <p className="text-6xl mb-6">😔</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy địa điểm
            </h2>
            <p className="text-gray-600 mb-8">
              Địa điểm bạn tìm kiếm có thể đã bị xóa hoặc không tồn tại.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-red-500 to-orange-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại trang chủ
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* ========== HERO IMAGE ========== */}
      <section className="relative">
        {locationDetail.imageUrl ? (
          <div className="aspect-[21/9] md:aspect-[3/1] w-full overflow-hidden">
            <img
              src={locationDetail.imageUrl}
              alt={locationDetail.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="aspect-[21/9] md:aspect-[3/1] w-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <ImageIcon className="w-24 h-24 text-orange-300" />
          </div>
        )}

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/')}
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            variant="secondary" 
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Location Name Overlay */}
        {locationDetail.imageUrl && (
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                {locationDetail.name}
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Vĩnh Khánh, Quận 4</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8 (120 đánh giá)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ===== LEFT COLUMN: Main Info ===== */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Location Info (if no image) */}
            {!locationDetail.imageUrl && (
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {locationDetail.name}
                </h1>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Giới Thiệu</h2>
              <p className="text-gray-600 leading-relaxed">
                {locationDetail.description || 'Chưa có mô tả cho địa điểm này.'}
              </p>
            </div>

            {/* Foods Section */}
            {locationDetail.foods && locationDetail.foods.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  Thực Đơn ({locationDetail.foods.length} món)
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {locationDetail.foods.map((food) => (
                    <div 
                      key={food.foodId} 
                      className="bg-white border border-orange-100 rounded-xl p-4 hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{food.name}</h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {food.description}
                          </p>
                        </div>
                        <div className="text-lg font-bold text-orange-600 ml-4">
                          {food.price.toLocaleString('vi-VN')}₫
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audio Guides Section */}
            {locationDetail.audioGuides && locationDetail.audioGuides.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-blue-500" />
                  Audio Guide ({locationDetail.audioGuides.length} ngôn ngữ)
                </h2>
                <p className="text-gray-600 mb-4">
                  Nghe thuyết minh về địa điểm này bằng ngôn ngữ bạn chọn
                </p>
                <div className="space-y-4">
                  {locationDetail.audioGuides.map((audioGuide) => (
                    <AudioPlayer key={audioGuide.audioId} audioGuide={audioGuide} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ===== RIGHT COLUMN: Sidebar ===== */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <h3 className="font-bold text-gray-900 mb-4">Thông Tin</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="text-gray-900 font-medium">Vĩnh Khánh, Q.4, TP.HCM</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Giờ mở cửa</p>
                    <p className="text-gray-900 font-medium">06:00 - 22:00</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Điện thoại</p>
                    <p className="text-gray-900 font-medium">028.3943.XXXX</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] flex items-center justify-center text-center p-6">
                <div>
                  <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Tọa độ: {locationDetail.latitude.toFixed(4)}, {locationDetail.longitude.toFixed(4)}
                  </p>
                  <a 
                    href={`https://maps.google.com/?q=${locationDetail.latitude},${locationDetail.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium mt-2 block"
                  >
                    Xem trên Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* QR Code Info */}
            {locationDetail.qrCode && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">QR Code</p>
                <p className="font-mono text-lg text-gray-900">
                  {locationDetail.qrCode.qrValue}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
