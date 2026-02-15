import { Box, Typography } from "@mui/material";

const DetailRow = ({ label, value }) => (
  <Box>
    <Typography
      variant="body2"
      color="var(--header)"
      display="block"
      fontFamily="monospace"
      fontWeight={700}
      sx={{ textDecoration: "underline" }}
    >
      {label}
    </Typography>
    <Typography
      variant="caption2"
      sx={{ wordBreak: "break-all", fontFamily: "monospace" }}
    >
      {value}
    </Typography>
  </Box>
);

export default DetailRow;
