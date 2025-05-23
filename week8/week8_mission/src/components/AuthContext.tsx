import {
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postLogout, postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // ✅ 배열 기반으로 변경!
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEY.accessToken,
    null
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEY.refreshToken,
    null
  );

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // ✅ 상태 + 로컬스토리지 동시에 저장됨
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        alert("로그인 성공");
        window.location.href = "/my";
      }
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 중 알 수 없는 오류가 발생했습니다.");
    }
  };

  const logout = async () => {
    try {
      await postLogout();

      // ✅ null로 설정하면 로컬스토리지에서도 제거됨
      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "AuthContext를 찾을 수 없습니다. AuthProvider로 감싸져 있는지 확인하세요."
    );
  }
  return context;
};
