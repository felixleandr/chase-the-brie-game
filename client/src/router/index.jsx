import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import LandingPage from "../views/LandingPage";
import MainMenu from "../views/MainMenu";
import MazePage from "../views/MazePage";


  const router = createBrowserRouter([    
    {
        path: '/',
        element: <LandingPage/>
    },
    {
        path: '/main-menu',
        element: <MainMenu/>
    },
    {
      path: '/maze',
      element: <MazePage/>
  },
  ]);

  export default router