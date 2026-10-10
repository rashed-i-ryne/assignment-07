"use client";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    
    if (error) {
      toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
    } else {
      toast.success("সফলভাবে লগইন হয়েছে!");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await signIn.social({ provider, callbackURL: callbackUrl });
  };

  return (
    <>
      <form onSubmit={handleEmailSignIn} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">ইমেইল</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">পাসওয়ার্ড</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" placeholder="কমপক্ষে ৮ অক্ষর" />
        </div>
        <button disabled={loading} type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:opacity-70 transition-colors">
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <div className="mt-8 flex items-center justify-between">
         <hr className="w-full border-gray-100" />
         <span className="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">অথবা</span>
         <hr className="w-full border-gray-100" />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button onClick={() => handleSocialSignIn("google")} type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 p-2.5 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-colors">
          <Image src="https://authjs.dev/img/providers/google.svg" alt="Google" width={20} height={20} className="w-5 h-5" /> Google
        </button>
        <button onClick={() => handleSocialSignIn("github")} type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 p-2.5 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-colors">
          <Image src="https://authjs.dev/img/providers/github.svg" alt="GitHub" width={20} height={20} className="w-5 h-5" /> GitHub
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        অ্যাকাউন্ট নেই? <Link href="/signup" className="text-green-600 font-bold hover:underline">সাইন আপ করুন</Link>
      </p>
    </>
  );
};

export default SignInForm;