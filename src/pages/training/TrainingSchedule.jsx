import React, { useRef, useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
import Pagination from "../../service/Pagination";
function TrainingSchedule() {
  const { width } = getWindowDimensions();
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const today = new Date();
  const format = "YYYYMMDDHHmmss";
  const [trains, setTrains] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [id, setId] = useState();
  const [trigger, setTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const nPages = Math.ceil(filteredList?.length / recordsPerPage);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
            (train) => train.sessionType === "1"
          );
          setTrains(filteredTrains);
          setFilteredList(filteredTrains);
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
        if (res.data.isSuccess === true) {
          setCategory(res.data.trainingCatList);
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
  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide - 3);
  };
  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 3);
  };
  const sliderWidth = `${category.length * 70}px`;
  const sliderTransform = `translateX(-${currentSlide * 70}px)`;

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
  const handleCategoryChange = (name) => {
    setSelectedCategory(name);
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
  useEffect(() => {
    var filteredData = filterByCategory(trains);
    setFilteredList(filteredData);
  }, [selectedCategory]);
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = trains.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
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
  function timeSinceD(duration) {
    var seconds = Math.floor(duration / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " m";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " min";
    }
    return Math.floor(seconds) + " sec";
  }
  const navigateWatched = (data) => {
    navigate("/train-users", {
      state: { data: data, item: "schedule" },
    });
  };
  const navigateCreate = () => {
    navigate("/create-training", {
      state: { item: "schedule" },
    });
  };
  const clickView = (data) => {
    navigate("/clicked-train", {
      state: { data: data, item: "schedule" },
    });
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)]">
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
              <p className="text-xl font-normal text-white text-center">
                Сургалт устгах
              </p>
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
            <p className="font-bold text-md text-gray-900">Сургалтын хуваарь</p>
          </div>

          <div className="flex flex-col gap-4 mt-0 flex-row items-center">
            <button
              onClick={() => {
                navigateCreate();
              }}
              className="block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              Сургалтын хуваарь нэмэх
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
                placeholder="Хайх..."
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
        <div className="relative mt-4">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: sliderWidth, transform: sliderTransform }}
            >
              {category.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(item.name)}
                  className="relative rounded-full px-2 py-2 ml-1 bg-white border border-2 border-gray-200 font-bold text-sm text-black focus:!bg-gray-700 hover:!bg-gray-200 hover:text-white focus:!text-white"
                >
                  <div className="whitespace-nowrap text-sm">
                    🚀 {item.name}
                  </div>
                  <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl pointer-events-none"></div>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handlePrevSlide}
            className={`absolute inset-y-0 left-0 z-10 flex items-center justify-center w-10 h-10 rounded-full ${
              currentSlide === 0 ? "hidden" : ""
            } bg-gray-500 text-white`}
          >
            <i className="bi bi-chevron-left" />
          </button>
          <button
            onClick={handleNextSlide}
            className={`absolute inset-y-0 right-0 z-10 flex items-center justify-center w-10 h-10 rounded-full ${
              currentSlide === Math.ceil(category.length) - 1 ? "hidden" : ""
            } bg-gray-500 text-white`}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </div>
        <div className="mx-auto mt-4  ">
          {filteredList?.map((data, index) => {
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            const duration = endDate.getTime() - startDate.getTime();

            return (
              <div
                key={index}
                className="p-2 flex cursor-pointer border-t border-b text-xs text-gray-700"
              >
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
                  <p
                    className="text-sm font-bold"
                    onClick={() => {
                      clickView(data);
                    }}
                  >
                    {data.name}
                  </p>

                  <div className="flex space-x-4 text-sm">
                    <a className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                      <div className="mr-2">
                        <i className="bi bi-card-text" />
                      </div>
                      <p className="font-semibold">
                        {timeSince(new Date(data.createdAt))}
                      </p>
                    </a>
                    <a
                      onClick={() => {
                        navigateWatched(data);
                      }}
                      className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                    >
                      <div className="group  relative flex justify-center  mr-2">
                        <i className="bi bi-eye" />
                        <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 px-8 text-xs text-white group-hover:scale-100">
                          ✨ Үзсэн.
                        </span>
                      </div>
                      <p className="font-semibold">
                        {
                          data.trainingDevs.filter(
                            (dev) => dev.status === "Үзсэн"
                          ).length
                        }
                      </p>
                    </a>
                    {moment(today).format(format) <=
                    moment(data.startDate).format(format) ? (
                      <a className="flex items-start text-gray-500 transition-colors  group">
                        <div className="mr-2">
                          <i className="bi bi-balloon" />
                        </div>
                        <span className=" px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-200 rounded-md">
                          Pending
                        </span>
                      </a>
                    ) : moment(today).format(format) >=
                        moment(data.startDate).format(format) &&
                      moment(today).format(format) <=
                        moment(data.endDate).format(format) ? (
                      <a className="flex items-start text-green-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                        <div className="mr-2">
                          {" "}
                          <i className="bi bi-calendar-check" />
                        </div>

                        <p className="font-semibold">Идэвхтэй</p>
                      </a>
                    ) : (
                      <a className="flex items-start text-red-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                        <div className="mr-2">
                          <i className="bi bi-calendar2-x" />
                        </div>

                        <p className="font-semibold">Идэвхгүй</p>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filteredList.length > 9 ? (
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

export default TrainingSchedule;
