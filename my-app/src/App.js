import React from 'react';
import './App.css';
import VideoJSPlayerComponent from './video-js/videojs';
import 'video.js/dist/video-js.css';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import "videojs-playbackrate-adjuster";
import "videojs-mirror";

function App() {
  return (
    <div className="App">
      <VideoJSPlayerComponent/>
    </div>
  );
}

export default App;