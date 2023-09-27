import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { Note } from "./pages/note";
import { Detail } from "./pages/detail";
import { Login } from "./pages/login";
import { NotFound } from "./pages/notFound";
import { Private } from "./routes";
import { Register } from "./pages/register";

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
        path: "/note",
        element: (
          <Private>
            <Note />
          </Private>
        ),
      },
      {
        path: "/note/:id",
        element: (
          <Private>
            <Detail />
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
