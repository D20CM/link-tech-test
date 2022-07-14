import css from "./dashboard.module.css";
import { React, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

function Dashboard({
  user,
  jwt,
  setImageUrl,
  showContacts,
  setShowContacts,
  setShowAddContact,
}) {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isImageEditDisplayed, setIsImageEditDisplayed] = useState(false);
  const [newProfileUrl, setNewProfileUrl] = useState("");

  function handleClick() {
    console.log("Clickety-click");
    setIsImageEditDisplayed(!isImageEditDisplayed);
  }

  useEffect(() => {
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
        console.log("This should be the image: ", data);
        setProfileImageUrl(data);
        setImageUrl(data);
        return data;
      }
    }
    //id should be returned in user object, but it's returning null, so this is hardcoded for now
    getUserProfileImage(jwt, 2);
  }, [jwt]);

  function handleSubmitImageUrl() {
    console.log("New profile URL will be: ", newProfileUrl);
    setNewProfileUrl("");
    //send post request to profile/profileImage here
    //will need to construct request and file upload with fs
  }

  function handleChangeUrl(url) {
    setNewProfileUrl(url);
    console.log(url);
  }

  return (
    <div className={css.dashboardContainer}>
      {profileImageUrl && (
        <div className={css.photoArea}>
          <img
            src={profileImageUrl}
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
            <>
              <input
                type="text"
                placeholder="enter new image url"
                value={newProfileUrl}
                onChange={(e) => handleChangeUrl(e.target.value)}
              ></input>
              <button onClick={() => handleSubmitImageUrl()}>Submit</button>
            </>
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
