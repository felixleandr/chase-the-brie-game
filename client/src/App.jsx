import { useState } from "react";
import "./index.css";
import LandingPage from "./views/LandingPage";
import Login from "./components/LoginPop";
import { RouterProvider } from "react-router-dom";

function App() {

    return (
        <>
			<LandingPage></LandingPage>
        </>
    );
}

export default App;
