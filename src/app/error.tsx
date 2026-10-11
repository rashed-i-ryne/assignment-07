"use client";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">দুঃখিত, একটি সমস্যা হয়েছে!</h2>
      <p className="text-gray-500 mb-8">সার্ভারে তথ্য লোড করতে সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।</p>
      <button onClick={() => reset()} className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
};

export default Error;