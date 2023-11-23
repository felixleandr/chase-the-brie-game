import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

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
    loader: () => {
      if(!localStorage.access_token) {
          return redirect('/')
      }
      return null 
  }, 
  },
  {
    path: "/maze/:roomId?",
    element: <MazePage />,
    loader: () => {
      if(!localStorage.access_token) {
          return redirect('/')
      }
      return null 
  }, 
  },
]);

export default router;
