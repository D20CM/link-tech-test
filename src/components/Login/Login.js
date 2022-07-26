import { React } from "react";
import css from "./login.module.css";

function Login({
  handleUsernameInput,
  handlePasswordInput,
  handleLoginSubmit,
  username,
  password,
}) {
  // function handleClick() {
  //   try {
  //     handleLoginSubmit(username, password);
  //   } catch (e) {
  //     alert(e);
  //   }
  // }
  return (
    <div className={css.loginContainer}>
      <h3>Please log in</h3>
      <input
        type="text"
        className={css.usernameInput}
        placeholder="Username"
        onChange={(e) => handleUsernameInput(e.target.value)}
      ></input>
      <input
        type="password"
        className={css.passwordInput}
        placeholder="Password"
        onChange={(e) => handlePasswordInput(e.target.value)}
      ></input>
      <button
        className={css.loginButton}
        onClick={() => {
          handleLoginSubmit(username, password);
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
