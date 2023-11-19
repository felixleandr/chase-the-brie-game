import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "../views/LandingPage";
import MainMenu from "../views/MainMenu";
import MazePage from "../views/MazePage";
import Login from "../components/LoginPop";
import RegisterPop from "../components/RegisterPop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <RegisterPop />,
      },
    ],
  },

  {
    path: "/main-menu",
    element: <MainMenu />,
  },
  {
    path: "/maze",
    element: <MazePage />,
  },
]);

export default router;
