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
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const format = "YYYYMMDDHHmmss";
  const format1 = "HHmm";
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);

  const [category, setCategory] = useState();
  const [selectedOptioncategory, setSelectedOptioncategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
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
  const handleTrainingCategoryId = (item) => {
    settCategory(item.id);
  };
  const handleTrainingType = (item) => {
    setsessionType(item.id);
  };
  const handleFileSelect = (event) => {
    if (event.target.files[0].name.slice(-4) === ".mp4") {
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
          if (res.data.isSuccess === true) {
            setfileUrl(res.data.path);
            setId(res.data.id);
            setRoll(1);
          } else {
            notification.error(`${res.data.resultMessage}`);
          }
          if (res.data.resultMessage === "Unauthorized") {
            logout();
          }
        })
        .catch((err) => console.log(err));
    } else {
      notification.error("Video хавсаргана уу.");
    }
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
    return (
      <>
        <div>
          {roll === 0 ? (
            <input
              type="file"
              onChange={handleFileSelect}
              className="px-3 py-3 text-blueGray-600 bg-white text-sm w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            />
          ) : (
            <div className="text-center w-full mx-auto py-2 px-2 sm:px-6 lg:py-16 lg:px-8 z-20">
              <video
                className="items-center w-1/2 mx-auto py-12 px-12 sm:px-2 lg:py-2 lg:px-2 z-10"
                onLoadedMetadata={handleProgress}
                ref={videoRef}
                // width="20%"
                // height="100%"
                id="myVideo"
                controls
              >
                <source src={`http://` + `${fileUrl}`} type="video/mp4" />
              </video>
              <div className="lg:mt-0 lg:flex-shrink-0">
                <div className="mt-2 inline-flex rounded-md shadow">
                  <button
                    onClick={() => handleDelete()}
                    type="button"
                    className="py-2 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Устгах
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
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
    sessionType: `${sessionType}`,
    startDate: `${startDate}`,
    endDate: `${endDate}`,
    location: `${location}`,
    addTrainingDevs: emp,
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setcheckEmptyname(true);
    }
    if (description.length === 0) {
      setcheckEmptydescription(true);
    }
    if (teacher.length === 0) {
      setcheckEmptyteacher(true);
    }
    if (tCategory.length === 0) {
      setcheckEmptytCategory(true);
    }
    if (sessionType.length === 0) {
      setcheckEmptysessionType(true);
    }
    if (location.length === 0) {
      setcheckEmptylocation(true);
    }
    if (startDate == endDate || startDate > endDate) {
      notification.error("Эхлэх дуусах хугацаа алдаатай байна.");
      setCheckEmptyDate(true);
    } else {
      console.log(JSON.stringify(dataFULL));
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
          console.log(res.data.resultMessage);
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            const timer = setTimeout(() => navigate("/training"), 500);
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
            <Modal.Title>Файл устгах</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Устгах уу?
              </h3>
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
      <div className="w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-md lg:text-md font-bold leading-normal text-gray-800">
              Сургалт үүсгэх
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mb-6">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <div className="space-y-4">
              <div>
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
                  className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Дэлгэрэнгүй
                </label>
                <textarea
                  className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  rows="8"
                  onChange={(e) => {
                    setdescription(e.target.value);
                    setcheckEmptydescription(false);
                  }}
                  id={checkEmptydescription === true ? "border-red" : null}
                ></textarea>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1  flex items-center">
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Файл хавсаргах
                  </label>
                  <div>
                    <Diceroll />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4  sm:grid-cols-3">
                <div>
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
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Ангилал
                  </label>

                  <Select
                    className="px-2 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
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

                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Онлайн/Тэнхим
                  </label>
                  <Select
                    className="px-2 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    options={options}
                    defaultValue={selectedOption}
                    onChange={(item) => {
                      handleTrainingType(item);
                      setcheckEmptysessionType(false);
                    }}
                    id={checkEmptysessionType === true ? "border-red" : null}
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue && "Сонголт хоосон байна"
                    }
                    getOptionLabel={(option) => option.value}
                    getOptionValue={(option) => option.id}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    startDate
                  </label>
                  <DatePicker
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    selected={date1}
                    onChange={(date) => {
                      setDate1(date);
                      setCheckEmptyDate(false);
                    }}
                    id={checkEmptyDate === true ? "border-red" : null}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    selectsStart
                    startDate={date1}
                    dateFormat="yyyy.MM.dd, HH:mm"
                  />
                </div>
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    endDate
                  </label>
                  <DatePicker
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    selected={date2}
                    onChange={(date) => {
                      setDate2(date);
                      setCheckEmptyDate(false);
                    }}
                    id={checkEmptyDate === true ? "border-red" : null}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    selectsStart
                    startDate={date2}
                    dateFormat="yyyy.MM.dd, HH:mm"
                  />
                </div>
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Байршил
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    onChange={(e) => {
                      setlocation(e.target.value);
                      setcheckEmptylocation(false);
                    }}
                    id={checkEmptylocation === true ? "border-red" : null}
                  />
                </div>
              </div>
              <div>
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

              <div className="mt-4 text-right">
                <div className="inline-flex items-end">
                  <button
                    onClick={() => navigate("/training")}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Exit
                  </button>
                  <button
                    onClick={navigateIndex}
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateTraining;
