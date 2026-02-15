import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import PDFViewer from "./PDFViewer";
import ErrorScreen from "./ErrorScreen";
import TextViewer from "./TextViewer";
import PasswordScreen from "./PasswordScreen";

const API_BASE = "http://localhost:5000";

export default function PasteView() {
  const { slug } = useParams();

  const hasFetched = useRef(false);

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [contentType, setContentType] = useState(null);

  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchPaste = async (pwd = "") => {
    setLoading(true);
    setError("");

    const url = pwd
      ? `${API_BASE}/api/pastes/${slug}?password=${encodeURIComponent(pwd)}`
      : `${API_BASE}/api/pastes/${slug}`;

    const res = await fetch(url);

    // password required
    if (res.status === 401) {
      setIsProtected(true);
      setLoading(false);
      return;
    }

    // wrong password
    if (res.status === 403) {
      const data = await res.json();

      if (data.type === "invalid_password") {
        setIsProtected(true);
        setError("Invalid password");
      } else {
        setError(data.message || "Access denied");
      }

      setLoading(false);
      return;
    }

    // not found
    if (res.status === 404) {
      setError("Paste not found");
      setLoading(false);
      return;
    }

    if (res.status === 410) {
      setError("This paste has expired");
      setLoading(false);
      return;
    }

    // some other error
    if (!res.ok) {
      setError("Something went wrong");
      setLoading(false);
      return;
    }

    // success
    const type = res.headers.get("content-type");
    setContentType(type);

    if (type.includes("text")) {
      const text = await res.text();
      setContent(text);
    } else {
      const blob = await res.blob();
      setContent(URL.createObjectURL(blob));
    }

    setIsProtected(false);
    setLoading(false);
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchPaste();
  }, [slug]);

  const handlePasswordSubmit = () => {
    if (!password.trim()) return;
    fetchPaste(password);
  };

  const handleDownload = async () => {
    const res = await fetch(
      `http://localhost:5000/api/pastes/${slug}/download`,
    );

    if (!res.ok) {
      alert("Download failed");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "file";
    a.click();
  };

  // 🔄 Loading
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 🔐 Password UI
  if (isProtected) {
    return (
      <PasswordScreen
        password={password}
        setPassword={setPassword}
        error={error}
        handlePasswordSubmit={handlePasswordSubmit}
      />
    );
  }

  if (error === "This paste has expired") {
    return <ErrorScreen errMsg={error} />;
  }

  if (error === "Access denied") {
    return <ErrorScreen errMsg={error} />;
  }

  // 📄 Text paste
  if (contentType?.includes("text")) {
    return <TextViewer content={content} handleDownload={handleDownload} />;
  }

  // 📎 File (PDF)
  if (contentType?.includes("pdf")) {
    return <PDFViewer dataUrl={content} handleDownload={handleDownload} />;
  }

  return null;
}
