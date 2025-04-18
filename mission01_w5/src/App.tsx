import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // 회원가입 페이지
import HomeLayout from './layouts/HomeLayout';
import MyPage from './pages/MyPage';
import { AuthProvider } from './components/AuthContext'; // AuthProvider 임포트
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

// publicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> }, // 회원가입 경로 확인
      { path: "v1/auth/google/callback", element:<GoogleLoginRedirectPage/> },
    ],
  },
];

// protectedRoutes: 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];


// 라우터 생성
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
      <AuthProvider> 
        <RouterProvider router={router}/>
      </AuthProvider>
  );
}

export default App;

