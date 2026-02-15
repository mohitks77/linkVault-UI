import { Box } from "@mui/material";

const ErrorScreen = ({ errMsg }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        fontSize: "48px",
        bgcolor: "var(--bgcolor)",
        color: "var(--header)",
      }}
    >
      {errMsg}
    </Box>
  );
};

export default ErrorScreen;
