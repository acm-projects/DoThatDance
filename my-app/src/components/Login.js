import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import {RiUser6Line} from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
        console.log("Login Successful");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
       <nav className="nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="active">
            <NavLink to="/Login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
      <div className="container1">
        <div className="iconGradient"></div>
        <RiUser6Line className="user"></RiUser6Line>
      <div className="formDiv">
        <form>
          <div className="input">
            <label className="email" htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type= "email"
              required
              // placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              // placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="centerButton">
          <button className="login" onClick={onLogin}>Login</button>
          </div>
        </form>
        <p class="backToSignUp">
          Need An Account? <NavLink to="/register">SIGN UP</NavLink>
        </p>
      </div> 
      </div>
    </>
  );
};

export default Login;