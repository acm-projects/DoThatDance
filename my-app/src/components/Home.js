import React, { useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc} from "firebase/firestore";
import pngeggnew from '../pngeggnew.png';
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
          <ul>
            <li className="active">
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Sign Up</NavLink>
            </li>
          </ul>
        { /*<div>
          <button onClick={handleLogout}>Logout</button>
          </div> */}
      </nav>
      <img className="design" src={pngeggnew}/>
      <div className="body">
          <div className="container">
            <h1>Welcome to DoThatDance!</h1>
            <h2>Your personal dance assistant</h2>
            <div className="link">
            <input 
            id="youtube-link"
            name="youtube-link"
            type="url" 
            placeholder="ENTER YOUTUBE LINK HERE" 
            required
            ref={inputRef}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <div className="goDiv">
          <button 
          className = "go"
          onClick={!user ? userNotLoggedIn : () => handleYoutubeLink(user.uid, videoLink)}>
            Go
          </button>
          </div>
          </div>
          </div>
      </div>
    </>
  );
};

export default Home;