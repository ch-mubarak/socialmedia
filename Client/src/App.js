import "./App.css";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Auth from "./pages/Auth/Auth";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur blur-primary"></div>
      <div className="blur blur-secondary"></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Auth /> : <Navigate to="/home" />}
        />
      </Routes>
    </div>
  );
}

export default App;
