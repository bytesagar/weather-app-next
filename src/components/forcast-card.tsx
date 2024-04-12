import { Box, Typography } from "@mui/material";
type ChildrenType = {
  children: React.ReactNode;
};

export const Forcast = ({ children }: ChildrenType) => {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        background: "#00040d",
        overflowX: "auto",
        paddingX: "16px",
      }}
    >
      {children}
    </Box>
  );
};

export const Header = ({ children }: ChildrenType) => {
  return (
    <Box
      display={"flex"}
      gap="4px"
      padding="12px 16px"
      borderBottom="1px solid gray"
    >
      {children}
    </Box>
  );
};

export const Title = ({ children }: ChildrenType) => {
  return <Typography color="InactiveCaption">{children}</Typography>;
};

export const Content = ({ children }: ChildrenType) => {
  return (
    <Box padding="12px 16px" gap="8px" display="flex" overflow={"scroll"}>
      {children}
    </Box>
  );
};

Forcast.Header = Header;
Forcast.Title = Title;
Forcast.Content = Content;
