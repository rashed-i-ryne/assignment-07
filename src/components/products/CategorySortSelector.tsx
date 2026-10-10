"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function CategorySortSelector({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-gray-700">সাজান</span>
      <select 
        value={currentSort} 
        onChange={handleSort}
        className="border border-gray-200 bg-gray-50 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2 outline-none"
      >
        <option value="default">ডিফল্ট</option>
        <option value="asc">দাম: কম থেকে বেশি</option>
        <option value="desc">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}