"use client";
import { HourlyStat } from "@/components/hourly-stat";
import { useFetcData } from "@/hooks/useFetchData";
import { useFetchHourlyData } from "@/hooks/useFetchHourlyData";
import { useGeolocation } from "@/hooks/useGeoLocation";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { CurrentWeatherStat } from "@/components/current-weather-stat";
import { AccountCircle, SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { WeatherInfoWrapper } from "@/components/weather-info";
import { Loader } from "@/components/loader";
export default function Home() {
  const [query, setQuery] = useState("");

  const searchKey = useDebounce(query, 800);

  const {
    loading: locationLoading,
    error,
    latitude,
    longitude,
  } = useGeolocation();

  const {
    data: weatherInfo,
    loading,
    error: errorInfo,
  } = useFetcData({
    searchKey: searchKey,
    lat: latitude,
    lon: longitude,
  });

  const { data: hourlyData, error: errorHour } = useFetchHourlyData({
    lat: latitude,
    lon: longitude,
    searchKey: searchKey,
  });

  if (locationLoading) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          padding: "16px 0px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: 1,
        }}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          placeholder="Search city, country"
          sx={{ width: "100%" }}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!!error && (
          <Alert severity="info">
            Please allow location permission to view weather info of your
            location. Or search for location.
          </Alert>
        )}
        <ErrorWrapper error={errorHour || errorInfo}>
          <>
            <Box
              sx={{
                border: "1px solid #e0e5eb",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",

                  borderRadius: "8px",
                }}
              >
                <Typography variant="h5">
                  {weatherInfo?.city}, {weatherInfo?.country}
                </Typography>
                <Typography>{weatherInfo?.date}</Typography>
              </Box>
              <Box display="flex" width="500px" gap={4} flexWrap={"wrap"}>
                <CurrentWeatherStat weather={weatherInfo} />
                <WeatherInfoWrapper>
                  <WeatherInfoWrapper.Value>
                    {weatherInfo?.highestTemp}&#176;
                  </WeatherInfoWrapper.Value>
                  <WeatherInfoWrapper.Title>High Temp</WeatherInfoWrapper.Title>
                </WeatherInfoWrapper>
                <WeatherInfoWrapper>
                  <WeatherInfoWrapper.Value>
                    {weatherInfo?.lowestTemp}&#176;
                  </WeatherInfoWrapper.Value>
                  <WeatherInfoWrapper.Title>Low Temp</WeatherInfoWrapper.Title>
                </WeatherInfoWrapper>

                <WeatherInfoWrapper>
                  <WeatherInfoWrapper.Value>
                    {weatherInfo?.humidity}%
                  </WeatherInfoWrapper.Value>
                  <WeatherInfoWrapper.Title>Rain</WeatherInfoWrapper.Title>
                </WeatherInfoWrapper>
                <WeatherInfoWrapper>
                  <WeatherInfoWrapper.Value>
                    {weatherInfo?.sunrise}
                  </WeatherInfoWrapper.Value>
                  <WeatherInfoWrapper.Title>Sunrise</WeatherInfoWrapper.Title>
                </WeatherInfoWrapper>
                <WeatherInfoWrapper>
                  <WeatherInfoWrapper.Value>
                    {weatherInfo?.sunset}
                  </WeatherInfoWrapper.Value>
                  <WeatherInfoWrapper.Title>Sunset</WeatherInfoWrapper.Title>
                </WeatherInfoWrapper>
              </Box>
            </Box>

            <Box display={"flex"} gap={"8px"} overflow={"auto"}>
              {hourlyData?.map((item) => (
                <HourlyStat
                  key={item.dt}
                  temp={Math.floor(item.main.temp * 1) / 1}
                  icon={item.weather[0].icon}
                  month={item.dt_txt.slice(5, 7)}
                  day={item.dt_txt.slice(8, 10)}
                  hour={item.dt_txt.slice(11, 13)}
                />
              ))}
            </Box>
          </>
        </ErrorWrapper>
      </Container>
    </Box>
  );
}

const ErrorWrapper = ({
  error,
  children,
}: {
  error: boolean;
  children: React.ReactNode;
}) => {
  if (error) {
    return (
      <Alert severity="error">
        Sorry the specified location was not found!
      </Alert>
    );
  }
  return <>{children}</>;
};
