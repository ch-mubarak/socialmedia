import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordMatching, setPasswordMatching] = useState(true);
  // const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const handleChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (data.confirmedPassword !== data.password) {
        return setPasswordMatching(false);
      }
      // dispatch(signUp(data));
    } else {
      // dispatch(logIn(data));
    }
  };

  const resetForm = () => {
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
        <img src={Logo} alt="" />
        <div className="webName">
          <h1>Hashtag</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      <div className="a-right">
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

            <button className="button info-button">
              {isSignUp ? "Sign up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
