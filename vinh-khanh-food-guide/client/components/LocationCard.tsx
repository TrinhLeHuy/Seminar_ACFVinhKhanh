/**
 * LocationCard.tsx - Card hiển thị địa điểm (Nâng cấp Phase 2)
 * 
 * Các tính năng mới:
 * - Hover zoom effect trên hình ảnh
 * - Gradient overlay để text dễ đọc
 * - Badge hiển thị số món ăn
 * - Button với animation
 */

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Utensils, Headphones, ArrowRight, Image as ImageIcon } from 'lucide-react';
import type { Location } from '@shared/models/Location';

interface LocationCardProps {
  location: Location;
  onViewDetails?: (locationId: number) => void;
}

export const LocationCard = ({ location, onViewDetails }: LocationCardProps) => {
  return (
    // ========== CARD CONTAINER ==========
    // "group" = đánh dấu container để sử dụng group-hover
    // transition-all = animate tất cả thuộc tính
    <Card className="group overflow-hidden border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
      
      {/* ========== PHẦN HÌNH ẢNH ========== */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
        {location.imageUrl ? (
          <>
            {/* Hình ảnh với hiệu ứng zoom khi hover */}
            {/* group-hover:scale-110 = zoom 110% khi hover vào Card (group) */}
            <img
              src={location.imageUrl}
              alt={location.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay gradient từ dưới lên - giúp text trắng dễ đọc */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </>
        ) : (
          // Placeholder khi không có hình
          <div className="h-full w-full flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-orange-300" />
          </div>
        )}

        {/* ========== BADGE SỐ MÓN ĂN ========== */}
        {/* Hiển thị ở góc phải trên */}
        {location.foods && location.foods.length > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <Utensils className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-semibold text-gray-700">
              {location.foods.length} món
            </span>
          </div>
        )}

        {/* ========== TÊN ĐỊA ĐIỂM (Overlay) ========== */}
        {/* Hiển thị ở phía dưới hình */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white drop-shadow-lg line-clamp-1">
            {location.name}
          </h3>
        </div>
      </div>

      {/* ========== PHẦN NỘI DUNG ========== */}
      <CardContent className="p-4 space-y-3">
        {/* Mô tả - giới hạn 2 dòng */}
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
          {location.description || 'Khám phá địa điểm ẩm thực độc đáo này...'}
        </p>

        {/* Thông tin chi tiết */}
        <div className="flex flex-wrap gap-3 text-sm">
          {/* Vị trí */}
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span>Vĩnh Khánh</span>
          </div>

          {/* Audio guides (nếu có) */}
          {location.audioGuides && location.audioGuides.length > 0 && (
            <div className="flex items-center gap-1.5 text-gray-500">
              <Headphones className="h-4 w-4 text-blue-500" />
              <span>{location.audioGuides.length} ngôn ngữ</span>
            </div>
          )}
        </div>

        {/* ========== BUTTON XEM CHI TIẾT ========== */}
        {onViewDetails && (
          <Button
            onClick={() => onViewDetails(location.locationId)}
            className="w-full mt-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 group/btn"
          >
            Xem Chi Tiết
            {/* Mũi tên di chuyển sang phải khi hover */}
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
