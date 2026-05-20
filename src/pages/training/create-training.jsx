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
  const locationn = useLocation();

  const format = "YYYYMMDDHHmmss";
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);

  const [category, setCategory] = useState();
  const [checkEmptyname, setcheckEmptyname] = useState(false);
  const [checkEmptydescription, setcheckEmptydescription] = useState(false);
  const [checkEmptyteacher, setcheckEmptyteacher] = useState(false);
  const [checkEmptytCategory, setcheckEmptytCategory] = useState(false);
  const [checkEmptylocation, setcheckEmptylocation] = useState(false);
  const [checkEmptyDate, setCheckEmptyDate] = useState(false);

  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [fileUrl, setfileUrl] = useState("");
  const [duration, setduration] = useState("");
  const [teacher, setteacher] = useState("");
  const [tCategory, settCategory] = useState("");
  const [location, setlocation] = useState("");

  const videoRef = useRef(null);
  const [id, setId] = useState();
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [roll, setRoll] = useState(0);
  const [emp, setEmp] = useState([]);
  const [show, setShow] = useState(false);

  const isSchedule = locationn.state.item === "schedule";

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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${process.env.REACT_APP_URL}/v1/TrainingFile/fileadd`, formData, {
        headers: { Authorization: TOKEN },
      })
      .then((res) => {
        if (res.data.isSuccess) {
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
          setfileUrl("");
          setId();
          setShowDelete(null);
        }
      })
      .catch((err) => console.log(err));
  };

  function Diceroll() {
    const ext = fileUrl?.slice(-4).toLowerCase();

    return (
      <div className="w-full">
        {roll === 0 ? (
          <label className="flex min-h-[180px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50">
            <div className="flex items-center justify-center w-12 h-12 mb-3 text-indigo-600 bg-white rounded-full shadow-sm">
              <i className="text-2xl bi bi-cloud-arrow-up" />
            </div>

            <p className="text-sm font-semibold text-slate-700">
              Файл хавсаргах
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Видео, зураг, PDF, document файл оруулж болно
            </p>

            <input type="file" onChange={handleFileSelect} className="hidden" />
          </label>
        ) : (
          <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
            <div className="p-3 bg-slate-100">
              {ext === ".mp4" && (
                <div className="relative w-full overflow-hidden bg-black aspect-video rounded-xl">
                  <video
                    className="object-contain w-full h-full"
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
                  className="max-h-[420px] w-full rounded-xl object-contain"
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
                <div className="p-4 text-center bg-white rounded-xl">
                  <i className="text-3xl text-indigo-600 bi bi-file-earmark-text" />
                  <p className="mt-2 text-xs text-gray-600 truncate">
                    {fileUrl?.slice(29)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 p-3">
              <p className="text-xs truncate text-slate-500">
                {fileUrl?.slice(29)}
              </p>

              <button
                onClick={() => setShowDelete(true)}
                className="px-4 py-2 text-xs font-medium text-white bg-red-500 rounded-lg shrink-0 hover:bg-red-600"
              >
                Устгах
              </button>
            </div>
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
    sessionType: isSchedule ? `1` : `2`,
    startDate: `${startDate}`,
    endDate: `${endDate}`,
    location: isSchedule ? `${location}` : "",
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
              isSchedule
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
    <div className="min-h-[calc(100vh-56px)] w-full bg-slate-50">
      <Navigation />

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
            <p className="text-xl font-semibold text-slate-800">Файл устгах</p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 text-red-600 bg-red-100 rounded-full">
              <i className="text-xl bi bi-trash" />
            </div>

            <p className="mb-5 text-sm text-gray-500">
              Та энэ файлыг устгахдаа итгэлтэй байна уу?
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

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="p-4 mb-5 bg-white border shadow-sm rounded-2xl border-slate-100">
          <button
            onClick={() => {
              isSchedule
                ? navigate("/training-schedule")
                : navigate("/online-training");
            }}
            className="inline-flex items-center gap-2 mb-3 text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            <i className="bi bi-arrow-left" />
            Буцах
          </button>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                {isSchedule ? "Сургалтын хуваарь үүсгэх" : "Сургалт үүсгэх"}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Мэдээллээ бүрэн бөглөөд сургалтаа хадгална уу.
              </p>
            </div>

            <div className="px-4 py-2 text-sm text-indigo-700 rounded-xl bg-indigo-50">
              <i className="mr-1 bi bi-info-circle" />
              Эхлэх хугацаа 24 цагийн дараа байна
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">
            <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100">
              <h2 className="mb-2 text-base font-semibold text-slate-900">
                Үндсэн мэдээлэл
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Нэр
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                      setcheckEmptyname(false);
                    }}
                    id={checkEmptyname === true ? "border-red" : null}
                    className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 ${
                      checkEmptyname ? "border-red-400" : "border-slate-200"
                    }`}
                    placeholder="Сургалтын нэр оруулах"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Дэлгэрэнгүй
                  </label>
                  <textarea
                    className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 ${
                      checkEmptydescription
                        ? "border-red-400"
                        : "border-slate-200"
                    }`}
                    rows="6"
                    placeholder="Сургалтын тайлбар оруулах"
                    onChange={(e) => {
                      setdescription(e.target.value);
                      setcheckEmptydescription(false);
                    }}
                    id={checkEmptydescription === true ? "border-red" : null}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100">
              <h2 className="mb-2 text-base font-semibold text-slate-900">
                Файл хавсаргах
              </h2>

              <Diceroll />
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100">
              <h2 className="mb-2 text-base font-semibold text-slate-900">
                Тохиргоо
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Ангилал
                  </label>

                  <Select
                    className="text-sm"
                    options={category}
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

                  {checkEmptytCategory && (
                    <p className="mt-1 text-xs text-red-500">
                      Ангилал сонгоно уу.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Сургалт орох багшийн нэр
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setteacher(e.target.value);
                      setcheckEmptyteacher(false);
                    }}
                    id={checkEmptyteacher === true ? "border-red" : null}
                    className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 ${
                      checkEmptyteacher ? "border-red-400" : "border-slate-200"
                    }`}
                    placeholder="Багшийн нэр"
                  />
                </div>

                {isSchedule ? (
                  <div>
                    <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                      Байршил
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 ${
                        checkEmptylocation
                          ? "border-red-400"
                          : "border-slate-200"
                      }`}
                      placeholder="Байршил"
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

                <div>
                  <button
                    onClick={() => setShow(true)}
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <span>
                      <i className="mr-2 bi bi-people" />
                      Ажилтан сонгох
                    </span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5">
                      {emp?.length}
                    </span>
                  </button>

                  {show && (
                    <Workers setShow={setShow} getEmployees={getEmployees} />
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100">
              <h2 className="mb-2 text-base font-semibold text-slate-900">
                Хугацаа
              </h2>

              <p className="p-3 mb-2 text-xs font-medium rounded-xl bg-slate-50 text-slate-600">
                Та {isSchedule ? "сургалтын хуваарийг" : "онлайн сургалтыг"}{" "}
                эхлүүлэх хугацаагаа 24 цагийн дараа байхаар тохируулна уу. 😊
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Эхлэх хугацаа
                  </label>

                  <DatePicker
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500"
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

                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Дуусах хугацаа
                  </label>

                  <DatePicker
                    className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 ${
                      checkEmptyDate ? "border-red-400" : "border-slate-200"
                    }`}
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
            </div>

            <button
              onClick={navigateIndex}
              type="submit"
              className="w-full px-4 py-3 text-sm font-semibold text-white transition bg-indigo-600 shadow-sm rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              Хадгалах
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CreateTraining;
