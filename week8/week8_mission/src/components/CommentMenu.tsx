import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Comment } from "../types/lp";
import { useAuth } from "./AuthContext";

interface Props {
  lpId: string | undefined;
  comment: Comment;
  refetch: () => void;
}

export default function CommentMenu({ lpId, comment, refetch }: Props) {
  const { accessToken, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/lps/${lpId}/comments/${comment.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error("삭제 실패");
    },
    onSuccess: () => {
      refetch();
      setShowMenu(false);
    },
  });

  const editMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/lps/${lpId}/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content: editText }),
      });
      if (!res.ok) throw new Error("수정 실패");
    },
    onSuccess: () => {
      refetch();
      setIsEditing(false);
    },
  });

if (user?.id !== comment.author?.id) return null;

  if (isEditing) {
    return (
      <div className="mt-2">
        <textarea
          className="w-full p-2 bg-gray-700 text-white rounded"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button
          onClick={() => editMutation.mutate()}
          className="mt-1 bg-blue-500 px-3 py-1 rounded"
        >
          수정 완료
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-2 right-2 text-sm">
      <button onClick={() => setShowMenu((prev) => !prev)}>⋯</button>
      {showMenu && (
        <div className="absolute right-0 mt-1 bg-zinc-700 rounded p-2 shadow">
          <button
            onClick={() => setIsEditing(true)}
            className="block px-2 py-1 hover:bg-zinc-600 rounded"
          >
            수정
          </button>
          <button
            onClick={() => deleteMutation.mutate()}
            className="block px-2 py-1 text-red-400 hover:bg-zinc-600 rounded"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
