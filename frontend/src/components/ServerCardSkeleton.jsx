const ServerCardSkeleton = () => {
  return (
    <div className="relative bg-gradient-to-tr from-gray-900 to-gray-800 p-6 rounded-2xl shadow-md border border-gray-700 text-white space-y-3 animate-pulse">
      {/* Glowing Dot Placeholder */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <span className="h-3 w-3 rounded-full block bg-gray-600" />
      </div>

      <div className="h-6 bg-gray-700 rounded w-3/4" /> {/* Title */}
      <div className="h-4 bg-gray-700 rounded w-full" /> {/* Desc line 1 */}
      <div className="h-4 bg-gray-700 rounded w-5/6" /> {/* Desc line 2 */}

      <div className="flex gap-2 flex-wrap mt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-5 w-16 bg-gray-700 rounded-full" />
        ))}
      </div>

      <div className="h-4 w-1/2 bg-gray-700 rounded mt-2" /> {/* Submitter */}
    </div>
  );
};

export default ServerCardSkeleton;
