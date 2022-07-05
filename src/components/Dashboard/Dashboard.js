import css from "./dashboard.module.css";

import React from "react";

function Dashboard({ user }) {
  return (
    <div className={css.dashboardContainer}>
      <h2>{user.displayName}</h2>
      <p>{user.emailAddress}</p>
    </div>
  );
}

export default Dashboard;
