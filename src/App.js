import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Create from "./components/CreateProfile";
import Dashboard from "./components/Dashboard";
import Edit from "./components/Edit";
import Error from "./components/Error";
import { Home } from "./components/Home";
import Links from "./components/Links";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { auth, db } from "./firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isSignedUp, setIsSignedUp] = useState(false);
  // const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  //to see if user is logged in
  useEffect(() => {
    // console.log(params);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setUserId(uid);
        setIsLoggedIn(true);
        // fetchUser();
        if (!params.userName) {
          // navigate("/");
        }
      } else {
        navigate("/login");
        console.log("User is logged out");
      }
    });
  }, [isLoggedIn]);

  const fetchUser = async () => {
    try {
      const docRef = doc(db, "User_Data", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setIsSignedUp(true);
        setUserData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App container max-w-xl m-auto">
      <Routes>
        <Route
          path="/"
          element={<Dashboard isSignedUp={isSignedUp}></Dashboard>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route
          path="/edit"
          element={<Edit userId={userId} userData={userData}></Edit>}
        ></Route>
        <Route
          path="/create"
          element={<Create userId={userId}></Create>}
        ></Route>
        <Route path="/links" element={<Links userId={userId}></Links>}></Route>
        <Route path=":userName" element={<Home></Home>}></Route>
        <Route path="/*" element={<Error></Error>}></Route>
        <Route path="/error" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
