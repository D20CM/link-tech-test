import React from "react";
import css from "./statusbar.module.css";

function Statusbar({ imageUrl, imageName, user }) {
  return (
    <div className={css.statusBar}>
      <h1>Link Contacts System</h1>
      <ul className={css.statusBarMenu}>
        <li>help</li>
        {imageUrl && (
          <li>
            <img
              src={imageUrl}
              key={imageName}
              alt="user profile pic"
              className={css.profilePic}
            ></img>
          </li>
        )}
        {user && <li>{user.displayName}</li>}
      </ul>
    </div>
  );
}

export default Statusbar;
