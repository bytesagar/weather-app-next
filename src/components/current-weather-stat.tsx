import { Box, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ShowerIcon from "@mui/icons-material/Shower";
import { WeatherData } from "@/hooks/useFetchData";
import { WeatherInfoWrapper } from "./weather-info";

const weatherIcons = {
  Thunderstorm: <ThunderstormIcon />,
  Drizzle: <ThunderstormIcon />,
  Rain: <ShowerIcon />,
  Snow: <AcUnitIcon />,
  Clear: <WbSunnyIcon />,
  Clouds: <CloudIcon />,
};

export const CurrentWeatherStat = ({
  weather,
}: {
  weather: WeatherData | null;
}) => {
  const iconUrl = `https://openweathermap.org/img/w/${weather?.icon}.png`;

  return (
    <Box sx={{ display: "flex" }}>
      <WeatherInfoWrapper>
        <WeatherInfoWrapper.Value>
          {weather?.temp}&#176;
        </WeatherInfoWrapper.Value>
        <WeatherInfoWrapper.Title>{weather?.main}</WeatherInfoWrapper.Title>
      </WeatherInfoWrapper>

      <Box>
        <img src={iconUrl} alt="icon" />
      </Box>
    </Box>
  );
};
