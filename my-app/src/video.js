import React from "react";
import "./Video.css";
import dancer from "./images/dance.jpg";
import star from "./images/star.png";
import play from "./images/play.png";
import volume from "./images/volume.png";
import mirror from "./images/mirror.png";
import fullscreen from "./images/fullscreen.png";
import playback from "./images/playback.png";
import loop from "./images/loop.png";
import pause from "./images/pause.png";

const Video = () => {
  return (
    <div className="video">
      <div className="dance-image-container">
        <img src={dancer} alt="" className="dancer" />
        <div className="rectangle">
          <div className="text-overlay">3:45 / 15:30</div>
        </div>
        <div className="white-rectangle"></div> {/* Add the white rectangle */}
        <img src={star} alt="" className="star-button" />
        <img src={play} alt="" className="play-button" />
        <img src={volume} alt="" className="volume-button" />
        <img src={mirror} alt="" className="mirror-button" />
        <img src={fullscreen} alt="" className="fullscreen-button" />
        <img src={playback} alt="" className="playback-button" />
        <img src={loop} alt="" className="loop-button" />
        <img src={pause} alt="" className="pause-display" />
      </div>
    </div>
  );
};

export default Video;