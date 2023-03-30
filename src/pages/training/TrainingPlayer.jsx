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
            500
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
            <div className="w-full bg-white  mx-auto ">
              <div className="bg-white dark:bg-gray-800 ">
                <div className="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                  <div>
                    <p className="block text-xl font-semibold">
                      "{tRate?.name}"
                    </p>
                    <span className="block text-sm font-semibold text-blue-600">
                      {tRate?.description}
                    </span>
                  </div>

                  {/* <div className="lg:mt-0 lg:flex-shrink-0">
                        <div className=" inline-flex rounded-md shadow">
                          <button
                            type="button"
                            className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                          >
                            Get started
                          </button>
                        </div>
                      </div> */}
                </div>
                <div className="md:mt-0 md:col-span-2 border border-t-4 bg:gray-600  shadow-xl">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="bg-gray-200 px-4">
                      <p>Section 1</p>
                    </div>
                    {q1?.map((question, i) => {
                      return (
                        <div
                          key={question?.questionId}
                          className="px-4 py-3 bg-white space-y-3 sm:p-3"
                        >
                          <p className="text-base font-medium text-gray-900">
                            {i + 1}. {question?.question}
                          </p>

                          {question?.trRatingAnswer?.map((answer, i) => {
                            return (
                              <div key={i} className="space-y-2">
                                <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                    <label className="font-medium text-gray-700">
                                      <input
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
                                        type="radio"
                                        name={question?.questionId}
                                        onChange={(e) =>
                                          setAnswers1((prevData) => ({
                                            ...prevData,
                                            [question?.questionId]: answer,
                                          }))
                                        }
                                      />
                                      {answer.answer}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                    <div className="bg-gray-200 px-4">
                      <p>Section 2</p>
                    </div>
                    {q2?.map((question, i) => {
                      return (
                        <div
                          key={question?.questionId}
                          className="px-4 py-3 bg-white space-y-3 sm:p-3"
                        >
                          <p className="text-base font-medium text-gray-900">
                            {i + 1}. {question?.question}
                          </p>
                          <div className="space-y-2">
                            <input
                              type="text"
                              className="px-4 py-2 text-blueGray-600 bg-white text-sm w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 placeholder-gray-400"
                              name={question?.questionId}
                              onChange={(e) =>
                                setAnswers2((prevData) => ({
                                  ...prevData,
                                  [question?.questionId]: e.target.value,
                                }))
                              }
                              placeholder="Хариулт"
                            />
                          </div>
                        </div>
                      );
                    })}
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type="button"
                        onClick={(e) => {
                          hanldeSubmit(e);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
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
          <div className="flex flex-col mx-auto md:flex-row mt-2">
            <div className="w-full md:w-2/3">
              {location.state.item === "1" ? (
                <span className="rounded-md bg-gray-200 px-2.5 py-0.5 text-sm text-gray-600 font-bold mr-1">
                  {timeSince(new Date(train.createdAt))}
                </span>
              ) : (
                <span className="rounded-md bg-gray-200 px-2.5 py-0.5 text-sm text-gray-600 font-bold mr-1">
                  Үргэлжлэх хугацаа {formatDuration(train.duration)}
                </span>
              )}
              <span className="rounded-md bg-purple-200 px-2.5 py-0.5 text-sm text-purple-600 font-bold ">
                {train.tCatName}
              </span>
              {location.state.item === "1" ? (
                <div>
                  {train.fileUrl.slice(-4) === ".png" ||
                  train.fileUrl.slice(-4) === "jpeg" ||
                  train.fileUrl.slice(-4) === ".jpg" ||
                  train.fileUrl.slice(-4) === ".png" ||
                  train.fileUrl.slice(-4) === ".gif" ? (
                    <div className="flex justify-center">
                      <img
                        className="object-fill h-full mt-2 w-full mr-4 shadow-md rounded-lg"
                        src={`http://` + `${train.fileUrl}`}
                      />
                    </div>
                  ) : train.fileUrl.slice(-4) === ".mp3" ? (
                    <div className="object-fill h-full mt-2 w-full mr-4 shadow-md rounded-lg">
                      <audio controlsList="nodownload" controls>
                        <source
                          src={`http://` + `${train.fileUrl}`}
                          type="audio/mpeg"
                        />
                      </audio>
                    </div>
                  ) : train.fileUrl.slice(-4) === "xlsx" ||
                    train.fileUrl.slice(-4) === ".pdf" ||
                    train.fileUrl.slice(-4) === "docx" ||
                    train.fileUrl.slice(-4) === "pptx" ? (
                    <div className="object-fill h-full mt-2 w-auto  mr-4 shadow-md rounded-lg cursor-pointer">
                      <p
                        className="p-4 text-sm leading-5"
                        onClick={() => window.open(`http://${train.fileUrl}`)}
                      >
                        <span className="block font-medium text-gray-500 ">
                          <i className="bi bi-file-earmark-arrow-down-fill" />
                          Файлын нэр:
                        </span>
                        <span className="inline-block font-medium text-gray-500  ">
                          {train.fileUrl?.slice(29)}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div
                      className="object-fill h-full mt-2 w-auto  mr-4 shadow-md rounded-lg cursor-pointer"
                      onClick={() => window.open(`http://${train.fileUrl}`)}
                    >
                      <div className="flex justify-center">
                        {train.fileUrl.slice(29)}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <video
                  onTimeUpdate={onTimeUpdate}
                  ref={videoRef}
                  className=" w-full shadow-md rounded-lg mt-2"
                  id="myVideo"
                  controls
                >
                  <source
                    src={`http://` + `${train.fileUrl}`}
                    type="video/mp4"
                  />
                </video>
              )}
            </div>
            <div className="w-full  md:w-1/3 ml-4 border border-t-4 rounded-lg shadow-sm">
              <div className="p-4">
                <a className="relative block">
                  <img
                    alt="profil"
                    src="https://banner2.cleanpng.com/20180617/qjv/kisspng-computer-icons-course-teacher-education-school-cisco-5b265ef5104173.7669610515292413330666.jpg"
                    className="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
                <div className="flex flex-col items-center ml-2 ">
                  <span className="dark:text-white font-semibold">
                    {train.teacher === "" ? "" : train.teacher}
                  </span>
                </div>

                <div className="mt-2 text-black cursor-pointer">
                  <p className="font-bold text-md">{train.name}</p>

                  {train.description === "" ? (
                    ""
                  ) : (
                    <p className="text-sm font-semibold">{train.description}</p>
                  )}
                </div>

                <div className="border-t border-gray-200">
                  <div className="px-2 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 ">
                    <p className="text-sm font-medium text-gray-500">Байршил</p>
                    <p className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      📍 {train.location === "" ? " " : train.location}
                    </p>
                  </div>
                  {/* <div className="px-2 py-2 bg-white sm:grid sm:grid-cols-3 sm:gap-4 ">
                    <p className="text-sm font-medium text-gray-500">
                      Эхлэх хугацаа
                    </p>
                    <p className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {train.startDate === "" ? " " : train.startDate}
                    </p>
                  </div> */}
                  <div className="px-2 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 ">
                    <p className="text-sm font-medium text-gray-500">
                      Дуусах хугацаа
                    </p>
                    <p className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formatDate(new Date(train.endDate))}
                    </p>
                    {/* {moment(today).format(format) >=
                    moment(train.endDate).format(format) ? (
                      <p className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Дуусах хугацаа: {train.endDate} (Хугацаа дууссан)
                      </p>
                    ) : (
                      <p className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Дуусах хугацаа: {train.endDate}
                      </p>
                    )} */}
                  </div>
                  {/* <div className="text-right">
                    <div className="inline-flex items-end mt-2">
                      <button
                        onClick={() => {
                          handleEdit();
                        }}
                        className="mr-2 group flex items-center justify-between rounded-lg border border-current px-2 py-1 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white  focus:outline-none focus:ring active:bg-indigo-500"
                        type="button"
                      >
                        {" "}
                        <i className="bi bi-pencil-square mr-1" />
                        <span className="font-bold text-xs">Засварлах</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          showModalDelete();
                        }}
                        className="group flex items-center justify-between rounded-lg border border-current px-2 py-1 text-red-600 transition-colors hover:bg-red-600 hover:text-white  focus:outline-none focus:ring active:bg-red-500"
                      >
                        <i className="bi bi-trash-fill mr-1" />
                        <span className="font-bold text-xs"> Устгах</span>
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center ">
            <div className="mx-auto "></div>

            <div className=" text-sm">
              <div className="p-2 border-t border-b text-xs text-gray-700"></div>
            </div>
          </div>
        </div> */}
      </div>
      <ToastContainer />
    </UserLayout>
  );
};

export default TrainingPlayer;
