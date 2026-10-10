import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session) {
    redirect("/signin?callbackUrl=/profile");
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl min-h-[70vh]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">আমার প্রোফাইল</h1>
        <p className="text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
             {session.user.image ? <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" /> : <User size={40} className="text-gray-300" />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{session.user.name}</h2>
            <p className="text-gray-500">{session.user.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="font-bold text-xl text-gray-900 mb-6">তথ্য</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">নাম</label>
            <input type="text" defaultValue={session.user.name} disabled className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-600 cursor-not-allowed" />
          </div>
          <Link href="/profile/update" className="inline-block w-full text-center bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            আপডেট
          </Link>
        </div>
      </div>
    </main>
  );
}