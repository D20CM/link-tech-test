import React from "react";
import css from "./statusbar.module.css";

function Statusbar({ imageUrl, user }) {
  return (
    <div className={css.statusBar}>
      <ul>
        <li>help</li>
        {imageUrl && (
          <li>
            <img
              src={imageUrl}
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
