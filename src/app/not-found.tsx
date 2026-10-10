import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">৪০৪ - পৃষ্ঠা পাওয়া যায়নি</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে বা সাময়িকভাবে অনুপলব্ধ।
      </p>
      <Link href="/" className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}