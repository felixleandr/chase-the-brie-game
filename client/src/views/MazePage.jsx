import ToggleMusic from "../components/ToggleMusic"
import background from '../assets/background.jpg'

function MazePage() {
    return (
        <>
           <div className="w-full h-screen bg-gradient-to-r from-black to-regal-blue ... " background={background}>
                {/* <div>
                    <img className="w-full h-screen brightness-50" src={background} alt=""/>
                </div> */}
                <ToggleMusic/>
                <div className="bg-lime-100 w-[1300px] h-full top-20 left-20 py-[100px] mb-[100px] fixed z-10">

                </div>
                <div className="bg-lime-100 w-[1300px] h-full top-20 left-20 py-[100px] mb-[100px] fixed z-10">

                </div>
            </div>
        </>
    )
}

export default MazePage