import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

const Links = ({ userId, userData }) => {
  const navigate = useNavigate();

  const [inputList, setInputList] = useState([
    {
      hostName: "",
      url: "",
      clickCount: 0,
    },
  ]);

  const [isDisabled, setIsDisabled] = useState(false);

  const handleListAdd = () => {
    setInputList([
      ...inputList,
      {
        hostName: "",
        url: "",
        clickCount: 0,
      },
    ]);
    console.log("Clicked");
  };

  const handleRemoveItem = (index) => {
    const newList = [...inputList];
    console.log("before", newList);
    newList.splice(index, 1);
    console.log(newList);
    setInputList(newList);
  };

  const handleInputChange = (e, index) => {
    const { name } = e.target;
    let value = e.target.value;
    const newInputList = [...inputList];
    newInputList.forEach((item, i) => {
      if (index === i) {
        console.log(item[name]);
        item[name] = value;
      }
    });
    setInputList(newInputList);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log("Submit Clicked");
    // const newLinks = inputList.map((item) => [...link, item.input]);
    console.log(inputList);
    try {
      const docRef = doc(db, "User_Data", userId);
      await updateDoc(docRef, { links: inputList });
      toast.success("Updated successfully");
      navigate(`/${userData.userName}`);
    } catch (error) {
      console.log(error);
      toast.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log(inputList);
    if (inputList.length > 0) {
      inputList[inputList.length - 1].hostName === "" &&
      inputList[inputList.length - 1].url === ""
        ? setIsDisabled(true)
        : setIsDisabled(false);
    } else {
      console.log(true);
      setIsDisabled(false);
    }
  }, [inputList]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(userId);
        const docRef = doc(db, "User_Data", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          if (docSnap.data().links.length > 0) {
            setInputList(docSnap.data().links);
          }
          console.log("Document data:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          // const updatedData = { ...inputList, updatedaAt: serverTimestamp() };
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <div>
      <div onClick={() => navigate("/")} className="hover:underline">
        <i className="fa-duotone fa-arrow-left"></i>&nbsp;Home
      </div>
      <h4 className="text-2xl mt-2 font-Inter font-medium antialiased">
        Customise Links
      </h4>
      <form action="submit" onSubmit={handleSubmitForm}>
        <div className="py-2 border-b">
          <p className="text-xs text-slate-500 mt-3">DISPLAY TEXT</p>
          {inputList.map((input, index) => {
            return (
              <div key={index}>
                <input
                  className="mt-2 border-2 py-1 px-2 w-6/12"
                  type="text"
                  name="hostName"
                  value={input.hostName}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Enter host name"
                  required
                />
                <p className="text-xs text-slate-500 mt-3">URL</p>
                <input
                  className="mt-2 border-2 py-1 px-2 w-6/12"
                  name="url"
                  type="url"
                  value={input.url}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Enter your profile url"
                  required
                />
                <a
                  href={`${input.url}`}
                  className="ml-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-duotone fa-arrow-up-right"></i>
                </a>
                <div className="flex justify-between w-6/12">
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="block mt-3 text-slate-500"
                  >
                    <i className="fa-duotone fa-trash"></i>&nbsp;Delete this
                    link
                  </button>
                  <button
                    onClick={handleListAdd}
                    disabled={isDisabled}
                    className="block mt-3 text-slate-500"
                  >
                    <i className="fa-duotone fa-add"></i>&nbsp;Add more links
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button className="mt-3 block bg-gray-700 hover:bg-gray-800 font-medium px-5 py-2 text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Links;
