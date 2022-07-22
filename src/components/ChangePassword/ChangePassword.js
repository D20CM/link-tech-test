import { React, useState } from "react";
import css from "./changePassword.module.css";
import { changePassword } from "../../api/profile";

function ChangePassword({ jwt }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleInput(callback, e) {
    callback(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    //call api here via imported function
    if (newPassword !== confirmPassword) {
      alert("Please check your new password and try again");
    } else {
      const passwordInfo = {
        newPassword: newPassword,
        oldPassword: oldPassword,
      };
      const changedPassword = await changePassword(jwt, passwordInfo);
      console.log(changedPassword);
      //confirm password changed
      alert(changedPassword.message);
      // console.log(passwordInfo);
    }

    //close box
  }

  return (
    <form className={css.changePasswordForm}>
      <h2>Change Password</h2>
      <input
        placeholder="Old Password"
        onChange={(e) => {
          handleInput(setOldPassword, e);
        }}
        value={oldPassword}
      ></input>
      <input
        placeholder="New Password"
        onChange={(e) => {
          handleInput(setNewPassword, e);
        }}
        value={newPassword}
      ></input>
      <input
        placeholder="Confirm New Password"
        onChange={(e) => {
          handleInput(setConfirmPassword, e);
        }}
        value={confirmPassword}
      ></input>
      <input
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={css.passwordSubmitButton}
      ></input>
    </form>
  );
}

export default ChangePassword;
