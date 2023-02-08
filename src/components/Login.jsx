import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase";

const Login = ({ chooseUid }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    const authentication = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signed in
        const user = userCredential.user;

        sessionStorage.setItem(
          "Auth Token",
          userCredential._tokenResponse.refreshToken
        );
        localStorage.setItem(
          "Auth Token",
          userCredential._tokenResponse.refreshToken
        );
        chooseUid(user.uid);
        navigate("/home");
        console.log("user", user.uid);
        console.log("token", sessionStorage.getItem("Auth Token"));
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(error.message);
      });
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-4">
      <div className="p-4 relative md:shadow-md">
        <div className="text-center md:text-left">
          <i className="fa-duotone fa-link text-violet-900 text-8xl my-8 md:text-7xl"></i>
        </div>
        <div className="mt-8">
          <h4 className="text-2xl mt-2 font-Inter font-medium antialiased text-violet-900">
            Login
          </h4>
          <form action="submit" onSubmit={onLogin}>
            <div className="py-2 ">
              <label
                htmlFor="exampleFormControlInput1"
                className="mt-4 form-label inline-block mb-2 text-gray-700"
              >
                Email
              </label>
              <input
                className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="email"
                placeholder="Enter registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="true"
              />
              <label
                htmlFor="exampleFormControlInput1"
                className="mt-4 form-label inline-block mb-2 text-gray-700"
              >
                Password
              </label>
              <input
                className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-full items-center mt-4">
              <button
                className="w-full inline-block px-6 py-2.5 bg-violet-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
                // type="submit"
                // onClick={onLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            to="/signup"
            className="w-full text-center inline-block px-6 py-2.5 text-violet-800 bg-violet-50 text-white font-medium text-xs leading-tight uppercase rounded 
            shadow-md hover:bg-violet-100 hover:shadow-lg focus:bg-violet-100 focus:shadow-lg focus:outline-none 
            focus:ring-0 active:bg-violet-200 active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Sign up
          </Link>
        </div>
      </div>
      <div className="col-span-3 hidden md:block bg-violet-600"></div>
    </div>
  );
};

export default Login;
