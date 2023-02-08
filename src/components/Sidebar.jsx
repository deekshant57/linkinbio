import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Sidebar = ({ isSignedUp, userData }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        sessionStorage.removeItem("Auth Token");
        localStorage.removeItem("Auth Token");
        console.log(sessionStorage.getItem("Auth Token"));
        toast.success("Logged Out Successfully");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       try {
  //         const q = query(
  //           collection(db, "User_Data"),
  //           where("uid", "==", "hSKxmWNEOVfGUomXWobLm4Lin212")
  //         );

  //         const querySnapshot = await getDocs(q);
  //         querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           console.log(doc.id, " => ", doc.data());
  //           if (doc.data()) {
  //             setIsSignedUp(true);
  //           }
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchUser();
  //     return () => {};
  //   }, []);
  useEffect(() => {
    return () => {};
  }, [isSignedUp]);

  console.log(isSignedUp);
  return (
    <div className="relative md:shadow-md">
      <div className="p-4 text-center md:text-left">
        <i className="fa-duotone fa-link text-violet-900 text-4xl my-2"></i>
      </div>
      <div className="p-4 ">
        <ul className="relative">
          <li className="relative">
            <Link
              to="/home"
              className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/edit"
              className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Edit Profile
            </Link>
          </li>
          <li className="relative">
            <Link
              to={`${userData.userName}`}
              className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              View Profile
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/links"
              className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Customise Links
            </Link>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 ">
        <button
          className="w-full inline-block px-6 py-2.5 bg-violet-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={handleLogout}
        >
          Signout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
