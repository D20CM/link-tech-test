import React from "react";
import css from "./sidebar.module.css";

function Sidebar() {
  return (
    <div className={css.sideMenu}>
      <h2>NOTLINK</h2>
      <ul>
        <li>Dashboard</li>
        <li>Messages</li>
        <li>All Vessels</li>
        <li>Find by Model</li>
        <li>Vendors</li>
        <li>Suppliers</li>
      </ul>
    </div>
  );
}

export default Sidebar;
