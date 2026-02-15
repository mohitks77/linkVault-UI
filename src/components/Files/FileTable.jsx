import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import FileDetailsModal from "./FileDetailsModal";
import { getTime } from "../Utils/CustomFunctions";

const FileTable = ({ tableData, setTrigger, trigger }) => {
  const [selectedSlug, setSelectedSlug] = useState(null);

  return (
    <Box
      sx={{
        pt: 3,
        pr: 3,
        pb: 3,
        overflowY: "scroll",
        "& .MuiOutlinedInput-input::-webkit-scrollbar": {
          width: "0px",
          height: "0px",
        },
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        height: "93%",
        width: "100%",
      }}
    >
      {tableData?.map((file) => (
        <Paper
          key={file.slug}
          elevation={3}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
            background: "var(--bgcolor2)",
            color: "var(--header)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 4,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            {/* File Info */}
            <Grid
              sx={{ display: "flex", flexDirection: "column", minWidth: "70%" }}
            >
              <Typography fontWeight="bold" sx={{ fontFamily: "monospace" }}>
                {file.filename}
              </Typography>
              <Typography sx={{ fontFamily: "monospace" }} variant="body2">
                Uploaded at: {getTime(file?.created_at)}
              </Typography>
            </Grid>

            {/* Status */}
            <Box sx={{ width: "10%" }}>
              {file.expired ? (
                <Chip label="Expired" color="error" />
              ) : (
                <Chip label="Active" color="success" />
              )}
            </Box>

            {/* Views and downloads */}
            <Box sx={{ width: "10%" }}>
              <Typography variant="body2">
                Views: {file.view_count}
                {file.max_views !== null && ` / ${file.max_views}`}
              </Typography>
              <Typography variant="body2">
                Downloads: {file.download_count}
                {file.max_downloads !== null && ` / ${file.max_downloads}`}
              </Typography>
            </Box>

            {/* Actions */}
            <Grid item xs={12} md={2}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setSelectedSlug(file?.slug)}
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
                >
                  View
                </Button>
              </Box>
            </Grid>
          </Box>
        </Paper>
      ))}
      <FileDetailsModal
        open={Boolean(selectedSlug)}
        onClose={() => setSelectedSlug(null)}
        slug={selectedSlug}
        setTrigger={setTrigger}
        trigger={trigger}
      />
    </Box>
  );
};

export default FileTable;
