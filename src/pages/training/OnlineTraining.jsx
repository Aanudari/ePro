import React, { useRef, useState, useEffect, createRef } from "react";
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
import Dropdown from "react-bootstrap/Dropdown";

function OnlineTraining() {
  const { width } = getWindowDimensions();
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const videoRef = useRef(null);
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
  const [selectedYear, setSelectedYear] = useState("");
  const [rates, setRates] = useState([]);
  const icons = ["🚀", "🔥", "✨", "🎯", "📚", "💡", "⚡", "🧠", "🎓", "📊"];

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };
  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };
  const sliderWidth = `${category.length}px`;
  const sliderTransform = `translateX(-${currentSlide * 70}px)`;
  const videoRefs = [];
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
            (train) => train.sessionType === "2",
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
        } else if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct divat."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  const today = new Date();
  const format = "YYYYMMDDHHmmss";
  const years = trains.map((item) => new Date(item.createdAt).getFullYear());
  const uniqueYears = [...new Set(years)];
  const filterByYear = (filteredData) => {
    if (!selectedYear) {
      return filteredData;
    }
    const filteredTrains = filteredData.filter((item) => {
      if (selectedYear === new Date(item.createdAt).getFullYear()) {
        return item;
      }
      // (item) => new Date(item.createdAt).getFullYear() === selectedYear
    });
    return filteredTrains;
  };
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
  const handleYearChange = (y) => {
    setSelectedYear(y);
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
      (tr) => tr.tCatName === selectedCategory,
    );
    return filteredTrains;
  };
  const handleCategoryChange = (name) => {
    setSelectedCategory(name);
  };
  useEffect(() => {
    var filteredData = filterByCategory(trains);
    setFilteredList(filteredData);
  }, [selectedCategory]);
  useEffect(() => {
    var filteredData = filterByYear(trains);
    setFilteredList(filteredData);
  }, [selectedYear]);
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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Гадна click-д хаах
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="w-full min-h-[calc(100vh-56px)] ">
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

      <Navigation />
      <div className="px-6 py-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <input
              value={searchQuery}
              onChange={handleSearch}
              className="w-full h-10 pl-4 pr-10 rounded-md border border-slate-300 text-sm placeholder-slate-400
      focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Нэрээр хайх..."
              type="text"
            />
            <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          <div className="flex items-center gap-3">
            {/* Custom dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition"
              >
                Оноор ялгах
                <i
                  className={`bi ${open ? "bi-chevron-up" : "bi-chevron-down"}`}
                />
              </button>

              {open && (
                <div className="absolute mt-1 w-40 bg-white rounded-md shadow-lg z-50">
                  <div
                    onClick={() => {
                      handleYearChange("All");
                      setOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
                  >
                    Бүгд
                  </div>
                  {uniqueYears.map((year) => (
                    <div
                      key={year}
                      onClick={() => {
                        handleYearChange(year);
                        setOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Button */}
            <button
              onClick={navigateCreate}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              + Сургалт
            </button>
          </div>
        </div>

        <div className="relative">
          {category.map((item, index) => {
            const icon = icons[index % icons.length]; // давтагдаж болно

            return (
              <button
                key={index}
                onClick={() => handleCategoryChange(item.name)}
                className="flex-shrink-0 whitespace-nowrap rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium
      hover:bg-indigo-50 hover:text-indigo-700 transition"
              >
                {icon} {item.name}
              </button>
            );
          })}

          <button
            onClick={handlePrevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow
    ${currentSlide === 0 && "hidden"}`}
          >
            <i className="bi bi-chevron-left" />
          </button>

          <button
            onClick={handleNextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow
    ${currentSlide === category.length - 1 && "hidden"}`}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3">
          {filteredList.map((data, index) => {
            const videoRef = createRef();
            videoRefs[index] = videoRef;

            const filteredForm = rates?.filter(
              (item) => item.trainingId === data.id,
            );

            return (
              <div
                key={index}
                onClick={() => clickView(data)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 cursor-pointer flex gap-3"
              >
                <video
                  className="h-28 w-44 rounded-md object-cover"
                  ref={videoRef}
                >
                  <source src={`http://${data.fileUrl}`} type="video/mp4" />
                </video>

                <div className="flex flex-col justify-between text-sm">
                  <div>
                    <p className="text-xs text-slate-500">
                      {data.teacher} • {timeSince(new Date(data.createdAt))}
                    </p>
                    <p className="font-semibold text-slate-800">{data.name}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs mt-2">
                    <span className="flex items-center gap-1">
                      <i className="bi bi-camera-video" />
                      {formatDuration(data.duration)}
                    </span>

                    <span className="flex items-center gap-1">
                      <i className="bi bi-eye" />
                      {
                        data.trainingDevs.filter(
                          (dev) => dev.status === "Үзсэн",
                        ).length
                      }
                    </span>

                    <span className="flex items-center gap-1">
                      <i className="bi bi-pause-circle" />
                      {
                        data.trainingDevs.filter(
                          (dev) => dev.status === "Үзэж байгаа",
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default OnlineTraining;
