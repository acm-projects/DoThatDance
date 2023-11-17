import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VideoJSPlayerComponent from "../video";
import Authentication from "./Authentication";
import { NavLink, useNavigate } from "react-router-dom";

const VideoPlayerPage = () => {
  const { videoURL } = useParams();
  console.log("videopage:", videoURL);
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
      <div>
        {videoURL && <VideoJSPlayerComponent videoURL={decodeURIComponent(videoURL)} />}
      </div>
    </>
  );
};

export default VideoPlayerPage;
