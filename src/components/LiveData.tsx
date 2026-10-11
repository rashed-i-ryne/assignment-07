'use client';
import { useState, useEffect } from 'react';

type LiveDateProps = {
  className?: string;
};

const LiveDate = ({ className = "text-gray-500 text-sm" }: LiveDateProps) => {
  const [currentDate, setCurrentDate] = useState("লোড হচ্ছে..."); 

  useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
      };
      setCurrentDate(today.toLocaleDateString('bn-BD', options));
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={className}>
      {currentDate}
    </span>
  );
};

export default LiveDate;