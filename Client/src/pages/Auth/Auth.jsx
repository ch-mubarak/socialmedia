import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";

const Auth = () => {
  return (
    <div className="auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webName">
          <h1>Hashtag</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* <Signup /> */}
      <Login />
    </div>
  );
};

function Signup() {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Sign up</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastName"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="username"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="infoInput"
          />
          <input
            type="text"
            name="confirmedPassword"
            className="infoInput"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <span style={{ fontSize: "12px" }}>
            Already have an account?. Login
          </span>
          <button className="button info-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

function Login() {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Login</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="username"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="infoInput"
          />
        </div>
        <div>
          <span style={{ fontSize: "12px" }}>
            Don't have an account?. Sign up
          </span>
        <button className="button info-button">Submit</button>
        </div>
      </form>
    </div>
  );
}
export default Auth;
