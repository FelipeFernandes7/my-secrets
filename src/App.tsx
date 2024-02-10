import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { Login } from "./pages/login";
import { Private } from "./routes";
import { Register } from "./pages/register";
import { Annotation } from "./pages/annotation";
import { NotFound } from "./pages/custom/not-found";
import { AnnotationDetail } from "./pages/detail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Private>
            <Home />
          </Private>
        ),
      },
      {
        path: "/annotation",
        element: (
          <Private>
            <Annotation />
          </Private>
        ),
      },
      {
        path: "/annotation/:id",
        element: (
          <Private>
            <AnnotationDetail />
          </Private>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
