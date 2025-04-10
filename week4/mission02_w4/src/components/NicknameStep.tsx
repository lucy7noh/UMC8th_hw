import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSignup } from "../apis/auth";

const schema = z.object({
  name: z.string().min(1, "닉네임을 입력해주세요."),
});

type NicknameForm = z.infer<typeof schema>;

const NicknameStep = ({ storedData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: NicknameForm) => {
    const fullData = { ...storedData, ...data };
    const { passwordCheck, ...requestData } = fullData;
    await postSignup(requestData);
    alert("회원가입 완료!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 w-full max-w-xs">
      <div className="w-24 h-24 bg-white rounded-full" />
      <input {...register("name")} placeholder="닉네임 입력" />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      <button type="submit" className="bg-pink-500 w-full py-2 rounded">회원가입 완료</button>
    </form>
  );
};

export default NicknameStep;
