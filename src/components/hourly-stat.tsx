/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@mui/material";

export const HourlyStat = ({
  temp,
  month,
  day,
  hour,
  icon,
}: {
  temp: number;
  month: string;
  day: string;
  hour: string;
  icon: string;
}) => {
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  return (
    <Box
      sx={{
        width: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography align="center">
        {month}.{day}
      </Typography>
      <Typography align="center">{hour}:00</Typography>
      <img
        style={{ height: "50px", width: "50px", margin: "0 auto" }}
        src={iconUrl}
        alt="icon"
      />
      <Typography>{temp}&#176;</Typography>
    </Box>
  );
};
