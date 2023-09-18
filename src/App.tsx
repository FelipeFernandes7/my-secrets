import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { Note } from "./pages/note";
import { Detail } from "./pages/detail";
import { Login } from "./pages/login";

const router = createBrowserRouter([
  {
    element: <Layout />,
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export { router };
