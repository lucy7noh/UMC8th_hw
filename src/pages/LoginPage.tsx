import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';
import { useAuth } from '../components/AuthContext';
import { useEffect } from 'react';

const LoginPage = () => {
  const {login,accessToken} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(accessToken){
      console.log("accessToken", accessToken);
    }
  },[navigate,accessToken]);

  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
      await login(values);
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login"
  }

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/my"); // 없으면 홈으로
    }
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      {/* 상단 헤더: < 버튼 + 로그인 텍스트 */}
      <div className="relative w-[300px] h-10 mb-4 flex items-center justify-center">
        <button
          onClick={handleGoBack}
          className="absolute left-0 text-white text-xl"
        >
          &lt;
        </button>
        <div className="text-white text-lg font-semibold">로그인</div>
      </div>

      {/* 구글 로그인 버튼 */}
      <button
        type="button"
        className="relative w-[300px] py-2 border border-gray-400 rounded-md bg-transparent text-white hover:bg-gray-100 hover:text-black transition"
        onClick = {handleGoogleLogin}
      >
        <img
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
        />
        <span className="block text-center w-full">구글 로그인</span>
      </button>

      {/* OR 구분선 */}
      <div className="flex items-center w-[300px]">
        <hr className="flex-grow border-gray-600" />
        <span className="px-2 text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-600" />
      </div>

      {/* 이메일 / 비밀번호 입력 */}
      <div className='flex flex-col gap-3'>
        <input
          {...getInputProps('email')}
          name="email"
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">이메일 에러</div>
        )}

        <input
          {...getInputProps("password")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">비밀번호 에러</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
