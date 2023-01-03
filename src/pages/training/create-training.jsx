import React, { useEffect, useState } from "react";
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
function CreateTraining() {
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const format = "YYYYMMDDHHmmss";
  const format1 = "HHmm";
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);

  const [category, setCategory] = useState();
  const [selectedOptioncategory, setSelectedOptioncategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptiondepartment, setSelectedOptiondepartment] =
    useState(null);
  const [selectedOptionorg, setSelectedOptionorg] = useState(null);
  const [selectedOptionWorkers, setSelectedOptionWorkers] = useState(null);
  const [selectedFile, setSelectedFile] = useState(false);
  const options = [
    { id: "1", value: "Тэнхим" },
    { id: "2", value: "Онлайн" },
  ];
  const [checkEmptyname, setcheckEmptyname] = useState(false);
  const [checkEmptydescription, setcheckEmptydescription] = useState(false);
  const [checkEmptydepartment, setcheckEmptydepartment] = useState(false);
  const [checkEmptyduration, setcheckEmptyduration] = useState(false);
  const [checkEmptyteacher, setcheckEmptyteacher] = useState(false);
  const [checkEmptytCategory, setcheckEmptytCategory] = useState(false);
  const [checkEmptysessionType, setcheckEmptysessionType] = useState(false);
  const [checkEmptylocation, setcheckEmptylocation] = useState(false);
  const [department, setDepartment] = useState();
  const [org, setOrg] = useState();
  const [workers, setWorkers] = useState();
  const [departmentID, setDepartmentID] = useState("");
  const [orgID, setOrgID] = useState("");
  const [workersID, setWorkersID] = useState("");
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [fileUrl, setfileUrl] = useState("");
  const [duration, setduration] = useState("");
  const [teacher, setteacher] = useState("");
  const [tCategory, settCategory] = useState("");
  const [sessionType, setsessionType] = useState("");
  const [location, setlocation] = useState("");
  const [durationStart, setdurationStart] = useState(new Date());
  const [durationEnd, setdurationEnd] = useState(new Date());
  const d1 = moment(durationStart).format(format1);
  const d2 = moment(durationEnd).format(format1);

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
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        accept: "text/plain",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/department`,
    })
      .then((res) => {
        setDepartment(res.data.departments);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleOrg = (item) => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/org/${item.id}`,
    })
      .then((res) => {
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        } else {
          setOrg(res.data.organizations);
          setDepartmentID(item.id);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleWorkers = (item) => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/unit/devices?unitId=${item.id}`,
    })
      .then((res) => {
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        } else {
          setWorkers(res.data.unitDevices);
          setOrgID(item.id);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleWorkersID = (item) => {
    setWorkersID(item.deviceId);
  };
  const handleTrainingCategoryId = (item) => {
    settCategory(item.id);
  };
  const handleTrainingType = (item) => {
    setsessionType(item.id);
  };

  const dataFULL = {
    name: `${name}`,
    description: `${description}`,
    fileUrl: `${fileUrl}`,
    duration: `${duration}`,
    teacher: `${teacher}`,
    tCategory: `${tCategory}`,
    sessionType: `${sessionType}`,
    startDate: `${startDate}`,
    endDate: `${endDate}`,
    location: `${location}`,
    addTrainingDevs:
      orgID === "" && workersID === ""
        ? [
            {
              departmentId: `${departmentID}`,
            },
          ]
        : [
            {
              departmentId: `${departmentID}`,
              unitId: `${orgID}`,
              devId: `${workersID}`,
            },
          ],
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    handleCreate();
  };
  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", selectedFile);
    fetch("http://192.168.10.248:9000/v1/TrainingFile/fileadd", {
      method: "POST",
      headers: {
        Authorization: `${TOKEN}`,
      },
      body: data,
    }).then(
      function (res) {
        console.log(res);
        if (res.ok) {
          setfileUrl(res.url);
          console.log(res.statusText);
        } else {
          console.log(res);
        }
      },
      function (e) {
        console.log("Error submitting form!", e);
      }
    );
  };
  // useEffect(() => {
  //   d();
  // }, [durationStart, durationEnd]);
  const navigateIndex = (e) => {
    e.preventDefault();
    if (d1 > d2 || d1 == d2) {
      notification.error("Үргэлжлэх хугацаа буруу байна.");
    } else {
      setduration(d1 - d2);
    }
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
      notification.invalidFileUpload("Эхлэх дуусах хугацаа алдаатай байна.");
    }
    if (departmentID.length === 0) {
      setcheckEmptydepartment(true);
    } else {
      console.log(dataFULL);
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
          console.log(res.data);
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            const timer = setTimeout(() => navigate("/trainings"), 1000);
            return () => clearTimeout(timer);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />

      <div className="w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Файл хавсаргах
                  </label>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Үргэлжлэх хугацаа
                  </label>

                  <div
                    className="inline-flex items-center border rounded-md bg-gray-200 "

                    // onChange={(e) => {
                    //   setduration(e.target.value);
                    //   setcheckEmptyduration(false);
                    // }}
                    // id={checkEmptyduration === true ? "border-red" : null}
                  >
                    <DatePicker
                      className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      selected={durationStart}
                      onChange={(date) => setdurationStart(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="hh:mm a"
                    />
                    <div className="inline-block px-2 h-full">to</div>
                    <DatePicker
                      className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      selected={durationEnd}
                      onChange={(date) => setdurationEnd(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="hh:mm a"
                    />
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
                    onChange={(date) => setDate1(date)}
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
                    onChange={(date) => setDate2(date)}
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
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Харьяалагдах хэлтэс
                  </label>
                  <Select
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    options={department}
                    defaultValue={selectedOptiondepartment}
                    onChange={(item) => {
                      handleOrg(item);
                      setcheckEmptydepartment(false);
                    }}
                    id={checkEmptydepartment === true ? "border-red" : null}
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue && "Сонголт хоосон байна"
                    }
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                  />
                </div>
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Ажлын байр
                  </label>
                  <Select
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    options={org}
                    defaultValue={selectedOptionorg}
                    onChange={(item) => {
                      handleWorkers(item);
                      // setcheckEmpty2(false);
                    }}
                    // id={checkEmpty2 === true ? "border-red" : null}
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue && "Сонголт хоосон байна"
                    }
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                  />
                </div>
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Ажилтны нэр
                  </label>
                  <Select
                    options={workers}
                    defaultValue={selectedOptionWorkers}
                    onChange={(item) => {
                      handleWorkersID(item);
                      // setcheckEmpty3(false);
                    }}
                    // id={checkEmpty3 === true ? "border-red" : null}
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue && "Сонголт хоосон байна"
                    }
                    getOptionLabel={(option) => option.firstName}
                    getOptionValue={(option) => option.deviceId}
                  />
                </div>
              </div>

              <div className="mt-4 text-right">
                <div className="inline-flex items-end">
                  <button
                    onClick={() => navigate("/trainings")}
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
