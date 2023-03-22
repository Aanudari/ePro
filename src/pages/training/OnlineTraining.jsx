import React, { useRef, useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import TrainingProgressCell from "./TrainingProgressCell";
import moment from "moment";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
import Pagination from "../../service/Pagination";
function OnlineTraining() {
  const { width } = getWindowDimensions();
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [trains, setTrains] = useState([]);
  const [category, setCategory] = useState([]);
  const [watched, setWatched] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [id, setId] = useState();
  const [trigger, setTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const nPages = Math.ceil(filteredList.length / recordsPerPage);
  const options = [
    { id: "1", value: "Тэнхим" },
    { id: "2", value: "Онлайн" },
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
        if (res.data.isSuccess === true) {
          const filteredTrains = res.data.trainingList?.filter(
            (train) => train.sessionType === "2"
          );
          setTrains(filteredTrains);
          setFilteredList(filteredTrains);
          const filteredTrainingDevs =
            res.data.trainingList[0].trainingDevs.filter(
              (dev) => dev.status === "Үзсэн"
            );
          setWatched(filteredTrainingDevs);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        accept: "text/plain",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Training/category`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setCategory(res.data.trainingCatList);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  const today = new Date();
  const format = "YYYYMMDDHHmmss";
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

  const showModalDelete = (e) => {
    setShowDelete(true);
    setId(e.id);
  };
  const clickView = (data) => {
    navigate("/clicked-train", {
      state: { data: data, item: "" },
    });
  };
  const handleDelete = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/Training/delete?trId=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        } else if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          hideModalDelete();
          setTrigger(!trigger);
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
  const navigateWatched = (data) => {
    navigate("/train-users", {
      state: { data: data },
    });
  };
  const handleEdit = (data) => {
    navigate("/edit-training", {
      state: { data: data },
    });
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = trains.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };
  const filterByCategory = (filteredData) => {
    if (!selectedCategory) {
      return filteredData;
    }
    const filteredTrains = filteredData.filter(
      (tr) => tr.tCatName === selectedCategory
    );
    return filteredTrains;
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  useEffect(() => {
    var filteredData = filterByCategory(trains);
    setFilteredList(filteredData);
  }, [selectedCategory]);
  const navigateCreate = () => {
    navigate("/create-training", {
      state: { item: "" },
    });
  };
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

      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-center text-left">
            <p className="font-bold text-md text-gray-900">Онлайн сургалт</p>
          </div>

          <div className="flex flex-col gap-4 mt-0 flex-row items-center">
            <button
              onClick={() => {
                navigateCreate();
              }}
              className="block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              Сургалт нэмэх
            </button>
          </div>
        </div>
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

        <div className="mx-auto mt-4">
          {filteredList.map((data, index) => {
            return (
              <div key={index} className="flex cursor-pointer">
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
                    <a
                      onClick={() => {
                        navigateWatched(data);
                      }}
                      className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                    >
                      <div className="mr-2">
                        <i className="bi bi-eye" />
                      </div>
                      <p className="font-semibold">
                        {
                          data.trainingDevs.filter(
                            (dev) => dev.status === "Үзсэн"
                          ).length
                        }
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
            );
          })}
          {filteredList.length > 3 ? (
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
      </div>

      <ToastContainer />
    </div>
  );
}

export default OnlineTraining;
