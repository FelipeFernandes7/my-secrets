import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./App";
import { GlobalStyles } from "./globalStyles";
import { Toaster } from "react-hot-toast";
import { NoteProvider } from "./context/NoteContext";
import { AuthProvider } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <NoteProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
        <GlobalStyles />
        <ChakraProvider disableGlobalStyle>
          <RouterProvider router={router} />
        </ChakraProvider>
      </NoteProvider>
    </AuthProvider>
  </React.StrictMode>
);
