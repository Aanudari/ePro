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

const TrainingPlayer = () => {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const trn = location.state.data;
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
        if (res.data.isSuccess === false) {
        } else if (res.data.isSuccess === true) {
          console.log(res.data);
          const findRate = res.data.trRatingForm.find((item) => {
            return item.trainingId === trn.id;
          });
          setTRate(findRate);
        } else if (
          res.data.resultMessage == "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct divat."
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
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/${trn.id}/1`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        } else if (res.data.isSuccess === true) {
          console.log(res.data);
          setQ1(res.data.trainingRatingForm.trRatingQuestions);
        } else if (
          res.data.resultMessage == "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct divat."
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
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/${trn.id}/2`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        } else if (res.data.isSuccess === true) {
          setQ2(res.data.trainingRatingForm.trRatingQuestions);
        } else if (
          res.data.resultMessage == "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct divat."
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
        if (trn.status === "Үзсэн") {
          setShowTRate(true);
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
              trainingId: `${trn.id}`,
            },
          })
            .then((res) => {
              if (res.data.isSuccess === true) {
                notification.success(`Сургалт дууссан цаг бүртгэгдлээ.`);
                const timer = setTimeout(() => setShowTRate(true), 500);
                return () => clearTimeout(timer);
              } else if (
                res.data.resultMessage == "Unauthorized" ||
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
      trainingId: `${trn.id}`,
      ratingId: `${tRate.id}`,
      trRateQuestion: mergedArrayByKey,
    };
    if (mergedArrayByKey.length != tRate.trRatingQuestions.length) {
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
        if (res.data.isSuccess == true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => {
            hideModalGiveRate();
            navigate("/user-training");
          }, 1500);
          return () => clearTimeout(timer);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      });
    }
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
            <Modal.Title>Сургалтанд үнэлгээ өгөх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="w-full bg-white  mx-auto ">
              <div className="relative block">
                <div>
                  <p className="mt-2 text-sm font-bold text-gray-900">
                    {tRate?.name}
                  </p>
                  <p className="mt-2 hidden text-sm sm:block">
                    {tRate?.description}
                  </p>
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
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <p className="text-sm font-bold text-white md:text-sm">
                  {trn.name}
                </p>
                <p className="hidden text-white/90 sm:mt-4 sm:block">
                  {trn.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
              {trn.fileUrl.slice(-4) === ".mp4" ? (
                <video
                  onTimeUpdate={onTimeUpdate}
                  className="items-center mx-auto h-40 w-full object-cover sm:h-56 md:h-full rounded-xl"
                  ref={videoRef}
                  // width="20%"
                  // height="100%"
                  id="myVideo"
                  controls
                >
                  <source src={`http://` + `${trn.fileUrl}`} type="video/mp4" />
                </video>
              ) : trn.fileUrl.slice(-4) === ".png" ||
                trn.fileUrl.slice(-4) === "jpeg" ||
                trn.fileUrl.slice(-4) === ".jpg" ||
                trn.fileUrl.slice(-4) === ".png" ||
                trn.fileUrl.slice(-4) === ".gif" ? (
                <div className="flex justify-center">
                  <img
                    className="items-center mx-auto h-40 w-full object-cover sm:h-56 md:h-full rounded-xl"
                    src={`http://` + `${trn.fileUrl}`}
                  />
                </div>
              ) : trn.fileUrl.slice(-4) === ".mp3" ? (
                <div className="flex justify-center items-center mx-auto h-40 w-full object-cover sm:h-56 md:h-full ">
                  <audio
                    controlsList="nodownload"
                    controls
                    className="object-cover w-full  items-center mx-auto py-12 px-12 sm:px-2 lg:py-2 lg:px-2 z-10 rounded-2xl bg-indigo-200 "
                  >
                    <source
                      src={`http://` + `${trn.fileUrl}`}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              ) : trn.fileUrl.slice(-4) === "xlsx" ||
                trn.fileUrl.slice(-4) === ".pdf" ||
                trn.fileUrl.slice(-4) === "docx" ||
                trn.fileUrl.slice(-4) === "pptx" ? (
                <p className="flex justify-center w-full  items-center mx-auto  text-sm ">
                  <span className="text-sm  block  text-gray-500 ">
                    <i className="bi bi-play-circle-fill font-bold">
                      {" "}
                      Файлын нэр:
                    </i>
                  </span>
                  <span className="inline-block font-bold text-gray-500 ml-2">
                    {trn.fileUrl.slice(29)}
                  </span>
                  <a
                    className="text-blue-600 hover:text-black mx-2 text-sm"
                    data-id={trn.fileUrl}
                    onClick={() => window.open(`http://${trn.fileUrl}`)}
                  >
                    <i className="bi bi-download"></i>
                  </a>
                </p>
              ) : (
                <div className="rounded border-l-4 border-red-500 bg-red-50 p-4">
                  <strong className="block font-medium text-red-700">
                    Файл хавсаргаагүй байна.
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </UserLayout>
  );
};

export default TrainingPlayer;
