import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";

const Dashboard = ({ userId, isSignedUp, userData }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        sessionStorage.removeItem("Auth Token");
        localStorage.removeItem("Auth Token");
        console.log(sessionStorage.getItem("Auth Token"));
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
    <div>
      {isSignedUp ? (
        <div className="flex flex-col">
          <div>{userData.clickCount} profile views</div>
          <Link to="/edit">Edit Profile</Link>
          <Link to="/links">Customise Links</Link>
          <Link to={`${userData.userName}`} target="_blank">
            View Profile
          </Link>
          <button onClick={handleLogout}>Signout</button>
        </div>
      ) : (
        navigate("/create")
      )}
    </div>
  );
};

export default Dashboard;
