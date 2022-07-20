import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Statusbar from "./components/Statusbar/Statusbar";
import Login from "./components/Login/Login";
import Contacts from "./components/Contacts/Contacts";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import AddContact from "./components/AddContact/AddContact";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [showContacts, setShowContacts] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  //hasContactsChanged is just a toggle to trigger refresh of contacts and call API again - true or false doesn't matter
  const [hasContactsChanged, setHasContactsChanged] = useState(false);
  const [error, setError] = useState(null);

  function handleUsernameInput(inputString) {
    setUsername(inputString);
    // console.log(username);
  }
  function handlePasswordInput(inputString) {
    setPassword(inputString);
    // console.log(password);
  }

  //remember to take these two fetch functions out (import from /api)

  async function handleLoginSubmit(username, password) {
    console.log(username, password);
    setError(null);
    try {
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
      const status = response.status;
      console.log("Status is: ", status);

      const data = await response.json();
      console.log(data);

      if (status !== 200) {
        let error = new Error();
        error = { message: data.message, status: status };
        throw error;
      }

      setJwt(data.token);
      const userData = await getUserProfile(data.token);
      setIsLoggedIn(true);
      setUser(userData);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  }

  async function getUserProfile(jwt) {
    setError(null);
    try {
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
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  function showBurgerMenu() {
    console.log("show burger menu");
  }

  return (
    <div className="App">
      <div className="pageLeft">
        <Sidebar />
      </div>
      <div className="pageRight">
        <Statusbar
          imageUrl={imageUrl}
          imageName={imageName}
          user={user}
          showBurgerMenu={showBurgerMenu}
        />
        <section className="mainContainer">
          {error && (
            <div className="error">{error.status + ": " + error.message}</div>
          )}
          {isLoggedIn ? (
            <Dashboard
              user={user}
              jwt={jwt}
              setImageUrl={setImageUrl}
              setImageName={setImageName}
              showContacts={showContacts}
              setShowContacts={setShowContacts}
              setShowAddContact={setShowAddContact}
            />
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
              {/* {jwt ? <p>{jwt}</p> : <p>no jwt yet</p>}{" "} */}
            </>
          )}
          {jwt && showContacts && (
            <Contacts
              jwt={jwt}
              showAddContact={showAddContact}
              setShowAddContact={setShowAddContact}
              hasContactsChanged={hasContactsChanged}
              setHasContactsChanged={setHasContactsChanged}
            />
          )}
          {jwt && showAddContact && (
            <AddContact
              jwt={jwt}
              hasContactsChanged={hasContactsChanged}
              setHasContactsChanged={setHasContactsChanged}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
