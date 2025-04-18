import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { UserSignInformation, validateSignin } from "../utils/validate";
import { postSignin, postSignup } from "../apis/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const { values, errors, touched, getInputProps } = useForm<UserSignInformation>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async() => {
        const response = await postSignup(values);

        try {
            const response = await postSignin(values);
            localStorage.setItem("accessTocken", response.data.accessTocken);

        } catch(error) {
            alert(error?.message);
        }


        console.log(response);
    
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* ← 뒤로가기 버튼 */}
      <div className="w-full max-w-xs flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-white text-xl">
          ←
        </button>
        <h1 className="flex-1 text-center font-semibold text-xl">로그인</h1>
      </div>

      {/* 구글 로그인 버튼 (외부 이미지) */}
      <button className="flex items-center justify-center gap-2 w-full max-w-xs py-3 border border-white rounded-md mb-6 hover:bg-white hover:text-black transition">
        <img
          src="https://img.freepik.com/premium-psd/google-icon-3d-render_68185-1080.jpg?w=1060"
          alt="Google"
          className="w-6 h-6 rounded-full"
        />
        구글 로그인
      </button>

      {/* OR 구분선 */}
      <div className="flex items-center gap-2 w-full max-w-xs mb-4">
        <div className="flex-1 h-px bg-gray-600" />
        <span className="text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-600" />
      </div>

      {/* 로그인 폼 */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <input
          {...getInputProps("email")}
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요!"
          className={`bg-black border rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200 text-black focus:ring-red-500"
              : "border-gray-600 focus:ring-white"
          }`}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className={`bg-black border rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200 text-black focus:ring-red-500"
              : "border-gray-600 focus:ring-white"
          }`}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="bg-white text-black font-semibold rounded-md py-3 hover:bg-gray-200 transition disabled:bg-gray-400 disabled:text-white"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
