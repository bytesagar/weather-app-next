"use client";
import { HourlyStat } from "@/components/hourly-stat";
import { useFetcData } from "@/hooks/useFetchData";
import { useFetchHourlyData } from "@/hooks/useFetchHourlyData";
import { useGeolocation } from "@/hooks/useGeoLocation";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import {
  Alert,
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  AccessTime,
  Cloud,
  Room,
  RoomOutlined,
  Thermostat,
  TireRepair,
  Visibility,
  WbSunny,
} from "@mui/icons-material";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader } from "@/components/loader";
import { DescriptionCard } from "@/components/description";
import { Forcast } from "@/components/forcast-card";

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

  console.log({ weatherInfo });
  const image = {
    Thunderstorm: "./storm.jpg",
    Rain: "./rain.jpg",
    Clear: "./sunny.jpg",
    Clouds: "./clouds.jpg",
  };
  const backgroundImage = image[weatherInfo?.main as keyof typeof image]
    ? image[weatherInfo?.main as keyof typeof image]
    : "./rain.jpg";

  if (locationLoading) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: `url(${backgroundImage} )`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        backdropFilter: "blur(4px)",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          padding: "16px 0px",
          display: "flex",
          gap: "16px",
          flex: 1,
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",

          backdropFilter: "blur(5px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "40%",
          }}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Room style={{ color: "white" }} />
                </InputAdornment>
              ),
              style: {
                color: "white",
                background: "#34333D",
                borderRadius: "30px",
                opacity: 0.7,
                height: "40px",
              },
            }}
            placeholder="Search city, country"
            onChange={(e) => setQuery(e.target.value)}
          />
          {!!error && (
            <Alert severity="warning">
              Please allow location permission to view weather info of your
              location. Or search for location.
            </Alert>
          )}
          <Box
            sx={{
              backgroundColor: "transparent",

              backdropFilter: "blur(5px)",
              borderRadius: "8px",
              padding: "12px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box>
              <Box sx={{ display: "flex" }}>
                <RoomOutlined style={{ display: "block" }} />

                <Typography variant="body1">
                  {weatherInfo?.city}, {weatherInfo?.country}
                </Typography>
              </Box>

              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                textAlign={"center"}
                padding="24px"
              >
                <Typography variant="h3">{weatherInfo?.temp}&#176;</Typography>
                <Typography variant="h4">{weatherInfo?.main}</Typography>
                <Typography variant="caption">
                  {weatherInfo?.description}
                </Typography>
              </Box>
            </Box>

            <Box
              display={"grid"}
              gridTemplateColumns={"repeat(2, 1fr)"}
              gap="12px"
            >
              <FeelsLike
                title="Feels Like"
                value={<>{weatherInfo?.feelsLike ?? 0}&#176;</>}
                icon={<DeviceThermostatIcon />}
              />
              <FeelsLike
                title="Pressure"
                value={weatherInfo?.pressure}
                icon={<TireRepair />}
              />
              <FeelsLike
                title="Visibility"
                value={weatherInfo?.visibility}
                icon={<Visibility />}
              />

              <FeelsLike
                title="Humidity"
                value={(weatherInfo?.humidity ?? 0) + "%"}
                icon={<DeviceThermostatIcon />}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          width={"60%"}
        >
          <Forcast>
            <Forcast.Header>
              <AccessTime style={{ color: "white" }} />
              <Forcast.Title>Hourly Forcast</Forcast.Title>
            </Forcast.Header>
            <Forcast.Content>
              {hourlyData?.length === 0 && <Box color="white">No Data</Box>}
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
            </Forcast.Content>
          </Forcast>
          {!!weatherInfo && (
            <Box
              display={"grid"}
              gridTemplateColumns="repeat(3,1fr)"
              gap="12px"
            >
              <WindCard
                icon={<Thermostat style={{ color: "white" }} />}
                title="WIND"
                value={weatherInfo?.wind + " MPH"}
              />
              <WindCard
                icon={<WbTwilightIcon style={{ color: "white" }} />}
                title="LOW TEMP"
                value={<>{weatherInfo?.lowestTemp}&#176;</>}
              />
              <WindCard
                icon={<WbTwilightIcon style={{ color: "white" }} />}
                title="HIGH TEMP"
                value={<>{weatherInfo?.highestTemp}&#176;</>}
              />
              <WindCard
                icon={<WbSunny style={{ color: "white" }} />}
                title="SUNRISE"
                value={weatherInfo?.sunrise}
              />
              <WindCard
                icon={<WbTwilightIcon style={{ color: "white" }} />}
                title="SUNSET"
                value={weatherInfo?.sunset}
              />
              <WindCard
                icon={<Cloud style={{ color: "white" }} />}
                title="Clouds"
                value={weatherInfo?.clouds + "%"}
              />
            </Box>
          )}
        </Box>
        {/* <TextField
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
            {!!weatherInfo && (
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
                    <WeatherInfoWrapper.Title>
                      High Temp
                    </WeatherInfoWrapper.Title>
                  </WeatherInfoWrapper>
                  <WeatherInfoWrapper>
                    <WeatherInfoWrapper.Value>
                      {weatherInfo?.lowestTemp}&#176;
                    </WeatherInfoWrapper.Value>
                    <WeatherInfoWrapper.Title>
                      Low Temp
                    </WeatherInfoWrapper.Title>
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
            )}

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
        </ErrorWrapper> */}
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

const FeelsLike = ({
  title,
  value,
  icon,
}: {
  title: React.ReactNode | string;
  value: React.ReactNode | string | number;
  icon: React.ReactNode;
}) => {
  return (
    <DescriptionCard>
      <DescriptionCard.Content>
        <DescriptionCard.Header>
          <DescriptionCard.TitleWrapper>
            <DescriptionCard.TitleIcon>{icon}</DescriptionCard.TitleIcon>
            <DescriptionCard.Title>{title}</DescriptionCard.Title>
          </DescriptionCard.TitleWrapper>
          <DescriptionCard.Value>{value ?? 0}</DescriptionCard.Value>
        </DescriptionCard.Header>
        {/* <DescriptionCard.Caption>
          lorem this is Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Repellendus, voluptatibus.
        </DescriptionCard.Caption> */}
      </DescriptionCard.Content>
    </DescriptionCard>
  );
};

const WindCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: React.ReactNode | string;
  value: string | number | React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        background: "#00040d",
        borderRadius: "8px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box display={"flex"} gap="6px" alignItems="center">
        {icon}
        <Typography color="white">{title}</Typography>
      </Box>
      <Typography color="white" variant="h4">
        {value ?? 0}
      </Typography>
    </Box>
  );
};
