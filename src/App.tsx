import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { Note } from "./pages/note";
import { Detail } from "./pages/detail";
import { Login } from "./pages/login";
import { Private } from "./routes";
import { NotFound } from "./pages/notFound";

const router = createBrowserRouter([
  {
    element: (
      <Private>
        <Layout />
      </Private>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/note",
        element: <Note />,
      },
      {
        path: "/note/:id",
        element: <Detail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export { router };
