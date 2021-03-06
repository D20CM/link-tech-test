import React from "react";
import css from "./statusbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiHelpCircle } from "react-icons/bi";

function Statusbar({
  imageUrl,
  imageName,
  user,
  showBurgerMenu,
  closeBurgerMenu,
  isBurgerOpen,
}) {
  function handleBurger() {
    isBurgerOpen ? closeBurgerMenu() : showBurgerMenu();
  }

  return (
    <div className={css.statusBar}>
      <h1>Link Contacts System</h1>
      <ul className={css.statusBarMenu}>
        <li className={css.burgerMenu}>
          <GiHamburgerMenu onClick={handleBurger} className={css.burgerIcon} />
        </li>
        <li>
          <a
            href="https://interview.intrinsiccloud.net/swagger-ui/#/"
            alt="swagger-docs"
          >
            <BiHelpCircle className={css.helpIcon} />
          </a>
        </li>
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
        {user && (
          <li>
            <b>{user.displayName}</b>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Statusbar;
