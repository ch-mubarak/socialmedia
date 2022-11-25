import "./App.css";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Auth from "./pages/Auth/Auth";
function App() {
  return (
    <div className="App">
      <div className="blur blur-primary"></div>
      <div className="blur blur-secondary"></div>
      {/* <Home /> */}
      <Profile />
      {/* <Auth /> */}
    </div>
  );
}

export default App;
