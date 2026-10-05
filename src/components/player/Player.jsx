import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import '../../styles/home/mediaPlayer.scss'

const Player = ({source}) => {
  return (
    <AudioPlayer
      src={source}
      volume={0.5} 
      layout="horizontal-reverse"
      showJumpControls={false}
      customAdditionalControls={[]}
      customVolumeControls={[]}
    />
  )
};

export default Player;