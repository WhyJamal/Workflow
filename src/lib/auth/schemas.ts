import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Введите корректный email");

export const passwordSchema = z
  .string()
  .min(8, "Пароль должен содержать минимум 8 символов")
  .max(72, "Пароль слишком длинный");

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "Имя должно содержать минимум 2 символа")
      .max(50),

    lastName: z
      .string()
      .trim()
      .min(2, "Фамилия должна содержать минимум 2 символа")
      .max(50),

    email: emailSchema,

    password: passwordSchema,

    confirmPassword: z.string(),

    acceptTerms: z.literal(true, {
      message: "Вы должны принять условия",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;