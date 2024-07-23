import "./App.css";
import Dashboard from "./pages/Dashboard";
import poddsitiveLogo from "./assets/poddsitive_icons/dark_with_name.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          style={{ width: "250px", marginBottom: "25px" }}
          src={poddsitiveLogo}
          alt="Poddsitive"
        />
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
