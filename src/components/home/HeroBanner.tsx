import Image from "next/image";
import heroImage from "../../../public/bazar-hero.png"; // 👈 আপনার ছবির সঠিক পাথ ও নাম এখানে দিন
import LiveDate from "@/components/LiveData";

const HeroBanner = () => {
  return (
    <div className="bg-white border-b border-gray-100 mb-12 py-16 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          {/* Replaced the static date with the LiveDate component and kept your styling */}
          <LiveDate className="block text-green-600 font-bold text-sm tracking-wider uppercase mb-2" />
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">আজকের বাজারের দাম এক নজরে</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="inline-block bg-green-600 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-green-700 transition-all shadow-sm">
            সব পণ্য দেখুন
          </a>
        </div>
        
        {/* Image container using the imported variable */}
        <div className="hidden md:block bg-gray-50 p-12 rounded-3xl border border-gray-100">
          <Image 
            src={heroImage} /* 👈 ওপর থেকে ইম্পোর্ট করা ভেরিয়েবলটি এখানে ব্যবহার করা হয়েছে */
            alt="বাজারের পণ্য" 
            width={200} 
            height={200}
            priority 
            className="object-contain w-auto h-auto max-h-48" 
          />
        </div>

      </div>
    </div>
  );
};

export default HeroBanner;