import React, { useEffect, useState, useRef } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
import Workers from "./Workers";

function CreateTraining() {
  const { width } = getWindowDimensions();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const format = "YYYYMMDDHHmmss";
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);
  const locationn = useLocation();
  const [category, setCategory] = useState();
  const [selectedOptioncategory, setSelectedOptioncategory] = useState(null);
  const [checkEmptyname, setcheckEmptyname] = useState(false);
  const [checkEmptydescription, setcheckEmptydescription] = useState(false);
  const [checkEmptyteacher, setcheckEmptyteacher] = useState(false);
  const [checkEmptytCategory, setcheckEmptytCategory] = useState(false);
  const [checkEmptysessionType, setcheckEmptysessionType] = useState(false);
  const [checkEmptylocation, setcheckEmptylocation] = useState(false);
  const [checkEmptyDate, setCheckEmptyDate] = useState(false);
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [fileUrl, setfileUrl] = useState("");
  const [duration, setduration] = useState("");
  const [teacher, setteacher] = useState("");
  const [tCategory, settCategory] = useState("");
  const [sessionType, setsessionType] = useState("");
  const [location, setlocation] = useState("");
  const videoRef = useRef(null);
  const [id, setId] = useState();
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [roll, setRoll] = useState(0);
  const [emp, setEmp] = useState([]);
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
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // backend expects "file"

    axios
      .post(`${process.env.REACT_APP_URL}/v1/TrainingFile/fileadd`, formData, {
        headers: { Authorization: TOKEN },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          // Амжилттай upload бол fileId, fileUrl-г хадгалах
          setfileUrl(res.data.path);
          setId(res.data.id);
          setRoll(1);
          notification.success("Файл амжилттай upload боллоо.");
        } else {
          notification.error(res.data.resultMessage);
        }
      })
      .catch((err) => {
        console.error(err);
        notification.error("Файл upload амжилтгүй боллоо.");
      });
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
        if (res.data.isSuccess === true) {
          setRoll(0);
        }
      })
      .catch((err) => console.log(err));
  };
  function Diceroll() {
    const ext = fileUrl?.slice(-4).toLowerCase();

    return (
      <div className="w-full flex justify-center">
        {roll === 0 ? (
          <input
            type="file"
            onChange={handleFileSelect}
            className="px-3 py-2 text-blueGray-600 bg-white text-sm w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
        ) : (
          <div className="w-full max-w-md mx-auto border rounded-lg shadow-sm p-3 text-center">
            {/* PREVIEW */}
            {ext === ".mp4" && (
              <div
                className="relative w-full"
                style={{ paddingTop: "177.77%" }}
              >
                {" "}
                {/* 9:16 */}
                <video
                  className="absolute top-0 left-0 w-full h-full object-contain rounded"
                  onLoadedMetadata={handleProgress}
                  ref={videoRef}
                  controls
                  disablePictureInPicture
                  controlsList="noplaybackrate"
                >
                  <source src={`http://${fileUrl}`} type="video/mp4" />
                </video>
              </div>
            )}

            {[".png", ".jpg", "jpeg", ".gif"].includes(ext) && (
              <img
                className="w-full object-contain rounded"
                style={{ maxHeight: "60vh" }}
                src={`http://${fileUrl}`}
                alt=""
              />
            )}

            {ext === ".mp3" && (
              <audio className="w-full mt-2" controls>
                <source src={`http://${fileUrl}`} type="audio/mpeg" />
              </audio>
            )}

            {["xlsx", ".pdf", "docx", "pptx"].includes(ext) && (
              <p className="text-xs text-gray-600 mt-2 truncate">
                {fileUrl?.slice(29)}
              </p>
            )}

            <button
              onClick={handleDelete}
              className="mt-3 w-full py-2 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Устгах
            </button>
          </div>
        )}
      </div>
    );
  }

  const dataFULL = {
    name: `${name}`,
    description: `${description}`,
    fileId: id === undefined ? "" : `${id}`,
    fileUrl: `${fileUrl}`,
    duration: `${duration}`,
    teacher: `${teacher}`,
    tCategory: `${tCategory}`,
    sessionType: locationn.state.item === "schedule" ? `1` : `2`,
    startDate: `${startDate}`,
    endDate: `${endDate}`,
    location: locationn.state.item === "schedule" ? `${location}` : "",
    addTrainingDevs: emp,
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    const today = new Date();

    const selectedDate = moment(today).add(24, "hours").toDate();

    if (name.length === 0) {
      setcheckEmptyname(true);
    } else if (description.length === 0) {
      setcheckEmptydescription(true);
    } else if (teacher.length === 0) {
      setcheckEmptyteacher(true);
    } else if (fileUrl.length === 0) {
      notification.error("Та файл оруулна уу.");
    } else if (emp.length === 0) {
      notification.error("Та Ажилтан сонгоно уу.");
    } else if (tCategory.length === 0) {
      setcheckEmptytCategory(true);
    } else if (startDate <= moment(selectedDate).format(format)) {
      notification.error(
        "Сургалт эхлэх хугацааг 24 цагийн дараа байхаар сонгоно уу.",
      );
    } else if (startDate > endDate) {
      notification.error(
        "Сургалт дуусах хугацаа эхлэх хугацаанаас бага байна.",
      );
      setCheckEmptyDate(true);
    } else if (startDate === endDate) {
      notification.error("Эхлэх дуусах хугацаа тэнцүү байна.");
      setCheckEmptyDate(true);
    } else {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/Training/add`,
        data: JSON.stringify(dataFULL),
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            const timer = setTimeout(() => {
              locationn.state.item === "schedule"
                ? navigate("/training-schedule")
                : navigate("/online-training");
            }, 500);
            return () => clearTimeout(timer);
          }
          if (res.data.isSuccess === false) {
            notification.error(`${res.data.resultMessage}`);
          }
        })
        .catch((err) => console.log(err));
    }
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

  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div>
        <Modal
          show={showDelete}
          onHide={hideModalDelete}
          size="ml"
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
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <p className="text-xl font-normal text-white text-center">
                Файл устгах
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <p className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                Устгах уу?
              </p>
              <button
                type="button"
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Тийм
              </button>
              <button
                onClick={hideModalDelete}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Үгүй
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="px-4 py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-left">
            <a
              onClick={() => {
                locationn.state.item === "schedule"
                  ? navigate("/training-schedule")
                  : navigate("/online-training");
              }}
              className="text-sm font-bold text-gray-900 sm:text-sm cursor-pointer"
            >
              <i className="bi bi-backspace" />
              <span className="mx-2">Буцах</span>
            </a>
            <p className="text-sm font-bold text-gray-900">
              {" "}
              {locationn.state.item === "schedule"
                ? "Сургалтын хуваарь үүсгэх"
                : "Сургалт үүсгэх"}
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
                onChange={(e) => {
                  setName(e.target.value);
                  setcheckEmptyname(false);
                }}
                id={checkEmptyname === true ? "border-red" : null}
                className="px-3 py-2  text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              />
            </div>
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Дэлгэрэнгүй
              </label>
              <textarea
                className="px-3 py-2  text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                rows="8"
                onChange={(e) => {
                  setdescription(e.target.value);
                  setcheckEmptydescription(false);
                }}
                id={checkEmptydescription === true ? "border-red" : null}
              ></textarea>
            </div>
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Файл хавсаргах
              </label>
              <div className="w-full flex justify-center">
                <Diceroll />
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
            <div className="w-2/3 sm:w-full px-2  ">
              <div className="relative w-full mb-3">
                <p className="text-xs font-semibold text-gray-600">
                  Та{" "}
                  {locationn.state.item === "schedule"
                    ? "сургалтын хуваарийг"
                    : "онлайн сургалтыг"}{" "}
                  эхлүүлэх хугацаагаа 24 цагийн дараа байхаар тохируулна уу. 😊
                </p>
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  эхлэх хугацаа
                </label>

                <DatePicker
                  className="px-3 py-2 text-blueGray-600 bg-white text-sm w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  selected={date1}
                  onChange={(date) => {
                    setDate1(date);
                  }}
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
                  дуусах хугацаа
                </label>
                <DatePicker
                  className="px-3 py-2 text-gray-600 bg-white text-sm w-full rounded-lg border border-gray-200 outline-none focus:border-indigo-500"
                  selected={date2}
                  onChange={(date) => {
                    setDate2(date);
                    setCheckEmptyDate(false);
                  }}
                  id={checkEmptyDate === true ? "border-red" : null}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  selectsStart
                  startDate={date2}
                  dateFormat="yyyy.MM.dd, HH:mm"
                />
              </div>
            </div>
            <div className="w-1/3 sm:w-full px-2  ">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Ангилал
                </label>

                <Select
                  className="text-sm  w-full rounded-lg  outline-none focus:border-indigo-500 тэе6"
                  options={category}
                  defaultValue={selectedOptioncategory}
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
              <div className="relative w-full mb-3">
                {" "}
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Сургалт орох багшийн нэр
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setteacher(e.target.value);
                    setcheckEmptyteacher(false);
                  }}
                  id={checkEmptyteacher === true ? "border-red" : null}
                  className="px-3 py-2  text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                />
              </div>
              {locationn.state.item === "schedule" ? (
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Байршил
                  </label>
                  <input
                    type="text"
                    className="px-3 py-2  text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
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
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateTraining;
