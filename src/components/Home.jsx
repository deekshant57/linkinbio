import React, { useEffect, useState } from "react";
import { getDocs, where } from "firebase/firestore";
import { db } from "../firebase";

import { collection, query } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Error from "./Error";
let newData;
const key = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "User_Data"),
      where("userName", "==", params.userName)
    );
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const user = [];

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          newData = doc.data();
          user.push({ ...doc.data() });
          console.log(user.length);

          setData([...data, newData]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <div>
      <div>
        {data.length > 0 ? (
          <div className="flex flex-col gap-y-4 px-4 pt-10 h-screen center">
            <div>
              <img className="rounded-full w-14" src={data[0].img} alt="" />
              <h3 className="text-xl font-medium subpixel-antialiased text-slate-800 mt-2 font-Inter">
                {data[0].name}
              </h3>
              <p className="text-sm text-gray-600 mt-0 font-Inter">
                {data[0].role}
              </p>
            </div>
            <h1 className="text-4xl leading-tight mb-4 pb-4 border-b font-Inter font-semibold">
              {data[0].description}
            </h1>
            <ul className="">
              {data[0].links.map((item, index) => {
                return (
                  <li className="" key={index}>
                    <a
                      href={item.url}
                      className="text-xl font-Inter capitalize"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.hostName} &nbsp;
                      <i className="fa-duotone fa-arrow-up-right"></i>
                    </a>
                  </li>
                );
              })}
            </ul>
            <footer className="bg-white lg:text-left fixed bottom-0 my-4">
              <a className="text-gray-800 font-Inter" href="/">
                Create your own &nbsp;
                <i className="fa-duotone fa-arrow-up-right"></i>
              </a>
            </footer>
          </div>
        ) : (
          <Error></Error>
        )}
      </div>
    </div>
  );
};

export { Home, key };
