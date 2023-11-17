import { useState } from "react"
import { Link } from "react-router-dom"

function WaitingRoom () {
    const [ready, setReady] = useState(false)
    const [style, setStyle] = useState('bg-lime-300 rounded-lg px-2 py-[2px] text-blue-900')

   

    const active = 'bg-blue-900  rounded-lg px-2 py-[2px] text-lime-300'
    const nonActive = 'bg-lime-300 rounded-lg px-2 py-[2px] text-blue-900'

    const toggleReady = () => {
        setReady(!ready)
        ready ? setStyle(active) : setStyle(nonActive)
    }
    return (
        <>
           <div className='w-[590px] h-[590px] bg-slate-950 rounded-[50px] fixed items-center font-Rubik px-9 py-10'>
                            <div className='flex flex-col justify-between items-center h-full w-full'>
                                <div className='w-full justify-center flex flex-col items-center'>
                                    <p className='text-gray-300 text-3xl text-center'>Waiting Room</p>
                                    <div className='bg-white w-[60%] h-[1px]'></div>
                                    <div className='flex justify-between items-center w-full font-Rubik text-gray-300 mt-[40px]'>
                                        <div className='flex gap-5'>
                                            <p>1.</p>
                                            <p>felix</p>
                                        </div>
                                        <button className={style} onClick={toggleReady}>Ready</button>
                                    </div>
                                    <div className='flex justify-between items-center w-full font-Rubik text-gray-300 mt-[40px]'>
                                        <div className='flex gap-5'>
                                            <p>1.</p>
                                            <p>felix</p>
                                        </div>
                                        <button className={style} onClick={toggleReady}>Ready</button>
                                    </div>
                                </div>
                                    
                                <div className='w-full flex justify-center py-5'>
                                    <Link to={'/maze'} className='text-gray-300 text-xl px-3 w-[50%] py-1 border border-lime-300 rounded-xl hover:tracking-widest hover:bg-lime-300 hover:text-blue-900 text-center'>Start</Link>
                                </div>
                            </div>
                        </div>
        </>
    )
}

export default WaitingRoom