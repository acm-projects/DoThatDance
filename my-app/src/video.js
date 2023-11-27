import React, { Component } from 'react';
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
      isSpeedPopupOpen: false,
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
    this.setState((prevState) => ({
      mirrorButtonIcon: prevState.mirrorButtonIcon === 'mirror.png' ? 'newmirror.png' : 'mirror.png',
    }));

    const video = document.getElementById('video');
    video.style.transform = video.style.transform === 'scaleX(-1)' ? '' : 'scaleX(-1)';
  }

  handlePlaybackRateChange = (newPlaybackRate) => {
    if (this.player) {
      this.player.playbackRate(newPlaybackRate);
      this.setState({ playbackSpeed: newPlaybackRate });
    }
  };

  toggleSpeedPopup = () => {
    this.setState((prevState) => ({
      isSpeedPopupOpen: !prevState.isSpeedPopupOpen,
    }));
  };

  handleSpeedItemClick = (speed) => {
    this.handlePlaybackRateChange(speed);
    this.toggleSpeedPopup();
  };

  componentDidMount() {
    this.player = videojs(this.videoNode, this.videoJsOptions, () => {
      if (this.player) {
        this.player.on('play', () => {
          this.setState({
            isPlaying: true,
          })
        });
        this.player.on('loadedmetadata', () => {
          this.setState({ totalDuration: this.player.duration() })
        });
        this.player.on('pause', () => {
          this.setState({
            isPlaying: false,
          })
        });
        this.player.on('ended', () => {
          console.log("ended")
        });
        this.player.on('timeupdate', () => {
          this.setState({ playedSeconds: this.player.currentTime() })
          this.setState({ remainingVideoPlay: this.player.remainingTime() })
        });
      }
    });
  }

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
    const {
      isPlaying,
      playButtonIcon,
      mirrorButtonIcon,
      isSpeedPopupOpen,
    } = this.state;

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
          <div className="speed-button" onClick={this.toggleSpeedPopup}>
            <img
              src={require('./images/playback.png')}
              alt="Speed Button"
              className="speed-button-img"
              style={{ width: '30px', height: '30px', maxWidth: '30px', maxHeight: '30px' }}
            />
            {isSpeedPopupOpen && (
              <div className="speed-popup">
                <div
                  className="speed-popup-item"
                  onClick={() => this.handleSpeedItemClick(0.5)}
                >
                  0.5x
                </div>
                <div
                  className="speed-popup-item"
                  onClick={() => this.handleSpeedItemClick(0.75)}
                >
                  0.75x
                </div>
                <div
                  className="speed-popup-item"
                  onClick={() => this.handleSpeedItemClick(1.0)}
                >
                  1x
                </div>
                <div
                  className="speed-popup-item"
                  onClick={() => this.handleSpeedItemClick(2.0)}
                >
                  2x
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="rectangle"></div>
      </div>
    );
  }
}

export default VideoJSPlayerComponent;