import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { useToast } from "../Utils/ToastProvider";

const DeleteFileModal = ({
  confirmOpen,
  isDeleting,
  setConfirmOpen,
  style,
  setIsDeleting,
  slug,
  onClose,
  setTrigger,
  trigger,
}) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/pastes/${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast("File deleted successfully", "success");
        setConfirmOpen(false);
        onClose();
        setTrigger(!trigger);
      } else {
        throw new Error("Failed to delete");
      }
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      open={confirmOpen}
      onClose={() => !isDeleting && setConfirmOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.4)" } },
      }}
    >
      <Fade in={confirmOpen}>
        <Box
          sx={{
            ...style,
            maxWidth: 400,
            textAlign: "center",
            p: 4,
            height: "14vh",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Are you sure?
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            This action is permanent and cannot be undone.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() => setConfirmOpen(false)}
              disabled={isDeleting}
              sx={{
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
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={isDeleting}
              startIcon={
                isDeleting && <CircularProgress size={20} color="inherit" />
              }
              sx={{
                color: "var(--header)",
                textTransform: "none",
                fontFamily: "monospace",
                borderRadius: "15px",
              }}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteFileModal;
