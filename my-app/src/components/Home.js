import React, { useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc} from "firebase/firestore";

const Home = () => {

  const [videoLink, setVideoLink] = useState("");
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const user = auth.currentUser;


  const handleLogout = async () => {
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

  const handleYoutubeLink = async (id, link) => {
      inputRef.current.value = "";
      if(link == null) {
        console.log("Please enter a Youtube Link");
      } else if(auth.currentUser) {
        // retrieve existing history
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);
        const history = userDoc.data().history;

        // Add Youtube Link to database
        await updateDoc(doc(db, "users", id), { history: [...history, link] });
      }
  }

  const userNotLoggedIn = () => {
      // Temporary message, need to replace later with actual action
      console.log("Please login to add Youtube Link");
  }


  return (
    <>
      <nav className = "nav">
        {/* <div className="logo">
              <img src="logo.png"/>
          </div> */}
          <ul>
            <li className="active">
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <a>|</a>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <a>|</a>
            </li>
            <li>
              <NavLink to="/register">Sign Up</NavLink>
            </li>
          </ul>
        { /*<div>
          <button onClick={handleLogout}>Logout</button>
          </div> */}
      </nav>
      <div className="body">
          <div className="container">
            <div className="title">
              <h1>Welcome to DoThatDance!</h1>
            </div>
            <h2>Your personal dance assistant</h2>
            <input 
            id="youtube-link"
            name="youtube-link"
            type="url" 
            placeholder="Youtube Link" 
            required
            ref={inputRef}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <button 
          className = "go"
          onClick={!user ? userNotLoggedIn : () => handleYoutubeLink(user.uid, videoLink)}>
            Submit
          </button>
          </div>
      </div>
    </>
  );
};

export default Home;