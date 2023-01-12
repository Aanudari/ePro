import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
function CreateErrorThanks() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const type = location.state.type.category;
  const typeid = location.state.type.id;
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
      url: `${process.env.REACT_APP_URL}/v1/User/department`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setDepartment(res.data.departments);
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
  const handleOrg = (item) => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/org/${item.id}`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setOrg(res.data.organizations);
          setDepartmentID(item.id);
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
  const handleWorkers = (item) => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/unit/devices?unitId=${item.id}`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setWorkers(res.data.unitDevices);
          setOrgID(item.id);
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
        url: `${process.env.REACT_APP_URL}/v1/Complain/add`,
        data: JSON.stringify(data),
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            const timer = setTimeout(() => navigate("/error-thanks"), 500);
            return () => clearTimeout(timer);
          } else {
            console.log(res.data.resultMessage);
          }
          if (res.data.resultMessage === "Unauthorized") {
            logout();
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
        <div className="w-full px-4 mx-auto mt-0">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-1">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
              <div className="mt-4">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Огноо
                      </label>
                      <DatePicker
                        className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        dateFormat="yyyy, MM сарын dd"
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Харьяалагдах хэлтэс
                      </label>
                      <Select
                        className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
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
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Ажлын байр
                      </label>
                      <Select
                        className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        options={org}
                        defaultValue={selectedOptionorg}
                        onChange={(item) => {
                          handleWorkers(item);
                          setcheckEmpty2(false);
                        }}
                        id={checkEmpty2 === true ? "border-red" : null}
                        noOptionsMessage={({ inputValue }) =>
                          !inputValue && "Сонголт хоосон байна"
                        }
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Ажилтны нэр
                      </label>
                      <Select
                        className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        options={workers}
                        defaultValue={selectedOptionWorkers}
                        onChange={(item) => {
                          handleWorkersID(item);
                          setcheckEmpty3(false);
                        }}
                        id={checkEmpty3 === true ? "border-red" : null}
                        noOptionsMessage={({ inputValue }) =>
                          !inputValue && "Сонголт хоосон байна"
                        }
                        getOptionLabel={(option) => option.firstName}
                        getOptionValue={(option) => option.deviceId}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      {typeid === "3" ? (
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Төрөл
                        </label>
                      ) : (
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Гомдлын төрөл
                        </label>
                      )}

                      <input
                        type="text"
                        className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        onChange={(e) => {
                          setComplainType(e.target.value);
                          setcheckEmpty4(false);
                        }}
                        id={checkEmpty4 === true ? "border-red" : null}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      {typeid === "3" ? (
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Бүртгэгдсэн суваг{" "}
                        </label>
                      ) : (
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Журам
                        </label>
                      )}

                      <input
                        className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        type="text"
                        onChange={(e) => {
                          setRule(e.target.value);
                          setcheckEmpty6(false);
                        }}
                        id={checkEmpty6 === true ? "border-red" : null}
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      {typeid === "3" ? (
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Тоогоор
                        </label>
                      ) : (
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Алдааны тоо
                        </label>
                      )}

                      <Select
                        placeholder="Алдааны тоо"
                        options={options}
                        defaultValue={selectedOption}
                        onChange={(item) => {
                          handleToo(item);
                          setcheckEmpty7(false);
                        }}
                        id={checkEmpty7 === true ? "border-red" : null}
                        className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        noOptionsMessage={({ inputValue }) =>
                          !inputValue && "Сонголт хоосон байна"
                        }
                        getOptionLabel={(option) => option.value}
                        getOptionValue={(option) => option.value}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      {" "}
                      {typeid === "3" ? (
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Дэлгэрэнгүй
                        </label>
                      ) : (
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Гомдлын дэлгэрэнгүй
                        </label>
                      )}
                      <textarea
                        rows="4"
                        className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        type="text"
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setcheckEmpty5(false);
                        }}
                        id={checkEmpty5 === true ? "border-red" : null}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      onClick={() => navigate("/error-thanks")}
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

export default CreateErrorThanks;
