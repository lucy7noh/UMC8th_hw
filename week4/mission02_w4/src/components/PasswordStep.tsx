import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z
  .object({
    password: z.string().min(4, "비밀번호는 4자 이상이어야 합니다."),
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type PasswordForm = z.infer<typeof schema>;

const PasswordStep = ({ setStep, setStoredData, storedData }) => {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordForm>({ resolver: zodResolver(schema) });

  const onValid = (data: PasswordForm) => {
    setStoredData({ ...storedData, ...data });
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4 w-full max-w-xs">
      <p className="text-sm text-gray-400">{storedData.email}</p>
      <div className="relative">
        <input {...register("password")} type={show ? "text" : "password"} placeholder="비밀번호 입력" />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-2">👁️</button>
      </div>
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <input {...register("passwordCheck")} type={show ? "text" : "password"} placeholder="비밀번호 재입력" />
      {errors.passwordCheck && <p className="text-red-500 text-sm">{errors.passwordCheck.message}</p>}

      <button
        type="submit"
        disabled={!watch("password") || !watch("passwordCheck")}
        className="bg-white text-black py-2 rounded"
      >
        다음
      </button>
    </form>
  );
};

export default PasswordStep;
