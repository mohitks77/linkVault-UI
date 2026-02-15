import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
  const calledRef = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: window.location.pathname,
        },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  // register user ONLY after login
  useEffect(() => {
    if (!isAuthenticated || !user || calledRef.current) return;

    calledRef.current = true;

    const registerUser = async () => {
      try {
        await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.sub,
            email: user.email,
            nickname: user.nickname,
          }),
        });
      } catch (err) {
        console.error("Failed to register user", err);
      }
    };

    registerUser();
  }, [isAuthenticated, user]);

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoute;
