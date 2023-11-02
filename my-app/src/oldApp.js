/*import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ReactPlayer from 'react-player';
import VideoPlayer from "react-video-js-player";
import VideoJSPlayerComponent from './video-js/videojs';
import DoThatDanceVideoPlayer from "./video-js/DoThatDanceVideoPlayer";
import 'video.js/dist/video-js.css';
import "videojs-playbackrate-adjuster";
import "videojs-mirror";


function App() {
  // for onChange event
  const [youtubeVideo, setYoutubeVideo]=useState('');
  // for submitting
  const [youtubeURL, setYoutubeURL]=useState('https://www.youtube.com/watch?v=LXb3EKWsInQ');
  // for error message
  const [youtubeError, setYoutubeError]=useState('');

  const handleYoutubeChange=(e)=>{
    setYoutubeVideo(e.target.value);
  }

  const handleYoutubeSubmit=(e)=>{
    e.preventDefault();
    const youtubeRegex=/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if(youtubeRegex.test(youtubeVideo)){
      setYoutubeURL(youtubeVideo);
      setYoutubeError('');
    }
    else{
      setYoutubeError('Invalid Youtube URL');
    }
  }

  return (
    <Router>
      <div className='wrapper'>
        <form className='form-group form'
          onSubmit={handleYoutubeSubmit}>
          <input type='text' className='form-control'
          placeholder="Enter Youtube URL" required
          onChange={handleYoutubeChange}
          />
          <button type='submit' className='btn btn-success btn-md'>
            UPLOAD
          </button>
        </form>
        {youtubeError&&<div className='error-msg'>{youtubeError}</div>}
        <br></br>
        <div className='youtube-box'> 
        <ReactPlayer url={youtubeURL} />
        <VideoJSPlayerComponent />
        </div>
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App; 
*/