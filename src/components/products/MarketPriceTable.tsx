import { toBengaliNum } from "@/utils/bengali";

export default function MarketPriceTable({ marketPrices }: { marketPrices: any[] }) {
  if (!marketPrices || marketPrices.length === 0) {
    return <div className="text-gray-500 mt-8 text-center p-8 bg-white rounded-xl border border-gray-100">বাজারের বিস্তারিত দাম এই মুহূর্তে পাওয়া যাচ্ছে না।</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">বাজার</th>
              <th className="px-6 py-4">বিভাগ</th>
              <th className="px-6 py-4">সর্বনিম্ন</th>
              <th className="px-6 py-4">সর্বোচ্চ</th>
              <th className="px-6 py-4">গড়</th>
            </tr>
          </thead>
          <tbody>
            {marketPrices.map((market, i) => (
              <tr key={i} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{market.marketName}</td>
                <td className="px-6 py-4">{market.division || "—"}</td>
                <td className="px-6 py-4">{toBengaliNum(market.minPrice)} টাকা</td>
                <td className="px-6 py-4">{toBengaliNum(market.maxPrice)} টাকা</td>
                <td className="px-6 py-4 font-bold text-gray-900">{toBengaliNum(market.avgPrice)} টাকা</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}