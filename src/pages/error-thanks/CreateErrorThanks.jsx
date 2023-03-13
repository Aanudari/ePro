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
  const options = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkEmpty1, setCheckEmpty1] = useState(false);
  const [checkEmpty2, setCheckEmpty2] = useState(false);
  const [checkEmpty3, setCheckEmpty3] = useState(false);
  const [checkEmpty4, setCheckEmpty4] = useState(false);
  const [checkEmpty5, setCheckEmpty5] = useState(false);
  const [checkEmpty6, setCheckEmpty6] = useState(false);
  const [checkEmpty7, setCheckEmpty7] = useState(false);
  const [checkEmpty8, setCheckEmpty8] = useState(false);
  const [checkEmpty9, setCheckEmpty9] = useState(false);
  const [depId, setDepId] = useState("");
  const [divId, setDivId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [alba, setAlba] = useState([]);
  const [selectedOptionAlba, setSelectedOptionAlba] = useState(null);
  const [heltes, setHeltes] = useState([]);
  const [selectedOptionHeltes, setSelectedOptionHeltes] = useState(null);
  const [negj, setNegj] = useState([]);
  const [selectedOptionNegj, setSelectedOptionNegj] = useState(null);
  const [ajiltan, setAjiltan] = useState([]);
  const [selectedOptionAjiltan, setSelectedOptionAjiltan] = useState(null);
  const [tooVAl, setTooVal] = useState("");
  const [ajiltanID, setAjiltanID] = useState("");
  const [complainType, setComplainType] = useState("");
  const [rule, setRule] = useState("");
  const [desc, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ComplainReport/getListData/1`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setAlba(res.data.listData);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [
    selectedOptionAlba,
    selectedOptionHeltes,
    selectedOptionNegj,
    selectedOptionAjiltan,
  ]);
  const handleHeltes = (item) => {
    setDepId(item.id);
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ComplainReport/getListData/2?depId=${item.id}`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setHeltes(res.data.listData);
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
  const handleNegj = (item) => {
    setDivId(item.id);
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ComplainReport/getListData/3?depId=${depId}&divId=${item.id}`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setNegj(res.data.listData);
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
  const handleAjiltan = (item) => {
    setUnitId(item.id);
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ComplainReport/getListData/4?depId=${depId}&divId=${divId}&unitId=${item.id}`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setAjiltan(res.data.listData);
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
  const handleToo = (item) => {
    setTooVal(item.value);
  };
  const handleAjiltanID = (item) => {
    setAjiltanID(item.id);
  };
  const [num, setNum] = useState("");

  const handleNumChange = (event) => {
    const limit = 8;
    setNum(event.target.value.slice(0, limit));
  };
  const data = {
    department: `${depId}`,
    divsionId: `${divId}`,
    unit: `${unitId}`,
    deviceId: `${ajiltanID}`,
    complain: `${typeid}`,
    complainType: `${complainType}`,
    description: `${desc}`,
    rule: `${rule}`,
    too: `${tooVAl}`,
    createdDate: `${dateTime1}`,
    phoneNo: `${phoneNumber}`,
    isSolved: "",
    solvedDescription: "",
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    if (rule.length === 0) {
      setCheckEmpty7(true);
    } else if (depId.length === 0) {
      setCheckEmpty1(true);
    } else if (divId.length === 0) {
      setCheckEmpty2(true);
    } else if (unitId.length === 0) {
      setCheckEmpty3(true);
    } else if (ajiltanID.length === 0) {
      setCheckEmpty4(true);
    } else if (complainType.length === 0) {
      setCheckEmpty5(true);
    } else if (desc.length === 0) {
      setCheckEmpty9(true);
    } else if (tooVAl.length === 0) {
      setCheckEmpty8(true);
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
            const timer = setTimeout(() => navigate("/error-thanks"), 1000);
            return () => clearTimeout(timer);
          } else if (res.data.resultMessage === "Unauthorized") {
            logout();
          } else {
            console.log(res.data.resultMessage);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const navigateIndex1 = (e) => {
    e.preventDefault();

    if (depId.length === 0) {
      setCheckEmpty1(true);
    } else if (divId.length === 0) {
      setCheckEmpty2(true);
    } else if (unitId.length === 0) {
      setCheckEmpty3(true);
    } else if (ajiltanID.length === 0) {
      setCheckEmpty4(true);
    } else if (complainType.length === 0) {
      setCheckEmpty5(true);
    } else if (desc.length === 0) {
      setCheckEmpty9(true);
    } else if (tooVAl.length === 0) {
      setCheckEmpty8(true);
    } else if (phoneNumber.length === 0 || phoneNumber.length < 8) {
      setCheckEmpty6(true);
    } else {
      console.log(data);
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
            const timer = setTimeout(() => navigate("/error-thanks"), 1000);
            return () => clearTimeout(timer);
          } else if (res.data.resultMessage === "Unauthorized") {
            logout();
          } else {
            console.log(res.data.resultMessage);
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
              onClick={() => navigate("/error-thanks")}
              className="text-sm font-bold text-gray-900 sm:text-sm"
            >
              <i className="bi bi-backspace" />
              <span className="mx-2">Буцах</span>
            </a>
            <p className="text-sm font-bold text-gray-900">✍️ {type} бүртгэх</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-lg border-2 lg:col-span-3 lg:p-12 mt-4">
          <div className="flex -mx-2">
            <div className="w-1/3 sm:w-full px-2 ">
              <div className="relative w-full mb-3">
                <label className="block font-bold text-gray-600 text-sm  mb-2">
                  Алба
                </label>
                <Select
                  className="text-sm  w-full rounded-lg  outline-none focus:border-indigo-500"
                  options={alba}
                  defaultValue={selectedOptionAlba}
                  onChange={(item) => {
                    handleHeltes(item);
                    setCheckEmpty1(false);
                  }}
                  id={checkEmpty1 === true ? "border-red" : null}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="block font-bold  text-gray-600 text-sm  mb-2">
                  Хэлтэс
                </label>
                <Select
                  className="text-sm  w-full rounded-lg  outline-none focus:border-indigo-500"
                  options={heltes}
                  defaultValue={selectedOptionHeltes}
                  onChange={(item) => {
                    handleNegj(item);
                    setCheckEmpty2(false);
                  }}
                  id={checkEmpty2 === true ? "border-red" : null}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="block font-bold  text-gray-600 text-sm  mb-2">
                  Ажлын байр
                </label>
                <Select
                  className="text-sm  w-full rounded-lg  outline-none focus:border-indigo-500"
                  options={negj}
                  defaultValue={selectedOptionNegj}
                  onChange={(item) => {
                    handleAjiltan(item);
                    setCheckEmpty3(false);
                  }}
                  id={checkEmpty3 === true ? "border-red" : null}
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="block font-bold  text-gray-600 text-sm  mb-2">
                  Ажилтны нэр
                </label>
                <Select
                  className="text-sm  w-full rounded-lg  outline-none focus:border-indigo-500"
                  options={ajiltan}
                  defaultValue={selectedOptionAjiltan}
                  onChange={(item) => {
                    handleAjiltanID(item);
                    setCheckEmpty4(false);
                  }}
                  id={checkEmpty4 === true ? "border-red" : null}
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
                <label className="block font-bold  text-gray-600 text-sm  mb-2">
                  Огноо
                </label>
                <DatePicker
                  className="px-3 py-2 text-gray-600 bg-white text-sm w-full rounded-lg border border-gray-200 outline-none focus:border-indigo-500"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  dateFormat="yyyy, MM сарын dd"
                />
              </div>

              <div className="relative w-full mb-3">
                {typeid === "3" ? (
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Төрөл
                  </label>
                ) : (
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Гомдлын төрөл
                  </label>
                )}

                <textarea
                  rows="4"
                  className="px-3 py-3 text-gray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  type="text"
                  onChange={(e) => {
                    setComplainType(e.target.value);
                    setCheckEmpty5(false);
                  }}
                  id={checkEmpty5 === true ? "border-red" : null}
                />
              </div>
            </div>
            <div className="w-1/3 sm:w-full px-2  ">
              <div className="relative w-full mb-3">
                {typeid === "3" ? (
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Тоогоор
                  </label>
                ) : typeid === "2" ? (
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Алдааны тоо
                  </label>
                ) : (
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Алдааны тоо
                  </label>
                )}

                <Select
                  placeholder={
                    typeid === "3" ? "Талархалын тоо" : "Алдааны тоо"
                  }
                  options={options}
                  defaultValue={selectedOption}
                  onChange={(item) => {
                    handleToo(item);
                    setCheckEmpty8(false);
                  }}
                  id={checkEmpty8 === true ? "border-red" : null}
                  className="text-sm  w-full rounded-lg  outline-none focus:border-indigo-500"
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.value}
                />
              </div>
              {typeid === "3" ? (
                <div className="relative w-full mb-3">
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Бүртгэгдсэн суваг{" "}
                  </label>
                  <textarea
                    rows="3"
                    className="px-3 py-3 text-gray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    type="text"
                    onChange={(e) => {
                      setRule(e.target.value);
                      setCheckEmpty7(false);
                    }}
                    id={checkEmpty7 === true ? "border-red" : null}
                  />
                </div>
              ) : (
                ""
              )}
              {typeid === "3" ? (
                ""
              ) : (
                <div className="relative w-full mb-3">
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Холбогдох дугаар
                  </label>
                  <input
                    type="number"
                    value={num}
                    className="px-3 py-2 text-gray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setCheckEmpty6(false);
                      handleNumChange(e);
                    }}
                    id={checkEmpty6 === true ? "border-red" : null}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full sm:w-full px-2  ">
            <div className="relative w-full mb-3">
              {" "}
              {typeid === "3" ? (
                <label className="block font-bold  text-gray-600 text-sm  mb-2">
                  Дэлгэрэнгүй
                </label>
              ) : (
                <label className="block font-bold  text-gray-600 text-sm  mb-2">
                  Гомдлын дэлгэрэнгүй
                </label>
              )}
              <textarea
                rows="4"
                className="px-3 py-3 text-gray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                  setCheckEmpty9(false);
                }}
                id={checkEmpty9 === true ? "border-red" : null}
              />
            </div>
          </div>
          <div className="col-span-5 text-right">
            <div className="inline-flex items-end">
              <button
                onClick={type === "Талархал" ? navigateIndex : navigateIndex1}
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

export default CreateErrorThanks;
