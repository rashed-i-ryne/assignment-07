"use client";

import { useState, type FormEvent } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const getErrorMessage = (error: unknown, fallback: string): string => {
    if (error instanceof Error && error.message) {
      return error.message;
    }

    if (typeof error === "object" && error !== null) {
      const details = error as Record<string, unknown>;

      if (typeof details.message === "string" && details.message) {
        return details.message;
      }

      if (typeof details.statusText === "string" && details.statusText) {
        return details.statusText;
      }
    }

    return fallback;
  };

  const handleEmailSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: callbackUrl,
      });

      if (result.error) {
        console.error("Better Auth sign-up error:", result.error);
        toast.error(
          getErrorMessage(
            result.error,
            "সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
          )
        );
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push(callbackUrl);
      router.refresh();
    } catch (error: unknown) {
      console.error("Unexpected sign-up error:", error);
      toast.error(
        getErrorMessage(
          error,
          "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div suppressHydrationWarning className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
      <form onSubmit={handleEmailSignUp} className="space-y-5">
        <div>
          <label
            htmlFor="signup-name"
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            নাম
          </label>
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 transition-all focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            placeholder="Your Name"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            ইমেইল
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 transition-all focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            placeholder="Your Email"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            পাসওয়ার্ড
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 pr-12 transition-all focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              placeholder="কমপক্ষে ৮ অক্ষর"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-confirm-password"
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <div className="relative">
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              minLength={8}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 pr-12 transition-all focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              placeholder="আবার লিখুন"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-lg bg-green-700 py-3 font-bold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70 shadow-sm mt-2"
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="mt-8 flex items-center justify-between">
        <hr className="w-full border-gray-200" />
        <span className="px-4 text-sm font-medium text-gray-500">
          অথবা
        </span>
        <hr className="w-full border-gray-200" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 p-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 cursor-default"
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          Google দিয়ে চালিয়ে যান
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 p-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 cursor-default"
        >
          <Image
            src="https://authjs.dev/img/providers/github.svg"
            alt="GitHub"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600 font-medium">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-bold text-green-700 hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;