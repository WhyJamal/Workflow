"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/auth/schemas";
import { useAuthStore } from "@/stores/use-auth-store";
import { PAGES } from "@/config/pages.config";
import { LocationSelect } from "./location-select";

import AuthInput from "./auth-input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleIcon } from "@/assets/icons/google-icon";
import { AppleIcon } from "@/assets/icons/appale-icon";
import { type Role, RoleStep } from "./sign-up-role-select";
import { registerUser } from "@/services/auth-service";
import { EyeIcon, EyeOffIcon, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignUpCard() {
  const router = useRouter();
  const setLastAuthMethod = useAuthStore((s) => s.setLastAuthMethod);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [step, setStep] = useState<"role" | "form">("role");

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      country: "",
      state: "",
      city: "",
      latitude: 0,
      longitude: 0,
      acceptTerms: false,
    },
  });

  const agreeTerms = watch("acceptTerms");
  const selectedRole = watch("role");

  const handleRoleSelect = (role: Role) => {
    setValue("role", role);
    setStep("form");
  };

  const onSubmit = async (data: SignUpInput) => {
    setServerError(null);

    try {
      const { res, json } = await registerUser(data);

      if (!res.ok) {
        setServerError(json.message ?? "Ошибка регистрации");
        return;
      }

      setLastAuthMethod("credentials");

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        router.push(PAGES.SIGN_IN);
      } else {
        router.push(PAGES.APP);
        router.refresh();
      }
    } catch {
      setServerError("Ошибка подключения к серверу");
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setLastAuthMethod("google");
    await signIn("google", { callbackUrl: PAGES.APP });
  };

  if (step === "role") {
    return <RoleStep onSelect={handleRoleSelect} />;
  }

  return (
    <div className="w-full max-w-xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setStep("role")}
          className="rounded-full dark:text-zinc-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white flex-1 text-center">
          {selectedRole === "CLIENT"
            ? "Зарегистрируйтесь, чтобы нанимать специалистов"
            : "Зарегистрируйтесь, чтобы находить работу"}
        </h1>
        <span className="w-5" />
      </div>

      {/* Role badge */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-[#14a800] dark:bg-green-900/30 dark:text-green-400">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {selectedRole === "CLIENT" ? "Клиент" : "Мастер"}
        </span>
      </div>

      {serverError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {serverError}
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-full py-3 text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors"
        >
          <AppleIcon />
          Continue with Apple
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-full py-3 text-sm font-medium text-white bg-[#4285F4] hover:bg-[#3367D6] transition-colors disabled:opacity-60"
        >
          <GoogleIcon />
          {googleLoading ? "Please wait..." : "Continue with Google"}
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <hr className="flex-1 border-gray-200" />
        <span className="text-sm text-gray-400">or</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden role field — value already set via setValue */}
        <input type="hidden" {...register("role")} />

        {/* Name row */}
        <div className="flex gap-3">
          <div className="flex-1">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Имя
            </Label>
            <AuthInput register={register} name="firstName" placeholder="Имя" />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex-1">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Фамилия
            </Label>
            <AuthInput register={register} name="lastName" placeholder="Фамилия" />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Адрес электронной почты
          </Label>
          <AuthInput
            register={register}
            name="email"
            type="email"
            placeholder="Адрес электронной почты"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.email.message}{" "}
              <Link href="/sign-in" className="text-[#14a800] underline">
                Хотите войти?
              </Link>
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Пароль
          </Label>
          <div className="relative">
            <AuthInput
              register={register}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (<EyeOffIcon className="h-5 w-5" />) : (<EyeIcon className="h-5 w-5" />)}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Подтвердите пароль
          </Label>
          <AuthInput
            register={register}
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            type="password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <LocationSelect
              onChange={(loc) => {
                setValue("country", loc.country);
                setValue("state", loc.state ?? "");
                setValue("city", loc.city);
                setValue("latitude", loc.latitude);
                setValue("longitude", loc.longitude);
              }}
              errors={{
                country: errors.country,
                city: errors.city,
              }}
            />
            <input type="hidden" {...register("country")} />
            <input type="hidden" {...register("state")} />
            <input type="hidden" {...register("city")} />
            <input type="hidden" {...register("latitude", { valueAsNumber: true })} />
            <input type="hidden" {...register("longitude", { valueAsNumber: true })} />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-1 dark:text-gray-300">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox id="sendemails" />
            <Label htmlFor="sendemails" className="flex flex-wrap gap-1">
              Отправляйте мне письма с советами о том, как находить специалистов, которые подходят под мои задачи.
            </Label>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <div className="flex gap-2 items-start">
              <Checkbox
                id="terms"
                checked={watch("acceptTerms")}
                onCheckedChange={(value) => setValue("acceptTerms", !!value)}
              />
              <Label htmlFor="terms" className="flex flex-wrap gap-1">
                Да, я понимаю и согласен с{" "}
                <a href="/terms" className="text-[#14a800] hover:underline" target="_blank" rel="noopener noreferrer">
                  Условиями предоставления услуг Workflow,
                </a>
                включая{" "}
                <a
                  href="/user-agreement"
                  className="text-[#14a800] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Пользовательское соглашение Workflow
                </a>{" "}
                и{" "}
                <a
                  href="/privacy-policy"
                  className="text-[#14a800] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Политика конфиденциальности
                </a>
                .
              </Label>
            </div>
          </label>

          {errors.acceptTerms && (
            <p className="text-red-500 text-xs">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !agreeTerms}
          className="w-full bg-[#14a800] hover:bg-[#108a00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2"
        >
          {isSubmitting ? "Creating account..." : "Create my account"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Уже есть аккаунт?{" "}
        <Link href="/sign-in" className="text-[#14a800] font-medium hover:underline">
          Войти
        </Link>
      </p>
    </div>
  );
}