import UserLayout from "../../components/UserLayout";
import React, { useEffect, useState, useRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import { Modal } from "react-bootstrap";
import { notification } from "../../service/toast";
import moment from "moment";
import Pagination from "../../service/Pagination";
function UserTraining() {
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();
  const [userTrain, setUserTrain] = useState([]);
  const [activeTab, setActiveTab] = useState("2");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const options = [
    { id: "2", value: "Онлайн сургалт" },
    { id: "1", value: "Сургалтын хуваарь" },
  ];
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
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(filteredData.length / recordsPerPage);
  const videoRef = useRef(null);
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
          } else if (
            res.data.resultMessage == "Unauthorized" ||
            res.data.resultMessage == "Input string was not in a correct divat."
          ) {
            logout();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const today = new Date();
  const format = "YYYYMMDDHHmmss";
  const nowdateTime = moment(today).format(format);
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
  useEffect(() => {
    var filteredData = userTrain.filter(
      (item) => item.sessionType === activeTab
    );
    setFilteredData(filteredData);
  }, [activeTab]);
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
              <p className="mb-5 text-sm font-normal text-gray-500 ">
                Та сургалтыг эхлүүлэх гэж байна.
              </p>
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
                      <p className="text-sm font-bold text-white md:text-sm">
                        {chosedTrain?.name}
                      </p>
                      <p className="hidden text-white/90 sm:mt-4 sm:block">
                        {chosedTrain?.description}
                      </p>
                    </div>
                    <div>
                      <button>Үнэлгээ өгөх</button>
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
                      <p className="flex justify-center w-full  items-center mx-auto  text-sm ">
                        <span className="text-sm  block  text-gray-500 ">
                          <i className="bi bi-play-circle-fill font-bold">
                            {" "}
                            Файлын нэр:
                          </i>
                        </span>
                        <span className="inline-block font-bold text-gray-500 ml-2">
                          {chosedTrain?.fileUrl.slice(29)}
                        </span>
                        <a
                          className="text-blue-600 hover:text-black mx-2 text-sm"
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
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
          {userTrain.length === 0 ? (
            <p className="flex items-center w-full font-semibold text-sm p-4">
              Танд сургалт хувиарлагдаагүй байна.
            </p>
          ) : (
            <p className="flex items-center w-full font-semibold text-sm p-4">
              Танд дараах сургалтууд хувиарлагдсан байна.
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="text-center text-left">
              <div className="relative">
                <input
                  // value={searchQuery}
                  // onChange={handleSearch}
                  className="h-10 px-6 py-2  rounded-lg border-2 border-gray-400 outline-none focus:border-indigo-500  pr-10 text-sm placeholder-gray-400 focus:z-10"
                  placeholder="Сургалтын нэрээр хайх..."
                  type="text"
                />

                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 rounded-r-lg p-2 text-gray-600"
                >
                  <i className="bi bi-search" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ul className="flex flex-wrap -mb-px">
              {options.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="mr-2"
                >
                  <p
                    className={
                      activeTab === `${item.id}`
                        ? "inline-block p-2 font-bold text-purple-600 border-b-2 border-purple-600 rounded-t-lg active "
                        : "inline-block p-2 font-bold border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
                    }
                  >
                    {item.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="overflow-x-auto p-2">
          {currentRecords.map((data, i) => {
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            const duration = endDate.getTime() - startDate.getTime();
            return (
              activeTab === `${data.sessionType}` &&
              (data.sessionType === "1" ? (
                <div className="mx-auto mt-4  ">
                  <div className="p-2 flex cursor-pointer border-t border-b text-xs text-gray-700">
                    <div
                    // onClick={() => {
                    //   clickView(data);
                    // }}
                    >
                      {data.fileUrl.slice(-4) === ".png" ||
                      data.fileUrl.slice(-4) === "jpeg" ||
                      data.fileUrl.slice(-4) === ".jpg" ||
                      data.fileUrl.slice(-4) === ".png" ||
                      data.fileUrl.slice(-4) === ".gif" ? (
                        <div className="flex justify-center">
                          <img
                            className="object-fill h-32 w-full mr-4 shadow-md rounded-lg"
                            src={`http://` + `${data.fileUrl}`}
                          />
                        </div>
                      ) : data.fileUrl.slice(-4) === ".mp3" ? (
                        <div className="object-fill h-32 w-full mr-4 shadow-md rounded-lg">
                          <audio controlsList="nodownload" controls>
                            <source
                              src={`http://` + `${data.fileUrl}`}
                              type="audio/mpeg"
                            />
                          </audio>
                        </div>
                      ) : data.fileUrl.slice(-4) === "xlsx" ||
                        data.fileUrl.slice(-4) === ".pdf" ||
                        data.fileUrl.slice(-4) === "docx" ||
                        data.fileUrl.slice(-4) === "pptx" ? (
                        <div className="object-fill h-32 w-auto  mr-4 shadow-md rounded-lg">
                          <p className="p-4 text-sm leading-5  ">
                            <span className="block font-medium text-gray-500 ">
                              <i className="bi bi-file-earmark-arrow-down-fill" />{" "}
                              Файлын нэр:
                            </span>
                            <span className="inline-block font-medium text-gray-500  ">
                              {data.fileUrl?.slice(29)}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <div className="object-fill h-32 w-auto  mr-4 shadow-md rounded-lg">
                          <div className="flex justify-center">
                            {data.fileUrl.slice(29)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center  p-1">
                      <p className="text-xs font-semibold text-gray-600">
                        {data.teacher}
                        {/* {timeSinceD(duration)} */}
                      </p>
                      <p className="text-sm font-bold">{data.name}</p>

                      <div className="flex space-x-4 text-sm">
                        <a className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                          <div className="mr-2">
                            <i className="bi bi-card-text" />
                          </div>
                          <p className="font-semibold">
                            {timeSince(new Date(data.createdAt))}
                          </p>
                        </a>
                        {moment(today).format(format) >=
                        moment(data.endDate).format(format) ? (
                          <a className="flex items-start text-red-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                            <div className="mr-2">
                              <i className="bi bi-calendar2-x" />
                            </div>
                            <p className="font-semibold">ИДЭВХГҮЙ</p>
                          </a>
                        ) : (
                          <a className="flex items-start text-green-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                            <div className="mr-2">
                              <i className="bi bi-calendar-check" />
                            </div>
                            <p className="font-semibold">ИДЭВХТЭЙ</p>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto mt-4">
                  <div key={i} className="flex cursor-pointer">
                    <video
                      className="object-fill h-32 w-64 mr-4 shadow-md rounded-lg"
                      ref={videoRef}
                      // onClick={() => {
                      //   clickView(data);
                      // }}
                    >
                      <source
                        src={`http://` + `${data.fileUrl}`}
                        type="video/mp4"
                      />
                    </video>
                    <div className="flex flex-col justify-center  p-1">
                      <p className="text-xs font-semibold text-gray-600">
                        {data.teacher} * {timeSince(new Date(data.createdAt))}
                      </p>
                      <p className="text-sm font-bold">{data.name}</p>

                      <div className="flex space-x-4 text-sm">
                        <a className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                          <div className="mr-2">
                            <i className="bi bi-camera-video" />
                          </div>
                          <p className="font-semibold">
                            {formatDuration(data.duration)}
                          </p>
                        </a>

                        {moment(today).format(format) >=
                        moment(data.endDate).format(format) ? (
                          <a className="flex items-start text-red-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                            <div className="mr-2">
                              <i className="bi bi-calendar2-x" />
                            </div>
                            <p className="font-semibold">ИДЭВХГҮЙ</p>
                          </a>
                        ) : (
                          <a className="flex items-start text-green-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                            <div className="mr-2">
                              <i className="bi bi-calendar-check" />
                            </div>
                            <p className="font-semibold">ИДЭВХТЭЙ</p>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {currentRecords.length > 3 ? (
                    <div className="mt-3">
                      <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))
            );
          })}
        </div>

        {currentRecords.length > 9 ? (
          <div className="mt-3">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </UserLayout>
  );
}

export default UserTraining;
