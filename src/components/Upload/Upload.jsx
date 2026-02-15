import { Box, Button } from "@mui/material";
import { useState } from "react";
import TextComponent from "./TextComponent";
import UploadBox from "./UploadBox";
import { useAuth0 } from "@auth0/auth0-react";
import Toast from "../Utils/Toast";
import Settings from "./Settings";
import { useToast } from "../Utils/ToastProvider";

const Upload = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth0();
  const { toast } = useToast();

  const [uploadOption, setUploadOption] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [expiryTime, setExpiryTime] = useState(5);
  const [maxViews, setMaxViews] = useState(null);
  const [maxDownloads, setMaxDownloads] = useState(null);

  const handleUpload = async () => {
    if (!user?.sub) {
      alert("User not authenticated");
      return;
    }

    let uploadFile;

    // TEXT has priority over FILE
    if (textContent?.trim()) {
      const blob = new Blob([textContent], { type: "text/plain" });
      uploadFile = new File([blob], "paste.txt", {
        type: "text/plain",
      });
    } else if (file) {
      uploadFile = file;
    } else {
      alert("Provide text or select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("user_id", user?.sub);
    formData.append("password", password);
    formData.append("expires_in", expiryTime ? expiryTime.toString() : "5");
    if (maxViews) formData.append("max_views", maxViews.toString());
    if (maxDownloads) formData.append("max_downloads", maxDownloads.toString);

    const res = await fetch("http://localhost:5000/api/pastes", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      toast("success", "Uploaded. Check url from dashboard");
    } else {
      toast(data.message || "Upload failed", "error");
    }

    setFile(null);
    setTextContent("");
  };

  return (
    <Box
      sx={{
        width: "86vw",
        bgcolor: "var(--bgcolor)",
        height: "100vh",
        p: 6,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "var(--bgcolor2)",
          borderRadius: "15px",
          p: 3,
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "100%",
            border: "1px dotted #666",
            borderRadius: "15px",
            bgcolor: "var(--bgcolor)",
          }}
        >
          {uploadOption === "text" ? (
            <TextComponent
              textContent={textContent}
              setTextContent={setTextContent}
            />
          ) : (
            <UploadBox file={file} setFile={setFile} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              height: "90%",
              gap: 3,
            }}
          >
            <Button
              onClick={() => setUploadOption("text")}
              sx={{
                width: "94%",
                color: "var(--header)",
                bgcolor: "var(--bgcolor)",
                textTransform: "none",
                fontFamily: "monospace",
                borderRadius: "15px",
                ml: 2,
                "&:hover": {
                  backgroundColor: "var(--bgcolor)",
                  opacity: 0.9,
                },
              }}
            >
              Upload Text
            </Button>
            <Button
              onClick={() => setUploadOption("file")}
              sx={{
                width: "94%",
                color: "var(--header)",
                bgcolor: "var(--bgcolor)",
                textTransform: "none",
                fontFamily: "monospace",
                borderRadius: "15px",
                "&:hover": {
                  backgroundColor: "var(--bgcolor)",
                  opacity: 0.9,
                },
                ml: 2,
              }}
            >
              Upload file
            </Button>

            <Settings
              password={password}
              setPassword={setPassword}
              expiryTime={expiryTime}
              setExpiryTime={setExpiryTime}
              maxViews={maxViews}
              setMaxViews={setMaxViews}
              maxDownloads={maxDownloads}
              setMaxDownloads={setMaxDownloads}
            />
          </Box>

          <Button
            sx={{
              width: "94%",
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
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Upload;
