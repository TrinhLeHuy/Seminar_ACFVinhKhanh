import { useState, useMemo, useCallback } from "react";
import { FoodStall, MOCK_FOOD_STALLS, FOOD_CATEGORIES } from "@/models/FoodStall";

export const useFoodStallController = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  const allStalls = useMemo(() => MOCK_FOOD_STALLS, []);
  const categories = useMemo(() => FOOD_CATEGORIES, []);

  const filteredStalls = useMemo(() => {
    return allStalls.filter((stall) => {
      const matchesCategory = !selectedCategory || stall.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = !priceFilter || stall.price === priceFilter;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchQuery, priceFilter, allStalls]);

  const clearFilters = useCallback(() => {
    setSelectedCategory(null);
    setSearchQuery("");
    setPriceFilter(null);
  }, []);

  const getStallById = useCallback((id: string): FoodStall | undefined => {
    return allStalls.find((stall) => stall.id === id);
  }, [allStalls]);

  const getCategoryById = useCallback((id: string) => {
    return categories.find((cat) => cat.id === id);
  }, [categories]);

  return {
    stalls: filteredStalls,
    allStalls,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceFilter,
    setPriceFilter,
    clearFilters,
    getStallById,
    getCategoryById,
  };
};
