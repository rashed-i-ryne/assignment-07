import { toBengaliNum } from "@/utils/bengali";

type MarketPriceItem = {
  marketName?: string;
  division?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  avgPrice?: number | string;
};

type MarketPriceTableProps = {
  marketPrices: MarketPriceItem[];
};

const MarketPriceTable = ({ marketPrices }: MarketPriceTableProps) => {
  if (!marketPrices || marketPrices.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        বাজারের বিস্তারিত দাম এই মুহূর্তে পাওয়া যাচ্ছে না।
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">বাজারভিত্তিক আজকের দাম</h2>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-[#f8f9f5] border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">বাজার</th>
              <th className="px-6 py-4 font-semibold text-gray-700">বিভাগ</th>
              <th className="px-6 py-4 font-semibold text-gray-700">সর্বনিম্ন</th>
              <th className="px-6 py-4 font-semibold text-gray-700">সর্বাধিক</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">গড়</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {marketPrices.map((market, i) => (
              <tr key={i} className="bg-white hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {market.marketName}
                </td>
                <td className="px-6 py-4 text-gray-600">{market.division || "—"}</td>
                <td className="px-6 py-4 text-gray-700">{toBengaliNum(market.minPrice ?? 0)} টাকা</td>
                <td className="px-6 py-4 text-gray-700">{toBengaliNum(market.maxPrice ?? 0)} টাকা</td>
                <td className="px-6 py-4 font-bold text-gray-900 text-right">{toBengaliNum(market.avgPrice ?? 0)} টাকা</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketPriceTable;