import { useState } from "react"
import Login from "./LoginPop"

function RegisterPop ({toggle}) {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    function handleRegister(e) {
        e.preventDefault()
        nav('/main-menu')
        // Code to handle login goes here
    }
    const [login, setLogin] = useState(false)

    const togglePopUp = () => {
        setLogin(!login)
    }

    function closePopUp() {
        setLogin(false)
        toggle()
    }
    return (
        <>
             <div className="z-10 w-[500px] h-[500px] fixed top-[1350px]
                bg-gradient-to-r from-black to-regal-blue ...
                rounded-3xl px-9 py-9 shadow-2xl shadow-slate-950 font-Rubik flex flex-col justify-between">
                <form className="flex flex-col w-full items-center justify-evenly gap-2" onSubmit={handleRegister}>
                    <div className="">
                        <p className="text-gray-300 text-xl tracking-widest">Register</p>
                    </div>
                    <div className="flex flex-col w-full text-gray-300 gap-1 mt-5">
                        <label htmlFor="">Username</label>
                        <input value={form.username} type="text" className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"/>
                    </div>
                    <div className="flex flex-col w-full text-gray-300 gap-1 mt-5">
                        <label htmlFor="">Email</label>
                        <input value={form.email} type="text" className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"/>
                    </div>
                    <div className="flex flex-col w-full text-gray-300 gap-1 mt-5">
                        <label htmlFor="">Password</label>
                        <input value={form.password} type="text" className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"/>
                    </div>
                    <p className="font-Poppins w-full text-gray-300 text-sm text-start">Already have an account? Login <a className="underline" onClick={togglePopUp}>here.</a></p>
                    {login ? <Login toggle={togglePopUp}></Login> : null}
                    <div className="flex items-center w-full justify-evenly mt-14">
                        <button className="bg-lime-300 rounded-lg px-6 py-1 text-regal-blue hover:tracking-widest">Submit</button> 
                        <button onClick={closePopUp} className="text-white border-lime-300 border rounded-lg px-6 py-1 hover:tracking-widest">Cancel</button> 
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterPop