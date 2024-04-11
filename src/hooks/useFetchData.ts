import { useEffect, useState } from "react";
import axios from "axios";
import { API_STATUS, days, months } from "@/constants/constants";

export interface WeatherData {
  city: string;
  country: string;
  date: string;
  description: string;
  main: string;
  temp: number;
  highestTemp: number;
  lowestTemp: number;
  sunrise: string;
  sunset: string;
  clouds: number;
  humidity: number;
  wind: number;
  icon: string;
}

export const useFetcData = ({
  searchKey,
  lat,
  lon,
}: {
  searchKey: string | undefined;
  lat: number | null;
  lon: number | null;
}) => {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const [data, setData] = useState<WeatherData | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        !searchKey
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
          : `https://api.openweathermap.org/data/2.5/weather?q=${searchKey}&APPID=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`
      );

      if (response.status === API_STATUS[200]) {
        setLoading(false);

        const currentData = response.data;

        const currentDate = new Date();

        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;

        const sunset = new Date(currentData.sys.sunset * 1000)
          .toLocaleTimeString()
          .slice(0, 5);

        const sunrise = new Date(currentData.sys.sunrise * 1000)
          .toLocaleTimeString()
          .slice(0, 5);

        const weatherInfoData = {
          city: currentData.name,
          country: currentData.sys.country,
          date,
          description: currentData.weather[0].description,
          main: currentData.weather[0].main,
          temp: currentData.main.temp,
          highestTemp: currentData.main.temp_max,
          lowestTemp: currentData.main.temp_min,
          sunrise,
          sunset,
          clouds: currentData.clouds.all,
          humidity: currentData.main.humidity,
          wind: currentData.wind.speed,
          icon: currentData?.weather[0]?.icon,
        };
        setData(weatherInfoData);
        setError(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    if ((lat && lon) || searchKey) {
      fetchData();
    }
  }, [searchKey, lat, lon]);

  return {
    loading,
    data,
    error,
    fetchData,
  };
};
