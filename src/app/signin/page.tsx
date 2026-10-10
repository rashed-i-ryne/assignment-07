import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">সাইন ইন</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
        <SignInForm />
      </div>
    </div>
  );
}