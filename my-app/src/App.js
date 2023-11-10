import React from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Video from "./video";
import DashboardPage from "./DashboardPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/video" element={<Video />} />
            <Route path="/dashboardpage" element={<DashboardPage />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;