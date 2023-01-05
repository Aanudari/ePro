import React, { useState, useRef, useEffect } from "react";
import UserLayout from "../../layout/UserLayout";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
  };
  const location = useLocation();
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const url = location.state.data.fileUrl;

  console.log(location.state.data.fileUrl.slice(-4));

  return (
    <UserLayout>
      {location.state.data.fileUrl.slice(-4) === ".mp4" ? (
        <div>
          <video
            onTimeUpdate={handleProgress}
            ref={videoRef}
            width="50%"
            // height="100%"
            id="myVideo"
            controls
          >
            <source src={`http://` + `${url}`} type="video/mp4" />
          </video>

          <div>
            <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            <progress value={progress} max="100" />
          </div>
        </div>
      ) : location.state.data.fileUrl.slice(-4) ===
        (".gif" || ".png" || ".jpg" || "jpeg") ? (
        <img src={`http://` + `${url}`} alt="aaa" />
      ) : (
        <div>file baihgui {location.state.data.fileUrl}</div>
      )}

      <ToastContainer />
    </UserLayout>
  );
};

export default Player;
