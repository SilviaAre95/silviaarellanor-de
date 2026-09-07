import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Standalone design previews are served from an arbitrary path rather than the
// site root, so BrowserRouter would match no route and render a blank page.
// Preview builds (VITE_PREVIEW=1) route on the hash instead. Production is
// unaffected: it builds without the flag, and the unused branch is tree-shaken.
createRoot(document.getElementById("root")).render(
  import.meta.env.VITE_PREVIEW === "1" ? (
    <HashRouter basename="">{app}</HashRouter>
  ) : (
    <BrowserRouter basename="">{app}</BrowserRouter>
  )
);
