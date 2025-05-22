export default function BasicPageSkeleton() {
  return (
    <div className="bg-[#121212] text-gray-200 min-h-screen flex flex-col animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="w-full bg-gradient-to-b from-[#263958] to-[#0F172A] py-28 px-6 md:px-12 text-center">
        <div className="h-10 md:h-16 bg-gray-700 w-3/4 md:w-1/2 mx-auto rounded-lg mb-6" />
        <div className="h-6 md:h-8 bg-gray-600 w-2/3 md:w-1/3 mx-auto rounded" />
      </div>

      {/* Tags Skeleton */}
      <div className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="h-8 bg-gray-700 w-48 mb-6 rounded" />
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-gray-700" />
          ))}
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="px-6 md:px-12 max-w-4xl mx-auto mb-20">
        <div className="h-12 bg-gray-700 rounded-md w-full" />
      </div>

      {/* Grid Content Skeleton */}
      <div className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="h-8 bg-gray-700 w-60 mb-8 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-6 h-64 w-full shadow-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
