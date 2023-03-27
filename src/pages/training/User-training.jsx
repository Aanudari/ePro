import UserLayout from "../../components/UserLayout";
import React, { useEffect, useState, useRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const currentTab = location.state?.item;
  const [userTrain, setUserTrain] = useState([]);
  const [activeTab, setActiveTab] = useState(currentTab || "2");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const videoRef = useRef(null);
  const [showReady, setShowReady] = useState(null);
  const hideModalReady = () => setShowReady(null);
  const [chosedTrain, setChosedTrain] = useState();
  const [rates, setRates] = useState([]);
  const options = [
    { id: "2", value: "Онлайн сургалт" },
    { id: "1", value: "Сургалтын хуваарь" },
  ];

  const filteredDataOfType2 = filteredData.filter(
    (data) => data.sessionType === "2"
  );
  const filteredDataOfType1 = filteredData.filter(
    (data) => data.sessionType === "1"
  );
  const nPagesOfType2 = Math.ceil(filteredDataOfType2.length / recordsPerPage);
  const nPagesOfType1 = Math.ceil(filteredDataOfType1.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords2 = filteredDataOfType2.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const currentRecords1 = filteredDataOfType1.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  useEffect(() => {
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [currentTab]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Training`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setUserTrain(res.data.trainingList);
          setFilteredData(res.data.trainingList);
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
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = filteredData.slice(
  //   indexOfFirstRecord,
  //   indexOfLastRecord
  // );
  // const nPage = Math.ceil(filteredData.length / recordsPerPage);

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
          setRates(res.data.trRatingForm);
        } else if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
        } else if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct divat."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const clickView = (data) => {
    setChosedTrain(data);
    if (activeTab === "2") {
      const filteredForm = rates?.filter((item) => item.trainingId === data.id);
      if (filteredForm.length > 0) {
        setShowReady(true);
      } else {
        notification.error("Сургалтанд харгалзах үнэлгээ үүсээгүй байна.");
      }
    } else {
      navigate("/player", {
        state: { data: data, item: activeTab },
      });
    }
  };

  const navigatePlayer = () => {
    if (chosedTrain.status === "Үзсэн") {
      navigate("/player", {
        state: { data: chosedTrain, item: activeTab },
      });
    } else if (chosedTrain.status === "Үзэж байгаа") {
      navigate("/player", {
        state: { data: chosedTrain, item: activeTab },
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
                  state: { data: chosedTrain, item: activeTab },
                }),
              1000
            );
            return () => clearTimeout(timer);
          } else if (
            res.data.resultMessage === "Unauthorized" ||
            res.data.resultMessage ===
              "Input string was not in a correct divat."
          ) {
            logout();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = userTrain.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredData(searchList);
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
    const filteredData = userTrain.filter(
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
          // backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="text-xl font-normal text-white text-center">
                Сургалт үзэх
              </p>
            </Modal.Title>
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
                  value={searchQuery}
                  onChange={handleSearch}
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
          {activeTab === "2" ? (
            <div>
              {currentRecords2.map((data, i) => {
                const startDate = new Date(data.startDate);
                const endDate = new Date(data.endDate);
                const duration = endDate.getTime() - startDate.getTime();
                return (
                  <div className="mx-auto mt-4" key={JSON.stringify(data + i)}>
                    <div className="flex cursor-pointer">
                      <video
                        className="object-fill h-32 w-64 mr-4 shadow-md rounded-lg"
                        ref={videoRef}
                        onClick={() => {
                          clickView(data);
                        }}
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
                  </div>
                );
              })}{" "}
              {/* <div className="mt-3">
                <Pagination
                  nPages={nPagesOfType2}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>{" "} */}
            </div>
          ) : (
            <div>
              {currentRecords1.map((data, i) => {
                return (
                  <div className="mx-auto mt-4 " key={i}>
                    <div className="p-2 flex cursor-pointer border-t border-b text-xs text-gray-700">
                      <div
                        onClick={() => {
                          clickView(data);
                        }}
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
                );
              })}
              {/* <div className="mt-3">
                <Pagination
                  nPages={nPagesOfType1}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div> */}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </UserLayout>
  );
}

export default UserTraining;
