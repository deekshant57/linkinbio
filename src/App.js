import { onAuthStateChanged, signOut } from "firebase/auth";
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
import Protected from "./utils/Protected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const chooseUid = (id) => {
    setUserId(id);
    setIsLoggedIn(true);
    // fetchUser();
  };
  //to see if user is logged in
  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     const uid = user.uid;
    //     console.log(uid);
    //     // setUserId(uid);
    //     setIsLoggedIn(true);
    //     fetchUser();
    //   } else {
    //     // navigate("/login");
    //     console.log("User is logged out");
    //   }
    // });
    let authToken = sessionStorage.getItem("Auth Token");
    // checking auth token from localStorage to keep the session persistent
    let authTokenLS = localStorage.getItem("Auth Token");
    console.log(authToken);
    console.log("userid", userId);

    if ((authToken, authTokenLS)) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid);
          setUserId(uid);
          // setIsLoggedIn(true);
          // fetchUser();
        } else {
          // navigate("/login");
          console.log("User is logged out");
        }
      });
      setIsLoggedIn(true);
      fetchUser();
      // navigate("/");
    }
  }, [isLoggedIn, userId, isSignedUp]);

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
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Dashboard
                isSignedUp={isSignedUp}
                userData={userData}
              ></Dashboard>
            </Protected>
          }
        ></Route>
        <Route
          path="/login"
          element={<Login chooseUid={chooseUid}></Login>}
        ></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route
          path="/edit"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Edit userId={userId} userData={userData}></Edit>
            </Protected>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Create userId={userId}></Create>
            </Protected>
          }
        ></Route>
        <Route
          path="/links"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Links userId={userId} userData={userData}></Links>
            </Protected>
          }
        ></Route>
        <Route path=":userName" element={<Home></Home>}></Route>
        <Route path="*" element={<Login chooseUid={chooseUid}></Login>}></Route>
        <Route path="/error" element={<Error></Error>}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </div>
  );
}

export default App;
