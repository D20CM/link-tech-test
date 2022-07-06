import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Statusbar from "./components/Statusbar/Statusbar";
import Login from "./components/Login/Login";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  function handleUsernameInput(inputString) {
    setUsername(inputString);
    console.log(username);
  }
  function handlePasswordInput(inputString) {
    setPassword(inputString);
    console.log(password);
  }

  async function handleLoginSubmit(username, password) {
    console.log(username, password);
    const response = await fetch(
      "https://interview.intrinsiccloud.net/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          password: password,
          username: username,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    setJwt(data.token);
    const userData = await getUserProfile(data.token);
    console.log("got here");
    setIsLoggedIn(true);
    setUser(userData);
  }

  async function getUserProfile(jwt) {
    if (jwt) {
      const response = await fetch(
        `https://interview.intrinsiccloud.net/profile`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + jwt,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    }
  }

  return (
    <div className="App">
      <div className="pageLeft">
        <Sidebar />
      </div>
      <div className="pageRight">
        <Statusbar imageUrl={imageUrl} user={user} />
        <section className="mainContainer">
          {isLoggedIn ? (
            <Dashboard user={user} jwt={jwt} setImageUrl={setImageUrl} />
          ) : (
            <>
              {" "}
              <Login
                handleUsernameInput={handleUsernameInput}
                handlePasswordInput={handlePasswordInput}
                handleLoginSubmit={handleLoginSubmit}
                username={username}
                password={password}
              />
              {jwt ? <p>{jwt}</p> : <p>no jwt yet</p>}{" "}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
