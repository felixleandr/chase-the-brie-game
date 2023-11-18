import { Link } from "react-router-dom";

function Leaderboard({toggle}) {
    function closePopUp() {
        toggle();
    }
    return (
        <>
            <div className="w-[590px] h-[590px] bg-slate-950 rounded-[50px] fixed items-center font-Rubik px-9 py-10">
                <div className="flex flex-col justify-between items-center h-full w-full">
                    <div className="w-full justify-center flex flex-col items-center">
                        <p className="text-gray-300 text-3xl text-center">
                            Leaderboard
                        </p>
                        <div className="bg-white w-[60%] h-[1px]"></div>
                        <div className="flex justify-between items-center w-full font-Rubik text-gray-300 mt-[40px]">
                            <div className="flex gap-5">
                                <p>No.</p>
                                <p>Name</p>
                            </div>
                            <p>Points</p>
                        </div>
                        <div className="bg-white w-full h-[1px]"></div>
                        <div className="flex justify-between items-center w-full font-Rubik text-gray-300 mt-[40px]">
                            <div className="flex gap-5">
                                <p>1.</p>
                                <p>felix</p>
                            </div>
                            <p>100</p>
                        </div>
                        <div className="flex justify-between items-center w-full font-Rubik text-gray-300 mt-[40px]">
                            <div className="flex gap-5">
                                <p>2.</p>
                                <p>felix</p>
                            </div>
                            <p>90</p>
                        </div>
                        <div className="flex justify-between items-center w-full font-Rubik text-gray-300 mt-[40px]">
                            <div className="flex gap-5">
                                <p>2.</p>
                                <p>felix</p>
                            </div>
                            <p>90</p>
                        </div>
                        <div className="flex justify-between items-center w-full font-Rubik text-gray-300 mt-[40px]">
                            <div className="flex gap-5">
                                <p>2.</p>
                                <p>felix</p>
                            </div>
                            <p>90</p>
                        </div>
                        <div className="flex justify-between items-center w-full font-Rubik text-gray-300 mt-[40px]">
                            <div className="flex gap-5">
                                <p>2.</p>
                                <p>felix</p>
                            </div>
                            <p>90</p>
                        </div>
                    </div>

                    <div className="w-full flex justify-evenly py-5">
                        <button
                            onClick={closePopUp}
                            className="text-gray-300 text-xl w-[80%] px-3 py-2 border border-lime-300 rounded-xl hover:tracking-widest hover:bg-lime-300 hover:text-blue-900 text-center mt-5"
                        >
                            Back to main menu
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Leaderboard;
