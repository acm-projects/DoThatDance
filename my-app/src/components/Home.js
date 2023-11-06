import React, { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import pngeggnew from '../pngeggnew.png';
import { useSpring } from 'react-spring';
import Authentication from "./Authentication";
const Home = () => {

  const [videoLink, setVideoLink] = useState("");
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const user = auth.currentUser;


  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const [isActive, setIsActive] = useState(false);

  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
  };


  const buttonStyle = {
    transform: isHovered ? 'scale(1.01)' : 'scale(1)',
    backgroundColor: isHovered ? 'rgba(65, 0, 210, .60)' : 'rgba(65, 0, 251, 0.55)',
    transition: 'transform 0.3s ease',
  };

  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const handleHoverLink = () => {
    setIsHoveredLink(!isHoveredLink);
  };
  const buttonStyleLink = {
    transform: isHoveredLink ? 'scale(1.005)' : 'scale(1)',
    transition: 'transform 0.3s ease',
  };



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
    if (link == null) {
      console.log("Please enter a Youtube Link");
    } else if (auth.currentUser) {
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
      <nav className="nav">
        <ul>
          <li className="active">
            <NavLink to="/">Home</NavLink>
          </li>
          <Authentication />
        </ul>
      </nav>
      <img className="design fade-in" src={pngeggnew} />
      <div className={isActive ? 'slideTitle body' : 'body fade-in'}>
        <div className="container">
          <h1>Welcome to DoThatDance!</h1>
          <h2>Your personal dance assistant</h2>
          <div className={isActive ? 'slide' : 'mover'}>
            <input
              id="youtube-link"
              name="youtube-link"
              type="url"
              placeholder="ENTER YOUTUBE LINK HERE"
              required
              ref={inputRef}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            <div>
              <div className="goDiv">
                <button style={buttonStyle}
                  className="go"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHover}
                  onClick={!user ? userNotLoggedIn : () => { handleYoutubeLink(user.uid, videoLink); handleClick() }}>
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Home;