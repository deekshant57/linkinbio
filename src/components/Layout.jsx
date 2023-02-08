import React, { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Edit from "./Edit";
import { Home } from "./Home";

const Layout = ({ userId, isSignedUp, userData }) => {
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
    if (!isSignedUp) {
      navigate("/create");
    }
    return () => {};
  }, [isSignedUp]);

  console.log(isSignedUp);
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-5">
      <Sidebar isSignedUp={isSignedUp} userData={userData}></Sidebar>
      <div className="col-span-4 bg-slate-100">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
