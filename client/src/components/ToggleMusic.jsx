import { useState } from "react"
import { MdMusicNote, MdMusicOff } from "react-icons/md";


function ToggleMusic() {
    const [music, setMusic] = useState(true)

    const toggleMusic = () => {
        setMusic(!music)
    }

    return (
        <>
            <div className='absolute top-1 right-20'>
                {music ? <div className=' text-gray-300 font-Rubik'>
                    <button onClick={toggleMusic} className='flex items-center'><MdMusicNote size={40} color='lightblue'/>
                        <p>ON</p>
                    </button>
                </div> : <div className='flex items-center text-gray-300 font-Rubik'>
                    <button onClick={toggleMusic} className='flex items-center'><MdMusicOff size={40} color='lightblue'/>
                        <p>OFF</p>
                    </button>
                </div>}
            </div>
        </>
    )
}

export default ToggleMusic