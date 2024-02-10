import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./App";
import { Toaster } from "react-hot-toast";
import { AnnotationProvider } from "./context/AnnotationContext";
import { AuthProvider } from "./context/AuthContext";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AnnotationProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </AnnotationProvider>
    </AuthProvider>
  </React.StrictMode>,
);
