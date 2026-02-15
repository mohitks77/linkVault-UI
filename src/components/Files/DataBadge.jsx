import { Box, Paper, Typography } from "@mui/material";

const DataBadge = ({ text, value, colorType = "total" }) => {
  const colors = {
    total: { border: "#2196f3", bg: "rgba(33, 150, 243, 0.1)" },
    active: { border: "#4caf50", bg: "rgba(76, 175, 80, 0.1)" },
    expired: { border: "#f44336", bg: "rgba(244, 67, 54, 0.1)" },
  };

  const selected = colors[colorType] || colors.total;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 0.8,
        borderRadius: "12px",
        bgcolor: selected.bg,
        borderLeft: `6px solid ${selected.border}`,
        color: "var(--header)",
        fontFamily: "monospace",
        transition: "all 0.2s ease",
        "&:hover": {
          filter: "brightness(1.1)",
          transform: "translateX(4px)",
        },
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.8 }}>
        {text}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
    </Box>
  );
};

export default DataBadge;
