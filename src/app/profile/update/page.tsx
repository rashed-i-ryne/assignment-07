"use client";
import { useState } from "react";
import { updateUser, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম ফাঁকা রাখা যাবে না");
    
    setLoading(true);
    const { error } = await updateUser({ name });
    setLoading(false);

    if (error) {
      toast.error(error.message || "প্রোফাইল আপডেট ব্যর্থ হয়েছে");
    } else {
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-xl min-h-[70vh]">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="font-bold text-2xl text-gray-900 mb-6">প্রোফাইল আপডেট করুন</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">নতুন নাম</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" 
            />
          </div>
          <button disabled={loading} type="submit" className="w-full bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70">
            {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
          </button>
        </form>
      </div>
    </main>
  );
}