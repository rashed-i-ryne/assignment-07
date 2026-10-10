const englishToBengaliMap: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', 
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

const bengaliToEnglishMap: Record<string, string> = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', 
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
};

export const toBengaliNum = (num: string | number | undefined | null): string => {
  // Return a fallback dash if the API data is missing, preventing the toString() crash
  if (num === undefined || num === null) return "—";
  
  return num.toString().replace(/[0-9]/g, match => englishToBengaliMap[match]);
};

export const parseBengaliNum = (str: string | undefined | null): number => {
  if (!str) return 0;
  
  const englishStr = str.toString().replace(/[০-৯]/g, match => bengaliToEnglishMap[match]);
  const numericStr = englishStr.replace(/[^0-9.-]+/g, "");
  return parseFloat(numericStr) || 0;
};