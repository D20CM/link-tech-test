import css from "./editProfilePicture.module.css";
import { React, useState, useEffect } from "react";
import { changeProfileImage } from "../../api/profile";

function EditProfilePicture({
  jwt,
  newProfileFile,
  setNewProfileFile,
  imageName,
  setImageName,
  newImageName,
  setNewImageName,
  getUserProfileImage,
}) {
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    getUserProfileImage(jwt, 2);
  }, [changed, jwt]);

  async function handleSubmitImageFile() {
    //send post request to profile/profileImage here

    console.log("Current value of file is: ", newProfileFile);

    const formData = new FormData();
    formData.append("file", newProfileFile);

    console.log(jwt);
    console.log(formData);

    const changedPicture = await changeProfileImage(jwt, formData);
    setImageName(newProfileFile.name);
    setNewImageName(newProfileFile.name);
    console.log("new image name: ", imageName);
    console.log("is it changed?  ", changedPicture);
    setChanged(!changed);

    // setNewProfileFile("");
  }

  function handleChangeFile(someFile) {
    console.log("someFile: ", someFile);
    setNewProfileFile(someFile);
  }

  return (
    <div className={css.EditProfilePicture}>
      <h2>Change Profile Image</h2>
      <input
        type="file"
        className={css.fileInput}
        onChange={(e) => handleChangeFile(e.target.files[0])}
      ></input>
      <button onClick={() => handleSubmitImageFile()}>Upload</button>
    </div>
  );
}

export default EditProfilePicture;
