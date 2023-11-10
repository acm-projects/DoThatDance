import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Authentication from "./Authentication";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword])

  const onSubmit = async (e) => {
    e.preventDefault();

    if(!validMatch) {
      console.log("Passwords do not match.");
      alert("Temporary Message: Passwords do not match!");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {email: user.email, history: [], favorites: []});
        console.log(user);
        console.log(user.email);
        console.log("Registration Successful");
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
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
      </nav>
      <div className="container1 fade-in">
          <div className ="formDiv changePadding">
            <form>
              <div className="input">
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  // placeholder="Email"
                />
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  // placeholder="Password"
                />
              </div>
              <div className="input">
                <label htmlFor="reconfirm">Reconfirm Password</label>
                <input
                  type="password"
                  label="Confirm password"
                  value={matchPassword}
                  onChange={(e) => setMatchPassword(e.target.value)}
                  required
                  // placeholder="Reconfirm Password"
                />
              </div>
              <div class="centerButton">
                <button className="login" type="submit" onClick={onSubmit}>
                  Sign up
                </button>
              </div>
            </form>
            <p>
              Already Have An Account? <NavLink to="/login">LOGIN</NavLink>
            </p>
          </div>
      </div>
    </>
  );
};


export default Register;