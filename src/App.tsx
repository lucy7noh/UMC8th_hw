import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomeLayout from "./layouts/HomeLayout";
import MyPage from "./pages/MyPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./components/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import LpDetailPage from "./pages/LpDetailPage"; 


// ✅ 라우터 정의
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },

      { path: "lp/:LPid", element: <LpDetailPage /> },

      // ✅ 보호된 라우트는 중첩으로 구성
      {
        path: "my",
        element: <ProtectedLayout />,
        children: [{ index: true, element: <MyPage /> }],
      },
    ],
  },
]);

// ✅ react-query 클라이언트
export const queryClient = new QueryClient();

// ✅ 최상위 App 컴포넌트
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
