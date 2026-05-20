"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInInput } from "@/lib/auth/schemas";
import { useAuthStore } from "@/stores/use-auth-store";
import { PAGES } from "@/config/pages.config";
import AuthInput from "./auth-input";
import { GoogleIcon } from "@/assets/icons/google-icon";
import { AppleIcon } from "@/assets/icons/appale-icon";
import { PersonIcon } from "@/assets/icons/person-icon";

export default function SignInCard() {
  const router = useRouter();
  const setLastAuthMethod = useAuthStore((s) => s.setLastAuthMethod);
  const [serverError, setServerError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const emailValue = watch("email", "");

  const onSubmit = async (data: SignInInput) => {
    setServerError(null);
    setLastAuthMethod("credentials");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setServerError("Email yoki parol noto'g'ri");
    } else {
      router.push(PAGES.APP);
      router.refresh();
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setLastAuthMethod("google");
    await signIn("google", { callbackUrl: PAGES.APP });
  };

  return (
    <div className="w-full max-w-md mx-auto dark:bg-zinc-800 bg-zinc-50 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm p-8">
      <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6 dark:text-white">
        Log in to Workflow
      </h1>

      {serverError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <PersonIcon />
          </span>

          <AuthInput
            register={register}
            name="email"
            placeholder="Username or Email"
            autoComplete="username"
            hasIcon
          />

        </div>

        <div className="relative">
          <AuthInput
            register={register}
            name="password"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !emailValue.trim()}
          className="w-full bg-[#14a800] hover:bg-[#108a00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isSubmitting ? "Please wait..." : "Continue"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <hr className="flex-1 border-gray-200 dark:border-zinc-700" />
        <span className="text-sm text-gray-400 dark:text-gray-500">or</span>
        <hr className="flex-1 border-gray-200 dark:border-zinc-700" />
      </div>

      {/* Social buttons */}
      <div className="space-y-3">
        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-zinc-700 rounded-lg py-3 text-sm font-semibold text-white bg-[#4285F4] hover:bg-[#3367D6] transition-colors disabled:opacity-60"
        >
          <GoogleIcon />
          {googleLoading ? "Please wait..." : "Continue with Google"}
        </button>

        {/* Apple */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-zinc-700 rounded-lg py-3 text-sm font-semibold text-gray-900 bg-white hover:bg-gray-50 transition-colors">
          <AppleIcon />
          Continue with Apple
        </button>
      </div>

      {/* Sign up link */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-sm text-gray-500">Don&apos;t have an Workflow account?</p>
        <Link
          href={PAGES.SIGN_UP}
          className="inline-block border border-[#14a800] text-[#14a800] font-semibold text-sm px-8 py-2 rounded-full hover:bg-[#f2fdf0] transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}