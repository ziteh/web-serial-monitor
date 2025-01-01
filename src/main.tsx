import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "./context/router";
import { ThemeProvider } from "@/components/theme-provider";
import App from "./App.tsx";
import Layout from "./layout.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <App />
        </Layout>
      </ThemeProvider>
    </RouterProvider>
  </StrictMode>,
);
