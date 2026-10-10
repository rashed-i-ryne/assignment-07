export default function HeroBanner() {
  return (
    <div className="bg-white border-b border-gray-100 mb-12 py-16 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          <p className="text-green-600 font-bold text-sm tracking-wider uppercase mb-2">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">আজকের বাজারের দাম এক নজরে</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="inline-block bg-green-600 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-green-700 transition-all shadow-sm">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="hidden md:block text-9xl bg-gray-50 p-12 rounded-3xl border border-gray-100">
          🧺
        </div>
      </div>
    </div>
  );
}