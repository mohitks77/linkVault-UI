import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  Tooltip,
  Paper,
  Stack,
} from "@mui/material";
import {
  Download,
  ExpandMore as ExpandMoreIcon,
  Lock as LockIcon,
  Timer as TimerIcon,
  Visibility as VisibilityIcon,
  VisibilityOff,
} from "@mui/icons-material";

const Settings = ({
  password,
  setPassword,
  expiryTime,
  setExpiryTime,
  maxViews,
  setMaxViews,
  maxDownloads,
  setMaxDownloads,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        overflowY: "scroll",
        width: "100%",
        background: "var(--bgcolor)",
        ml: 2.7,
        "& .MuiOutlinedInput-input::-webkit-scrollbar": {
          width: "0px",
          height: "0px",
        },
        "&::-webkit-scrollbar": {
          width: "0px",
        },
      }}
    >
      <Accordion
        disableGutters
        elevation={0}
        sx={{ "&:before": { display: "none" } }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ color: "var(--header)", cursor: "pointer" }}
            />
          }
          sx={{
            backgroundColor: "var(--bgcolor)",
            "&:hover": { backgroundColor: "var(--bgcolor)" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: "var(--header)", fontFamily: "monospace" }}
            >
              Security & Expiration
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ color: "var(--header)", fontFamily: "monospace" }}
            >
              {"Set password and view limits"}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 3, background: "var(--bgcolor)" }}>
          <Grid container spacing={3}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Set Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "var(--header)",
                    fontFamily: "monospace",
                  }, // Normal state
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--header)",
                    fontFamily: "monospace",
                  }, // Focused state

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
                      <LockIcon
                        fontSize="small"
                        sx={{ color: "var(--header)" }}
                      />
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

              <TextField
                fullWidth
                label="Max View Count"
                type="number"
                variant="outlined"
                size="small"
                // disabled={burnOnRead}
                placeholder={"Unlimited"}
                value={maxViews}
                onChange={(e) => setMaxViews(e.target.value)}
                sx={{
                  width: "100%",
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                      margin: 0,
                    },
                  /* Targets Firefox */
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--header)",
                    fontFamily: "monospace",
                  }, // Normal state
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--header)",
                    fontFamily: "monospace",
                  }, // Focused state

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
                      <VisibilityIcon
                        fontSize="small"
                        sx={{ color: "var(--header)" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Max Download Count"
                type="number"
                variant="outlined"
                size="small"
                // disabled={burnOnRead}
                placeholder={"Unlimited"}
                onChange={(e) => setMaxDownloads(e.target.value)}
                value={maxDownloads}
                sx={{
                  width: "100%",
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                      margin: 0,
                    },
                  /* Targets Firefox */
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--header)",
                    fontFamily: "monospace",
                  }, // Normal state
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--header)",
                    fontFamily: "monospace",
                  }, // Focused state

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
                      <Download
                        fontSize="small"
                        sx={{ color: "var(--header)" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Expiry time (in minutes)"
                type="number"
                variant="outlined"
                size="small"
                // disabled={burnOnRead}
                placeholder={"5 minutes"}
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
                sx={{
                  width: "100%",
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                      margin: 0,
                    },
                  /* Targets Firefox */
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--header)",
                    fontFamily: "monospace",
                  }, // Normal state
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--header)",
                    fontFamily: "monospace",
                  }, // Focused state

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
                      <TimerIcon
                        fontSize="small"
                        sx={{ color: "var(--header)" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            {/* Toggles */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default Settings;
