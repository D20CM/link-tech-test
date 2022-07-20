import css from "./dashboard.module.css";
import { React, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import EditProfilePicture from "../EditProfilePicture/EditProfilePicture";

function Dashboard({
  user,
  jwt,
  setImageUrl,
  setImageName,
  showContacts,
  setShowContacts,
  setShowAddContact,
}) {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isImageEditDisplayed, setIsImageEditDisplayed] = useState(false);
  const [newProfileFile, setNewProfileFile] = useState("");
  const [newImageName, setNewImageName] = useState("");

  function handleClick() {
    console.log("Clickety-click");
    setIsImageEditDisplayed(!isImageEditDisplayed);
  }

  async function getUserProfileImage(jwt, id) {
    if (jwt) {
      const response = await fetch(
        `https://interview.intrinsiccloud.net/profile/profileImage/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      const data = response.url;
      const status = response.status;
      console.log(status);
      console.log("This should be the image: ", data);
      // setProfileImageUrl("");
      setProfileImageUrl(data);
      setImageUrl(data);
      return data;
    }
  }

  useEffect(() => {
    //id should be returned in user object, but it's returning null, so this is hardcoded for now
    getUserProfileImage(jwt, 2);
  }, [jwt, newProfileFile]);

  return (
    <div className={css.dashboardContainer}>
      {profileImageUrl && (
        <div className={css.photoArea}>
          <img
            src={profileImageUrl}
            key={newImageName}
            alt="userProfileImage"
            className={css.profileImage}
          ></img>
          {/* will need to render close button if edit is open */}
          <button
            className={css.changeProfileImageButton}
            onClick={() => handleClick()}
          >
            <FiEdit className={css.editImageIcon} />
          </button>

          {isImageEditDisplayed && (
            <EditProfilePicture
              newImageName={newImageName}
              setNewImageName={setNewImageName}
              setImageName={setImageName}
              getUserProfileImage={getUserProfileImage}
              jwt={jwt}
              newProfileFile={newProfileFile}
              setNewProfileFile={setNewProfileFile}
            />
          )}
        </div>
      )}
      <div>
        <h2>{user.displayName}</h2>
        <p>{user.emailAddress}</p>
        <button
          onClick={() => {
            setShowContacts(!showContacts);
            setShowAddContact(false);
          }}
          className={css.contactsButton}
        >
          Show/Hide Contacts
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
