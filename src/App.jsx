import { Box } from "@mui/material";
import Header from "./components/Header";
import { useState } from "react";
import Files from "./components/Files/Files";
import Upload from "./components/Upload/Upload";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PasteView from "./components/ViewDoc/PasteView";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { ToastProvider } from "./components/Utils/ToastProvider";

function App() {
  const [currentScreen, setCurrentScreen] = useState("Dashboard");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ToastProvider>
                  <Box sx={{ bgcolor: "var(--bgcolor)", display: "flex" }}>
                    <Header
                      currentScreen={currentScreen}
                      setCurrentScreen={setCurrentScreen}
                    />
                    {currentScreen === "Dashboard" ? <Files /> : <Upload />}
                  </Box>
                </ToastProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/p/:slug"
            element={
              <ToastProvider>
                <PasteView />
              </ToastProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
