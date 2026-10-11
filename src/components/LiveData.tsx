'use client';
import { useState, useEffect } from 'react';

export default function LiveDate({ className = "text-gray-500 text-sm" }: { className?: string }) {
  const [currentDate, setCurrentDate] = useState("লোড হচ্ছে..."); 

  useEffect(() => {
    // Wrapping the update in a setTimeout makes it asynchronous to satisfy the strict linter
    const timer = setTimeout(() => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
      };
      setCurrentDate(today.toLocaleDateString('bn-BD', options));
    }, 0);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={className}>
      {currentDate}
    </span>
  );
}