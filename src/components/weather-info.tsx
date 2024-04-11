import { Box, Typography } from "@mui/material";

type ChildrenType = {
  children: React.ReactNode;
};

export const WeatherValue = ({ children }: ChildrenType) => {
  return <Typography>{children}</Typography>;
};
export const WeatherTitle = ({ children }: ChildrenType) => {
  return <Typography fontWeight="medium">{children}</Typography>;
};

export const WeatherInfoWrapper = ({ children }: ChildrenType) => {
  return <Box sx={{ padding: "12px" }}>{children}</Box>;
};

WeatherInfoWrapper.Value = WeatherValue;
WeatherInfoWrapper.Title = WeatherTitle;
