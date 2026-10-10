export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-medium">অপেক্ষা করুন...</p>
    </div>
  );
}