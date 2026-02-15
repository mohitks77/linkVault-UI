import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-078gmmouc6d6s7ko.us.auth0.com"
    clientId="tuBTC0OlFPuoxySvX8sf3C53DW4mGz5L"
    authorizationParams={{
      redirect_uri: window.location.origin,
      scope: "openid profile email",
    }}
    cacheLocation="localstorage"
    onRedirectCallback={(appState) => {
      const target = appState?.returnTo || window.location.pathname;
      window.history.replaceState({}, document.title, target);
    }}
  >
    <App />
  </Auth0Provider>,
);
