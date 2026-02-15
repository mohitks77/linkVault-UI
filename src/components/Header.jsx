import { Typography, Avatar, AppBar, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SiderbarButtons from "./Utils/SidebarButtons";
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({ currentScreen, setCurrentScreen }) => {
  const { logout, user } = useAuth0();
  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: "var(--bgcolor2)",
        color: "#1a1a1a",
        fontFamily: "monospace",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "10px 0 10px 0",
        width: "14vw",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            cursor: "pointer",
            color: "var(--header)",
            fontFamily: "monospace",
          }}
        >
          LinkVault
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 10,
          }}
        >
          <SiderbarButtons
            name="Dashboard"
            setCurrentScreen={setCurrentScreen}
            currentScreen={currentScreen}
          />
          <SiderbarButtons
            name="Upload"
            setCurrentScreen={setCurrentScreen}
            currentScreen={currentScreen}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "var(--header)",
          }}
        >
          MK
        </Avatar>
        <Box
          sx={{
            color: "var(--header)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h7" sx={{ textOverflow: "ellipsis" }}>
            {user?.nickname}
          </Typography>
          <Typography variant="h7">{user?.email}</Typography>
        </Box>
        <LogoutIcon
          onClick={() => logout({ returnTo: window.location.origin })}
          sx={{ color: "var(--header)", cursor: "pointer" }}
        />
      </Box>
    </AppBar>
  );
};

export default Header;
