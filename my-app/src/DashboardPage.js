import React from "react";
import "./DashboardPage.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="watched-videos">
        <h2>Watched Videos</h2>
      </div>
      <div className="starred-videos">
        <h2>Starred Videos</h2>
      </div>
    </div>
  );
};

export default Dashboard;