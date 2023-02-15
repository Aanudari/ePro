import UserLayout from "../../components/UserLayout";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import { Modal } from "react-bootstrap";
import { notification } from "../../service/toast";
import moment from "moment";
function UserTraining() {
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();
  const [userTrain, setUserTrain] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Training`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess == true) {
          setUserTrain(res.data.trainingList);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const [showed, setShowed] = useState(false);
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " цаг, " : " цаг, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " минут, " : " минут, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " секунд" : " секунд") : "";
    return hDisplay + mDisplay + sDisplay;
  }
  const [showReady, setShowReady] = useState(null);
  const hideModalReady = () => setShowReady(null);
  const [showReadyTenhim, setShowReadyTenhim] = useState(null);
  const hideModalReadyTenhim = () => setShowReadyTenhim(null);
  const [chosedTrain, setChosedTrain] = useState();
  const showModalReady = (data) => {
    setShowReady(true);
    setChosedTrain(data);
  };
  const showModalTenhim = (data) => {
    console.log(data);
    setShowReadyTenhim(true);
    setChosedTrain(data);
  };
  const navigatePlayer = () => {
    if (chosedTrain.status === "Үзсэн") {
      navigate("/player", {
        state: { data: chosedTrain },
      });
    } else if (chosedTrain.status === "Үзэж байгаа") {
      navigate("/player", {
        state: { data: chosedTrain },
      });
    } else {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/Training/watch/start`,
        data: {
          trainingId: `${chosedTrain.id}`,
        },
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`Сургалт эхэлсэн цаг бүртгэгдлээ.`);
            const timer = setTimeout(
              () =>
                navigate("/player", {
                  state: { data: chosedTrain },
                }),
              1000
            );
            return () => clearTimeout(timer);
          }
          if (res.data.isSuccess === false) {
            notification.error(`${res.data.resultMessage}`);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  let nokori = [];
  const gotYa = (value) => {
    nokori.push(value);
  };
  userTrain?.map((exam) => {
    if (exam.sessionType == "0") {
      return gotYa(exam.sessionType);
    }
  });
  const [detector, setDetector] = useState(0);
  const indexed = [
    { id: "1", value: "Тэнхим" },
    { id: "2", value: "Онлайн" },
  ];
  let tempo = [userTrain];
  for (let index = 0; index < indexed?.length; index++) {
    const element = indexed[index];
    let temp = [];
    for (let i = 0; i < userTrain?.length; i++) {
      const el = userTrain[i];
      if (el.sessionType == element.id) {
        temp.push(el);
      }
    }
    tempo.push(temp);
  }
  const today = new Date();
  const format = "YYYYMMDDHHmmss";
  const nowdateTime = moment(today).format(format);

  return (
    <UserLayout>
      <div>
        <Modal
          show={showReady}
          onHide={hideModalReady}
          size="ml"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалт үзэх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                Та сургалтыг эхлүүлэх гэж байна.
              </h3>
              <button
                type="button"
                onClick={navigatePlayer}
                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Тийм
              </button>
              <button
                onClick={hideModalReady}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
              >
                Үгүй
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showReadyTenhim}
          onHide={hideModalReadyTenhim}
          size="xl"
          // backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалтын мэдээлэл</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="max-w-screen-xl ml-auto mr-auto">
              <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
                    <div className="mx-auto max-w-xl text-center">
                      <h2 className="text-2xl font-bold text-white md:text-3xl">
                        {chosedTrain?.name}
                      </h2>
                      <p className="hidden text-white/90 sm:mt-4 sm:block">
                        {chosedTrain?.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
                    {chosedTrain?.fileUrl.slice(-4) === ".png" ||
                    chosedTrain?.fileUrl.slice(-4) === "jpeg" ||
                    chosedTrain?.fileUrl.slice(-4) === ".jpg" ||
                    chosedTrain?.fileUrl.slice(-4) === ".png" ||
                    chosedTrain?.fileUrl.slice(-4) === ".gif" ? (
                      <div className="flex justify-center">
                        <img
                          className="items-center mx-auto h-40 w-full object-cover sm:h-56 md:h-full rounded-xl"
                          src={`http://` + `${chosedTrain?.fileUrl}`}
                        />
                      </div>
                    ) : chosedTrain?.fileUrl.slice(-4) === ".mp3" ? (
                      <div className="flex justify-center items-center mx-auto h-40 w-full object-cover sm:h-56 md:h-full ">
                        <audio
                          controlsList="nodownload"
                          controls
                          className="object-cover w-full  items-center mx-auto py-12 px-12 sm:px-2 lg:py-2 lg:px-2 z-10 rounded-2xl bg-indigo-200 "
                        >
                          <source
                            src={`http://` + `${chosedTrain?.fileUrl}`}
                            type="audio/mpeg"
                          />
                        </audio>
                      </div>
                    ) : chosedTrain?.fileUrl.slice(-4) === "xlsx" ||
                      chosedTrain?.fileUrl.slice(-4) === ".pdf" ||
                      chosedTrain?.fileUrl.slice(-4) === "docx" ||
                      chosedTrain?.fileUrl.slice(-4) === "pptx" ? (
                      <p className="flex justify-center w-full  items-center mx-auto  text-md ">
                        <span className="text-md  block  text-gray-500 ">
                          <i className="bi bi-play-circle-fill font-bold">
                            {" "}
                            Файлын нэр:
                          </i>
                        </span>
                        <span className="inline-block font-bold text-gray-500 ml-2">
                          {chosedTrain?.fileUrl.slice(29)}
                        </span>
                        <a
                          className="text-blue-600 hover:text-black mx-2 text-lg"
                          data-id={chosedTrain?.fileUrl}
                          onClick={() =>
                            window.open(`http://${chosedTrain?.fileUrl}`)
                          }
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
          </Modal.Body>
        </Modal>
      </div>
      <div className="max-w-screen-xl ml-auto mr-auto">
        <div className="content">
          <div className="content-panel">
            <div className="vertical-tabs">
              <a
                onClick={() => {
                  setDetector(0);
                }}
                className={`${detector == 0 && "active"}`}
              >
                Бүгд
              </a>
              <a
                onClick={() => {
                  setDetector(1);
                }}
                className={`${detector == 1 && "active"}`}
              >
                Тэнхим
              </a>
              <a
                onClick={() => {
                  setDetector(2);
                }}
                className={`${detector == 2 && "active"}`}
              >
                Онлайн
              </a>
            </div>
          </div>
          <div className="content-main">
            {userTrain.length === 0 ? (
              <div
                className={
                  showed
                    ? "hidden"
                    : "mt-2 flex items-center px-4 mb-2 text-gray-800 border-2 border-blue-500 rounded-md jusitfy-between"
                }
              >
                <div className="flex items-center w-full ">
                  Танд сургалт хувиарлагдаагүй байна.
                </div>
                <button
                  onClick={(e) => setShowed(true)}
                  type="button"
                  className="flex flex-shrink-0 p-2 -mr-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:-mr-2"
                >
                  <span className="sr-only">X</span>
                  <i className="bi bi-x" />
                </button>
              </div>
            ) : (
              <div
                className={
                  showed
                    ? "hidden"
                    : "mt-2 flex items-center px-4 mb-2 text-gray-800  border-2 border-blue-500  rounded-md jusitfy-between"
                }
              >
                <div className="flex items-center w-full">
                  Танд дараах сургалтууд хувиарлагдсан байна.
                </div>
                <button
                  onClick={(e) => setShowed(true)}
                  type="button"
                  className="flex flex-shrink-0 p-2 -mr-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:-mr-2"
                >
                  <span className="sr-only">X</span>
                  <i className="bi bi-x" />
                </button>
              </div>
            )}
            <div className="flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tempo[detector]?.map((data, i) => (
                  <div key={i} className="mx-auto w-full">
                    {detector === 1 && data.duration === "" ? (
                      <div>
                        {nowdateTime <= moment(data.endDate).format(format) ? (
                          <div className="w-full mt-4 p-4 border border-2 block bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between mb-4 space-x-12">
                              <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 bg-green-200 rounded-md">
                                ИДЭВХТЭЙ
                              </span>

                              {/* {data.status === "Үзээгүй" ? (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-500 rounded-md bg-white rounded-md">
                                  ҮЗЭЭГҮЙ
                                </span>
                              ) : data.status === "Үзсэн" ? (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-400 border-2 border-green-500 rounded-md bg-white rounded-md">
                                  ҮЗСЭН
                                </span>
                              ) : (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-amber-400 border-2 border-amber-500 rounded-md bg-white rounded-md">
                                  ҮЗЭЖ БАЙГАА{" "}
                                </span>
                              )} */}
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="flex flex-col">
                                  <span className="font-bold text-black text-md dark:text-white">
                                    {data.name}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-white">
                                    {data.description}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Багш:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md">
                                  {data.teacher}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              {data.duration === "" ? (
                                ""
                              ) : (
                                <div className="flex items-center">
                                  <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                    Үргэлжлэх хугацаа:
                                  </span>
                                  <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                    {secondsToHms(data.duration)}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Байршил:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                  {data.location}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center mt-4">
                              <button
                                type="button"
                                onClick={() => {
                                  showModalTenhim(data);
                                }}
                                className="py-2 text-sm bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-400 text-center  font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                              >
                                Сургалт харах
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full mt-4 p-4 border border-2 block bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between mb-4 space-x-12">
                              <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-500 bg-red-200 rounded-md">
                                ИДЭВХГҮЙ
                              </span>

                              {/* {data.status === "Үзээгүй" ? (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-500 rounded-md bg-white rounded-md">
                                  ҮЗЭЭГҮЙ
                                </span>
                              ) : data.status === "Үзсэн" ? (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-400 border-2 border-green-500 rounded-md bg-white rounded-md">
                                  ҮЗСЭН
                                </span>
                              ) : (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-amber-400 border-2 border-amber-500 rounded-md bg-white rounded-md">
                                  ҮЗЭЖ ДУУСГААГҮЙ
                                </span>
                              )} */}
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="flex flex-col">
                                  <span className="font-bold text-black text-md dark:text-white">
                                    {data.name}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-white">
                                    {data.description}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Багш:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md">
                                  {data.teacher}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Үргэлжлэх хугацаа:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                  {secondsToHms(data.duration)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Байршил:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                  {data.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : detector === 2 && data.duration !== "" ? (
                      <div>
                        {nowdateTime <= moment(data.endDate).format(format) ? (
                          <div className="w-full mt-4 p-4 border border-2 block bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between mb-4 space-x-12">
                              <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 bg-green-200 rounded-md">
                                ИДЭВХТЭЙ
                              </span>

                              {data.status === "Үзээгүй" ? (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-500 rounded-md bg-white rounded-md">
                                  ҮЗЭЭГҮЙ
                                </span>
                              ) : data.status === "Үзсэн" ? (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-400 border-2 border-green-500 rounded-md bg-white rounded-md">
                                  ҮЗСЭН
                                </span>
                              ) : (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-amber-400 border-2 border-amber-500 rounded-md bg-white rounded-md">
                                  ҮЗЭЖ БАЙНА
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="flex flex-col">
                                  <span className="font-bold text-black text-md dark:text-white">
                                    {data.name}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-white">
                                    {data.description}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Багш:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md">
                                  {data.teacher}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              {data.duration === "" ? (
                                ""
                              ) : (
                                <div className="flex items-center">
                                  <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                    Үргэлжлэх хугацаа:
                                  </span>
                                  <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                    {secondsToHms(data.duration)}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Байршил:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                  {data.location}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center mt-4">
                              <button
                                type="button"
                                onClick={() => {
                                  showModalReady(data);
                                }}
                                className="py-2 text-sm bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-400 text-center  font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                              >
                                Сургалт үзэх
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full mt-4 p-4 border border-2 block bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between mb-4 space-x-12">
                              <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 bg-red-200 rounded-md">
                                ИДЭВХГҮЙ
                              </span>

                              {data.status === "Үзээгүй" ? (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-500 rounded-md bg-white rounded-md">
                                  ҮЗЭЭГҮЙ
                                </span>
                              ) : data.status === "Үзсэн" ? (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-400 border-2 border-green-500 rounded-md bg-white rounded-md">
                                  ҮЗСЭН
                                </span>
                              ) : (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-amber-400 border-2 border-amber-500 rounded-md bg-white rounded-md">
                                  ҮЗЭЖ ДУУСГААГҮЙ
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="flex flex-col">
                                  <span className="font-bold text-black text-md dark:text-white">
                                    {data.name}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-white">
                                    {data.description}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Багш:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md">
                                  {data.teacher}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Үргэлжлэх хугацаа:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                  {secondsToHms(data.duration)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Байршил:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                  {data.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {nowdateTime <= moment(data.endDate).format(format) ? (
                          <div className="w-full mt-4 p-4 border border-2 block bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between mb-4 space-x-12">
                              <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 bg-green-200 rounded-md">
                                ИДЭВХТЭЙ
                              </span>

                              {data.sessionType === "1" ? (
                                ""
                              ) : (
                                <div>
                                  {" "}
                                  {data.status === "Үзээгүй" ? (
                                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-500 rounded-md bg-white rounded-md">
                                      ҮЗЭЭГҮЙ
                                    </span>
                                  ) : data.status === "Үзсэн" ? (
                                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-400 border-2 border-green-500 rounded-md bg-white rounded-md">
                                      ҮЗСЭН
                                    </span>
                                  ) : (
                                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-amber-400 border-2 border-amber-500 rounded-md bg-white rounded-md">
                                      ҮЗЭЖ БАЙНА
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="flex flex-col">
                                  <span className="font-bold text-black text-md dark:text-white">
                                    {data.name}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-white">
                                    {data.description}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Багш:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md">
                                  {data.teacher}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              {data.duration === "" ? (
                                ""
                              ) : (
                                <div className="flex items-center">
                                  <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                    Үргэлжлэх хугацаа:
                                  </span>
                                  <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                    {secondsToHms(data.duration)}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Байршил:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                  {data.location}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center mt-4">
                              {data.duration === "" ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    showModalTenhim(data);
                                  }}
                                  className="py-2 text-sm bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-400 text-center  font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                  Сургалт харах
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    showModalReady(data);
                                  }}
                                  className="py-2 text-sm bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-400 text-center  font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                  Сургалт үзэх
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full mt-4 p-4 border border-2 block bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between mb-4 space-x-12">
                              <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 bg-red-200 rounded-md">
                                ИДЭВХГҮЙ
                              </span>

                              {data.sessionType === "1" ? (
                                ""
                              ) : (
                                <div>
                                  {" "}
                                  {data.status === "Үзээгүй" ? (
                                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-500 rounded-md bg-white rounded-md">
                                      ҮЗЭЭГҮЙ
                                    </span>
                                  ) : data.status === "Үзсэн" ? (
                                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-400 border-2 border-green-500 rounded-md bg-white rounded-md">
                                      ҮЗСЭН
                                    </span>
                                  ) : (
                                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-amber-400 border-2 border-amber-500 rounded-md bg-white rounded-md">
                                      ҮЗЭЖ БАЙНА
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="flex flex-col">
                                  <span className="font-bold text-black text-md dark:text-white">
                                    {data.name}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-white">
                                    {data.description}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Багш:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md">
                                  {data.teacher}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Үргэлжлэх хугацаа:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                  {secondsToHms(data.duration)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center">
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                                  Байршил:
                                </span>
                                <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                                  {data.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </UserLayout>
  );
}

export default UserTraining;
