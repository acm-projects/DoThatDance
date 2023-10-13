import React, { useState } from "react";
import { SAMLAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
    <section>
       <nav className="nav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a>|</a>
          </li>
          <li className="active">
            <a href="/Login">Login</a>
          </li>
          <li>
            <a>|</a>
          </li>
          <li>
            <a href="/register">Sign Up</a>
          </li>
        </ul>
      </nav>
      <div className="container1">
      <div className="userIconContainer userIcon">
        {/* <FontAwesomeIcon className="user" icon={faUser} style={{color: "#ffffff",}} /> */}
        <FontAwesomeIcon className="user" icon={faCircleUser} style={{color: "#2B5BB0",}} />
      </div>
      <div className="formDiv">
        <form>
          <div className="input">
            <label className="email" htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type= "email"
              required
              placeholder="Email"
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
              placeholder="Password"
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
    </section>
  );
};

export default Login;