import { Description, RemoveRedEye } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
type ChildrenType = {
  children: React.ReactNode;
};

export const DescriptionCard = ({ children }: ChildrenType) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "6px",
        padding: "12px",
        backdropFilter: "blur(5px)",
      }}
      display={"flex"}
      flexDirection={"column"}
    >
      {children}
    </Box>
  );
};

export const TitleIcon = ({ children }: ChildrenType) => {
  return <>{children}</>;
};

export const Title = ({ children }: ChildrenType) => {
  return <Typography>{children}</Typography>;
};
export const TitleWrapper = ({ children }: ChildrenType) => {
  return (
    <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {children}
    </Box>
  );
};

export const DescriptionValue = ({ children }: ChildrenType) => {
  return <Typography variant="h4">{children}</Typography>;
};

export const DescriptionCaption = ({ children }: ChildrenType) => {
  return <Typography variant="caption">{children}</Typography>;
};

export const DescriptionHeader = ({ children }: ChildrenType) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap="6px">
      {children}
    </Box>
  );
};
export const DescriptionContent = ({ children }: ChildrenType) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap="16px">
      {children}
    </Box>
  );
};
DescriptionCard.Title = Title;
DescriptionCard.Value = DescriptionValue;
DescriptionCard.TitleIcon = TitleIcon;
DescriptionCard.Caption = DescriptionCaption;
DescriptionCard.TitleWrapper = TitleWrapper;
DescriptionCard.Content = DescriptionContent;
DescriptionCard.Header = DescriptionHeader;
