import GameSettings from "../components/GameSettings"
import background from '../assets/background.jpg'
import GridBoard from "../components/GridBoard"
import PlayerInfo from "../components/PlayerInfo";



function MazePage() {
    return (
        <>
           <div className="w-full flex flex-col justify-center items-center" style={{objectFit:'cover', backgroundImage: `url("${background}")`}}>
                <div className="px-16 ">
                    <GameSettings/>
                    <div className="bg-slate-900 py-5 px-5 pb-10">
                        <PlayerInfo/>
                        <GridBoard></GridBoard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MazePage