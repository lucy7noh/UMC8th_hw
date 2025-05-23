import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function LPModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setLpName("");
    setLpContent("");
    setLpTag("");
    setTags([]);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleAddTag = () => {
    const trimmed = lpTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setLpTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", lpName);
      formData.append("content", lpContent);
      tags.forEach((tag) => formData.append("tags", tag));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/lps", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("LP 등록 실패: " + errorText);
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lps"]);
      handleCloseModal();
    },
    onError: (err: any) => {
      alert(err.message || "등록 중 오류가 발생했습니다.");
    },
  });

  return (
    <>
      <button
        className="fixed bottom-10 right-10 w-14 h-14 bg-pink-500 text-white text-3xl rounded-full shadow-lg z-[9999]"
        onClick={handleOpenModal}
      >
        +
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[9998]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-800 text-white rounded-xl w-96 p-6 relative z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-white"
              onClick={handleCloseModal}
            >
              ×
            </button>

            {/* 이미지 */}
            <div
              className="w-32 h-32 rounded-full mx-auto mb-6 cursor-pointer overflow-hidden border-4 border-gray-600"
              onClick={handleImageClick}
            >
              <img
                src={imagePreview || "/default-lp.png"}
                alt="LP"
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* 이름/내용 */}
            <input
              className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
              placeholder="LP Name"
              value={lpName}
              onChange={(e) => setLpName(e.target.value)}
            />
            <input
              className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
              placeholder="LP Content"
              value={lpContent}
              onChange={(e) => setLpContent(e.target.value)}
            />

            {/* 태그 입력 */}
            <div className="flex mb-3">
              <input
                className="flex-1 p-2 bg-gray-700 text-white rounded-l"
                placeholder="LP Tag"
                value={lpTag}
                onChange={(e) => setLpTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                className="bg-gray-600 px-4 rounded-r"
                onClick={handleAddTag}
              >
                Add
              </button>
            </div>

            {/* 태그 목록 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-gray-600 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-white hover:text-red-400 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* 등록 버튼 */}
            <button
              className="w-full bg-pink-500 p-2 rounded font-semibold"
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "등록 중..." : "Add LP"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
