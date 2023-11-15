import React, { useState } from "react";
import {useParams } from "react-router-dom";
import VideoJSPlayerComponent from "../video";

const VideoPlayerPage = () => {
  const { videoURL } = useParams();
  console.log("videopage:", videoURL);
  return (
    <div>
      {videoURL && <VideoJSPlayerComponent videoURL={decodeURIComponent(videoURL)} />}
    </div>
  );
};

export default VideoPlayerPage;
