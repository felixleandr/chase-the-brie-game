import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function WaitingRoom({ toggle }) {
    const [ready, setReady] = useState(false);
    const [style, setStyle] = useState(
        "bg-lime-300 rounded-lg px-2 py-[2px] text-blue-900"
    );
    const [isMultiplayer, setIsMultiplayer] = useState(false);
    let i = 1;
    const [cancel, setCancel] = useState(false);
    const nav = useNavigate();

    const active = "bg-blue-900  rounded-lg px-2 py-[2px] text-lime-300";
    const nonActive = "bg-lime-300 rounded-lg px-2 py-[2px] text-blue-900";

    const toggleReady = () => {
        setReady(!ready);
        ready ? setStyle(active) : setStyle(nonActive);

    };
    const handleStart = () => {
        if (ready) {
            nav("/maze");
        } else {
            Swal.fire("You have to click Ready first !");
        }
    };

    const closePopUp = () => {
        toggle();
    };
    return (
        <>
            <div className="w-[590px] h-[590px] bg-slate-950 rounded-[50px] fixed items-center font-Rubik px-9 py-10">
                <div className="flex flex-col justify-between items-center h-full w-full">
                    <div className="w-full justify-center flex flex-col items-center">
                        <p className="text-gray-300 text-3xl text-center">
                            Waiting Room
                        </p>
                        <div className="bg-white w-[60%] h-[1px]"></div>
                        <div className="flex justify-between items-center w-full font-Rubik text-gray-300 mt-[40px]">
                            <div className="flex gap-5">
                                <p>{i}.</p>
                                <p>{localStorage.user}</p>
                            </div>
                            <button className={style} onClick={toggleReady}>
                                Ready
                            </button>
                        </div>
                    </div>

                    <div className="w-full flex justify-evenly py-5">
                        <button
                            onClick={handleStart}
                            className="text-gray-300 text-xl px-3 py-1 w-[200px] border border-lime-300 rounded-xl hover:tracking-widest hover:bg-lime-300 hover:text-blue-900 text-center"
                        >
                            Start
                        </button>
                        <button
                            onClick={closePopUp}
                            className="text-gray-300 text-xl w-[200px] px-3 py-1 border border-lime-300 rounded-xl hover:tracking-widest hover:bg-lime-300 hover:text-blue-900 text-center"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WaitingRoom;
