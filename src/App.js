import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Statusbar from "./components/Statusbar/Statusbar";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <div className="pageLeft">
        <Sidebar />
      </div>
      <div className="pageRight">
        <Statusbar />
        <section className="mainContainer">
          <Login />
        </section>
      </div>
    </div>
  );
}

export default App;
