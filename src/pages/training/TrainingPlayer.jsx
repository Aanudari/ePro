import React, { useState, useRef, useEffect } from "react";
import UserLayout from "../../components/UserLayout";
import { useStateContext } from "../../contexts/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import { notification } from "../../service/toast";
import axios from "axios";
import getWindowDimensions from "../../components/SizeDetector";
import { Modal } from "react-bootstrap";
import { duration } from "moment";
const TrainingPlayer = () => {
  const { width } = getWindowDimensions();
  const location = useLocation();
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const [trate, setTrate] = useState([]);
  const trn = location.state.data;
  const [showTRate, setShowTRate] = useState(null);
  const hideModalTRate = () => setShowTRate(null);
  const [showGiveRate, setShowGiveRate] = useState(null);
  const hideModalGiveRate = () => setShowGiveRate(null);
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     headers: {
  //       Authorization: `${TOKEN}`,
  //     },
  //     url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating`,
  //   })
  //     .then((res) => {
  //       if (res.data.isSuccess === false) {
  //         // alert(res.data.resultMessage);
  //       }
  //       if (res.data.isSuccess == true) {
  //         setTrate(res.data.trRatingForm);
  //       }
  //       if (res.data.resultMessage === "Unauthorized") {
  //         logout();
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // console.log(trate);
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const trID = {
    trainingId: `${trn.id}`,
  };
  const saveStart = () => {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/Training/watch/start`,
      data: JSON.stringify(trID),
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess === true) {
          notification.success(`Сургалт эхэлсэн цаг бүртгэгдлээ.`);
        }
        if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
        }
      })
      .catch((err) => console.log(err));
  };
  const saveEnd = () => {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/Training/watch/end`,
      data: JSON.stringify(trID),
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess === true) {
          // notification.success(`Сургалт дууссан цаг бүртгэгдлээ.`);
          // setShowTRate(true);
        }
        if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
        }
      })
      .catch((err) => console.log(err));
  };
  // const [second, setSecond] = useState(0);
  const handleProgress = () => {
    const duration = videoRef.current.duration;
    const currentTime = videoRef.current.currentTime;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
    // setSecond(second + 1);
    // console.log(second / 4);
    if (progress === 100) {
      saveEnd();
    }
  };

  const rate = {
    trainingId: "string",
    ratingId: "string",
    trRateQuestion: [
      {
        questionId: "string",
        answer: "string",
        points: "string",
      },
    ],
  };
  const handleRate = () => {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/rate`,
      data: JSON.stringify(rate),
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => navigate("/user-training"), 500);
          return () => clearTimeout(timer);
        }
        if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserLayout>
      <div>
        <Modal
          show={showTRate}
          onHide={hideModalTRate}
          size="ml"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалтанд үнэлгээ өгөх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center p-2">
              <div className="flex justify-center">
                <img
                  className="h-24 rounded-xl"
                  src="https://cdn.dribbble.com/users/4203996/screenshots/13798629/media/17b9900902d71c9bd115d52b1e43eff2.gif"
                />
              </div>
              <h3 className="mt-2 mb-4 text-xl font-semibold text-gray-500 ">
                Та сургалтыг амжилттай үзэж дууслаа. Сургалтанд үнэлгээ өгнө үү.
              </h3>

              <button
                type="button"
                onClick={() => {
                  setShowGiveRate(true);
                }}
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Үнэлгээ бөглөх
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showGiveRate}
          onHide={hideModalGiveRate}
          size="ml"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалтанд үнэлгээ өгөх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h6 key={index} className="mt-3 font-[400] pl-3 flex items-center">
              {answer.isTrue == "1" ? (
                <i
                  onClick={() => {
                    changeisTrue(question.id, answer.id);
                  }}
                  className="bi bi-check-circle hover:scale-105 transition-all text-xl px-1 text-teal-500 cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => {
                    changeisTrue(question.id, answer.id);
                  }}
                  className={`bi bi-circle hover:scale-105 transition-all hover:text-teal-500 text-xl px-1 outline-none text-gray-400 cursor-pointer`}
                ></i>
              )}
              <span className="ml-2 text-[14px] font-[400]">
                {answer.answer}
              </span>
            </h6> */}
          </Modal.Body>
        </Modal>
      </div>
      <div className="max-w-screen-xl ml-auto mr-auto">
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  {trn.name}
                </h2>
                <p className="hidden text-white/90 sm:mt-4 sm:block">
                  {trn.description}
                </p>
                {trn.fileUrl.slice(-4) === ".mp4" ? (
                  <div>
                    <div className="mt-4 md:mt-8">
                      <a
                        // onClick={togglePlay}
                        onClick={() => {
                          setShowGiveRate(true);
                        }}
                        className="inline-block rounded border border-white bg-white px-8 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-blue-200 focus:outline-none focus:ring focus:ring-yellow-400"
                      >
                        {/* {isPlaying ? "Pause" : "Play"} */}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>file baihgui</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
              <video
                onTimeUpdate={handleProgress}
                ref={videoRef}
                id="myVideo"
                controls
                className="h-40 w-full object-cover sm:h-56 md:h-full"
              >
                <source src={`http://` + `${trn.fileUrl}`} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </UserLayout>
  );
};

export default TrainingPlayer;
