/**
 * SkeletonCard.tsx - Loading Skeleton cho LocationCard
 * 
 * Hiển thị placeholder animation khi đang tải dữ liệu.
 * Giúp UX mượt hơn thay vì hiển thị loading spinner.
 */

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      {/* Skeleton cho hình ảnh */}
      <div className="aspect-[4/3] bg-gray-200" />
      
      {/* Skeleton cho nội dung */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        
        {/* Info skeleton */}
        <div className="flex gap-3">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded-lg w-full mt-2" />
      </div>
    </div>
  );
};

/**
 * SkeletonList - Hiển thị nhiều skeleton cards
 */
export const SkeletonList = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
