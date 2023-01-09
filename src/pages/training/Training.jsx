import React, { useEffect, useState, useRef } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";

import Select from "react-select";
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
  const [choosedTrain, setChoosedTrain] = useState();
  const options = [
    { id: "1", value: "Тэнхим" },
    { id: "2", value: "Онлайн" },
  ];
  const [watchedUsers, setWatchedUsers] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/Training`,
    })
      .then((res) => {
        setTrains(res.data.trainingList);
        if (res.data.resultMessage === "Unauthorized") {
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
      url: `http://192.168.10.248:9000/v1/Training/category`,
    })
      .then((res) => {
        setCategory(res.data.trainingCatList);
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
    // setShowView(true);
    // setChoosedTrain(data);
    // axios({
    //   method: "get",
    //   headers: {
    //     accept: "text/plain",
    //     Authorization: `${TOKEN}`,
    //   },
    //   url: `http://192.168.10.248:9000/v1/TrainingReport/training/watched?trainingId=${data.id}`,
    // })
    //   .then((res) => {
    //     if (res.data.isSuccess == true) {
    //       setWatchedUsers(res.data.watchedList);
    //     }
    //     if (
    //       res.data.resultMessage === "Unauthorized" ||
    //       res.data.resultMessage == "Input string was not in a correct format."
    //     ) {
    //       logout();
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };
  const handleDelete = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `http://192.168.10.248:9000/v1/Training/delete?trId=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => navigate(0), 1000);
          return () => clearTimeout(timer);
        } else {
          console.log(res.data.resultMessage);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (data) => {
    navigate("/edit-training", {
      state: { data: data },
    });
  };
  // console.log(watchedUsers);
  let unique = watchedUsers.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.unit == value.unit)
  );
  let mainOption = [
    {
      department: "Борлуулалт үйлчилгээний алба",
      unit: "Бүгд",
      lastName: "all_employee",
      firstName: "all_employee",
      deviceId: "0000",
      hugatsaa: "",
    },
  ];
  mainOption.push(...unique);
  let arr = [];
  // console.log(mainOption);
  const [index, setIndex] = useState(0);
  for (let index = 0; index < mainOption?.length; index++) {
    const element = watchedUsers[index];
    let filtered = watchedUsers.filter((item, i) => {
      return item.unit == element.unit;
    });
    arr.push(filtered);
  }
  console.log(index);
  // console.log(mainOption);
  const handleOptions = (value) => {
    setIndex(value);
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <div className="flex justify-end">
        <Modal
          show={showView}
          onHide={hideModalView}
          size="xl"
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
          // backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{choosedTrain?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select
              onChange={(e) => {
                handleOptions(e.target.value);
              }}
              name=""
              id=""
            >
              {mainOption.map((el, i) => (
                <option key={i} value={`${i}`}>
                  {el.unit}
                </option>
              ))}
            </select>
            <div>
              {index == 0
                ? watchedUsers.map((item, index) => (
                    <div key={index} className="flex gap-2 justify-between">
                      <span>{index + 1}</span>
                      <span>
                        {item.lastName[0]}. {item.firstName}
                      </span>
                      <span>{item.hugatsaa == "" ? "uzeegui" : "uzsen"}</span>
                    </div>
                  ))
                : arr[index].map((item, index) => (
                    <div key={index} className="flex gap-2 justify-between">
                      <span>{index + 1}</span>
                      <span>
                        {item.lastName[0]}. {item.firstName}
                      </span>
                      <span>{item.hugatsaa == "" ? "uzeegui" : "uzsen"}</span>
                    </div>
                  ))}
            </div>
          </Modal.Body>
        </Modal>
        {/* Устгах */}
        <Modal
          show={showDelete}
          onHide={hideModalDelete}
          size="ml"
          //   backdrop="static"
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
              Сургалтууд
            </p>
          </div>
        </div>
        <div className="sm:flex items-center justify-between p-2">
          <div className="flex items-center"></div>
          <button
            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded 
               text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => navigate("/create-training")}
          >
            <i className="bi bi-plus text-bold" />
            Сургалт нэмэх
          </button>
        </div>
        <div className="p-8">
          {trains ? (
            trains.map((data, index) => (
              <div
                key={index}
                className="max-w-full mx-auto overflow-hidden rounded-lg shadow-lg pricing-box lg:max-w-none lg:flex mt-2"
              >
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
                            category.find((obj) => obj.id === data.tCategory)
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
                          <i className="bi bi-people-fill" />
                        </div>
                        <p className="ml-3 text-sm leading-5 text-gray-700">
                          Сургалт үзэх нийт ажилчидын тоо:{" "}
                          {data.trainingDevs.length}
                        </p>
                      </li>

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
                          <p className="ml-3 text-sm leading-5 text-gray-700 ">
                            Дуусах хугацаа: {data.endDate}
                          </p>
                        </li>
                      )}

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
            ))
          ) : (
            <p className="p-4 text-center text-sm font-medium">
              Сургалт үүсээгүй байна.
              <a className="underline" href="/create-training">
                {" "}
                Сургалт үүсгэх &rarr;{" "}
              </a>
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Training;
