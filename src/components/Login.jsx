import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    console.log("first");
    const authentication = getAuth();
    console.log(authentication);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signed in
        const user = userCredential.user;
        navigate("/");
        sessionStorage.setItem(
          "Auth Token",
          userCredential._tokenResponse.refreshToken
        );
        console.log("user", user);
        console.log("token", sessionStorage.getItem("Auth Token"));
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div>
      <h4 className="text-2xl mt-2 font-Inter font-medium antialiased">
        Login
      </h4>
      <form action="submit" onSubmit={onLogin}>
        <div className="py-2 border-b">
          <p className="text-xs text-slate-500 mt-3">Email</p>
          <input
            className="mt-2 border-2 py-1 px-2 w-6/12"
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-xs text-slate-500 mt-3">Password</p>
          <input
            className="mt-2 border-2 py-1 px-2 w-6/12"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex w-6/12 justify-between items-center">
          <button
            className="mt-3 block bg-gray-700 hover:bg-gray-800 font-medium px-5 py-2 text-white"
            // type="submit"
            // onClick={onLogin}
          >
            Login
          </button>
          <p className="mt-3">
            <Link
              to="/signup"
              className="cursor-pointer font-bold block bg-gray-300 hover:bg-gray-500 font-medium px-5 py-2 text-gray-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
