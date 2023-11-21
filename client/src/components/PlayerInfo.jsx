import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../store/actionCreator";
import { useEffect, useReducer } from "react";

function PlayerInfo() {

    const user = useSelector((state) => {
        return state.user;
    })
    console.log(user, 'user');
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
            <div className="flex justify-between items-center px-10 font-Rubik text-gray-300">
                <div className="flex gap-20">
                    <p>Player: <span className="ml-10">{user?.username}</span></p>
                    <p>Total Win: <span className="ml-10">{user?.singlePlayerWin}</span></p>
                </div>
            </div>
        </>
    )
}

export default PlayerInfo