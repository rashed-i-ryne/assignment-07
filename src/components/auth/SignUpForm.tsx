"use client";

import { useState, type FormEvent } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSocialSignIn = async (provider: "google" | "github") => {
    if (loading) return;

    setLoading(true);

    try {
      const result = await signIn.social({
        provider,
        callbackURL: callbackUrl,
      });

      if (result.error) {
        console.error(`${provider} sign-in error:`, result.error);
        toast.error(
          getErrorMessage(
            result.error,
            `${provider} দিয়ে সাইন ইন করা যায়নি।`
          )
        );
      }
    } catch (error: unknown) {
      console.error(`${provider} sign-in failed:`, error);
      toast.error(
        getErrorMessage(
          error,
          "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div suppressHydrationWarning>
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
            placeholder="আপনার নাম"
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
            placeholder="you@example.com"
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

          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-3 transition-all focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            placeholder="কমপক্ষে ৮ অক্ষর"
            disabled={loading}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-lg bg-green-600 py-3 font-bold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
        </button>
      </form>

      <div className="mt-8 flex items-center justify-between">
        <hr className="w-full border-gray-100" />
        <span className="px-4 text-xs font-medium uppercase tracking-wider text-gray-400">
          অথবা
        </span>
        <hr className="w-full border-gray-100" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => handleSocialSignIn("google")}
          type="button"
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 p-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          Google
        </button>

        <button
          onClick={() => handleSocialSignIn("github")}
          type="button"
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 p-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Image
            src="https://authjs.dev/img/providers/github.svg"
            alt="GitHub"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          GitHub
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-bold text-green-600 hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;