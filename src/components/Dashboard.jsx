import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = ({ isSignedUp }) => {
  //   const [isSignedUp, setIsSignedUp] = useState(false);
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

  console.log(isSignedUp);

  return (
    <div>
      {isSignedUp ? (
        <div>
          <Link to="/edit">Edit Profile</Link>
          <Link to="/links">Customise Links</Link>
        </div>
      ) : (
        <Link to="/create">Create Profile</Link>
      )}
    </div>
  );
};

export default Dashboard;
