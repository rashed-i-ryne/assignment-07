"use client";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SiteHeader() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-green-600 p-2 rounded-lg text-white">
            <ShoppingCart size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">বাজার দর</h1>
            <p className="text-xs text-gray-500">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p> 
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="w-24 h-10 bg-gray-100 animate-pulse rounded-md"></div>
          ) : session ? (
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-md border border-transparent hover:border-gray-200 transition-all">
                 <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {session.user.image ? <img src={session.user.image} alt="User" /> : <User size={16} />}
                 </div>
                 <span className="text-sm font-medium hidden sm:block">{session.user.name}</span>
              </div>
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg hidden group-hover:block transition-all">
                <div className="p-4 border-b border-gray-50">
                  <p className="text-sm font-bold text-gray-900">{session.user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                </div>
                <div className="p-2">
                  <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                    <User size={16} /> আমার প্রোফাইল
                  </Link>
                  <button onClick={handleSignOut} className="flex items-center w-full gap-2 text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md mt-1">
                    <LogOut size={16} /> সাইন আউট
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
               <Link href="/signin" className="text-sm font-bold text-gray-700 hover:text-green-600 transition-colors">সাইন ইন</Link>
               <Link href="/signup" className="text-sm font-bold bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-sm">সাইন আপ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}