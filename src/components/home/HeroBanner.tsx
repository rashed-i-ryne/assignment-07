import Image from "next/image";
import heroImage from "../../../public/bazar-hero.png";
import LiveDate from "@/components/LiveData";

const HeroBanner = () => {
  return (
    <div className="mb-12 px-4 pt-6">
      <div className="container mx-auto max-w-7xl">
        
        <div className="bg-[#f8faf8] border border-gray-100 rounded-[32px] py-12 px-6 md:py-16 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10">
        
          <div className="w-full md:w-2/3">
            
            <LiveDate className="inline-block bg-[#e8f3ea] text-[#117b3d] font-semibold text-sm px-4 py-1.5 rounded-full mb-6" />
            
            <h1 className="text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-gray-900 leading-tight mb-5 md:whitespace-nowrap">
              আজকের বাজারের দাম এক নজরে
            </h1>
            
            <p className="text-base md:text-[17px] text-gray-500 mb-8 leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            
            <a 
              href="#সব-পণ্য" 
              className="inline-block bg-[#008a45] text-white font-medium px-7 py-2.5 rounded-lg hover:bg-green-800 transition-all shadow-sm"
            >
              সব পণ্য দেখুন
            </a>
          </div>
          
          <div className="hidden md:flex w-full md:w-1/3 justify-end items-center shrink-0">
            <Image 
              src={heroImage}
              alt="বাজারের পণ্য" 
              width={320} 
              height={320}
              priority 
              className="object-contain w-auto h-auto max-h-[280px]" 
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;