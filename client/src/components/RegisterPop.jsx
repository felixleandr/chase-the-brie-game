import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Login from "./LoginPop";
import { register } from "../store/actionCreator";

function RegisterPop() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await dispatch(register(form));
      if (!response) throw new Error("Register unsuccessful");
      setForm({
        username: "",
        email: "",
        password: "",
      });
      nav("/login");
      //tambahin toast/alert success
    } catch (error) {
      console.log(error?.message ? error?.message : error);
    }
    // Code to handle login goes here
  }
  // const [login, setLogin] = useState(false);

  // const togglePopUp = () => {
  //   setLogin(!login);
  // };

  // function closePopUp() {
  //   setLogin(false);
  //   toggle();
  // }
  return (
    <>
      <div
        className="z-10 w-[500px] h-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-gradient-to-r from-black to-regal-blue backdrop-blur
                rounded-3xl px-9 py-9 shadow-2xl shadow-slate-950 font-Rubik flex flex-col justify-between"
        style={{ top: "60%" }}
      >
        <form
          className="flex flex-col w-full items-center justify-evenly gap-2"
          onSubmit={handleRegister}
        >
          <div className="">
            <p className="text-gray-300 text-xl tracking-widest">Register</p>
          </div>
          <div className="flex flex-col w-full text-gray-300 gap-1 mt-5">
            <label htmlFor="">Username</label>
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              name="username"
              className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"
            />
          </div>
          <div className="flex flex-col w-full text-gray-300 gap-1 mt-5">
            <label htmlFor="">Email</label>
            <input
              value={form.email}
              onChange={handleChange}
              type="email"
              name="email"
              className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"
            />
          </div>
          <div className="flex flex-col w-full text-gray-300 gap-1 mt-5">
            <label htmlFor="">Password</label>
            <input
              value={form.password}
              onChange={handleChange}
              type="password"
              name="password"
              className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"
            />
          </div>
          <p className="font-Poppins w-full text-gray-300 text-sm text-start">
            Already have an account? Login{" "}
            <Link to="/login">
              <a
                className="underline"
                // onClick={togglePopUp}
              >
                here.
              </a>
            </Link>
          </p>
          <div className="flex items-center w-full justify-evenly mt-14">
            <button className="bg-lime-300 rounded-lg px-6 py-1 text-regal-blue hover:tracking-widest">
              Submit
            </button>
            <Link to="/">
              <button
                // onClick={closePopUp}
                className="text-white border-lime-300 border rounded-lg px-6 py-1 hover:tracking-widest"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
        {/* {login ? <Login toggle={togglePopUp}></Login> : null} */}
      </div>
    </>
  );
}

export default RegisterPop;
