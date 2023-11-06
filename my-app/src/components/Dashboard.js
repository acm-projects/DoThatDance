import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import Authentication from "./Authentication";

const Dashboard = () => {

    return (
        <>
            <div>Hello</div>
        </>
    );
};

export default Dashboard;