import React from "react";
import "./DashboardPage.css";
import searchIcon from "./images/search.png"; // Make sure the path is correct
import { NavLink, useNavigate } from "react-router-dom";
import Authentication from "./components/Authentication";

const Dashboard = () => {
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
      <div className="dashboard-container">
        <div className="video-container watched-videos">
          <h2>Watched Videos</h2>
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <img src={searchIcon} alt="" className="search-button" />
          </div>
        </div>
        <div className="video-container starred-videos">
          <h2>Starred Videos</h2>
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <img src={searchIcon} alt="" className="search-button" />
          </div>
        </div>
      </div>
    </>
  );
};


export default Dashboard;
