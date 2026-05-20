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
          const filteredTrains = res.data.trainingList || [];

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
    if (!selectedYear || selectedYear === "All") {
      return filteredData;
    }

    const filteredTrains = filteredData.filter((item) => {
      return Number(selectedYear) === new Date(item.createdAt).getFullYear();
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
      return item.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
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
    <div className="w-full min-h-[calc(100vh-56px)] bg-slate-50">
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
            <p className="text-xl font-semibold text-center text-slate-800">
              Сургалт устгах
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-600 bg-red-100 rounded-full">
              <i className="text-xl bi bi-trash" />
            </div>

            <p className="mb-5 text-sm font-normal text-gray-500">
              Та сургалтыг устгахдаа итгэлтэй байна уу?
            </p>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center px-5 py-2.5 mr-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Тийм
            </button>

            <button
              onClick={hideModalDelete}
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
            >
              Үгүй
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Navigation />

      <div className="px-4 py-5 space-y-5 sm:px-6">
        <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Онлайн сургалт
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Нийт {filteredList?.length || 0} сургалт
              </p>
            </div>

            <div className="flex flex-col w-full gap-3 sm:flex-row lg:w-auto">
              <div className="relative w-full sm:w-72">
                <input
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-4 pr-10 text-sm border h-11 rounded-xl border-slate-200 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Нэрээр хайх..."
                  type="text"
                />
                <i className="absolute -translate-y-1/2 bi bi-search right-3 top-1/2 text-slate-500" />
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center justify-between w-full gap-2 px-4 py-2.5 text-sm font-medium text-gray-800 transition bg-slate-100 rounded-xl hover:bg-slate-200 sm:w-40"
                >
                  Оноор ялгах
                  <i
                    className={`bi ${
                      open ? "bi-chevron-up" : "bi-chevron-down"
                    }`}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 z-50 w-40 mt-2 overflow-hidden bg-white border shadow-lg rounded-xl border-slate-100">
                    <div
                      onClick={() => {
                        handleYearChange("All");
                        setOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-50 hover:text-indigo-700"
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
                        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={navigateCreate}
                className="px-4 py-2.5 text-sm font-medium text-white transition bg-indigo-600 rounded-xl hover:bg-indigo-700"
              >
                + Сургалт
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-4 mt-4 overflow-x-auto border-t border-slate-100">
            <button
              onClick={() => handleCategoryChange("")}
              className={`flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedCategory === ""
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              Бүгд
            </button>
            {category.map((item, index) => {
              const icon = icons[index % icons.length];

              return (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(item.name)}
                  className={`flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === item.name
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  {icon} {item.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
                className="overflow-hidden transition bg-white border shadow-sm cursor-pointer rounded-2xl border-slate-100 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full overflow-hidden bg-black aspect-video sm:w-56 sm:min-w-56">
                    <video
                      className="object-contain w-full h-full"
                      ref={videoRef}
                      preload="metadata"
                    >
                      <source src={`http://${data.fileUrl}`} type="video/mp4" />
                    </video>
                  </div>

                  <div className="flex flex-col justify-between flex-1 p-4 text-sm">
                    <div>
                      <p className="mb-1 text-xs text-slate-500">
                        {data.teacher} • {timeSince(new Date(data.createdAt))}
                      </p>

                      <p className="font-semibold leading-5 text-slate-800 line-clamp-2">
                        {data.name}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50">
                        <i className="bi bi-camera-video" />
                        {formatDuration(data.duration)}
                      </span>

                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50">
                        <i className="bi bi-eye" />
                        {
                          data.trainingDevs.filter(
                            (dev) => dev.status === "Үзсэн",
                          ).length
                        }
                      </span>

                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50">
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
