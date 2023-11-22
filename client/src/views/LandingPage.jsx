import { useState } from "react";
import Login from "../components/LoginPop";
import GameSettings from "../components/GameSettings";
import { Link, Outlet } from "react-router-dom";
import Tutorial from '../assets/tutorial.png'

function LandingPage() {
  const [login, setLogin] = useState(false);

  const togglePopUp = () => {
    setLogin(!login);
  };

  const handleLogin = () => {};
  return (
    <>
      <div className="con">
        <GameSettings/>
        <div className="section1">
          <div className="text">CHASE THE BRIE</div>
        </div>
        <div className="section2 flex justify-center">
          <div className="flex justify-center w-[1000px] mt-[100px] h-full">
            <div className="flex flex-col">
              <div className="text-gray-300 font-Rubik flex flex-col gap-5 text-center">
                <p>Even after everything changes in this world,</p>
                <p>one thing will stay the same.</p>
                <p>That a mouse will always love a good cheese.</p>
                <br />
                <p>
                  Join Jeremy, a space mouse searching for cheese in this maze
                  world.
                </p>
                <p>Help him find the cheese in the shortest path possible.</p>
              </div>
              <div className="flex flex-col items-center mt-10">
                <p className="font-Rubik text-white py-5">How to Play</p>
                <img
                  className="h-[600px]"
                  src={Tutorial}
                  alt=""
                />
              </div>
              <div className="flex justify-center my-[100px]">
                <Link to="/login">
                  <button
                    className="text-gray-300 border-lime-300 border rounded-lg h-10 w-[300px] font-Rubik text-lg hover:tracking-widest hover:animate-bounce hover:bg-lime-300 hover:text-blue-900"
                    // onClick={togglePopUp}
                  >
                    Play game
                  </button>
                </Link>
                {/* {login ? <Login toggle={togglePopUp}></Login> : null} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default LandingPage;
