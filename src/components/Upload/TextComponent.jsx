import { TextField } from "@mui/material";

const TextComponent = ({ textContent, setTextContent }) => {
  return (
    <TextField
      multiline
      variant="outlined"
      fullWidth
      onChange={(e) => setTextContent(e.target.value)}
      value={textContent}
      placeholder="Enter your text here...."
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        "& .MuiOutlinedInput-root": {
          height: "100%",
          backgroundColor: "var(--bgcolor)",
          fontFamily: "monospace",
          fontSize: "12px",
          color: "var(--header)",
          boxSizing: "border-box",
          alignItems: "flex-start",

          "& fieldset": {
            borderColor: "#555",
            border: "none",
          },
          "&:hover fieldset": {
            borderColor: "#777",
            border: "none",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#777",
            border: "none",
          },
        },

        "& .MuiOutlinedInput-input": {
          height: "100%",
          boxSizing: "border-box",
          padding: "12px",
          fontSize: "12px",
          lineHeight: 1.6,
          color: "var(--header)",
          caretColor: "var(--header)",
        },

        "& textarea": {
          resize: "none",
        },
        "& .MuiOutlinedInput-input::-webkit-scrollbar": {
          width: "0px",
          height: "0px",
        },
        "&::-webkit-scrollbar": {
          width: "0px",
        },
      }}
    />
  );
};

export default TextComponent;
