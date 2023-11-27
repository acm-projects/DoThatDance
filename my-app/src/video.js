import React, { Component, useState } from 'react';
import './index.css';
import './components/videojs.css';
import videojs from 'video.js';
import "videojs-youtube";
import PlaybackRateButton from './components/PlaybackRateButton';

class VideoJSPlayerComponent extends Component {

  player;
  videoNode;
  videoJsOptions = {
    autoplay: false,
    fullscreen: false,
    muted: false,
    height: 400,
    width: 600,
    controls: false,
    sources: [
      {
        src: this.props.videoURL || "https://www.youtube.com/watch?v=LXb3EKWsInQ&t=5s",
        type: "video/youtube",
      }
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      playedSeconds: 0,
      remainingVideoPlay: 0,
      totalDuration: 0,
      playButtonIcon: 'play.png',
      mirrorButtonIcon: 'mirror.png',
    };

  }



  play = () => {
    if (this.player) {
      this.player.play();
    }
  }

  pause = () => {
    if (this.player) {
      this.player.pause();
    }
  }

  forwardVideo = () => {
    if (this.player) {
      this.player.currentTime(this.player.currentTime() + 10);
    }
  }

  backwardVideo = () => {
    if (this.player) {
      this.player.currentTime(this.player.currentTime() - 10);
    }
  }

  jumpTo = () => {
    if (this.player) {
      this.player.currentTime(30);
    }
  }
  
  togglePlay = () => {
    if (this.state.isPlaying) {
      this.pause();
    } else {
      this.play();
    }

    // Toggle play button icon
    this.setState((prevState) => ({
      playButtonIcon: prevState.playButtonIcon === 'play.png' ? 'newplay.png' : 'play.png',
    }));
  }

  toggleMirror = () => {
    // Toggle mirror button icon
    this.setState((prevState) => ({
      mirrorButtonIcon: prevState.mirrorButtonIcon === 'mirror.png' ? 'newmirror.png' : 'mirror.png',
    }));
    
    // Your existing mirrorVideo logic
    const video = document.getElementById('video');
    video.style.transform = video.style.transform === 'scaleX(-1)' ? '' : 'scaleX(-1)';
  }

  handlePlaybackRateChange = (newPlaybackRate) => {
    if (this.player) {
      this.player.playbackRate(newPlaybackRate);
    }
  };

  handlePlaybackSpeedSelect = (speed) => {
    this.handlePlaybackRateChange(speed);
  };


  componentDidMount() {
    this.player = videojs(this.videoNode, this.videoJsOptions, () => {
      if (this.player) {

        // Triggered
        console.log('onPlayerReady');
        console.log("videojs url: ", this.props.videoURL);

        this.player.on('play', (event) => {
          this.setState({
            isPlaying: true,
          })
        })
        this.player.on('loadedmetadata', (event) => {
          // @ts-ignore
          this.setState({ totalDuration: this.player.duration() })
        })
        this.player.on('pause', (event) => {
          this.setState({
            isPlaying: false,
          })
        })
        this.player.on('ended', (event) => {
          console.log("ended")
        })
        this.player.on('timeupdate', (event) => {
          // @ts-ignore
          this.setState({ playedSeconds: this.player.currentTime() })
          // @ts-ignore
          this.setState({ remainingVideoPlay: this.player.remainingTime() })
        });
      }
    });
  }



  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  secondsToHms = (secs) => {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = Math.floor(secs % 60);
    return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v, i) => v !== "00" || i > 0)
      .join(":")
  };


  render() {
    const { isPlaying, playButtonIcon, mirrorButtonIcon } = this.state;

    return (
      <div className="customVideoPlayer">
        <div className="playerWrapper" data-vjs-player>
          <video id="video" ref={(node) => (this.videoNode = node)} className="video-js" />
        </div>
        <div className="d-flex">
          <div className="play-button" onClick={this.togglePlay}>
            <img
              src={require(`./images/${playButtonIcon}`)}
              alt="Play Button"
              className="play-button-img"
            />
          </div>
          <div className="mirror-button" onClick={this.toggleMirror}>
            <img
              src={require(`./images/${mirrorButtonIcon}`)}
              alt="Mirror Button"
              className="mirror-button-img"
            />
          </div>
          <PlaybackRateButton playbackRate={0.5} onClick={this.handlePlaybackRateChange} />
          <PlaybackRateButton playbackRate={0.75} onClick={this.handlePlaybackRateChange} />
          <PlaybackRateButton playbackRate={1.0} onClick={this.handlePlaybackRateChange} />
          <PlaybackRateButton playbackRate={2.0} onClick={this.handlePlaybackRateChange} />
        </div>
        <div className="rectangle"></div>
      </div>
    );
  }
}

export default VideoJSPlayerComponent;