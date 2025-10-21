import React from "react";
import { useLocation } from "react-router-dom";


const VideoPlayer = () => {

  const location=useLocation()
    const {video}=location.state||null
  
  if (!video || !video.filePath) {
    return <p>No video available</p>;
  }
     
  // Normalize file path: replace backslashes with forward slashes
  const normalizedPath = video.filePath.replace(/\\/g, "/");

  // Build video URL (replace with your backend URL)
  const videoUrl = `http://localhost:9898/api/stream?filePath=${encodeURIComponent(normalizedPath)}`;

  return (
    <div className="video-player-container " style={{ textAlign: "center", marginTop: "20px" }}>
      <h2 className="text-2xl font-bold mb-5">{video.title || "Video Player"}</h2>
      <video
        src={videoUrl}
        controls
        controlsList="nodownload"
        width="800"
        height="450"
        style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.3)",margin:"auto",height:"60vh" }}
      >
       
      </video>
    </div>
  );
};

export default VideoPlayer;
