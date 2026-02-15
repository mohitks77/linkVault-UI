import {
  Box,
  Typography,
  Divider,
  Chip,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Close, WarningRounded } from "@mui/icons-material";
import { getTime } from "../Utils/CustomFunctions";
import { useToast } from "../Utils/ToastProvider";
import PreviewPane from "./PreviewPane";
import DetailRow from "./DetailRow";
import DeleteFileModal from "./DeleteFileModal";

const API_BASE = "http://localhost:5000";

const FileDetailsModal = ({ open, onClose, slug, setTrigger, trigger }) => {
  const { toast } = useToast();
  const [meta, setMeta] = useState(null);
  const [content, setContent] = useState(null);
  const [contentType, setContentType] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!open || !slug) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/pastes/${slug}/preview`);
        const data = await res.json();

        setMeta(data?.metadata);
        if (data?.mimetype.includes("text")) {
          const decodedText = atob(data?.file);
          setContent(decodedText);
          setContentType(data?.mimetype);
        } else {
          setContent(`data:application/pdf;base64,${data.file}`);
          setContentType(data?.mimetype);
        }
      } catch {
        console.log("Could not load file info. Please try later.");
        toast("error", "error fetching api");
      }
    };

    fetchData();
  }, [open, slug]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    height: "70vh",
    bgcolor: "var(--bgcolor)",
    border: "1px solid var(--header)",
    boxShadow: 24,
    borderRadius: "12px",
    color: "var(--header)",
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.01) !important",
              backdropFilter: "blur(4px)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontFamily: "monospace" }}
              >
                {meta?.filename || "Loading..."}
              </Typography>
              <IconButton onClick={onClose} size="small">
                <Close sx={{ color: "var(--header)" }} />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                display: "flex",
                gap: 4,
                minHeight: 400,
                height: "80%",
              }}
            >
              <PreviewPane content={content} contentType={contentType} />

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  File Details
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {meta && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <DetailRow
                      label="File URL"
                      value={`http://localhost:3000/p/${meta.slug}`}
                    />
                    <DetailRow
                      label="Created"
                      value={getTime(meta.created_at)}
                    />
                    <DetailRow
                      label="Expires"
                      value={getTime(meta.expires_at)}
                    />
                    <DetailRow
                      label="Views"
                      value={`${meta.view_count} / ${meta.max_views !== null ? ` / ${meta.max_views}` : "∞"}`}
                    />

                    <DetailRow
                      label="Downloads"
                      value={`${meta.download_count} / ${meta.max_downloads !== null ? ` / ${meta.max_downloads}` : "∞"}`}
                    />

                    <Box>
                      <Typography
                        variant="body2"
                        fontFamily={"monospace"}
                        display="block"
                        sx={{ textDecoration: "underline", mb: 1 }}
                      >
                        Password Protected
                      </Typography>
                      {!meta.password_protected ? (
                        <Chip label="No" color="error" size="small" />
                      ) : (
                        <Chip label="Yes" color="success" size="small" />
                      )}
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        fontFamily={"monospace"}
                        display="block"
                        sx={{ textDecoration: "underline", mb: 1 }}
                      >
                        Status
                      </Typography>
                      {meta.expired ? (
                        <Chip label="Expired" color="error" size="small" />
                      ) : (
                        <Chip label="Active" color="success" size="small" />
                      )}
                    </Box>

                    <Button
                      sx={{
                        width: "100%",
                        bgcolor: "rgba(255, 0, 0, 0.6)",
                        color: "var(--header)",
                        borderRadius: "15px",
                        fontFamily: "monospace",
                        fontWeight: 700,
                      }}
                      onClick={() => setConfirmOpen(true)}
                    >
                      <Box sx={{ display: "flex" }}>
                        <WarningRounded sx={{ mr: 1 }} />
                        Delete this file
                      </Box>
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* CONFIRMATION MODAL */}
      <DeleteFileModal
        confirmOpen={confirmOpen}
        isDeleting={isDeleting}
        style={style}
        setConfirmOpen={setConfirmOpen}
        setIsDeleting={setIsDeleting}
        slug={slug}
        onClose={onClose}
        setTrigger={setTrigger}
        trigger={trigger}
      />
    </>
  );
};

export default FileDetailsModal;
