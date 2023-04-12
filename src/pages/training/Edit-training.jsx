import React, { useEffect, useState, useRef } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import { logout } from "../../service/examService";
import Workers from "./Workers";
function EditTraining() {
  const locationn = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const train = locationn.state.data;
  const format = "YYYYMMDDHHmmss";
  const [date1, setDate1] = useState(new Date(train.startDate));
  const [date2, setDate2] = useState(new Date(train.endDate));
  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);
  const [category, setCategory] = useState();
  const options = [
    { id: "1", value: "Тэнхим" },
    { id: "2", value: "Онлайн" },
  ];
  const [checkEmptyname, setcheckEmptyname] = useState(false);
  const [checkEmptydescription, setcheckEmptydescription] = useState(false);
  const [checkEmptyteacher, setcheckEmptyteacher] = useState(false);
  const [checkEmptytCategory, setcheckEmptytCategory] = useState(false);
  const [checkEmptysessionType, setcheckEmptysessionType] = useState(false);
  const [checkEmptylocation, setcheckEmptylocation] = useState(false);
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [fileUrl, setfileUrl] = useState("");
  const [duration, setduration] = useState("");
  const [teacher, setteacher] = useState("");
  const [tCategory, settCategory] = useState("");
  const [sessionType, setsessionType] = useState("");
  const [location, setlocation] = useState("");
  const videoRef = useRef(null);
  const [id, setId] = useState("");
  const object = options.find((obj) => obj.id === train.sessionType);
  const [emp, setEmp] = useState([]);
  const [chosedDelete, setChosedDelete] = useState(0);

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
  }, []);
  const handleTrainingCategoryId = (item) => {
    settCategory(item.id);
  };
  const handleTrainingType = (item) => {
    setsessionType(item.id);
  };
  const handleProgress = () => {
    const video = videoRef.current;
    setduration(video.duration);
  };
  const handleDelete = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingFile/${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        } else if (res.data.isSuccess === true) {
          setChosedDelete(1);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleFileSelect = (event) => {
    // if (event.target.files[0].name.slice(-4) === ".mp4") {
    const data = new FormData();
    const imagedata = event.target.files[0];
    data.append("file", imagedata);
    axios({
      mode: "no-cors",
      method: "post",
      url: `${process.env.REACT_APP_URL}/v1/TrainingFile/fileadd`,
      data,
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setfileUrl(res.data.path);
          setId(res.data.id);
          setChosedDelete(2);
        } else {
          notification.error(`${res.data.resultMessage}`);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
    // }
    // else {
    //   notification.error("Video хавсаргана уу.");
    // }
  };
  const handleDeleteSelected = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingFile/${train.fileId}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
          const timer = setTimeout(
            () =>
              navigate("/clicked-train", {
                state: { data: train, item: locationn.state.item },
              }),
            2000
          );
          return () => clearTimeout(timer);
        }
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          setChosedDelete(1);
        } else {
        }
      })
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(false);
  const getEmployees = (value) => {
    let tempo = [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      let arr = {
        departmentId:
          element.department === undefined ? "" : element.department,
        unitId: element.unitId,
        devId: `${element.deviceId}`,
      };
      tempo.push(arr);
    }
    setEmp(tempo);
  };
  function Diceroll() {
    return (
      <>
        <div>
          {chosedDelete === 1 ? (
            <div>
              <input
                type="file"
                onChange={handleFileSelectAnother}
                className="px-3 py-2 text-blueGray-600 bg-white text-sm w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>
          ) : chosedDelete === 2 ? (
            <div className="text-center w-full mx-auto py-2 px-2 sm:px-6 lg:py-16 lg:px-8 z-20">
              {id && fileUrl.slice(-4) === ".mp4" ? (
                <video
                  className="items-center w-1/2 mx-auto py-12 px-12 sm:px-2 lg:py-2 lg:px-2 z-10"
                  onLoadedMetadata={handleProgress}
                  ref={videoRef}
                  // width="20%"
                  // height="100%"
                  id="myVideo"
                  controls
                  disablePictureInPicture
                  controlsList=" noplaybackrate"
                >
                  <source src={`http://` + `${fileUrl}`} type="video/mp4" />
                </video>
              ) : fileUrl.slice(-4) === ".png" ||
                fileUrl.slice(-4) === "jpeg" ||
                fileUrl.slice(-4) === ".jpg" ||
                fileUrl.slice(-4) === ".png" ||
                fileUrl.slice(-4) === ".gif" ? (
                <div className="flex justify-center">
                  <img
                    className="h-64 rounded-xl"
                    src={`http://` + `${fileUrl}`}
                  />
                </div>
              ) : fileUrl.slice(-4) === ".mp3" ? (
                <div className="flex justify-center">
                  <audio controlsList="nodownload" controls>
                    <source src={`http://` + `${fileUrl}`} type="audio/mpeg" />
                  </audio>
                </div>
              ) : fileUrl.slice(-4) === "xlsx" ||
                fileUrl.slice(-4) === ".pdf" ||
                fileUrl.slice(-4) === "docx" ||
                fileUrl.slice(-4) === "pptx" ? (
                <p className="mt-4 text-sm leading-5">
                  <span className="block font-medium text-gray-500 ">
                    <i className="bi bi-play-circle-fill" /> Файлын нэр:
                  </span>
                  <span className="inline-block font-medium text-gray-500  ">
                    {fileUrl?.slice(29)}
                  </span>
                </p>
              ) : (
                <div className="text-black text-sm border-2 border-blue-500  rounded-md ">
                  <div className="flex justify-center">{fileUrl.slice(29)}</div>
                </div>
              )}
              <div className="lg:mt-0 lg:flex-shrink-0">
                <div className="mt-2 inline-flex rounded-md shadow">
                  <button
                    onClick={() => handleDelete()}
                    type="button"
                    className="py-2 px-2  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Устгах
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
  const dataFULL = {
    id: `${train.id}`,
    name: `${name}` === "" ? train.name : `${name}`,
    description: `${description}` === "" ? train.description : `${description}`,
    fileId:
      `${id}` === "" && chosedDelete === 0
        ? train.fileId
        : (`${id}` === "" && chosedDelete === 1) || 2
        ? `${id}`
        : `${id}`,
    fileUrl:
      `${fileUrl}` === "" && chosedDelete === 0
        ? train.fileUrl
        : (`${fileUrl}` === "" && chosedDelete === 1) || 2
        ? `${fileUrl}`
        : `${fileUrl} `,
    duration: duration === "" ? train.duration : `${duration}`,
    teacher: `${teacher}` === "" ? train.teacher : `${teacher}`,
    tCategory: `${tCategory}` === "" ? train.tCategory : `${tCategory}`,
    sessionType: locationn.state.item === "schedule" ? "1" : "2",
    startDate: `${startDate}` === "" ? train.startDate : `${startDate}`,
    endDate: `${endDate}` === "" ? train.endDate : `${endDate}`,
    location: `${location}` === "" ? train.location : `${location}`,
    addTrainingDevs: emp,
  };
  const handleFileSelectAnother = (event) => {
    // if (event.target.files[0].name.slice(-4) === ".mp4") {
    const data = new FormData();
    const imagedata = event.target.files[0];
    data.append("file", imagedata);
    axios({
      mode: "no-cors",
      method: "post",
      url: `${process.env.REACT_APP_URL}/v1/TrainingFile/fileadd`,
      data,
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setfileUrl(res.data.path);
          setId(res.data.id);
          setChosedDelete(2);
        } else {
          notification.error(`${res.data.resultMessage}`);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
    // }
    // else {
    //   notification.error("Video хавсаргана уу.");
    // }
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    if (startDate === endDate && startDate > endDate) {
      notification.invalidFileUpload("Эхлэх дуусах хугацаа алдаатай байна.");
    } else if (dataFULL.fileUrl.length === 0) {
      notification.error("Та файл оруулна уу.");
    } else {
      axios({
        method: "put",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/Training/edit`,
        data: JSON.stringify(dataFULL),
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            const timer = setTimeout(() => navigate("/online-training"), 1000);
            return () => clearTimeout(timer);
          } else if (res.data.isSuccess === false) {
            notification.error(`${res.data.resultMessage}`);
            const timer = setTimeout(
              () =>
                navigate("/clicked-train", {
                  state: { data: train, item: locationn.state.item },
                }),
              2000
            );
            return () => clearTimeout(timer);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div className="px-4 py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-left">
            <a
              // onClick={() => {
              //   locationn.state.item === "schedule"
              //     ? navigate("/training-schedule")
              //     : navigate("/online-training");
              // }}
              onClick={() =>
                navigate("/clicked-train", {
                  state: { data: train, item: locationn.state.item },
                })
              }
              className="text-sm font-bold text-gray-900 sm:text-sm cursor-pointer"
            >
              <i className="bi bi-backspace" />
              <span className="mx-2">Буцах</span>
            </a>
            <p className="text-sm font-bold text-gray-900">
              {" "}
              {locationn.state.item === "schedule"
                ? "Сургалтын хуваарь өөрчлөх"
                : "Сургалт өөрчлөх"}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-lg border-2 lg:col-span-3 lg:p-12 mt-4">
          <div className="w-full sm:w-full px-2  ">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Нэр
              </label>
              <input
                type="text"
                defaultValue={train.name}
                onChange={(e) => {
                  setName(e.target.value);
                  setcheckEmptyname(false);
                }}
                id={checkEmptyname === true ? "border-red" : null}
                className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Дэлгэрэнгүй
              </label>
              <textarea
                className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                rows="8"
                defaultValue={train.description}
                onChange={(e) => {
                  setdescription(e.target.value);
                  setcheckEmptydescription(false);
                }}
                id={checkEmptydescription === true ? "border-red" : null}
              ></textarea>
            </div>
            <div className="relative w-full mb-3">
              {" "}
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Файл
              </label>
              <div>
                {chosedDelete === 0 ? (
                  <div>
                    {" "}
                    {train.fileId === "" ? (
                      <div>
                        <input
                          type="file"
                          onChange={handleFileSelect}
                          className="px-3 py-2 text-blueGray-600 bg-white text-sm w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        />
                      </div>
                    ) : (
                      <div className="text-center w-full mx-auto py-2 px-2 sm:px-6 lg:py-16 lg:px-8 z-20">
                        {train.fileUrl.slice(-4) === ".mp4" ? (
                          <video
                            className="items-center w-1/2 mx-auto py-12 px-12 sm:px-2 lg:py-2 lg:px-2 z-10"
                            onLoadedMetadata={handleProgress}
                            ref={videoRef}
                            // width="20%"
                            // height="100%"
                            id="myVideo"
                            controls
                            disablePictureInPicture
                            controlsList=" noplaybackrate"
                          >
                            <source
                              src={`http://` + `${train.fileUrl}`}
                              type="video/mp4"
                            />
                          </video>
                        ) : train.fileUrl.slice(-4) === ".png" ||
                          train.fileUrl.slice(-4) === "jpeg" ||
                          train.fileUrl.slice(-4) === ".jpg" ||
                          train.fileUrl.slice(-4) === ".png" ||
                          train.fileUrl.slice(-4) === ".gif" ? (
                          <div className="flex justify-center">
                            <img
                              className="h-64 rounded-xl"
                              src={`http://` + `${train.fileUrl}`}
                            />
                          </div>
                        ) : train.fileUrl.slice(-4) === ".mp3" ? (
                          <div className="flex justify-center">
                            <audio controlsList="nodownload" controls>
                              <source
                                src={`http://` + `${train.fileUrl}`}
                                type="audio/mpeg"
                              />
                            </audio>
                          </div>
                        ) : train.fileUrl.slice(-4) === "xlsx" ||
                          train.fileUrl.slice(-4) === ".pdf" ||
                          train.fileUrl.slice(-4) === "docx" ||
                          train.fileUrl.slice(-4) === "pptx" ? (
                          <p className="mt-4 text-sm leading-5">
                            <span className="block font-medium text-gray-500 ">
                              <i className="bi bi-play-circle-fill" /> Файлын
                              нэр:
                            </span>
                            <span className="inline-block font-medium text-gray-500  ">
                              {train.fileUrl?.slice(29)}
                            </span>
                          </p>
                        ) : (
                          <div className="text-black text-sm border-2 border-blue-500  rounded-md ">
                            <div className="flex justify-center">
                              {train.fileUrl.slice(29)}
                            </div>
                          </div>
                        )}
                        <div className="lg:mt-0 lg:flex-shrink-0">
                          <div className="mt-2 inline-flex rounded-md shadow">
                            <button
                              onClick={() => handleDeleteSelected()}
                              type="button"
                              className="py-2 px-2 text-xs bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                            >
                              Устгах
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Diceroll />
                  </div>
                )}
              </div>
            </div>
            <div className="relative w-full mb-3">
              <button
                onClick={() => {
                  setShow(true);
                }}
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded"
              >
                Ажилтан сонгох {emp?.length}
              </button>

              {show && (
                <Workers
                  setShow={setShow}
                  getEmployees={getEmployees}
                  // reSetEmployee={reSet}
                />
              )}
            </div>
          </div>
          <div className="flex -mx-2">
            <div className="w-1/3 sm:w-full px-2  ">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Сургалт орох багшийн нэр
                </label>
                <input
                  type="text"
                  defaultValue={train.teacher}
                  onChange={(e) => {
                    setteacher(e.target.value);
                    setcheckEmptyteacher(false);
                  }}
                  id={checkEmptyteacher === true ? "border-red" : null}
                  className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                />
              </div>
              <div className="relative w-full mb-3">
                {" "}
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Ангилал
                </label>
                <Select
                  className="text-sm  w-full rounded-lg  outline-none focus:border-indigo-500"
                  options={category}
                  defaultValue={{
                    id: train.tCategory,
                    name: train.tCatName,
                  }}
                  onChange={(item) => {
                    handleTrainingCategoryId(item);
                    setcheckEmptytCategory(false);
                  }}
                  id={checkEmptytCategory === true ? "border-red" : null}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
              </div>
            </div>
            <div className="w-1/3 sm:w-full px-2  ">
              <div className="relative w-full mb-3">
                <p className="text-xs font-semibold text-gray-600">
                  Та{" "}
                  {locationn.state.item === "schedule"
                    ? "сургалтын хуваарийг"
                    : "онлайн сургалтыг"}{" "}
                  эхлүүлэх хугацаагаа 24 цагийн дараа байхаар тохируулна уу. 😊
                </p>
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Эхлэх хугацаа
                </label>
                <DatePicker
                  className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  selected={date1}
                  onChange={(date) => setDate1(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  selectsStart
                  startDate={date1}
                  dateFormat="yyyy.MM.dd, HH:mm"
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Дуусах хугацаа
                </label>
                <DatePicker
                  className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  selected={date2}
                  onChange={(date) => setDate2(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  selectsStart
                  startDate={date2}
                  dateFormat="yyyy.MM.dd, HH:mm"
                />
              </div>
              {locationn.state.item === "schedule" ? (
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Байршил
                  </label>
                  <input
                    type="text"
                    className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    defaultValue={train.location}
                    onChange={(e) => {
                      setlocation(e.target.value);
                      setcheckEmptylocation(false);
                    }}
                    id={checkEmptylocation === true ? "border-red" : null}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-span-5 text-right">
            <div className="inline-flex items-end">
              <button
                onClick={navigateIndex}
                type="submit"
                className="block font-bold rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditTraining;
