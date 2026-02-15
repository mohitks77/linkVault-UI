import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Lock as LockIcon,
  Timer as TimerIcon,
  Visibility as VisibilityIcon,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";

const PasswordScreen = ({
  password,
  setPassword,
  error,
  handlePasswordSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "var(--bgcolor)",
        color: "var(--header)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box width={400} sx={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mb: 3, fontFamily: "monospace" }}
        >
          This paste is password protected
        </Typography>

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{
            "& .MuiInputLabel-root": {
              color: "var(--header)",
              fontFamily: "monospace",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--header)",
              fontFamily: "monospace",
            },

            "& .MuiOutlinedInput-root": {
              height: 56,
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
            "& .MuiOutlinedInput-input::placeholder": {
              fontSize: "0.75rem",
              color: "#9e9e9e",
              opacity: 1,
              fontFamily: "monospace",
            },
            "& .MuiOutlinedInput-input": {
              padding: "0 12px",
              fontSize: "0.875rem",
              lineHeight: "36px",
              fontFamily: "monospace",
              color: "var(--header)",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon fontSize="small" sx={{ color: "var(--header)" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "var(--header)" }} />
                  ) : (
                    <VisibilityIcon sx={{ color: "var(--header)" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          sx={{
            mt: 2,
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
          variant="contained"
          onClick={handlePasswordSubmit}
        >
          Unlock
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordScreen;
