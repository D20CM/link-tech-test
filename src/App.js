import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Statusbar from "./components/Statusbar/Statusbar";
import Login from "./components/Login/Login";
import Contacts from "./components/Contacts/Contacts";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import AddContact from "./components/AddContact/AddContact";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";

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
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  function handleUsernameInput(inputString) {
    setUsername(inputString);
  }
  function handlePasswordInput(inputString) {
    setPassword(inputString);
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

      if (!response.ok) {
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
    setIsBurgerOpen(true);
  }

  function closeBurgerMenu() {
    console.log("close burger menu");
    setIsBurgerOpen(false);
  }

  return (
    <div className="App">
      {isBurgerOpen ? <BurgerMenu closeBurgerMenu={closeBurgerMenu} /> : null}
      <div className="pageLeft">
        <Sidebar />
      </div>
      <div className="pageRight">
        <Statusbar
          imageUrl={imageUrl}
          imageName={imageName}
          user={user}
          showBurgerMenu={showBurgerMenu}
          closeBurgerMenu={closeBurgerMenu}
          isBurgerOpen={isBurgerOpen}
        />
        <section className="mainContainer">
          {error && (
            <div className="error">
              <button onClick={() => setError(null)}>Dismiss</button>
              <h3>Sorry, we've encountered an error!</h3>
              {error.status + ": " + error.message}
            </div>
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
              showChangePassword={showChangePassword}
              setShowChangePassword={setShowChangePassword}
              setError={setError}
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
            </>
          )}
          {jwt && showContacts && (
            <Contacts
              jwt={jwt}
              setShowContacts={setShowContacts}
              showAddContact={showAddContact}
              setShowAddContact={setShowAddContact}
              hasContactsChanged={hasContactsChanged}
              setHasContactsChanged={setHasContactsChanged}
              setError={setError}
            />
          )}
          {jwt && showAddContact && (
            <AddContact
              jwt={jwt}
              hasContactsChanged={hasContactsChanged}
              setHasContactsChanged={setHasContactsChanged}
              setShowAddContact={setShowAddContact}
              setError={setError}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
