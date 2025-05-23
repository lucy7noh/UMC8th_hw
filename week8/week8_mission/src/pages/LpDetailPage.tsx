import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../enums/common";
import { useAuth } from "../components/AuthContext";
import { Lp, Comment } from "../types/lp";
import { getCommentsByLpId } from "../apis/comment";
import CommentMenu from "../components/CommentMenu"; // 별도 컴포넌트 필요
import "../styles/spin.css";

const CommentSkeleton = () => (
  <div className="flex items-start gap-3 p-3 bg-zinc-800 rounded animate-pulse">
    <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
    <div className="flex-1 space-y-2">
      <div className="bg-gray-600 h-3 w-1/3 rounded"></div>
      <div className="bg-gray-700 h-4 w-3/4 rounded"></div>
    </div>
  </div>
);

const LpDetailPage = () => {
  const { LPid } = useParams();
  const { accessToken, user } = useAuth();
  const [lp, setLp] = useState<Lp | null>(null);
  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentLoading,
  } = useInfiniteQuery({
    queryKey: ["comments", LPid, commentOrder],
    queryFn: ({ pageParam }) =>
      getCommentsByLpId(Number(LPid), {
        cursor: pageParam,
        limit: 5,
        order: commentOrder,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    enabled: !!LPid,
  });

const commentMutation = useMutation({
  mutationFn: async () => {
    const res = await fetch(`http://localhost:8000/v1/lps/${LPid}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        content: newComment,
      }),
    });
    if (!res.ok) throw new Error("댓글 등록 실패");
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["comments", LPid, commentOrder]);
    setNewComment("");
  },
});



  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(observerCallback, { threshold: 1 });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerCallback]);

  useEffect(() => {
    const fetchLp = async () => {
      try {
        const res = await fetch(`http://localhost:8000/v1/lps/${LPid}`);
        const result = await res.json();
        setLp(result.data);
      } catch (err) {
        console.error("LP 데이터를 불러오지 못했습니다", err);
      }
    };
    fetchLp();
  }, [LPid]);

  if (!lp) return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-lg bg-zinc-900 text-white shadow-lg">
      <div className="flex items-center mb-4">
        <img src="/default-avatar.png" alt="avatar" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold">{lp.authorName || "작성자"}</p>
          <p className="text-sm text-gray-400">{new Date(lp.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">{lp.title}</h1>

      <div className="relative w-64 h-64 mx-auto mb-4">
        <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-lg spin-slow" />
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-inner" />
      </div>

      <p className="text-gray-300 mb-6">{lp.content}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {lp.tags.map((tag) => (
          <span key={tag.id} className="bg-zinc-800 text-sm px-3 py-1 rounded-full text-gray-300">
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-10">
        <button className="text-sm bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded shadow">
          ♥ 좋아요 {lp.likes.length}
        </button>
        <button className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">✏ 수정</button>
        <button className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">🗑 삭제</button>
      </div>

      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => setCommentOrder(PAGINATION_ORDER.desc)} className={`px-3 py-1 rounded ${commentOrder === PAGINATION_ORDER.desc ? "bg-pink-500" : "bg-zinc-800"}`}>
          최신순
        </button>
        <button onClick={() => setCommentOrder(PAGINATION_ORDER.asc)} className={`px-3 py-1 rounded ${commentOrder === PAGINATION_ORDER.asc ? "bg-pink-500" : "bg-zinc-800"}`}>
          오래된순
        </button>
      </div>

      <div className="space-y-4">
        {isCommentLoading && Array.from({ length: 6 }).map((_, idx) => <CommentSkeleton key={idx} />)}
        {commentPages?.pages.map((page) =>
          page.data.data.map((comment: Comment) => (
            <div key={comment.id} className="bg-zinc-800 p-3 rounded relative">
              <p className="text-sm text-gray-300">{comment.content}</p>
              <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
              <CommentMenu lpId={LPid} comment={comment} refetch={() => queryClient.invalidateQueries(["comments", LPid, commentOrder])} />
            </div>
          ))
        )}
        <div ref={observerRef} className="h-6" />
      </div>

      <div className="mt-8">
        <textarea
          className="w-full p-3 rounded bg-zinc-800 text-white"
          rows={4}
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={commentMutation.isPending}
        />
        <button
          onClick={() => commentMutation.mutate()}
          className="mt-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded"
          disabled={!newComment.trim() || commentMutation.isPending}
        >
          {commentMutation.isPending ? "등록 중..." : "댓글 작성"}
        </button>
      </div>
    </div>
  );
};

export default LpDetailPage;
