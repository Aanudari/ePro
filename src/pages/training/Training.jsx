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
function Training() {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const videoRef = useRef(null);
  const [trains, setTrains] = useState([]);
  const [category, setCategory] = useState([]);
  const [showView, setShowView] = useState(null);
  const hideModalView = () => setShowView(null);
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [id, setId] = useState();
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
          setTrains(res.data.trainingList);
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
  }, []);
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
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => navigate(0), 500);
          return () => clearTimeout(timer);
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
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }
  const [filteredList, setFilteredList] = useState(trains);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = trains.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };
  let unique = category.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name == value.name)
  );
  let mainOption = [
    {
      createdAt: null,
      createdBy: null,
      department: null,
      endDate: null,
      id: "10000",
      name: "Бүгд",
      startDate: null,
      status: null,
    },
  ];
  mainOption.push(...unique);
  const handleOptions = (value) => {
    let filtered = trains.filter((item) => {
      return item.tCategory === value;
    });
    setFilteredList(filtered);
  };
  const today = new Date();
  const format = "YYYYMMDDHHmmss";
  const nowdateTime = moment(today).format(format);
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
            activeMenu
              ? {
                  width: "calc(100% - 250px)",
                  left: "250px",
                }
              : {
                  width: "calc(100%)",
                  left: "0",
                }
          }
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалт устгах</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                Устгах уу?
              </h3>
              <button
                type="button"
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Тийм
              </button>
              <button
                onClick={hideModalDelete}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
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
            <p className="focus:outline-none  sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Сургалтууд ({`${filteredList.length}`})
            </p>
          </div>
        </div>
        <div className="sm:flex items-center justify-between p-2">
          <div className="flex items-center">
            <select
              onChange={(e) => {
                handleOptions(e.target.value);
              }}
            >
              {mainOption.map((el, i) => (
                <option key={i} value={`${el.id}`}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className=" relative ">
              <input
                value={searchQuery}
                onChange={handleSearch}
                type="text"
                name="search"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Нэрээр хайх"
              />
            </div>
            <button
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              <i className="bi bi-search" />
            </button>
            <button
              className="flex-shrink-0 px-2 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              onClick={() => navigate("/create-training")}
            >
              <i className="bi bi-plus text-bold mr-1" />
              Сургалт нэмэх
            </button>
          </div>
        </div>
        {filteredList.map((data, index) => (
          <div key={index} className="p-2">
            <div className="max-w-full mx-auto overflow-hidden rounded-lg shadow-lg pricing-box lg:max-w-none lg:flex mt-2">
              <div className="w-full px-6 py-8 bg-white  lg:flex-shrink-2 lg:p-12">
                <h3 className="text-xl  leading-8 text-gray-800 sm:text-xl sm:leading-9 ">
                  {data.name}
                </h3>
                {data.description === null ? (
                  ""
                ) : (
                  <p className="mt-4 leading-6 text-gray-800 ">
                    {data.description}
                  </p>
                )}

                <div className="mt-2">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 text-sm font-semibold leading-5 tracking-wider text-indigo-600 uppercase bg-white ">
                      ерөнхий
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200"></div>
                  </div>
                  <ul className="mt-2 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0 text-emerald-500 text-lg">
                        <i className="bi bi-card-checklist" />
                      </div>
                      <p className="ml-3 text-sm leading-5 text-gray-700 ">
                        Ангилал:{" "}
                        {category &&
                          category?.find((obj) => obj.id === data.tCategory)
                            .name}
                      </p>
                    </li>
                    {data.teacher === null ? (
                      ""
                    ) : (
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0 text-emerald-500 text-lg">
                          <i className="bi bi-person-video3" />
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700 ">
                          Багш: {data.teacher}
                        </p>
                      </li>
                    )}

                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0 text-emerald-500 text-lg">
                        <i className="bi bi-signpost-split-fill" />
                      </div>
                      <p className="ml-3 text-sm leading-5 text-gray-700 ">
                        {
                          options.find((obj) => obj.id === data.sessionType)
                            .value
                        }
                      </p>
                    </li>
                    {data.location === null ? (
                      ""
                    ) : (
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0 text-emerald-500 text-lg">
                          <i className="bi bi-pin-map-fill" />
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700 ">
                          Байршил: {data.location}
                        </p>
                      </li>
                    )}
                    {data.startDate === null ? (
                      ""
                    ) : (
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0 text-emerald-500 text-lg">
                          <i className="bi bi-calendar-check" />
                        </div>

                        <p className="ml-3 text-sm leading-5 text-gray-700 ">
                          Эхлэх хугацаа: {data.startDate}
                        </p>
                      </li>
                    )}

                    {data.endDate === null ? (
                      ""
                    ) : (
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0 text-emerald-500 text-lg">
                          <i className="bi bi-calendar-check-fill" />
                        </div>
                        {nowdateTime >= data.endDate + data.duration ? (
                          <p className="ml-3 text-sm leading-5 text-gray-700 ">
                            Дуусах хугацаа: {data.endDate}
                          </p>
                        ) : (
                          <p className="ml-3 text-sm leading-5 text-red-500 ">
                            Дуусах хугацаа: {data.endDate} (Хугацаа дууссан)
                          </p>
                        )}
                      </li>
                    )}

                    {data.duration === null ? (
                      ""
                    ) : (
                      <li className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0 text-emerald-500 text-lg">
                          <i className="bi bi-clock-history" />
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700 ">
                          Үргэлжлэх хугацаа: {data.duration}
                        </p>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 text-sm font-semibold leading-5 tracking-wider text-indigo-600 uppercase bg-white ">
                      Үйлдэл
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200"></div>
                  </div>
                  <ul className="mt-2 lg:grid lg:grid-cols-3 lg:col-gap-8 lg:row-gap-5">
                    <li className="flex items-center lg:col-span-1">
                      <div className="flex-shrink-0 items-center">
                        <a
                          onClick={() => {
                            showModalView(data);
                          }}
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
                        >
                          <i className="bi bi-eye-fill mr-1" /> Харах
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center lg:col-span-1">
                      <div className="flex-shrink-0 items-center">
                        <a
                          data-id={data}
                          onClick={() => {
                            handleEdit(data);
                          }}
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
                        >
                          <i className="bi bi-pencil-square mr-1" /> Засварлах
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center lg:col-span-1">
                      <div className="flex-shrink-0 items-center">
                        <a
                          data-id={data}
                          onClick={() => {
                            showModalDelete(data);
                          }}
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
                        >
                          <i className="bi bi-trash-fill mr-1" /> Устгах
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 py-8 text-center bg-gray-100  lg:flex-shrink-4 lg:flex lg:flex-col lg:justify-center lg:p-4">
                <TrainingProgressCell data={data} />
                <div className="flex items-center justify-center mt-4 leading-none text-gray-900 ">
                  {data.fileUrl.slice(-4) === ".mp4" ? (
                    <div>
                      <video
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
                  ) : (
                    <div className="rounded border-l-4 border-red-500 bg-red-50 p-4">
                      <strong className="block font-medium text-red-700">
                        Файл хавсаргаагүй байна.
                      </strong>
                    </div>
                  )}
                </div>
                {data.fileUrl === "" ? (
                  ""
                ) : (
                  <p className="mt-4 text-sm leading-5">
                    <span className="block font-medium text-gray-500 ">
                      <i className="bi bi-play-circle-fill" /> Файлын нэр:
                    </span>
                    <span className="inline-block font-medium text-gray-500  ">
                      {data.fileUrl.slice(29)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Training;
