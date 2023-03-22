import React, { useRef, useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
import axios from "axios";
import moment from "moment";
function ClickedTrain() {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const train = location.state.data;
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { width } = getWindowDimensions();
  const today = new Date();
  const format = "YYYYMMDDHHmmss";
  const options = [
    { id: "1", value: "Тэнхим" },
    { id: "2", value: "Онлайн" },
  ];
  function secondsToHms(d) {
    d = Number(d);

    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    return (
      ("0" + h).slice(-2) +
      ":" +
      ("0" + m).slice(-2) +
      ":" +
      ("0" + s).slice(-2)
    );
  }

  const onTimeUpdate = () => {
    let ref = videoRef.current;
  };
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const handleEdit = () => {
    navigate("/edit-training", {
      state: { data: train, item: location.state.item },
    });
  };
  const showModalDelete = () => {
    setShowDelete(true);
  };

  const handleDelete = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/Training/delete?trId=${train.id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        } else if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          hideModalDelete();
          if (location.state.item === "schedule") {
            navigate("/training-schedule");
          } else {
            navigate("/online-training");
          }
        } else {
          console.log(res.data.resultMessage);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
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
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <div>
        {/* Устгах */}
        <Modal
          show={showDelete}
          onHide={hideModalDelete}
          size="ml"
          backdrop="static"
          style={
            width < 768
              ? {
                  width: "calc(100%)",
                  left: "0",
                }
              : {
                  width: "calc(100% - 250px)",
                  left: "250px",
                }
          }
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="text-sm text-black">Сургалт устгах</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <p className="mb-5 text-sm font-normal text-gray-500 ">
                Та сургалтыг устгахдаа итгэлтэй байна уу?
              </p>
              <button
                type="button"
                onClick={handleDelete}
                className="text-white text-sm bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg  inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Тийм
              </button>
              <button
                onClick={hideModalDelete}
                type="button"
                className="text-gray-500 text-sm bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200  font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
              >
                Үгүй
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Navigation />
      <div className="w-full">
        <div class="px-4 py-2">
          <a
            onClick={() => {
              location.state.item === "schedule"
                ? navigate("/training-schedule")
                : navigate("/online-training");
            }}
            className="text-sm font-bold text-gray-900 sm:text-sm cursor-pointer"
          >
            <i className="bi bi-backspace" />
            <span className="mx-2">Буцах</span>
          </a>
          <div class="flex flex-col mx-auto md:flex-row mt-2">
            <div class="w-full md:w-2/3">
              {location.state.item === "schedule" ? (
                <span class="rounded-md bg-gray-200 px-2.5 py-0.5 text-sm text-gray-600 font-bold mr-1">
                  {timeSince(new Date(train.createdAt))}
                </span>
              ) : (
                ""
              )}
              <span class="rounded-md bg-purple-200 px-2.5 py-0.5 text-sm text-purple-600 font-bold ">
                {train.tCatName}
              </span>
              {location.state.item === "schedule" ? (
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
            <div class="w-full  md:w-1/3 ml-4 border border-t-4 rounded-lg shadow-sm">
              <div className="p-4">
                <a class="relative block">
                  <img
                    alt="profil"
                    src="https://banner2.cleanpng.com/20180617/qjv/kisspng-computer-icons-course-teacher-education-school-cisco-5b265ef5104173.7669610515292413330666.jpg"
                    class="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
                <div class="flex flex-col items-center ml-2 ">
                  <span class="dark:text-white font-semibold">
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

                <div class="border-t border-gray-200">
                  <div class="px-2 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 ">
                    <p class="text-sm font-medium text-gray-500">Байршил</p>
                    <p class="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {train.location === "" ? " " : train.location}
                    </p>
                  </div>
                  <div class="px-2 py-2 bg-white sm:grid sm:grid-cols-3 sm:gap-4 ">
                    <p class="text-sm font-medium text-gray-500">
                      Эхлэх хугацаа
                    </p>
                    <p class="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {train.startDate === "" ? " " : train.startDate}
                    </p>
                  </div>
                  <div class="px-2 py-2 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 ">
                    <p class="text-sm font-medium text-gray-500">
                      Дуусах хугацаа
                    </p>

                    {moment(today).format(format) >=
                    moment(train.endDate).format(format) ? (
                      <p class="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Дуусах хугацаа: {train.endDate} (Хугацаа дууссан)
                      </p>
                    ) : (
                      <p class="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Дуусах хугацаа: {train.endDate}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
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
                  </div>
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
    </div>
  );
}

export default ClickedTrain;
