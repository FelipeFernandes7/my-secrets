import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { NoteDetail } from "./pages/detail";
import { Login } from "./pages/login";
import { NotFound } from "./pages/notFound";
import { Private } from "./routes";
import { Register } from "./pages/register";
import { Annotation } from "./pages/annotation";

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
            <NoteDetail />
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
