import { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/auth';
import { ResponseMyInfoDto } from '../types/auth';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error('내 정보 불러오기 실패:', error);
      }
    };

    getData();
  }, []);

  const handleLogout = async() => {
    await logout();
    navigate("/")
  }

  if (!data) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{data.data?.name}님 환영합니다.</h1>

      <h1>{data.data?.email}</h1>

      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
