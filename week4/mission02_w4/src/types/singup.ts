import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email("올바른 이메일 형식입니다."),
    password: z.string().min(4, "비밀번호는 4자 이상이어야 합니다."),
    passwordCheck: z.string(),
    name: z.string().min(1, "닉네임을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;