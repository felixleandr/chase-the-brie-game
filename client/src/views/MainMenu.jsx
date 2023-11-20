import { useState } from 'react';
import background from '../assets/background.jpg'
import GameSettings from '../components/GameSettings';
import { Link, useNavigate } from 'react-router-dom';
import WaitingRoom from '../components/WaitingRoom';
import Leaderboard from '../components/Leaderboard';

function MainMenu() {
    const [waitingRoom, setWaitingRoom] = useState(false)
    const [leaderboard, setLeaderboard] = useState(false)
    const navigate = useNavigate();

    const togglePopUp = () => {
        setWaitingRoom(!waitingRoom)
    }

    const toggleLeaderboard = () => {
        console.log('masuk sini');
        setLeaderboard(!leaderboard)
    }

    const signOut = () => {
        localStorage.clear();
        navigate("/");
      };

      
    return (
        <>
            <div className="w-full h-screen bg-gradient-to-r from-black to-regal-blue ... relative">
                <div>
                    <img className="w-full h-screen brightness-75" src={background} alt=""/>
                </div>
                <GameSettings/>
                <div className='w-[600px] h-[600px] fixed top-[80px] bg-gradient-to-r from-lime-300  to-teal-500 ... left-[30%] rounded-[50px] flex justify-center items-center'>
                    <div className='w-[590px] h-[590px] bg-slate-950 rounded-[50px] flex flex-col items-center font-Rubik px-9 py-10'>
                        <div className=''>
                            <p className='text-gray-300 text-3xl'>Main Menu</p>
                            <div className='bg-white w-[100%] h-[1px]'></div>
                        </div>
                        <div className='flex flex-col gap-9 mt-[100px] text-gray-300 text-xl'>
                            <button className='hover:animate-bounce hover:tracking-widest h-9 hover:border-lime-300 border border-slate-950 px-5 py-1 rounded-xl' onClick={togglePopUp}>Single Player</button>
                            <button className='hover:animate-bounce hover:tracking-widest h-9 hover:border-lime-300 border border-slate-950 px-5 py-1 rounded-xl' onClick={togglePopUp}>Multiplayer</button>
                            <button className='hover:animate-bounce hover:tracking-widest h-9 hover:border-lime-300 border border-slate-950 px-5 py-1 rounded-xl' onClick={toggleLeaderboard}>Leaderboard</button>
                            <button  className='hover:animate-bounce hover:tracking-widest h-9 hover:border-lime-300 border border-slate-950 px-5 py-1 rounded-xl text-center' onClick={signOut}>Quit Game</button>
                        </div>
                    </div>
                    { waitingRoom && <WaitingRoom toggle={togglePopUp}/>   
                    }
                    { leaderboard && <Leaderboard toggle={toggleLeaderboard}/>   
                    }
                </div>
            </div>
        </>
    )
}


export default MainMenu