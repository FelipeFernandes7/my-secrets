import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./App";
import { GlobalStyles } from "./globalStyles";
import { Toaster } from "react-hot-toast";
import { NoteProvider } from "./context/NoteContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="bottom-center" reverseOrder={false} />
    <GlobalStyles />
    <AuthProvider>
      <NoteProvider>
        <RouterProvider router={router} />
      </NoteProvider>
    </AuthProvider>
  </React.StrictMode>
);
