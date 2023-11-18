import { useState } from "react"
import Login from "../components/LoginPop";
import SetupBar from "../components/SetupBar";


function LandingPage() {
    const [login, setLogin] = useState(false)

    const togglePopUp = () => {
        setLogin(!login)
    }

    const handleLogin = () => {

    }
    return (
        <>
            <div className="con">
                <div className="section1">
                    <div className="text">CHASE THE BRIE</div>
                </div>
                <SetupBar/>
                <div className="section2 flex justify-center">
                    <div className="flex justify-center w-[1000px] mt-[100px] h-full">
                        <div className="flex flex-col">
                            <div className="text-gray-300 font-Rubik flex flex-col gap-5 text-center">
                                <p>
                                    Even after everything changes in this world,
                                </p>
                                <p>one thing will stay the same.</p>
                                <p>
                                    That a mouse will always love a good cheese.
                                </p>
                                <br />
                                <p>
                                    Join Jeremy, a space mouse searching for
                                    cheese in this maze world.
                                </p>
                                <p>
                                    Help him find the cheese in the shortest
                                    path possible.
                                </p>
                            </div>
                            <div className="flex flex-col items-center mt-10">
                                <p className="font-Rubik text-white py-5">How to Play</p>
                                <img className="h-[500px]" src="https://d1ng1bucl7w66k.cloudfront.net/ghost-blog/2022/07/Screen-Shot-2022-07-20-at-9.09.39-PM.png" alt="" />
                            </div>
                            <div className="flex justify-center my-[100px]">
                                <button className="text-gray-300 border-lime-300 border rounded-lg h-10 w-[300px] font-Rubik text-lg hover:tracking-widest hover:animate-bounce hover:bg-lime-300 hover:text-blue-900" onClick={togglePopUp}>
                                    Play game
                                </button>
                                {login ? <Login toggle={togglePopUp}></Login> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default LandingPage
