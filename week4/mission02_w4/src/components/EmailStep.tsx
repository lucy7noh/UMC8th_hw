import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("올바른 이메일 형식입니다."),
});

type EmailForm = z.infer<typeof schema>;

const EmailStep = ({ setStep, setStoredData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EmailForm>({ resolver: zodResolver(schema) });

  const onValid = (data: EmailForm) => {
    setStoredData((prev) => ({ ...prev, email: data.email }));
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4 w-full max-w-xs">
      <input {...register("email")} placeholder="이메일을 입력해주세요!" />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      <button type="submit" disabled={!watch("email")} className="bg-white text-black py-2 rounded">
        다음
      </button>
    </form>
  );
};

export default EmailStep;
