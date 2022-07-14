import React from "react";
import css from "./sidebar.module.css";
import { AiOutlineContacts, AiOutlineDashboard } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { RiShip2Line, RiTruckLine, RiShoppingCartLine } from "react-icons/ri";
import { GrCatalog } from "react-icons/gr";
import { MdScreenSearchDesktop } from "react-icons/md";

function Sidebar() {
  return (
    <div className={css.sideMenu}>
      <h2>NOTLINK</h2>
      <ul>
        <li>
          <AiOutlineDashboard className={css.menuIcon} />
          Dashboard
        </li>
        <li>
          <AiOutlineContacts className={css.menuIcon} />
          Contacts
        </li>
        <li>
          {" "}
          <BiMessageDetail className={css.menuIcon} />
          Messages
        </li>
        <li>
          {" "}
          <RiShip2Line className={css.menuIcon} />
          All Vessels
        </li>
        <li>
          {" "}
          <MdScreenSearchDesktop className={css.menuIcon} />
          Find by Model
        </li>
        <li>
          {" "}
          <RiShoppingCartLine className={css.menuIcon} />
          Vendors
        </li>
        <li>
          {" "}
          <RiTruckLine className={css.menuIcon} />
          Suppliers
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
