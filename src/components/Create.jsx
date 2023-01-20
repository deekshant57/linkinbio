import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Create = () => {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [userName, setUserName] = useState("himvais");

  const [inputList, setInputList] = useState({
    // uuid : "", (need to add later)
    userName: "",
    name: "",
    role: "",
    img: "",
    description: "",
    links: [],
  });

  // Handle file upload event and update state

  const handleImage = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files);
  };
  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }
    const storageRef = ref(storage, `/${userName}/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
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
          console.log(url);
        });
      }
    );
  };

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
            // [name]: e.target.value,
          };
        });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // console.log("CLicked");
    console.log(inputList);
    try {
      await addDoc(collection(db, "links"), {
        ...inputList,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container max-w-xl m-auto">
      <a href="/">
        <i className="fa-duotone fa-arrow-left"></i>&nbsp;Home
      </a>
      <h4 className="text-2xl mt-2 font-Inter font-medium antialiased">
        Customise Profile
      </h4>

      <div className="py-2">
        <p className="text-xs text-slate-500">
          <i className="fa-duotone fa-user"></i>&nbsp;PROFILE PICTURE
        </p>
        <div className="flex justify-content-start py-2 gap-2">
          <img className="w-20 fa-solid fa-star" src="img.png" alt="" />
          <div className="flex flex-col justify-center">
            <a href="/" className="font-Inter py-1 text-slate-700">
              <i className="fa-duotone fa-rotate-left"></i>&nbsp;Change Picture
            </a>
            <a href="#" className="font-Inter py-1 text-slate-700">
              <i className="fa-duotone fa-trash"></i>&nbsp;Remove Picture
            </a>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          <i className="fa-duotone fa-input-text"></i>&nbsp;DISPLAY NAME
        </p>
        <input
          className="mt-2 border-2 py-1 px-2 w-6/12"
          type="text"
          value="Himanshu Vaishnav"
        />
        <p className="text-xs text-slate-500 mt-2">
          <i className="fa-duotone fa-input-text"></i>&nbsp;USER NAME
        </p>
        <input
          className="mt-2 border-2 py-1 px-2 w-6/12"
          type="text"
          value="Himvais"
        />
        <p className="text-xs text-slate-500 mt-2">
          <i className="fa-duotone fa-input-text"></i>&nbsp;DESIGNATION
        </p>
        <input
          className="mt-2 border-2 py-1 px-2 w-6/12"
          type="text"
          value="Digital Product Designer"
        />
        <p className="text-xs text-slate-500 mt-2">
          <i className="fa-duotone fa-input-text"></i>&nbsp;BIO
        </p>
        <textarea className="mt-2 border-2 py-1 px-2 w-6/12 h-28 d-block">
          A digital product designer from India, leading design at ERM and
          building practical design systems for sustainability software. it
          needs to .
        </textarea>
        <button className="mt-2 block bg-gray-700 hover:bg-gray-800 font-medium px-4 py-2 text-white">
          Save
        </button>
      </div>

      <form
        action="submit"
        className=" flex flex-col"
        onSubmit={handleSubmitForm}
      >
        <div>
          <label htmlFor="UserName">Username</label>
          <input
            type="text"
            name="userName"
            value={inputList.userName}
            className="border-solid border-2 rounded"
            placeholder="Username must be unique"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            name="name"
            value={inputList.name}
            className="border-solid border-2 rounded"
            placeholder="Enter your name"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ProfilePic">Profile Picture</label>
          <input
            type="file"
            name="img"
            accept="/image/*"
            className="border-solid border-2 rounded"
            placeholder="Upload an image"
            // value={inputList.img}
            onChange={handleImage}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
        <div>{percent} %</div>
        <div>
          <label htmlFor="Role">Role</label>
          <input
            type="text"
            name="role"
            className="border-solid border-2 rounded"
            placeholder="Your role. ex : Develover/Designer"
            value={inputList.role}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            name="description"
            className="border-solid border-2 rounded"
            placeholder="Brief about you in 140 words"
            value={inputList.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="link">link1</label>
          <input
            type="text"
            name="links"
            className="border-solid border-2 rounded"
            placeholder="social connect link"
            value={inputList.links}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Create;
