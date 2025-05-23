import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log("🎉 유저 정보:", response);
        setUser(response); // 응답값 구조에 맞게 수정
      } catch (error) {
        console.error("❌ 유저 정보 불러오기 실패", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold mb-4">My Page</h1>
      {user ? (
        <div className="space-y-2 text-center">
         
        </div>
      ) : (
        <p>유저 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default MyPage;
