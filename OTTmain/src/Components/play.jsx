import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom'; // For routing (if needed)
import style from './videoPlayer.module.css'; // Your custom CSS for styling

const VideoPlayer = () => {
  // Getting the video URL from the query params (example: ?video=https://example.com/video.mp4)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const videoUrl = params.get('video') || 'https://www.example.com/default-video.mp4'; // Default URL if none provided

  return (
    <div className={style.videoPlayerContainer}>
      <h2>Now Playing</h2>
      <div className={style.playerWrapper}>
        <ReactPlayer
          url={videoUrl} // URL of the video to play
          className={style.reactPlayer}
          playing={true} // Auto play
          controls={true} // Show controls (play, pause, etc.)
          width="100%" // Full width
          height="100%" // Full height
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
