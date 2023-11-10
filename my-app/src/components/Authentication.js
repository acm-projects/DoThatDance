import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useLocation } from 'react-router-dom';

const Authentication = () => {

    const navigate = useNavigate();

    const [authenticatedUser, setauthenticatedUser] = useState("");
    const [emailUser, setEmailUser] = useState("");

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const listenAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setauthenticatedUser(user)
                setEmailUser(user.email)
            } else {
                setauthenticatedUser(null)
            }
        })
        return () => {
            listenAuth();
        }
    }, [])

    const userSignOut = () => {
        signOut(auth).then(() => {
            navigate("/Login");
            console.log("sign out")
        }).catch(error => console.log("error"))
    }



    return (
        <>
            {authenticatedUser === null ?
                <>
                    <li className={isActive('/login')}>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li className={isActive('/register')}>
                        <NavLink to="/register">Sign Up</NavLink>
                    </li>
                </> :
                <>
                    <li className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                        <button className="dropdown-toggle " onClick={toggleMenu}>{emailUser}</button>
                        {isOpen && (
                            <ul className="dropdown-menu">
                                <li className={isActive('/register')}>
                                    <NavLink to="/dashboardpage">Dashboard</NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={userSignOut} to="/">Sign Out</NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                </>
            }
        </>
    );
};

export default Authentication;