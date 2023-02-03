import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Signed In
        const user = userCredential.user;
        console.log(user);
        console.log(user.uid);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div>
      <h4 className="text-2xl mt-2 font-Inter font-medium antialiased">
        Signup
      </h4>
      <form action="submit" onSubmit={onSubmit}>
        <div className="py-2 border-b">
          <p className="text-xs text-slate-500 mt-3">Email</p>
          <input
            className="mt-2 border-2 py-1 px-2 w-6/12"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <p className="text-xs text-slate-500 mt-3">Password</p>
          <input
            className="mt-2 border-2 py-1 px-2 w-6/12"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="flex w-6/12 justify-between items-center">
          <button
            className="mt-3 block bg-gray-700 hover:bg-gray-800 font-medium px-5 py-2 text-white"
            type="submit"
            // onClick={onSubmit}
          >
            Signup
          </button>
          <p className="text-sm text-center mt-3">
            <Link
              to="/login"
              className="cursor-pointer text-gray-800 font-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
