import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./App";
import { GlobalStyles } from "./globalStyles";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="bottom-center" reverseOrder={false} />
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>
);
