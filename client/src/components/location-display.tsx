import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface GeoLocationData {
  location: string;
  ip: string;
}

export function LocationDisplay() {
  const [currentTime, setCurrentTime] = useState("");
  
  const { data: locationData, isLoading } = useQuery<GeoLocationData>({
    queryKey: ['/api/location'],
  });

  useEffect(() => {
    // Format current time
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false,
        timeZoneName: 'short'
      };
      setCurrentTime(now.toLocaleDateString('vi-VN', options).replace(',', ' -'));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 30000); // Update every 30 seconds
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="location-display" className="bg-white border border-gray-200 px-4 py-3 mx-4 mt-4 rounded-lg shadow-sm">
      <div className="flex items-start">
        <div className="bg-whatsapp-green rounded-full p-2 mr-3">
          <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-medium">
            Chúng tôi phát hiện bạn đang truy cập từ: <span id="user-location" className="font-semibold">
              {isLoading ? "Đang tải..." : locationData?.location || "Không xác định"}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <span id="user-ip">IP: {isLoading ? "Đang tải..." : locationData?.ip || "Không xác định"}</span> • <span id="current-time">{currentTime || "Đang tải..."}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
