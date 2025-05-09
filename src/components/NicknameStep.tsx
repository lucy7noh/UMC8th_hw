import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, "닉네임을 입력해주세요."),
});

type NicknameForm = z.infer<typeof schema>;

const NicknameStep = ({ storedData }: { storedData: any }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: NicknameForm) => {
    try {
      const fullData = { ...storedData, ...data };
      const { passwordCheck, ...requestData } = fullData; // 불필요한 필드 제거

      await postSignup(requestData); // 회원가입 API 요청

      alert("회원가입이 완료되었습니다!");

      // ✅ 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 w-full max-w-xs">
      <div className="w-24 h-24 bg-white rounded-full" />
      
      <input
  {...register("name")}
  placeholder="닉네임 입력"
  className="w-full py-2 px-4 rounded text-black bg-white"
/>
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <button type="submit" className="bg-pink-500 w-full py-2 rounded">
        회원가입 완료
      </button>
    </form>
  );
};

export default NicknameStep;
