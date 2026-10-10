import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
        <SignUpForm />
      </div>
    </div>
  );
}