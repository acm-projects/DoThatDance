import React, { useState } from "react";
import "./Video.css";
import dancer from "./images/dance.jpg";
import star from "./images/star.png";
import newstar from "./images/newstar.png";
import play from "./images/play.png";
import newplay from "./images/newplay.png";
import volume from "./images/volume.png";
import mirror from "./images/mirror.png";
import newmirror from "./images/newmirror.png";
import playback from "./images/playback.png";
import { NavLink, useNavigate } from "react-router-dom";
import Authentication from "./components/Authentication";

const Video = () => {
  const [isMirrorClicked, setIsMirrorClicked] = useState(false);
  const [isPlayClicked, setIsPlayClicked] = useState(false);
  const [isStarClicked, setIsStarClicked] = useState(false);
  const [showPlaybackOptions, setShowPlaybackOptions] = useState(false);

  const handleMirrorClick = () => {
    setIsMirrorClicked(!isMirrorClicked);
  };

  const handlePlayClick = () => {
    setIsPlayClicked(!isPlayClicked);
  };

  const handleStarClick = () => {
    setIsStarClicked(!isStarClicked);
  };

  const handlePlaybackClick = () => {
    setShowPlaybackOptions(!showPlaybackOptions);
  };

  const playbackOptions = ["0.5", "0.75", "Normal", "1.25", "1.5"];

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
      <div className="video">
        <div className="dance-image-container">
          <img src={dancer} alt="" className="dancer" />
          <div className="rectangle">
            <div className="text-overlay">3:45 / 15:30</div>
          </div>
          <div className="white-rectangle"></div>
          <div className="star-button" onClick={handleStarClick}>
            <img
              src={!isStarClicked ? star : newstar}
              alt=""
              className="newstar-button"
            />
          </div>
          <div className="play-button" onClick={handlePlayClick}>
            <img
              src={!isPlayClicked ? play : newplay}
              alt=""
              className="newplay-button"
            />
          </div>
          <img src={volume} alt="" className="volume-button" />
          <div className="mirror-button" onClick={handleMirrorClick}>
            <img
              src={!isMirrorClicked ? mirror : newmirror}
              alt=""
              className="newmirror-button"
            />
          </div>
          <img
            src={playback}
            alt=""
            className="playback-button"
            onClick={handlePlaybackClick}
          />
        </div>
        {showPlaybackOptions && (
          <div className="playback-options">
            {playbackOptions.map((option, index) => (
              <div key={index} className="playback-option">
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Video;

