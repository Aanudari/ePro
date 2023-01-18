import React, { useState, useRef } from "react";
import UserLayout from "../../components/UserLayout";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import { notification } from "../../service/toast";
const TrainingPlayer = () => {
  const location = useLocation();
  const { TOKEN, deviceId } = useStateContext();
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
  const url = location.state.data.fileUrl;
  const checkProgressFinish = (progress) => {
    if (progress === 100) {
      notification.success("Та сургалтыг үзэж дууслаа.");
    }
  };
  return (
    <UserLayout>
      <div className="max-w-screen-xl ml-auto mr-auto">
        {location.state.data.fileUrl.slice(-4) === ".mp4" ? (
          <div className="mt-4 flex items-center">
            <video
              onTimeUpdate={handleProgress}
              ref={videoRef}
              width="60%"
              // height="100%"
              id="myVideo"
              controls
            >
              <source src={`http://` + `${url}`} type="video/mp4" />
            </video>

            <div className="flex items-center">
              <button
                onClick={togglePlay}
                className="mr-2 text-xl border-2 rounded-lg px-2 py-2 bg-blue-500 font-bold text-white"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <progress
                value={progress}
                max="100"
                onChange={checkProgressFinish(progress)}
              />
            </div>
          </div>
        ) : (
          <div>file baihgui {location.state.data.fileUrl}</div>
        )}
      </div>

      <ToastContainer />
    </UserLayout>
  );
};

export default TrainingPlayer;
