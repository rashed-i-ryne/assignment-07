"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn.email({ 
        email, 
        password,
      });
      
      if (error) {
        toast.error(error.message || "লগইন ব্যর্থ হয়েছে। ইমেইল বা পাসওয়ার্ড ভুল।");
      } else {
        toast.success("সফলভাবে লগইন হয়েছে!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Sign in error:", err);
      toast.error("সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
      <form onSubmit={handleEmailSignIn} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            ইমেইল
          </label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full rounded-lg border border-gray-200 p-3 transition-all focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20" 
            placeholder="you@example.com" 
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            পাসওয়ার্ড
          </label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
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

        <button 
          disabled={loading} 
          type="submit" 
          className="w-full rounded-lg bg-green-700 py-3 font-bold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70 shadow-sm mt-2"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
        </button>
      </form>

      <div className="mt-8 flex items-center justify-between">
         <hr className="w-full border-gray-200" />
         <span className="px-4 text-sm font-medium text-gray-500">অথবা</span>
         <hr className="w-full border-gray-200" />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button 
          type="button" 
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 p-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 cursor-default"
        >
          <Image alt="Google" className="h-5 w-5" height={20} src="https://authjs.dev/img/providers/google.svg" width={20} /> 
          Google দিয়ে চালিয়ে যান
        </button>

        <button 
          type="button" 
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 p-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 cursor-default"
        >
          <Image alt="GitHub" className="h-5 w-5" height={20} src="https://authjs.dev/img/providers/github.svg" width={20} /> 
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="mt-8 text-center text-sm font-medium text-gray-600">
        অ্যাকাউন্ট নেই? <Link className="font-bold text-green-700 hover:underline" href="/signup">সাইন আপ করুন</Link>
      </p>
    </div>
  );
};

export default SignInForm;