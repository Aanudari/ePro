import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { arraySearch } from "../../service/searchArray";
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
  const [checkEmptyfileUrl, setcheckEmptyfileUrl] = useState(false);
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
  useEffect(() => {
    axios({
      method: "get",
      headers: {
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
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/User/department`,
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
      url: `http://192.168.10.248:9000/v1/User/org/${item.id}`,
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
      url: `http://192.168.10.248:9000/v1/User/unit/devices?unitId=${item.id}`,
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
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    const data = new FormData();
    data.append("file", selectedFile);
    axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/TrainingFile/fileadd`,
      data,
    })
      .then((res) => {
        console.log(res.data.isSuccess);
        if (res.data.isSuccess == true) {
          setfileUrl(res.data.path);
        }
        if (res.data.isSuccess == false) {
          alert("Өөр файл оруулна уу");
        }
      })
      .catch((err) => console.log(err));
  };
  const data = {
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
    addTrainingDevs: [
      //surgalt hen2 uzeh ve
      {
        departmentId: `${departmentID}`,
        unitId: `${orgID}`,
        devId: `${workersID}`,
      },
    ],
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    console.log(data);
    console.log(fileUrl);
    if (name.length === 0) {
      setcheckEmptyname(true);
    }
    if (description.length === 0) {
      setcheckEmptydescription(true);
    }
    if (fileUrl.length === 0) {
      setcheckEmptyfileUrl(true);
    }
    if (duration.length === 0) {
      setcheckEmptyduration(true);
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
    } else {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `http://192.168.10.248:9000/v1/Training/add`,
        data: JSON.stringify(data),
      })
        .then((res) => {
          console.log(res.data);
          // if (res.data.isSuccess === true) {
          //   notification.success(`${res.data.resultMessage}`);
          //   const timer = setTimeout(() => navigate("/training"), 1000);
          //   return () => clearTimeout(timer);
          // }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />

      <div className="w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Сургалт үүсгэх
            </p>
          </div>
        </div>
        <div className="p-4 container max-w-screen-lg mx-auto">
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Сургалтын нэр
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      type="text"
                      className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                      onChange={(e) => {
                        setName(e.target.value);
                        setcheckEmptyname(false);
                      }}
                      id={checkEmptyname === true ? "border-red" : null}
                    />
                  </div>
                </div>
                <div className="md:col-span-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Дэлгэрэнгүй
                  </label>
                  <div
                    className="block 2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <textarea
                      rows="4"
                      className="outline-none block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  focus:ring-blue-500 
                    focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      onChange={(e) => {
                        setdescription(e.target.value);
                        setcheckEmptydescription(false);
                      }}
                      id={checkEmptydescription === true ? "border-red" : null}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Файлаа оруулна уу 📁
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                      type="file"
                      onChange={handleFileSelect}
                      // onChange={(e) => {
                      //   handleFileSelect(e);
                      //   setcheckEmptyfileUrl(false);
                      // }}
                      // id={checkEmptyfileUrl === true ? "border-red" : null}
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Сургалт явагдах хугацаа
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                      type="time"
                      step="360000"
                      onChange={(e) => {
                        setduration(e.target.value);
                        setcheckEmptyduration(false);
                      }}
                      id={checkEmptyduration === true ? "border-red" : null}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Багшийн нэр
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      type="text"
                      className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                      onChange={(e) => {
                        setteacher(e.target.value);
                        setcheckEmptyteacher(false);
                      }}
                      id={checkEmptyteacher === true ? "border-red" : null}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Сургалтын ангилал
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 ">
                    <Select
                      className="outline-none  w-full rounded bg-gray-50"
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
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Сургалтын хичээллэх төлөв
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <Select
                      options={options}
                      defaultValue={selectedOption}
                      onChange={(item) => {
                        handleTrainingType(item);
                        setcheckEmptysessionType(false);
                      }}
                      id={checkEmptysessionType === true ? "border-red" : null}
                      className="outline-none  w-full rounded bg-gray-50"
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.value}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    startDate
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <DatePicker
                      className="outline-none text-center text-sm  outline-none  focus:ring-0 bg-transparent"
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
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    endDate
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <DatePicker
                      className="outline-none text-center text-sm  outline-none  focus:ring-0 bg-transparent"
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
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Байршил
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      type="text"
                      className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                      onChange={(e) => {
                        setlocation(e.target.value);
                        setcheckEmptylocation(false);
                      }}
                      id={checkEmptylocation === true ? "border-red" : null}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Харьяалагдах хэлтэс
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 ">
                    <Select
                      className="outline-none  w-full rounded bg-gray-50"
                      options={department}
                      defaultValue={selectedOptiondepartment}
                      onChange={(item) => {
                        handleOrg(item);
                        // setcheckEmpty1(false);
                      }}
                      // id={checkEmpty1 === true ? "border-red" : null}
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ажлын байр
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <Select
                      options={org}
                      defaultValue={selectedOptionorg}
                      onChange={(item) => {
                        handleWorkers(item);
                        // setcheckEmpty2(false);
                      }}
                      // id={checkEmpty2 === true ? "border-red" : null}
                      className="outline-none  w-full rounded bg-gray-50"
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ажилтны нэр
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <Select
                      options={workers}
                      defaultValue={selectedOptionWorkers}
                      onChange={(item) => {
                        handleWorkersID(item);
                        // setcheckEmpty3(false);
                      }}
                      // id={checkEmpty3 === true ? "border-red" : null}
                      className="outline-none  w-full rounded bg-gray-50"
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.firstName}
                      getOptionValue={(option) => option.deviceId}
                    />
                  </div>
                </div>

                <div className="col-span-5 text-right">
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
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateTraining;
