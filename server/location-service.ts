interface GeoLocationData {
  location: string;
  ip: string;
}

/**
 * Get geolocation data from IP address
 * In a real application, this would call a geolocation API
 * For this demo, we'll use mock data for demonstration purposes
 */
export async function getLocationData(ip: string): Promise<GeoLocationData> {
  // The function signature suggests we're going to make an API call,
  // but for demonstration purposes, we'll simulate with a delay and return mock data
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Vietnam cities for demo purposes
  const vietnamCities = [
    'Hà Nội, Việt Nam',
    'Hồ Chí Minh, Việt Nam',
    'Đà Nẵng, Việt Nam',
    'Hải Phòng, Việt Nam',
    'Cần Thơ, Việt Nam'
  ];
  
  // Sanitize IP address or use a fallback
  const sanitizedIp = ip ? 
    (ip.includes(',') ? ip.split(',')[0].trim() : ip.trim()) : 
    '127.0.0.1';

  // Choose a random city
  const randomCity = vietnamCities[Math.floor(Math.random() * vietnamCities.length)];
  
  return {
    location: randomCity,
    ip: sanitizedIp
  };
}
