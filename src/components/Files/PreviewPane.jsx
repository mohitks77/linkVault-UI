import { ContentCopy } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useToast } from "../Utils/ToastProvider";

const PreviewPane = ({ content, contentType }) => {
  const { toast } = useToast();
  return (
    <Box
      sx={{
        flex: 2,
        bgcolor: "var(--bgcolor2)",
        height: "100%",
        borderRadius: 1,
        p: 2,
        overflow: "auto",
        overflowY: "scroll",
        "& .MuiOutlinedInput-input::-webkit-scrollbar": {
          width: "0px",
          height: "0px",
        },
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        position: "relative",
      }}
      width="50px"
    >
      {contentType.includes("text") && (
        <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
      )}
      {contentType.includes("pdf") && (
        <iframe
          src={content}
          width="100%"
          height="500px"
          style={{ border: "none" }}
          title="PDF Preview"
        />
      )}
      {contentType.includes("text") && (
        <Button
          size="small"
          onClick={() => {
            navigator.clipboard.writeText(content);
            toast("success", "text copied");
          }}
          sx={{
            position: "absolute",
            right: 10,
            bottom: 10,
            background: "var(--bgcolor)",
            width: "20px",
            height: "40px",
            borderRadius: "15px",
          }}
        >
          <ContentCopy sx={{ color: "var(--header)" }} />
        </Button>
      )}
    </Box>
  );
};

export default PreviewPane;
