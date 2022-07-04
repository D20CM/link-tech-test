import React from "react";
import css from "./statusbar.module.css";

function Statusbar() {
  return (
    <div className={css.statusBar}>
      <ul>
        <li>help</li>
        <li>profile pic</li>
        <li>username</li>
      </ul>
    </div>
  );
}

export default Statusbar;
