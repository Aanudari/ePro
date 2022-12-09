import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";

import axios from "axios";
import Select from "react-select";
import moment from "moment";
function CreateErrorThanks() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const type = location.state.type.category;
  const format = "YYYYMMDDHHmmss";
  const [startDate, setStartDate] = useState(new Date());
  const dateTime1 = moment(startDate).format(format);
  const [department, setDepartment] = useState();
  const [org, setOrg] = useState();
  const [workers, setWorkers] = useState();
  const options = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
  ];
  const [selectedOptiondepartment, setSelectedOptiondepartment] =
    useState(null);
  const [selectedOptionorg, setSelectedOptionorg] = useState(null);
  const [selectedOptionWorkers, setSelectedOptionWorkers] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkEmpty1, setcheckEmpty1] = useState(false);
  const [checkEmpty2, setcheckEmpty2] = useState(false);
  const [checkEmpty3, setcheckEmpty3] = useState(false);
  const [checkEmpty4, setcheckEmpty4] = useState(false);
  const [checkEmpty5, setcheckEmpty5] = useState(false);
  const [checkEmpty6, setcheckEmpty6] = useState(false);
  const [checkEmpty7, setcheckEmpty7] = useState(false);
  console.log(selectedOptionorg)
  const [departmentID, setDepartmentID] = useState("");
  const [orgID, setOrgID] = useState("");
  const [workersID, setWorkersID] = useState("");
  const [tooVAl, setTooVal] = useState("");
  const [complainType, setComplainType] = useState("");
  const [rule, setRule] = useState("");
  const [desc, setDescription] = useState("");
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
  const handleToo = (item) => {
    setTooVal(item.value);
  };

  const data = {
    department: `${departmentID}`,
    unit: `${orgID}`,
    deviceId: `${workersID}`,
    complain: `${location.state.type.id}`,
    complainType: `${complainType}`,
    description: `${desc}`,
    rule: `${rule}`,
    too: `${tooVAl}`,
    createdDate: `${dateTime1}`,
  };

  const navigateIndex = (e) => {
    e.preventDefault();
    if (departmentID.length === 0) {
      setcheckEmpty1(true);
    }
    if (orgID.length === 0) {
      setcheckEmpty2(true);
    }
    if (workersID.length === 0) {
      setcheckEmpty3(true);
    }
    if (complainType.length === 0) {
      setcheckEmpty4(true);
    }
    if (desc.length === 0) {
      setcheckEmpty5(true);
    }
    if (rule.length === 0) {
      setcheckEmpty6(true);
    }
    if (tooVAl.length === 0) {
      setcheckEmpty7(true);
    } else {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `http://192.168.10.248:9000/v1/Complain/add`,
        data: JSON.stringify(data),
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            navigate("/error-thanks");
          }
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
              {type}
            </p>
          </div>
        </div>
        <div className="p-4 container max-w-screen-lg mx-auto">
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Огноо
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <DatePicker
                      className="outline-none text-center text-sm  outline-none  focus:ring-0 bg-transparent"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      dateFormat="yyyy, MM сарын dd"
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
                        setcheckEmpty1(false);
                      }}
                      id={checkEmpty1 === true ? "border-red" : null}
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
                        setcheckEmpty2(false);
                      }}
                      id={checkEmpty2 === true ? "border-red" : null}
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
                        setcheckEmpty3(false);
                      }}
                      id={checkEmpty3 === true ? "border-red" : null}
                      className="outline-none  w-full rounded bg-gray-50"
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue && "Сонголт хоосон байна"
                      }
                      getOptionLabel={(option) => option.firstName}
                      getOptionValue={(option) => option.deviceId}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Гомдлын төрөл
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      type="text"
                      placeholder="Нэвтрэх нэр"
                      className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                      onChange={(e) => {
                        setComplainType(e.target.value);
                        setcheckEmpty4(false);
                      }}
                      id={checkEmpty4 === true ? "border-red" : null}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Журам
                  </label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                      placeholder="rule"
                      type="text"
                      onChange={(e) => {
                        setRule(e.target.value);
                        setcheckEmpty5(false);
                      }}
                      id={checkEmpty5 === true ? "border-red" : null}
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Алдаа
                  </label>
                  <Select
                    placeholder="Алдааны тоо"
                    options={options}
                    defaultValue={selectedOption}
                    onChange={(item) => {
                      handleToo(item);
                      setcheckEmpty6(false);
                    }}
                    id={checkEmpty6 === true ? "border-red" : null}
                    className="outline-none  w-full rounded bg-gray-50"
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue && "Сонголт хоосон байна"
                    }
                    getOptionLabel={(option) => option.value}
                    getOptionValue={(option) => option.value}
                  />
                </div>
                <div className="md:col-span-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Гомдлын дэлгэрэнгүй
                  </label>
                  <div
                    className="block 2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 
                      focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <textarea
                      rows="4"
                      className="outline-none block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  focus:ring-blue-500 
                      focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="description"
                      type="text"
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setcheckEmpty7(false);
                      }}
                      id={checkEmpty7 === true ? "border-red" : null}
                    />
                  </div>
                </div>

                <div className="col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      onClick={navigateIndex}
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

export default CreateErrorThanks;
