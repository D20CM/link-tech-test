import css from "./editProfilePicture.module.css";
import { React, useState } from "react";
import { changeProfileImage } from "../../api/profile";

function EditProfilePicture({ jwt, newProfileFile, setNewProfileFile }) {
  async function handleSubmitImageFile() {
    //send post request to profile/profileImage here

    console.log("Current value of file is: ", newProfileFile);

    const formData = new FormData();
    formData.append("file", newProfileFile);

    console.log(jwt);
    console.log(formData);

    const changedPicture = await changeProfileImage(jwt, formData);
    console.log("is it changed?  ", changedPicture);
  }

  function handleChangeFile(someFile) {
    setNewProfileFile(someFile);
  }

  return (
    <>
      <input
        type="file"
        onChange={(e) => handleChangeFile(e.target.files[0])}
      ></input>
      <button onClick={() => handleSubmitImageFile()}>Upload</button>
    </>
  );
}

export default EditProfilePicture;
