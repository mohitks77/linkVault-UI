import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDFViewer = ({ dataUrl, handleDownload }) => {
  const [numPages, setNumPages] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const scrollContainerRef = useRef(null);

  // Function to calculate current page based on scroll position
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight } = e.currentTarget;
    if (numPages > 0) {
      const avgPageHeight = scrollHeight / numPages;
      const currentPage = Math.round(scrollTop / avgPageHeight) + 1;
      if (currentPage !== currPage && currentPage <= numPages) {
        setCurrPage(currentPage);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "var(--bgcolor)",
      }}
    >
      {/* Container for PDF + Floating Page Label */}
      <Box
        sx={{
          width: "60%",
          height: "90%",
          position: "relative",
          bgcolor: "#525659",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {numPages && (
          <Box
            sx={{
              position: "absolute",
              top: 15,
              left: 15,
              zIndex: 10,
              bgcolor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              backdropFilter: "blur(4px)",
              pointerEvents: "none",
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontFamily: "monospace", fontWeight: "bold" }}
            >
              {currPage} / {numPages}
            </Typography>
          </Box>
        )}

        <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            pt: 2,
          }}
        >
          <Document
            file={dataUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<CircularProgress color="inherit" sx={{ mt: 5 }} />}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Box
                key={`page_container_${index + 1}`}
                sx={{ mb: 1, boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}
              >
                <Page
                  pageNumber={index + 1}
                  width={600}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Box>
            ))}
          </Document>
        </Box>
      </Box>

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
          mt: 2,
        }}
        onClick={handleDownload}
      >
        Download
      </Button>
    </Box>
  );
};

export default PDFViewer;
