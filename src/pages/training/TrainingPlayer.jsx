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
import moment from "moment";

const TrainingPlayer = () => {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const today = new Date();
  const format = "YYYYMMDDHHmmss";
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const train = location.state.data;
  const [showTRate, setShowTRate] = useState(null);
  const hideModalTRate = () => setShowTRate(null);
  const [showGiveRate, setShowGiveRate] = useState(null);
  const hideModalGiveRate = () => setShowGiveRate(null);
  const [tRate, setTRate] = useState([]);
  const [q1, setQ1] = useState();
  const [q2, setQ2] = useState();

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          const findRate = res.data.trRatingForm?.find((item) => {
            return item.trainingId === train.id;
          });
          if (findRate === false) {
          } else {
            setTRate(findRate);
          }
        } else if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct divat."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/${train.id}/1`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        } else if (res.data.isSuccess === true) {
          setQ1(res.data.trainingRatingForm.trRatingQuestions);
        } else if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct divat."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/${train.id}/2`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        } else if (res.data.isSuccess === true) {
          setQ2(res.data.trainingRatingForm.trRatingQuestions);
        } else if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct divat."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const onTimeUpdate = () => {
    let ref = videoRef.current;
    if (ref) {
      let currentTime = ref.currentTime;
      let duration = ref.duration;
      let progress = (currentTime / duration) * 100;

      if (progress === 100) {
        if (train.status === "Үзсэн") {
          setShowTRate(false);
        } else {
          axios({
            method: "post",
            headers: {
              Authorization: `${TOKEN}`,
              "Content-Type": "application/json",
              accept: "text/plain",
            },
            url: `${process.env.REACT_APP_URL}/v1/Training/watch/end`,
            data: {
              trainingId: `${train.id}`,
            },
          })
            .then((res) => {
              if (res.data.isSuccess === true) {
                notification.success(`Сургалт дууссан цаг бүртгэгдлээ.`);
                const timer = setTimeout(() => setShowTRate(true), 500);
                return () => clearTimeout(timer);
              } else if (
                res.data.resultMessage === "Unauthorized" ||
                res.data.resultMessage ==
                  "Input string was not in a correct divat."
              ) {
                logout();
              }
            })
            .catch((err) => console.log(err));
        }
      }
    }
  };
  const [answers1, setAnswers1] = useState({});
  const [answers2, setAnswers2] = useState({});
  const hanldeSubmit = (e) => {
    e.preventDefault();
    const formattedData1 = Object.keys(answers1).map((key) => {
      return {
        questionId: key,
        answerId: answers1[key].answerId,
        answer: answers1[key].answer,
        points: answers1[key].points,
      };
    });
    const formattedData2 = Object.keys(answers2).map((key) => ({
      questionId: key,
      answerId: "",
      answer: answers2[key],
      points: "",
    }));
    const mergedArray = [...formattedData1, ...formattedData2];
    const result = mergedArray.reduce((acc, curr) => {
      const key = curr.questionId;
      if (!acc[key]) {
        acc[key] = { ...curr };
      } else {
        acc[key] = { ...acc[key], ...curr };
      }
      return acc;
    }, {});
    const mergedArrayByKey = Object.values(result);
    const t_data = {
      trainingId: `${train.id}`,
      ratingId: `${tRate.id}`,
      trRateQuestion: mergedArrayByKey,
    };
    if (mergedArrayByKey.length !== tRate.trRatingQuestions.length) {
      notification.error("Хариулт дутуу байна.");
    } else {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/rate`,
        data: JSON.stringify(t_data),
      }).then((res) => {
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => {
            hideModalGiveRate();
            navigate("/user-training");
          }, 1500);
          return () => clearTimeout(timer);
        }
        if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
          // navigate(0);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      });
    }
  };
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " жилийн өмнө";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " сарын өмнө";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " өдрийн өмнө";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " цагийн өмнө";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " минутын өмнө";
    }
    return Math.floor(seconds) + " секундын өмнө";
  }
  function formatDate(date) {
    const options = { weekday: "long", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `📅 ${formattedDate}, 🕒 ${hours}:${minutes}`;
  }
  function formatDuration(duration) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const seconds = duration - hours * 3600 - minutes * 60;

    let result = "";
    if (hours > 0) {
      result += `${Math.round(hours)} цаг `;
    }
    if (minutes > 0) {
      result += `${Math.round(minutes)} мин `;
    }
    if (seconds > 0) {
      result += `${Math.round(seconds)} сек `;
    }

    return result;
  }
  const handleWatchEnd = () => {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/Training/watch/end`,
      data: {
        trainingId: `${train.id}`,
      },
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          // notification.success(`Сургалт эхэлсэн цаг бүртгэгдлээ.`);
          const timer = setTimeout(
            () =>
              navigate("/user-training", {
                state: { item: location.state.item },
              }),
            500,
          );
          return () => clearTimeout(timer);
        } else if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct divat."
        ) {
          logout();
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
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center p-2">
              <div className="flex justify-center">
                <img
                  className="h-24 rounded-xl"
                  src="https://cdn.dribbble.com/users/4203996/screenshots/13798629/media/17b9900902d71c9bd115d52b1e43eff2.gif"
                />
              </div>
              <p className="mt-2 mb-4 text-sm font-semibold text-gray-500 ">
                Та сургалтыг амжилттай үзэж дууслаа. Сургалтанд үнэлгээ өгнө үү.
              </p>

              <button
                type="button"
                onClick={() => {
                  setShowGiveRate(true);
                  hideModalTRate(true);
                }}
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Үнэлгээ өгөх
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showGiveRate}
          onHide={hideModalGiveRate}
          size="lg"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              <p className="text-xl font-normal text-white text-center">
                Сургалтанд үнэлгээ өгөх
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="w-full max-w-3xl mx-auto p-6">
              {/* HEADER */}
              <div className="border-b pb-4 mb-4">
                <p className="text-2xl font-bold text-gray-800">
                  {tRate?.name}
                </p>
                <span className="text-sm text-gray-500">
                  {tRate?.description}
                </span>
              </div>

              <div className="mb-6">
                <div className="border rounded-b-lg divide-y">
                  {q1?.map((question, qi) => (
                    <div
                      key={question?.questionId}
                      className="px-4 py-4 transition"
                    >
                      <p className="bg-indigo-600 text-white px-4 py-2 rounded-t-lg font-semibold">
                        {qi + 1}. {question?.question}
                      </p>

                      <div className="space-y-2 ">
                        {question?.trRatingAnswer?.map((answer, ai) => (
                          <label
                            key={ai}
                            className="flex items-center gap-2 cursor-pointer text-gray-700"
                          >
                            <input
                              type="radio"
                              name={question?.questionId}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                              onChange={() =>
                                setAnswers1((prev) => ({
                                  ...prev,
                                  [question?.questionId]: answer,
                                }))
                              }
                            />
                            {answer.answer}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}
              <div className="flex justify-end">
                <button
                  onClick={hanldeSubmit}
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow"
                >
                  Submit
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {/* USER TRAINING SHOW SECTION */}
      <div className="max-w-screen-xl ml-auto mr-auto">
        <div className="px-4 py-2">
          <a
            onClick={() => {
              location.state.item === "1"
                ? handleWatchEnd()
                : navigate("/user-training", {
                    state: { item: location.state.item },
                  });
            }}
            className="text-sm font-bold text-gray-900 sm:text-sm cursor-pointer"
          >
            <i className="bi bi-backspace" />
            <span className="mx-2">Буцах</span>
          </a>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* LEFT – MEDIA */}
            <div className="w-full md:w-2/3">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                    {location.state.item === "1"
                      ? timeSince(new Date(train.createdAt))
                      : `Үргэлжлэх ${formatDuration(train.duration)}`}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                    {train.tCatName}
                  </span>
                </div>

                {location.state.item === "1" ? (
                  <div>
                    {[".png", "jpeg", ".jpg", ".gif"].some((ext) =>
                      train.fileUrl.toLowerCase().endsWith(ext),
                    ) ? (
                      <div className="w-full aspect-[2/1] overflow-hidden rounded-md bg-gray-50 flex items-center justify-center">
                        <img
                          src={`http://${train.fileUrl}`}
                          className="max-h-full object-contain"
                        />
                      </div>
                    ) : train.fileUrl.endsWith(".mp3") ? (
                      <audio className="w-full mt-2" controls>
                        <source src={`http://${train.fileUrl}`} />
                      </audio>
                    ) : (
                      <div
                        onClick={() => window.open(`http://${train.fileUrl}`)}
                        className="mt-2 p-4 border border-dashed rounded-md text-sm text-gray-600 cursor-pointer hover:bg-gray-50 text-center"
                      >
                        {train.fileUrl.slice(29)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full aspect-[2/1] overflow-hidden rounded-md bg-gray-50">
                    <video
                      ref={videoRef}
                      onTimeUpdate={onTimeUpdate}
                      className="w-full h-full object-contain"
                      controls
                      disablePictureInPicture
                      controlsList="nodownload noplaybackrate"
                    >
                      <source
                        src={`http://${train.fileUrl}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT – INFO */}
            <div className="w-full md:w-1/3">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <i className="bi bi-person-circle text-3xl text-gray-400"></i>
                  <p className="font-medium text-gray-800">
                    {train.teacher || "-"}
                  </p>
                </div>

                <p className="font-semibold text-gray-900">{train.name}</p>

                {train.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {train.description}
                  </p>
                )}

                <div className="mt-4 border-t pt-3 space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Байршил</span>
                    <span>{train.location || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Дуусах</span>
                    <span>{formatDate(new Date(train.endDate))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </UserLayout>
  );
};

export default TrainingPlayer;
