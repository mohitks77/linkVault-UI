import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

function UploadBox({ file, setFile }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const MAX_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ["text/plain", "application/pdf"];

  const validateAndSetFile = (files) => {
    const selected = files[0];
    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError("Only .txt or .pdf files are allowed");
      setFile(null);
      return;
    }

    if (selected.size > MAX_SIZE) {
      setError("File size must be less than 10 MB");
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
    console.log("Selected file:", selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    validateAndSetFile(e.dataTransfer.files);
  };

  const handleBrowse = (e) => {
    validateAndSetFile(e.target.files);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "2px dashed",
        borderColor: dragging ? "var(--header)" : "rgba(255,255,255,0.3)",
        borderRadius: 2,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        cursor: "pointer",
        transition: "border-color 0.2s ease",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-input").click()}
    >
      <input
        id="file-input"
        type="file"
        hidden
        accept=".txt,.pdf"
        onChange={handleBrowse}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          pointerEvents: "none",
        }}
      >
        <CloudUploadIcon
          sx={{
            fontSize: 48,
            color: "var(--header)",
            opacity: 0.8,
          }}
        />

        {!file && !error && (
          <>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "var(--header)",
              }}
            >
              Drag & drop a file here
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                fontFamily: "monospace",
                color: "var(--header)",
                opacity: 0.7,
              }}
            >
              .txt or .pdf · Max 10 MB
            </Typography>
          </>
        )}

        {file && (
          <Typography
            sx={{
              fontSize: "13px",
              fontFamily: "monospace",
              color: "var(--header)",
            }}
          >
            Selected: {file.name}
          </Typography>
        )}

        {error && (
          <Typography
            sx={{
              fontSize: "12px",
              fontFamily: "monospace",
              color: "#ff6b6b",
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default UploadBox;
