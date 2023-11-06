import React, { useState } from "react";
import { SAMLAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { RiUser6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Authentication from "./Authentication";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  const buttonStyle = {
    transform: isHovered ? 'scale(1.01)' : 'scale(1)',
    backgroundColor: isHovered ? 'rgba(65, 0, 210, .60)' : 'rgba(65, 0, 251, 0.55)',
    transition: 'transform 0.3s ease',
  };


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
          <Authentication />
        </ul>
        { /*<div>
          <button onClick={handleLogout}>Logout</button>
          </div> */}
      </nav>
      <div className="container1 fade-in">
        <div className="iconGradient"></div>
        <RiUser6Line className="user"></RiUser6Line>
        <div className="formDiv">
          <form>
            <div className="input">
              <label className="email" htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="centerButton">
              <button onMouseLeave={handleHover}
                onClick={onLogin}
                onMouseEnter={handleHover} style={buttonStyle} className="login"
              >Login</button>
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