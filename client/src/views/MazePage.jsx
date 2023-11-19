import ToggleMusic from "../components/SetupBar"
import background from '../assets/background.jpg'


function MazePage() {
    return (
        <>
           <div className="w-full h-screen bg-gradient-to-r from-black to-regal-blue ... " background={background}>
                <div>
                    <img className="w-full h-screen brightness-50" src={background} alt=""/>
                </div>
                <ToggleMusic/>
                <div className="bg-slate-900 w-[1300px] h-full top-20 left-20 py-5 mb-[100px] fixed z-10">
                    <div className="flex justify-between items-center px-10 font-Rubik text-gray-300">
                        <div className="flex gap-20">
                            <p>Player: <span className="ml-10">Felix</span></p>
                            <p>Total Win: <span className="ml-10">10</span></p>
                        </div>
                        <div>
                            <button className="bg-lime-300 rounded-xl text-blue-900 px-3 py-1 hover:tracking-widest">Give Up</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-gridmap overflow-auto w-full px-4 justify-start md:justify-center items-center my-3">

                    </div>
                </div>
            </div>
        </>
    )
}

export default MazePage