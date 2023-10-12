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
      <nav>
        <p>Welcome Home</p>

        <div>
          {/* Logout Button if logged in */}
          {user ? <button onClick={handleLogout}>Logout</button> : null}
          <p>
            {!user ? 
              <NavLink to="/register">
              Register
              </NavLink> 
            : null}
          </p>
        </div>
        <div>
          {/* Youtube Link */}
          <label>Youtube Link</label>
          <input 
            id="youtube-link"
            name="youtube-link"
            type="url" 
            placeholder="Youtube Link" 
            required
            ref={inputRef}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <button onClick={!user ? userNotLoggedIn : () => handleYoutubeLink(user.uid, videoLink)}>
            Submit
          </button>
        </div>
      </nav>
    </>
  );
};

export default Home;