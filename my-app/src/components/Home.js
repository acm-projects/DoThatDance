import React, { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import pngeggnew from '../pngeggnew.png';

import Authentication from "./Authentication";



const Home = () => {



  const [videoLink, setVideoLink] = useState("");
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const user = auth.currentUser;

  if(user) {
    console.log("Logged in");
    console.log(user.email);
  } else {
    console.log("Not logged in");
  }



  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const [isActive, setIsActive] = useState(false);

  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
  };


  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const handleHoverLink = () => {
    setIsHoveredLink(!isHoveredLink);
  };

  const handleNavigate = () => {
    // Apply a class or perform other actions
    // ...

    // Wait for 2 seconds before navigating to another page
    /*setTimeout(() => {
      navigate("/Video");
    }, 500);*/
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
      if(!link.includes("youtube.com/watch?v=")) {
        alert("Error! Enter a youtube link!");
        console.log("Link does not include youtube.com/watch");
        console.log("Please enter a Youtube Link");
      } else if(user) {
        // retrieve existing history
        const userRef = doc(db, "users", id);
        const userDoc = await getDoc(userRef);
        const history = userDoc.data().history;
        setVideoLink(link);
        navigate(`/video/${encodeURIComponent(link)}`);

        if(history.includes(link)) {
          console.log(history);
          console.log("This video is already in your history!");
        } else {
          // Add Youtube Link to database
        await updateDoc(doc(db, "users", id), { history: [...history, link] });

        console.log("Youtube Link Added Successfully!");
        }
      }
  }

  const userNotLoggedIn = () => {
      // Transition and Navigate to video page
      handleClick();
      handleNavigate();
      console.log("Navigating to video page.");
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
      <img className={isActive ? "design fade-in hidden fade-out-div" : "design fade-in visible fade-out-div"} src={pngeggnew} />
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
                <button
                  className="go button-transition"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHover}
                  onClick={!user ? userNotLoggedIn : () => { handleYoutubeLink(user.uid, videoLink); handleClick(); handleNavigate() }}>
                  <li className="noList">
                    <NavLink className="noUnderline" to="/video">Go</NavLink>
                  </li>
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