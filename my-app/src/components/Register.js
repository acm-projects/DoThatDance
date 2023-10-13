import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, setDoc, doc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const usersCollectionRef = collection(db, "users");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {email: user.email, history: []});
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
      <section>
          <nav className="nav">
       {/* <div className="logo">
              <img src="logo.png"/>
        </div>  */}
        <ul>
          <li>
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
          <li className="active">
            <NavLink to="/register">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
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
                  placeholder="Email"
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
                  placeholder="Password"
                />
              </div>
              <div className="input">
                <label htmlFor="reconfirm">Reconfirm Password</label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Reconfirm Password"
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
      </section>
  );
};

export default Register;