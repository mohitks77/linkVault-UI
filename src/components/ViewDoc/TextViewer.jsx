import { Box, Button } from "@mui/material";
import { useToast } from "../Utils/ToastProvider";

const TextViewer = ({ content, handleDownload }) => {
  const { toast } = useToast();

  return (
    <Box
      sx={{
        width: "100vw",
        bgcolor: "var(--bgcolor)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "var(--header)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "70vw",
          height: "70vh",
          bgcolor: "var(--bgcolor2)",
          borderRadius: "15px",
          p: 3,
          overflowY: "scroll",
          "& .MuiOutlinedInput-input::-webkit-scrollbar": {
            width: "0px",
            height: "0px",
          },
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          fontFamily: "monospace",
        }}
      >
        {content}
      </Box>
      <Box sx={{ mt: 2, display: "flex" }}>
        <Button
          onClick={handleDownload}
          sx={{
            width: "10vw",
            color: "var(--header)",
            bgcolor: "var(--bgcolor)",
            textTransform: "none",
            fontFamily: "monospace",
            borderRadius: "15px",
            "&:hover": {
              backgroundColor: "var(--bgcolor)",
              opacity: 0.9,
            },
            border: "1px solid var(--header)",
            ml: 2,
          }}
        >
          Download
        </Button>
        <Button
          sx={{
            width: "10vw",
            color: "var(--header)",
            bgcolor: "var(--bgcolor)",
            textTransform: "none",
            fontFamily: "monospace",
            borderRadius: "15px",
            "&:hover": {
              backgroundColor: "var(--bgcolor)",
              opacity: 0.9,
            },
            border: "1px solid var(--header)",
            ml: 2,
          }}
          onClick={() => {
            navigator.clipboard.writeText(content);
            toast("success", "text copied");
          }}
        >
          Copy
        </Button>
      </Box>
    </Box>
  );
};

export default TextViewer;
