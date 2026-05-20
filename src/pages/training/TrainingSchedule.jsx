import React, { useRef, useState, useEffect, useMemo } from "react";
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

function TrainingSchedule() {
  const { width } = getWindowDimensions();
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();

  const today = new Date();
  const format = "YYYYMMDDHHmmss";

  const [trains, setTrains] = useState([]);
  const [category, setCategory] = useState([]);
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [id, setId] = useState();
  const [trigger, setTrigger] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  const icons = ["🚀", "🔥", "✨", "🎯", "📚", "💡", "⚡", "🧠", "🎓", "📊"];

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
          const filteredTrains =
            res.data.trainingList?.filter(
              (train) => train.sessionType === "1",
            ) || [];

          setTrains(filteredTrains);
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
          setCategory(res.data.trainingCatList || []);
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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uniqueYears = useMemo(() => {
    return [
      ...new Set(trains.map((item) => new Date(item.createdAt).getFullYear())),
    ]
      .filter(Boolean)
      .sort((a, b) => b - a);
  }, [trains]);

  const filteredList = useMemo(() => {
    return trains.filter((item) => {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || item.tCatName === selectedCategory;

      const matchesYear =
        !selectedYear ||
        Number(selectedYear) === new Date(item.createdAt).getFullYear();

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [trains, searchQuery, selectedCategory, selectedYear]);

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
        if (res.data.isSuccess === true) {
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

  const navigateWatched = (data, e) => {
    e.stopPropagation();

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

  const showModalDelete = (data, e) => {
    e.stopPropagation();
    setShowDelete(true);
    setId(data.id);
  };

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + " жилийн өмнө";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " сарын өмнө";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " өдрийн өмнө";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " цагийн өмнө";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " минутын өмнө";

    return Math.floor(seconds) + " секундын өмнө";
  }

  function getStatus(data) {
    const now = moment(today).format(format);
    const start = moment(data.startDate).format(format);
    const end = moment(data.endDate).format(format);

    if (now < start) {
      return {
        text: "Хүлээгдэж байна",
        icon: "⌛",
        className: "bg-amber-50 text-amber-700 border-amber-100",
      };
    }

    if (now >= start && now <= end) {
      return {
        text: "Идэвхтэй",
        icon: "👀",
        className: "bg-green-50 text-green-700 border-green-100",
      };
    }

    return {
      text: "Дууссан",
      icon: "⏰",
      className: "bg-red-50 text-red-700 border-red-100",
    };
  }

  function renderFilePreview(data) {
    const ext = data.fileUrl?.slice(-4).toLowerCase();

    if (ext === ".png" || ext === "jpeg" || ext === ".jpg" || ext === ".gif") {
      return (
        <img
          className="object-cover w-full h-full"
          src={`http://${data.fileUrl}`}
          alt=""
        />
      );
    }

    if (ext === ".mp3") {
      return (
        <div className="flex items-center justify-center w-full h-full p-3 bg-slate-100">
          <audio className="w-full" controlsList="nodownload" controls>
            <source src={`http://${data.fileUrl}`} type="audio/mpeg" />
          </audio>
        </div>
      );
    }

    if (ext === "xlsx" || ext === ".pdf" || ext === "docx" || ext === "pptx") {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center bg-slate-100">
          <i className="text-3xl text-indigo-600 bi bi-file-earmark-arrow-down-fill" />
          <p className="mt-2 text-xs line-clamp-2 text-slate-500">
            {data.fileUrl?.slice(29)}
          </p>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center w-full h-full p-4 text-center bg-slate-100">
        <p className="text-xs line-clamp-2 text-slate-500">
          {data.fileUrl?.slice(29)}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-56px)] w-full bg-slate-50">
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
            <p className="text-xl font-semibold text-slate-800">
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
              className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700"
            >
              Тийм
            </button>

            <button
              onClick={hideModalDelete}
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              Үгүй
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Navigation />

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="p-4 mb-5 bg-white border shadow-sm rounded-2xl border-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Сургалтын хуваарь
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Нийт {filteredList?.length || 0} хуваарь
              </p>
            </div>

            <button
              onClick={navigateCreate}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
              type="button"
            >
              <i className="bi bi-plus-lg" />
              Сургалтын хуваарь нэмэх
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_170px]">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 text-sm border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="Нэрээр хайх..."
                type="text"
              />

              <i className="absolute -translate-y-1/2 bi bi-search right-3 top-1/2 text-slate-500" />
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full px-4 text-sm font-medium transition h-11 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {selectedYear || "Оноор ялгах"}
                <i
                  className={`bi ${open ? "bi-chevron-up" : "bi-chevron-down"}`}
                />
              </button>

              {open && (
                <div className="absolute right-0 z-50 w-full mt-2 overflow-hidden bg-white border shadow-lg rounded-xl border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedYear("");
                      setOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    Бүгд
                  </button>

                  {uniqueYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4 mt-4 overflow-x-auto border-t border-slate-100">
            <button
              onClick={() => setSelectedCategory("")}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedCategory === ""
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              Бүгд
            </button>

            {category.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(item.name)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === item.name
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                {icons[index % icons.length]} {item.name}
              </button>
            ))}
          </div>
        </div>

        {filteredList.length === 0 ? (
          <div className="py-16 text-center bg-white border border-dashed rounded-2xl border-slate-300">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 text-slate-500">
              <i className="text-xl bi bi-calendar-event" />
            </div>

            <p className="font-medium text-slate-700">Хуваарь олдсонгүй</p>
            <p className="mt-1 text-sm text-slate-400">
              Хайлт эсвэл шүүлтүүрээ өөрчлөөд дахин үзээрэй.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {filteredList.map((data, index) => {
              const status = getStatus(data);
              const watchedCount =
                data.trainingDevs?.filter((dev) => dev.status === "Үзсэн")
                  .length || 0;

              return (
                <div
                  key={index}
                  onClick={() => clickView(data)}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full overflow-hidden h-44 bg-slate-100 sm:h-auto sm:w-52 sm:min-w-52">
                      {renderFilePreview(data)}
                    </div>

                    <div className="flex flex-col justify-between flex-1 p-4">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
                          >
                            {status.icon} {status.text}
                          </span>

                          <button
                            onClick={(e) => showModalDelete(data, e)}
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <i className="bi bi-trash" />
                          </button>
                        </div>

                        <h3 className="text-base font-semibold line-clamp-2 text-slate-900">
                          {data.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {data.teacher || "Багш"} •{" "}
                          {timeSince(new Date(data.createdAt))}
                        </p>

                        {data.location && (
                          <p className="mt-1 text-sm text-slate-500">
                            <i className="mr-1 bi bi-geo-alt" />
                            {data.location}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                        <div className="p-2 rounded-xl bg-slate-50">
                          <p className="mb-1 text-slate-400">Эхлэх</p>
                          <p className="font-semibold text-slate-700">
                            {moment(data.startDate).format("YYYY.MM.DD HH:mm")}
                          </p>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-50">
                          <p className="mb-1 text-slate-400">Дуусах</p>
                          <p className="font-semibold text-slate-700">
                            {moment(data.endDate).format("YYYY.MM.DD HH:mm")}
                          </p>
                        </div>

                        <button
                          onClick={(e) => navigateWatched(data, e)}
                          className="col-span-2 p-2 text-left rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          <p className="mb-1 text-slate-400">Үзсэн ажилтан</p>
                          <p className="font-semibold">
                            <i className="mr-1 bi bi-eye" />
                            {watchedCount}
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default TrainingSchedule;
