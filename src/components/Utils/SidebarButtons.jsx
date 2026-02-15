import { Box } from "@mui/material";

const SiderbarButtons = ({ name, currentScreen, setCurrentScreen }) => {
  return (
    <Box
      sx={{
        color: "var(--header)",
        height: "45px",
        width: "80%",
        bgcolor: currentScreen === name ? "var(--bgcolor)" : "var(--bgcolor2)",
        mb: 3,
        display: "flex",
        alignItems: "center",
        pl: 3,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
        },
        borderRadius: "10px",
        cursor: "pointer",
      }}
      onClick={() => setCurrentScreen(name)}
    >
      {name}
    </Box>
  );
};

export default SiderbarButtons;
