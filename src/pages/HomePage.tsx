import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGINATION_ORDER } from "../enums/common";
import { useAuth } from "../components/AuthContext";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCardSkeleton from "../components/LpCardSkeleton"; // 스켈레톤 컴포넌트

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteLpList(20, "", order);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLpClick = (lpId: number) => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/login");
    } else {
      navigate(`/lp/${lpId}`);
    }
  };

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        setTimeout(() => {
          fetchNextPage();
        }, 1000); // 2초 딜레이
      }
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1.0,
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerCallback]);

  if (isLoading) {
    return (
      <div className="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <LpCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) return <div className="text-center text-red-500 mt-20">Error occurred!</div>;

  return (
    <div className="p-8 text-white">
      {/* 정렬 버튼 */}
      <div className="flex justify-end mb-6 gap-2">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-4 py-2 rounded-md border ${
            order === PAGINATION_ORDER.desc
              ? "bg-pink-500 text-white"
              : "bg-zinc-800 text-gray-300"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`px-4 py-2 rounded-md border ${
            order === PAGINATION_ORDER.asc
              ? "bg-pink-500 text-white"
              : "bg-zinc-800 text-gray-300"
          }`}
        >
          오래된순
        </button>
      </div>

      {/* LP 리스트 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.pages.map((page) =>
          page.data.data.map((lp) => (
            <div
              key={lp.id}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => handleLpClick(lp.id)}
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
                <h2 className="text-lg font-bold text-white mb-1">{lp.title}</h2>
                <p className="text-sm text-gray-300 mb-1">
                  {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-pink-400">♥ {lp.likes.length} 좋아요</p>
              </div>
            </div>
          ))
        )}
        {isFetchingNextPage &&
          Array.from({ length: 12 }).map((_, i) => <LpCardSkeleton key={`loading-${i}`} />)}
      </div>

      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default HomePage;
