import "./App.css";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
function App() {
  return (
    <div className="App">
      <div className="blur blur-primary"></div>
      <div className="blur blur-secondary"></div>
      {/* <Home /> */}
      <Profile />
    </div>
  );
}

export default App;
