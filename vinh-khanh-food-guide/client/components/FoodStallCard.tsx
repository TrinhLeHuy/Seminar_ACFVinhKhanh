import { FoodStall } from "@/models/FoodStall";
import { Star, Clock, MapPin } from "lucide-react";

interface FoodStallCardProps {
  stall: FoodStall;
}

export const FoodStallCard = ({ stall }: FoodStallCardProps) => {
  const isOpen = stall.isOpen;
  
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-orange-100 hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-200 h-48">
        <img
          src={stall.image}
          alt={stall.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
          <span className={`text-xs font-semibold ${isOpen ? "text-green-600" : "text-red-600"}`}>
            {isOpen ? "Đang Mở" : "Đã Đóng"}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          {stall.price === "budget"
            ? "Giá Rẻ"
            : stall.price === "moderate"
              ? "Giá Vừa"
              : "Cao Cấp"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{stall.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{stall.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{stall.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({stall.reviews} đánh giá)</span>
        </div>

        {/* Location & Hours */}
        <div className="space-y-2 mb-3 text-sm">
          <div className="flex items-start gap-2 text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
            <span className="line-clamp-2">{stall.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 flex-shrink-0 text-orange-500" />
            <span>{stall.openTime} - {stall.closeTime}</span>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1 mb-4">
          {stall.specialty.slice(0, 2).map((item, idx) => (
            <span
              key={idx}
              className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full border border-orange-200"
            >
              {item}
            </span>
          ))}
          {stall.specialty.length > 2 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              +{stall.specialty.length - 2}
            </span>
          )}
        </div>

        {/* Call to Action */}
        <button className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition">
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
};
