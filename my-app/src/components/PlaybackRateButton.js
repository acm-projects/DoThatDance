import React from 'react';

const PlaybackRateButton = ({ playbackRate, onClick }) => {
  const handleClick = () => {
    onClick(playbackRate);
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={handleClick}>
      {playbackRate}x
    </button>
  );
};

export default PlaybackRateButton;
