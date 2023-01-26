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
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [id, setId] = useState();
  const [filteredList, setFilteredList] = useState(trains);
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
<<<<<<< HEAD
=======
        if (res.data.isSuccess === false) {
        }
>>>>>>> complain
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
<<<<<<< HEAD
=======
        if (res.data.isSuccess === false) {
        }
>>>>>>> complain
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
        if (res.data.isSuccess === false) {
          // alert(res.data.resultMessage);
        } else if (res.data.isSuccess === true) {
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

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = trains.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };
  const handleOptions = (value) => {
    let filtered = trains?.filter((item) => {
      return item.tCatName === value;
    });
    setFilteredList(filtered);
  };
  const today = new Date();
  const format = "YYYYMMDDHHmmss";
  const nowdateTime = moment(today).format(format);
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
              <span className="text-xl text-black">Сургалт устгах</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                Та сургалтыг устгахдаа итгэлтэй байна уу?
              </h3>
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
            <p className="focus:outline-none text-base sm:text-sm md:text-xl lg:text-xl font-bold leading-normal text-gray-800">
              Сургалтууд{" "}
              {filteredList.length > 0 ? `(${filteredList.length})` : ""}
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
            <select
              onChange={(e) => {
                handleOptions(e.target.value);
              }}
            >
              <option>Ангиллаар хайх</option>
              {category?.map((el, i) => (
                <option key={i} value={`${el.name}`}>
                  {el.name}
                </option>
              ))}
            </select>

            <button
              className="flex-shrink-0 px-2 py-2 text-base font-semibold text-white text-ыт bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              onClick={() => navigate("/create-training")}
            >
              Сургалт нэмэх
            </button>
          </div>
        </div>

        {filteredList.length > 0
          ? filteredList.map((data, index) => (
              <div key={index} className="p-2">
                <div className="max-w-full mx-auto overflow-hidden border border-t-4 rounded-lg shadow-lg pricing-box lg:max-w-none lg:flex mt-2">
                  <div className="w-full px-6 py-8 bg-white  lg:flex-shrink-2 lg:p-12">
                    <h3 className="text-xl  leading-8 text-gray-800 sm:text-xl sm:leading-9 ">
                      {data.name}
                    </h3>
                    {data.description === "" ? (
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
                            Ангилал: {data.tCatName}
                          </p>
                        </li>
                        {data.teacher === "" ? (
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
                            {/* {
                              options?.find(
                                (obj) => obj.id === data.sessionType
                              ).value
                            } */}
                          </p>
                        </li>
                        {data.location === "" ? (
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
                        {data.startDate === "" ? (
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

                        {data.endDate === "" ? (
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

                        {data.duration === "" ? (
                          ""
                        ) : (
                          <li className="flex items-start lg:col-span-1">
                            <div className="flex-shrink-0 text-emerald-500 text-lg">
                              <i className="bi bi-clock-history" />
                            </div>
                            <p className="ml-3 text-sm leading-5 text-gray-700 ">
                              Үргэлжлэх хугацаа: {secondsToHms(data.duration)}
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

                      <div className="flex items-center justify-between w-full gap-4 mt-8">
                        <button
                          type="button"
                          onClick={() => {
                            showModalView(data);
                          }}
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white  focus:outline-none focus:ring active:bg-indigo-500"
                        >
                          <i className="bi bi-eye-fill mr-1" />
                          <span className="font-bold text-xs">Харах</span>
                        </button>
                        <button
                          data-id={data}
                          onClick={() => {
                            handleEdit(data);
                          }}
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white  focus:outline-none focus:ring active:bg-indigo-500"
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
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white  focus:outline-none focus:ring active:bg-indigo-500"
                        >
                          <i className="bi bi-trash-fill mr-1" />
                          <span className="font-bold text-xs"> Устгах</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-8 text-center bg-gray-100  lg:flex-shrink-4 lg:flex lg:flex-col lg:justify-center lg:p-4">
                    <TrainingProgressCell data={data} />
                    <div className="flex items-center justify-center mt-4 leading-none text-gray-900 ">
                      {data.fileUrl?.slice(-4) === ".mp4" ? (
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
                          {data.fileUrl?.slice(29)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          : trains?.map((data, index) => (
              <div key={index} className="p-2 ">
                <div className="border border-2 border:bg-blue-500 max-w-full mx-auto overflow-hidden rounded-lg shadow-lg pricing-box lg:max-w-none lg:flex mt-2">
                  <div className="w-full px-6 py-8 bg-white  lg:flex-shrink-2 lg:p-12">
                    <h3 className="text-xl  leading-8 text-gray-800 sm:text-xl sm:leading-9 ">
                      {data.name}
                    </h3>
                    {data.description === "" ? (
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
                          <p className="ml-3 text-sm leading-5 text-gray-700">
                            <p className="ml-3 text-sm leading-5 text-gray-700 ">
                              Ангилал: {data.tCatName}
                            </p>
                          </p>
                        </li>
                        {data.teacher === "" ? (
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
                        {data.location === "" ? (
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
                        {data.startDate === "" ? (
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

                        {data.endDate === "" ? (
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

                        {data.duration === "" ? (
                          ""
                        ) : (
                          <li className="flex items-start lg:col-span-1">
                            <div className="flex-shrink-0 text-emerald-500 text-lg">
                              <i className="bi bi-clock-history" />
                            </div>
                            <p className="ml-3 text-sm leading-5 text-gray-700 ">
                              Үргэлжлэх хугацаа: {secondsToHms(data.duration)}
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

                      <div className="flex flex-1 items-center justify-between gap-8 sm:justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            showModalView(data);
                          }}
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white  focus:outline-none focus:ring active:bg-indigo-500"
                        >
                          <i className="bi bi-eye-fill mr-1" />
                          <span className="font-bold text-xs">Харах</span>
                        </button>
                        <button
                          data-id={data}
                          onClick={() => {
                            handleEdit(data);
                          }}
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white  focus:outline-none focus:ring active:bg-indigo-500"
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
                          className="group flex items-center justify-between rounded-lg border border-current px-4 py-2 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white  focus:outline-none focus:ring active:bg-indigo-500"
                        >
                          <i className="bi bi-trash-fill mr-1" />
                          <span className="font-bold text-xs"> Устгах</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-8 text-center bg-gray-100  lg:flex-shrink-4 lg:flex lg:flex-col lg:justify-center lg:p-4">
                    <TrainingProgressCell data={data} />
                    <div className="flex items-center justify-center mt-4 leading-none text-gray-900 ">
                      {data.fileUrl.slice(-4) === ".mp4" ? (
                        <video
                          className="items-center mx-auto py-12 px-12 sm:px-2 lg:py-2 lg:px-2 z-10 rounded-2xl"
                          // onLoadedMetadata={handleProgress}
                          ref={videoRef}
                          // width="20%"
                          // height="100%"
                          id="myVideo"
                          controls
                        >
                          <source
                            src={`http://` + `${data.fileUrl}`}
                            type="video/mp4"
                          />
                        </video>
                      ) : data.fileUrl.slice(-4) === ".png" ||
                        data.fileUrl.slice(-4) === "jpeg" ||
                        data.fileUrl.slice(-4) === ".jpg" ||
                        data.fileUrl.slice(-4) === ".png" ||
                        data.fileUrl.slice(-4) === ".gif" ? (
                        <div className="flex justify-center">
                          <img
                            className="h-32 rounded-xl"
                            src={`http://` + `${data.fileUrl}`}
                          />
                        </div>
                      ) : data.fileUrl.slice(-4) === ".mp3" ? (
                        <div className="flex justify-center">
                          <audio
                            controlsList="nodownload"
                            controls
                            className="items-center mx-auto py-12 px-12 sm:px-2 lg:py-2 lg:px-2 z-10 rounded-2xl bg-indigo-200"
                          >
                            <source
                              src={`http://` + `${data.fileUrl}`}
                              type="audio/mpeg"
                            />
                          </audio>
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
