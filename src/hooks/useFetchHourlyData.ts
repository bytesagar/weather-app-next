import { useEffect, useState } from "react";
import axios from "axios";
import { API_STATUS } from "@/constants/constants";
interface HourlyStat {
  dt: string;
  main: {
    temp: number;
  };
  dt_txt: string;
  weather: {
    icon: string;
  }[];
}

export const useFetchHourlyData = ({
  lat,
  lon,
  searchKey,
}: {
  lat: number | null;
  lon: number | null;
  searchKey: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [data, setData] = useState<HourlyStat[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        !searchKey
          ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${process.env.NEXT_PUBLIC_HOURLY_KEY}&units=metric`
          : `https://api.openweathermap.org/data/2.5/forecast?q=${searchKey}&APPID=${process.env.NEXT_PUBLIC_HOURLY_KEY}&units=metric`
        // `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
      );

      if (response.status === API_STATUS[200]) {
        setLoading(false);
        setData(response.data?.list);
        setError(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setData([]);
    }
  };

  useEffect(() => {
    if ((lat && lon) || searchKey) {
      fetchData();
    }
  }, [lat, lon, searchKey]);

  return {
    loading,
    data,
    error,
    fetchData,
  };
};
