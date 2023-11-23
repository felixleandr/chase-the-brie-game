import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function JoinRoom({ toggle, setRoomCode }) {
    const [roomCodeInput, setRoomCodeInput] = useState(null);
    const handleSave = () => {
        setRoomCode(roomCodeInput);
    };

    const closePopUp = () => {
        toggle();
    };

    return (
        <>
            <div className="w-[590px] h-[590px] bg-slate-950 rounded-[50px] fixed items-center font-Rubik px-9 py-10">
                <div className="flex flex-col justify-between items-center h-full w-full">
                    <div className="w-full justify-center flex flex-col items-center">
                        <form
                            onClick={handleSave}
                            action="flex flex-col w-full"
                        >
                            <div className="flex flex-col w-full items-center gap-4">
                                <div className="">
                                    <p className="text-gray-300 text-3xl text-center">
                                        Room Number
                                    </p>
                                </div>
                                <div className="flex flex-col w-full text-gray-300 gap-1 mt-10">
                                    <input
                                        placeholder="enter room number"
                                        name="room number"
                                        onChange={(e) =>
                                            setRoomCodeInput(e.target.value)
                                        }
                                        type="number"
                                        className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-evenly mt-20 gap-4">
                                {/* generate roomId di database */}

                                <Link to={`/maze/${roomCodeInput}`}>
                                    <button
                                        type="submit"
                                        className="bg-lime-300 rounded-lg px-6 py-1 text-regal-blue hover:tracking-widest"
                                    >
                                        Submit{" "}
                                    </button>
                                </Link>
                                <Link to="/main-menu">
                                    <button
                                        onClick={closePopUp}
                                        className="text-white border-lime-300 border rounded-lg px-6 py-1 hover:tracking-widest"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default JoinRoom;
