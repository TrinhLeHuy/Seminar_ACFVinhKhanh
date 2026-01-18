export interface FoodStall {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  specialty: string[];
  price: "budget" | "moderate" | "upscale";
}

export interface FoodCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  { id: "pho", name: "Phở", icon: "🍜", color: "from-red-500 to-orange-500" },
  { id: "banh-mi", name: "Bánh Mì", icon: "🥖", color: "from-yellow-500 to-amber-500" },
  { id: "seafood", name: "Hải Sản", icon: "🦐", color: "from-blue-500 to-cyan-500" },
  { id: "snacks", name: "Snacks", icon: "🍢", color: "from-purple-500 to-pink-500" },
  { id: "drinks", name: "Đồ Uống", icon: "🥤", color: "from-green-500 to-teal-500" },
  { id: "desserts", name: "Tráng Miệng", icon: "🍰", color: "from-pink-500 to-rose-500" },
];

export const MOCK_FOOD_STALLS: FoodStall[] = [
  {
    id: "1",
    name: "Phở Vĩnh Khánh",
    description: "Phở truyền thống nổi tiếng với nước dùng nấu 12 tiếng",
    category: "pho",
    image: "https://images.unsplash.com/photo-1582053433155-b7a9c7e8d9d9?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 245,
    location: "123 Đường Phố Ẩm Thực",
    openTime: "06:00",
    closeTime: "22:00",
    isOpen: true,
    specialty: ["Phở Bò", "Phở Gà", "Phở Hải Sản"],
    price: "budget",
  },
  {
    id: "2",
    name: "Bánh Mì Ngon",
    description: "Bánh mì mềm mại với nhân đa dạng",
    category: "banh-mi",
    image: "https://images.unsplash.com/photo-1562391166-6b07a129d5f5?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 189,
    location: "125 Đường Phố Ẩm Thực",
    openTime: "05:30",
    closeTime: "21:00",
    isOpen: true,
    specialty: ["Bánh Mì Thịt", "Bánh Mì Chà Siu", "Bánh Mì Cá"],
    price: "budget",
  },
  {
    id: "3",
    name: "Tôm Hùm Sài Gòn",
    description: "Hải sản tươi sống được chế biến theo nhiều cách",
    category: "seafood",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 312,
    location: "127 Đường Phố Ẩm Thực",
    openTime: "11:00",
    closeTime: "23:00",
    isOpen: true,
    specialty: ["Tôm Hùm Nướng", "Cua Rang Me", "Mực Xào"],
    price: "upscale",
  },
  {
    id: "4",
    name: "Chả Cá Hà Nội",
    description: "Chả cá truyền thống Hà Nội với vị cay nồng",
    category: "snacks",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 156,
    location: "129 Đường Phố Ẩm Thực",
    openTime: "10:00",
    closeTime: "22:00",
    isOpen: true,
    specialty: ["Chả Cá", "Chả Cua", "Nem Nướng"],
    price: "moderate",
  },
  {
    id: "5",
    name: "Nước Chanh Dây",
    description: "Các loại nước ép tươi và đồ uống truyền thống",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1585238341710-4aeb8d9d2d4f?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 98,
    location: "131 Đường Phố Ẩm Thực",
    openTime: "06:00",
    closeTime: "21:00",
    isOpen: true,
    specialty: ["Chanh Dây", "Nước Dừa", "Cà Phê Đen"],
    price: "budget",
  },
  {
    id: "6",
    name: "Bánh Tráng Nướng",
    description: "Bánh tráng nóng hổi với sốt tương ớt",
    category: "snacks",
    image: "https://images.unsplash.com/photo-1585163749538-c2fde2f32ee6?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 124,
    location: "133 Đường Phố Ẩm Thực",
    openTime: "15:00",
    closeTime: "23:00",
    isOpen: true,
    specialty: ["Bánh Tráng Nướng", "Bánh Nướng Muối"],
    price: "budget",
  },
];
