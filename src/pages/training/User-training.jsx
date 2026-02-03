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
    (data) => data.sessionType === "2",
  );
  const filteredDataOfType1 = filteredData.filter(
    (data) => data.sessionType === "1",
  );
  const nPagesOfType2 = Math.ceil(filteredDataOfType2.length / recordsPerPage);
  const nPagesOfType1 = Math.ceil(filteredDataOfType1.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords2 = filteredDataOfType2.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );
  const currentRecords1 = filteredDataOfType1.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
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
          // notification.error(`${res.data.resultMessage}`);
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
      if (data?.status === "Үзсэн") {
        navigate("/player", {
          state: { data: data, item: activeTab },
        });
      } else if (data?.status === "Үзэж байгаа") {
        navigate("/player", {
          state: { data: data, item: activeTab },
        });
      } else {
        setShowReady(true);
      }
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
          trainingId: `${data.id}`,
        },
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            // notification.success(`Сургалт эхэлсэн цаг бүртгэгдлээ.`);
            const timer = setTimeout(
              () =>
                navigate("/player", {
                  state: { data: data, item: activeTab },
                }),
              1000,
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

  const navigatePlayer = () => {
    if (chosedTrain?.status === "Үзсэн") {
      navigate("/player", {
        state: { data: chosedTrain, item: activeTab },
      });
    } else if (chosedTrain?.status === "Үзэж байгаа") {
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
              1000,
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
      (item) => item.sessionType === activeTab,
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
      {/* MODAL */}
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
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        {/* SEARCH */}

        <div className="relative w-full max-w-md">
          <input
            value={searchQuery}
            onChange={handleSearch}
            className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Нэрээр хайх..."
            type="text"
          />

          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
            <i className="bi bi-search" />
          </button>
        </div>

        {/* TABS */}

        <div className="flex border-b border-gray-200 mb-4">
          {options.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 -mb-px font-semibold rounded-t-lg ${
                activeTab === tab.id
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
              }`}
            >
              {tab.value}
            </button>
          ))}
        </div>

        {(activeTab === "2" ? currentRecords2 : currentRecords1).map(
          (data, i) => {
            // Check file type
            const isImage = [".png", ".jpeg", ".jpg", ".gif"].some((ext) =>
              data.fileUrl.toLowerCase().endsWith(ext),
            );
            const isAudio = data.fileUrl.endsWith(".mp3");
            const isVideo = data.fileUrl.endsWith(".mp4");
            const isFile = [".xlsx", ".pdf", ".docx", ".pptx"].some((ext) =>
              data.fileUrl.toLowerCase().endsWith(ext),
            );

            const isActive = new Date() < new Date(data.endDate);

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                <div className="rounded overflow-hidden shadow-lg flex flex-col">
                  <div
                    key={i}
                    onClick={() => clickView(data)}
                    className="relative"
                  >
                    <a>
                      {isImage && (
                        <img
                          src={`http://${data.fileUrl}`}
                          className="w-full"
                        />
                      )}
                      {isVideo && (
                        <video className="w-full">
                          <source
                            src={`http://${data.fileUrl}`}
                            type="video/mp4"
                          />
                        </video>
                      )}
                      {isAudio && (
                        <i className="bi bi-music-note-beamed text-4xl text-gray-400" />
                      )}
                      {isFile && (
                        <i className="bi bi-file-earmark-text text-4xl text-gray-400" />
                      )}
                    </a>
                    <a>
                      <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:text-indigo-600 transition duration-500 ease-in-out">
                        {data.teacher} · {timeSince(new Date(data.createdAt))}
                      </div>
                    </a>
                  </div>
                  <div className="px-6 py-4 mb-auto">
                    {/* TRAIN NAME */}
                    <a className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                      {data.name}
                    </a>
                    {/* TRAIN DESC */}
                    <p className="text-gray-500 text-sm">{data.description}</p>
                  </div>
                  <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                    <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                      <i className="bi bi-clock-history"></i>
                      <span className="ml-1">
                        {" "}
                        {formatDuration(data.duration)}
                      </span>
                    </span>

                    <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                      <span
                        className={`font-semibold ${
                          isActive ? "text-green-600 ml-1" : "text-red-600 ml-1"
                        }`}
                      >
                        {isActive ? "Идэвхтэй" : "Идэвхгүй"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>

      <ToastContainer />
    </UserLayout>
  );
}

export default UserTraining;
