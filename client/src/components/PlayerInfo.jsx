import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../store/actionCreator";
import { useEffect, useReducer } from "react";

function PlayerInfo({roomId}) {

    const user = useSelector((state) => {
        return state.user;
    })

    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            await dispatch(fetchUserById())
        } catch (err) {
            console.log(err);
        } 
    }

    useEffect(() => {
        fetchData()
    },[])

    return (
        <>
            <div className="flex justify-between items-center px-10 font-Rubik text-gray-300 mb-2">
                <div className="flex flex-col gap-1">
                    <p>Player : <span className="ml-10">{user?.username}</span></p>
                    {roomId ? 
                     <p>Total Multiplayer win: <span className="ml-10">{user?.multiPlayerWin}</span></p>    
                     :
                     <p>Total Singleplayer win: <span className="ml-10">{user?.singlePlayerWin}</span></p>
                    }
                </div>
            </div>
        </>
    )
}

export default PlayerInfo