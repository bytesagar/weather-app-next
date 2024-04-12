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
  const today = new Date().getDate();
  const currentHour = new Date().getHours();
  const isCurrent = today === Number(day) && currentHour === Number(hour);
  return (
    <Box
      sx={{
        width: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: isCurrent ? "rgba(255,255,255,0.6)" : "white",
        borderRadius: "4px",
        padding: "8px 12px",
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
      <Typography variant="h5">{temp}&#176;</Typography>
    </Box>
  );
};
