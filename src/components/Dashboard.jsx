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

const Dashboard = ({ userId, isSignedUp, userData }) => {
  return <div>{userData.clickCount} profile views</div>;
};

export default Dashboard;
