import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import userImg from "../assets/user.jpg";
import { toast } from "react-toastify";

const Edit = ({ userId, userData }) => {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const inputRef = useRef(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const navigate = useNavigate();

  const [inputList, setInputList] = useState(userData);
  console.log(userData);

  // Handle file upload event and update state

  const handleImgClickUpload = () => {
    inputRef.current.click();
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }
    // userID should be used as a reference
    const storageRef = ref(storage, `/User_Images/${inputList.userName}`);
    // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // setImgUrl(url);
          setImgUrl(url);
          // console.log(imgUrl);
          setInputList((prev) => {
            return {
              ...prev,
              img: url,
            };
          });
          // console.log(inputList);
          // console.log(url);
        });
      }
    );
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
    setIsFilePicked(true);
    // console.log(e.target.files);
  };

  const handleDeleteImg = () => {
    setFile("");
  };

  useEffect(() => {
    if (isFilePicked) {
      handleUpload();
    }

    return () => {};
  }, [file]);

  // collecting data from user

  const handleInputChange = (e) => {
    const { name } = e.target;
    // setInputList({ ...inputList, [name]: value });
    console.log(name);
    name === "img"
      ? setInputList((prev) => {
          return {
            ...prev,
            [name]: e.target.files[0],
          };
        })
      : setInputList((prev) => {
          return {
            ...prev,
            [name]: e.target.value,
          };
        });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(inputList);
    try {
      // need to add uid as doc id
      //   await setDoc(doc(db, "User_Data", userId), {
      //     ...inputList,
      //     createdAt: Timestamp.now(),
      //   });

      const docRef = doc(db, "User_Data", userId);
      const updatedData = { ...inputList, updatedaAt: serverTimestamp() };
      await updateDoc(docRef, updatedData);
      toast.success("Updated successfully");
      //   console.log(`${inputList.userName}`);
      navigate(`/${inputList.userName}`);
    } catch (error) {
      console.log(error);
      toast.error("Error:", error);
    }
  };
  return (
    <div className="container max-w-xl m-auto">
      <button onClick={() => navigate("/")} className="hover:underline">
        <i className="fa-duotone fa-arrow-left"></i>&nbsp;Home
      </button>
      <h4 className="text-2xl mt-2 font-Inter font-medium antialiased w-9/12 mx-auto">
        Customise Profile
      </h4>

      <div className="py-2">
        <form action="submit" onSubmit={handleSubmitForm}>
          <p className="text-xs text-slate-500">
            <i className="fa-duotone fa-user"></i>&nbsp;PROFILE PICTURE
          </p>
          <div className="flex justify-content-start py-2 gap-2">
            <img
              className="w-20 rounded-full"
              src={
                file
                  ? URL.createObjectURL(file)
                  : inputList.img
                  ? inputList.img
                  : userImg
              }
              alt="user-Img"
            />
            <div className="flex flex-col justify-center">
              <input
                type="file"
                name="img"
                alt=""
                accept="image/*"
                ref={inputRef}
                onChange={(e) => handleImage(e)}
                hidden
              />
              <button
                onClick={handleImgClickUpload}
                className="font-Inter py-1 text-slate-700"
              >
                <i className="fa-duotone fa-rotate-left"></i>&nbsp;Change
                Picture
              </button>
              <button
                onClick={handleDeleteImg}
                className="font-Inter py-1 text-slate-700"
              >
                <i className="fa-duotone fa-trash"></i>&nbsp;Remove Picture
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            <i className="fa-duotone fa-input-text"></i>&nbsp;DISPLAY NAME
          </p>
          <input
            className="mt-2 border-2 py-1 px-2 w-6/12"
            type="text"
            // defaultValue={userData.name}
            placeholder="Enter name"
            name="name"
            value={inputList.name}
            onChange={handleInputChange}
            required
          />
          <p className="text-xs text-slate-500 mt-2">
            <i className="fa-duotone fa-input-text"></i>&nbsp;USER NAME
          </p>
          <input
            className="mt-2 border-2 py-1 px-2 w-6/12"
            type="text"
            // defaultValue={userData.userName}
            name="userName"
            value={inputList.userName}
            onChange={handleInputChange}
            placeholder="Enter a unique username"
            required
          />
          <p className="text-xs text-slate-500 mt-2">
            <i className="fa-duotone fa-input-text"></i>&nbsp;DESIGNATION
          </p>
          <input
            className="mt-2 border-2 py-1 px-2 w-6/12"
            type="text"
            // defaultValue={userData.role}
            name="role"
            value={inputList.role}
            onChange={handleInputChange}
            placeholder="Ex : Developer/Designer/Influencer"
            required
          />
          <p className="text-xs text-slate-500 mt-2">
            <i className="fa-duotone fa-input-text"></i>&nbsp;BIO
          </p>
          <textarea
            className="mt-2 border-2 py-1 px-2 w-6/12 h-28 d-block"
            // defaultValue={userData.description}
            placeholder="Describe yourself in 140 words"
            name="description"
            value={inputList.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <button className="mt-2 block bg-gray-700 hover:bg-gray-800 font-medium px-4 py-2 text-white">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
