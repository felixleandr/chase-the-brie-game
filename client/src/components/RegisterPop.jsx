function RegisterPop () {
    return (
        <>
             <div className="z-10 w-[500px] h-[500px] fixed top-[1350px]
                bg-gradient-to-r from-black to-regal-blue ...
                rounded-3xl px-9 py-9 shadow-2xl shadow-slate-950 font-Rubik flex flex-col justify-between">
                <div className="flex flex-col w-full items-center gap-4">
                    <div className="">
                        <p className="text-gray-300 text-xl tracking-widest">Login</p>
                    </div>
                    <div className="flex flex-col w-full text-gray-300 gap-1 mt-10">
                        <label htmlFor="">Username</label>
                        <input type="text" className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"/>
                    </div>
                    <div className="flex flex-col w-full text-gray-300 gap-1 mt-10">
                        <label htmlFor="">Email</label>
                        <input type="text" className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"/>
                    </div>
                    <div className="flex flex-col w-full text-gray-300 gap-1 mt-10">
                        <label htmlFor="">Password</label>
                        <input type="text" className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"/>
                    </div>
                    <p className="font-Poppins w-full text-gray-300 text-sm text-start">Already have an account? Login <a className="underline" to={'/register'}>here.</a></p>
                </div>
                <div className="flex items-center justify-evenly">
                  <button onClick={handleLogin} className="bg-lime-300 rounded-lg px-6 py-1 text-regal-blue hover:tracking-widest">Submit</button> 
                  <button onClick={closePopUp} className="text-white border-lime-300 border rounded-lg px-6 py-1 hover:tracking-widest">Cancel</button> 
                </div>
            </div>
        </>
    )
}