import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RegisterPop from "../components/RegisterPop";
import { login } from "../store/actionCreator";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();
  const dispatch = useDispatch();

  // Code to handle login goes here

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await dispatch(login(form));

      if (!response) throw new Error("Login unsuccessful");
      setForm({
        email: "",
        password: "",
      });
      nav("/main-menu");
      //tambahin toast/alert success
    } catch (error) {
      console.log(error?.message ? error?.message : error);
    }
  }

  //const [register, setRegister] = useState(false);

  // const togglePopUp = () => {
  //   setRegister(!register);
  // };

  // function closePopUp() {
  //   toggle();
  // }

  return (
    <>
      <div
        className="z-50 w-[500px] h-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-gradient-to-r from-black to-regal-blue 
                rounded-3xl px-9 py-9 shadow-2xl shadow-slate-950 font-Rubik flex flex-col justify-between border-lime-300 border"
        style={{ top: "60%" }}
      >
        <form action="flex flex-col w-full" onSubmit={handleLogin}>
          <div className="flex flex-col w-full items-center gap-4">
            <div className="">
              <p className="text-gray-300 text-xl tracking-widest">Login</p>
            </div>
            <div className="flex flex-col w-full text-gray-300 gap-1 mt-10">
              <label htmlFor="">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="text"
                className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"
              />
            </div>
            <div className="flex flex-col w-full text-gray-300 gap-1 mt-10">
              <label htmlFor="">Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                className="bg-transparent font-Poppins font-semibold text-[12px] px-3 py-2 border rounded-lg border-lime-300"
              />
            </div>
            <p className="font-Poppins w-full text-gray-300 text-sm text-start">
              are you a new player? Register{" "}
              <Link to="/register">
                <a
                  className="underline"
                  // onClick={togglePopUp}
                >
                  here.
                </a>
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-evenly mt-20">
            <button
              type="submit"
              className="bg-lime-300 rounded-lg px-6 py-1 text-regal-blue hover:tracking-widest"
            >
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
        {/* {register ? <RegisterPop toggle={togglePopUp}></RegisterPop> : null} */}
      </div>
    </>
  );
}

export default Login;
