const LpCardSkeleton = () => {
    return (
      <div className="relative rounded-lg overflow-hidden shadow-lg animate-flicker bg-zinc-800">
        <div className="bg-gray-400 w-full h-48"></div>
        <div className="p-4">
          <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
          <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default LpCardSkeleton;
  