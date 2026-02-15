import { TextField } from "@mui/material";

const CustomInput = ({ placeholder, setText, text }) => {
  return (
    <TextField
      placeholder={placeholder}
      variant="outlined"
      onChange={(e) => setText(e.target.value)}
      value={text}
      sx={{
        width: "55%",
        "& .MuiOutlinedInput-root": {
          height: 36,
          backgroundColor: "#1e1e1e",
          borderRadius: 2,
          fontFamily: "monospace",
          color: "#ffffff",

          display: "flex",
          alignItems: "center",

          "& fieldset": {
            borderColor: "#666",
          },
          "&:hover fieldset": {
            borderColor: "#888",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#888",
          },
        },

        "& .MuiOutlinedInput-input": {
          padding: "0 12px",
          fontSize: "0.875rem",
          lineHeight: "36px",
          fontFamily: "monospace",
          color: "var(--header)",
        },

        "& .MuiOutlinedInput-input::placeholder": {
          fontSize: "0.75rem",
          color: "#9e9e9e",
          opacity: 1,
          fontFamily: "monospace",
        },
      }}
    />
  );
};

export default CustomInput;
