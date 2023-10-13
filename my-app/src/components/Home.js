import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/Login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <>
        <nav className = "nav">
          {/* <div className="logo">
              <img src="logo.png"/>
          </div> */}
          <ul>
            <li className="active">
              <a href="/">Home</a>
            </li>
            <li>
              <a>|</a>
            </li>
            <li>
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
      <div className="body">
      <div className="container">
        <div className="title">
          <h1>Welcome to DoThatDance!</h1>
        </div>
        <h2>Your personal dance assistant</h2>
        <input placeholder="ENTER YOUTUBE LINK HERE"/>
        <button className="go">Go</button>
      </div>
      </div>
      {/* <div>
          <button onClick={handleLogout}>Logout</button>
      </div> */}
    </>
  );
};

export default Home;