import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordMatching, setPasswordMatching] = useState(true);
  const dispatch = useDispatch();
  const { loading, message } = useSelector((state) => state.authReducer);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const handleChange = (e) => {
    dispatch({ type: "RESET" });
    const name = e.target.name;
    const value = e.target.value;
    setPasswordMatching(true);
    setData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (data.confirmedPassword !== data.password) {
        return setPasswordMatching(false);
      }
      dispatch(signUp(data));
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET" });
    setData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
    });
    setPasswordMatching(true);
  };
  return (
    <div className="auth">
      <div className="a-left">
        <img src={Logo} alt="logo" />
        <div className="webName">
          <h1>Hashtag</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      <div className="a-right">
        <div className="">
          <form className="infoForm authForm" onSubmit={handleSubmit}>
            <h3>{isSignUp ? "Sign up" : "Sign In"}</h3>
            {isSignUp && (
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                />
              </div>
            )}
            {isSignUp && (
              <div>
                <input
                  type="email"
                  className="infoInput"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </div>
            )}
            <div>
              <input
                type="text"
                className="infoInput"
                name="username"
                placeholder="username"
                onChange={handleChange}
                value={data.username}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="infoInput"
                onChange={handleChange}
                value={data.password}
              />
              {isSignUp && (
                <input
                  type="password"
                  name="confirmedPassword"
                  className="infoInput"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={data.confirmedPassword}
                />
              )}
            </div>
            {!passwordMatching && (
              <span className="validation">* Password not matching *</span>
            )}
            <div>
              <span
                style={{ fontSize: "12px", cursor: "pointer" }}
                onClick={() => {
                  setIsSignUp((pre) => !pre);
                  resetForm();
                }}
              >
                {isSignUp
                  ? "Already have an account?. Sign in"
                  : "Don't have an account?. Sign up"}
              </span>

              <button disabled={loading} className="button info-button">
                {loading ? "Loading..." : isSignUp ? "Sign up" : "Login"}
              </button>
            </div>
          </form>
        </div>
        {message && (
          <Alert
            message={message}
            handleCloseAlert={() => dispatch({ type: "RESET" })}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
