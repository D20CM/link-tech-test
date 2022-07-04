import { React, useState } from "react";
import css from "./login.module.css";

function Login() {
  const { username, setUsername } = useState("Username");
  const { password, setPassword } = useState("Password");

  return (
    <div className={css.loginContainer}>
      <h3>Please log in</h3>
      <input
        type="text"
        className={css.usernameInput}
        placeholder="Username"
        value={username}
      ></input>
      <input
        type="text"
        className={css.passwordInput}
        placeholder="Password"
        value={password}
      ></input>
      <button className={css.loginButton}>Login</button>
    </div>
  );
}

export default Login;
