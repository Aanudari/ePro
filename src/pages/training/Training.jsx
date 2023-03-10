import React, { useEffect, useState, useRef } from "react";
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
function Training() {
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
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setTrains(res.data.trainingList);
          setFilteredList(res.data.trainingList);
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
        if (res.data.isSuccess === false) {
        }
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
  const showModalView = (data) => {
    navigate("/train-users", {
      state: { data: data },
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
  console.log(trains);
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

      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-sm lg:text-sm font-bold leading-normal text-gray-800">
              Сургалтууд{" "}
              {filteredList.length > 0
                ? `(${filteredList.length})`
                : `(${trains.length})`}
            </p>
          </div>
        </div>

        <div className="sm:flex items-center justify-between p-2">
          <div className="flex items-center sm:justify-between sm:gap-4">
            <div className="relative hidden sm:block">
              <input
                value={searchQuery}
                onChange={handleSearch}
                type="text"
                name="search"
                className="w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 flex-1 py-2 px-4 bg-white  text-gray-700 placeholder-gray-400 shadow-sm text-base"
                placeholder="Сургалтын нэр"
              />

              <button
                type="button"
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              >
                <i className="bi bi-search" />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Бүгд</option>
              {category.map((el, i) => (
                <option key={i} value={`${el.name}`}>
                  {el.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => navigate("/create-training")}
              className="bg-blue-700 border border-blue-700 shadow p-2 rounded text-white flex items-center focus:outline-none focus:shadow-outline"
            >
              <span className="mx-2">Сургалт нэмэх</span>
              <svg width="24" height="24" viewBox="0 0 16 16">
                <path
                  d="M7 4 L11 8 L7 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          {filteredList.map((data, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/2 p-4 ">
              <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                <a>
                  <div className="relative pb-48 overflow-hidden">
                    {data.fileUrl?.slice(-4) === ".mp4" ? (
                      <div>
                        <video
                          className="absolute inset-0 h-full w-full object-cover"
                          ref={videoRef}
                          width="100%"
                          // height="100%"

                          controls
                        >
                          <source
                            src={`http://` + `${data.fileUrl}`}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    ) : data.fileUrl.slice(-4) === ".png" ||
                      data.fileUrl.slice(-4) === "jpeg" ||
                      data.fileUrl.slice(-4) === ".jpg" ||
                      data.fileUrl.slice(-4) === ".png" ||
                      data.fileUrl.slice(-4) === ".gif" ? (
                      <div className="flex justify-center">
                        <img
                          className="absolute inset-0 h-full w-full object-cover"
                          src={`http://` + `${data.fileUrl}`}
                        />
                      </div>
                    ) : data.fileUrl.slice(-4) === ".mp3" ? (
                      <div className="absolute inset-0 h-full w-full object-cover">
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
                      <p className="mt-4 text-sm leading-5">
                        <span className="block font-medium text-gray-500 ">
                          <i className="bi bi-play-circle-fill" /> Файлын нэр:
                        </span>
                        <span className="inline-block font-medium text-gray-500  ">
                          {data.fileUrl?.slice(29)}
                        </span>
                      </p>
                    ) : (
                      <div className="text-black text-sm border-2 border-blue-500  rounded-md ">
                        <div className="flex justify-center">
                          {data.fileUrl.slice(29)}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    {moment(today).format(format) >=
                    moment(data.endDate).format(format) ? (
                      <span className="inline-block px-2 py-1 leading-none bg-red-200 text-red-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                        ИДЭВХГҮЙ
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 leading-none bg-green-200 text-green-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                        ИДЭВХТЭЙ
                      </span>
                    )}
                    <div
                      className="text-black cursor-pointer"
                      onClick={() => {
                        showModalView(data);
                      }}
                    >
                      <p className="mt-2 mb-2 font-bold ">{data.name}</p>

                      {data.description === "" ? (
                        ""
                      ) : (
                        <p className="text-sm">{data.description}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <ul className="grid gap-x-8 grid-cols-2 flex">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 text-emerald-500 text-sm">
                          <i className="bi bi-card-checklist" />
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700 ">
                          Ангилал: {data.tCatName}
                        </p>
                      </li>
                      {data.teacher === "" ? (
                        ""
                      ) : (
                        <li className="flex items-start ">
                          <div className="flex-shrink-0 text-emerald-500 text-sm">
                            <i className="bi bi-person-video3" />
                          </div>
                          <p className="ml-3 text-sm leading-5 text-gray-700 ">
                            Багш: {data.teacher}
                          </p>
                        </li>
                      )}

                      <li className="flex items-start ">
                        <div className="flex-shrink-0 text-emerald-500 text-sm">
                          <i className="bi bi-signpost-split-fill" />
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700 ">
                          {
                            options?.find((obj) => obj.id === data.sessionType)
                              .value
                          }
                        </p>
                      </li>
                      {data.location === "" ? (
                        ""
                      ) : (
                        <li className="flex items-start ">
                          <div className="flex-shrink-0 text-emerald-500 text-sm">
                            <i className="bi bi-pin-map-fill" />
                          </div>
                          <p className="ml-3 text-sm leading-5 text-gray-700 ">
                            Байршил: {data.location}
                          </p>
                        </li>
                      )}
                      {data.startDate === "" ? (
                        ""
                      ) : (
                        <li className="flex items-start ">
                          <div className="flex-shrink-0 text-emerald-500 text-sm">
                            <i className="bi bi-calendar-check" />
                          </div>

                          <p className="ml-3 text-sm leading-5 text-gray-700 ">
                            Эхлэх хугацаа: {data.startDate}
                          </p>
                        </li>
                      )}

                      {data.endDate === "" ? (
                        ""
                      ) : (
                        <li className="flex items-start ">
                          <div className="flex-shrink-0 text-emerald-500 text-sm">
                            <i className="bi bi-calendar-check-fill" />
                          </div>

                          {moment(today).format(format) >=
                          moment(data.endDate).format(format) ? (
                            <p className="ml-3 text-sm leading-5 text-red-500 ">
                              Дуусах хугацаа: {data.endDate} (Хугацаа дууссан)
                            </p>
                          ) : (
                            <p className="ml-3 text-sm leading-5 text-gray-700 ">
                              Дуусах хугацаа: {data.endDate}
                            </p>
                          )}
                        </li>
                      )}

                      {data.duration === "" ? (
                        ""
                      ) : (
                        <li className="flex items-start ">
                          <div className="flex-shrink-0 text-emerald-500 text-sm">
                            <i className="bi bi-clock-history" />
                          </div>
                          <p className="ml-3 text-sm leading-5 text-gray-700 ">
                            Үргэлжлэх хугацаа: {secondsToHms(data.duration)}
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="p-2 flex items-center ">
                    <TrainingProgressCell data={data} />
                  </div>

                  <div className="p-2 border-t border-b text-xs text-gray-700">
                    <div className="text-right">
                      <div className="inline-flex items-end">
                        <button
                          data-id={data}
                          onClick={() => {
                            handleEdit(data);
                          }}
                          className="mr-2 group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white  focus:outline-none focus:ring active:bg-indigo-500"
                          type="button"
                        >
                          {" "}
                          <i className="bi bi-pencil-square mr-1" />
                          <span className="font-bold text-xs">Засварлах</span>
                        </button>
                        <button
                          type="button"
                          data-id={data}
                          onClick={() => {
                            showModalDelete(data);
                          }}
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-red-600 transition-colors hover:bg-red-600 hover:text-white  focus:outline-none focus:ring active:bg-red-500"
                        >
                          <i className="bi bi-trash-fill mr-1" />
                          <span className="font-bold text-xs"> Устгах</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Training;
