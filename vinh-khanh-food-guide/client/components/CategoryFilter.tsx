import { FoodCategory } from "@/models/FoodStall";
import { X } from "lucide-react";

interface CategoryFilterProps {
  categories: FoodCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max px-4 md:px-0">
        {/* All button */}
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition ${
            selectedCategory === null
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Tất Cả
        </button>

        {/* Category buttons */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition flex items-center gap-2 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
