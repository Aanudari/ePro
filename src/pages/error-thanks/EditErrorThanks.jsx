import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import Select from "react-select";
function EditErrorThanks() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const data = location.state.data;
  const options = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
  ];
  const [complainInfo, setComplainInfo] = useState("");
  const [checkEmpty1, setCheckEmpty1] = useState(false);
  const [checkEmpty2, setCheckEmpty2] = useState(false);
  const [checkEmpty3, setCheckEmpty3] = useState(false);
  const [checkEmpty4, setCheckEmpty4] = useState(false);
  const [checkEmpty5, setCheckEmpty5] = useState(false);
  const [tooVAl, setTooVal] = useState("");
  const [complainType, setComplainType] = useState("");
  const [rule, setRule] = useState("");
  const [desc, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSolved, setIsSolved] = useState("");
  const [solvedDescription, setsolvedDescription] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Complain/complainInfo`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess == true) {
          setComplainInfo(res.data.complainInfos);
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
  useEffect(() => {
    setComplainType(data.complainType);
    setTooVal(data.too);
    setRule(data.rule);
    setDescription(data.description);
    setPhoneNumber(data.phoneNo);
    setIsSolved(data.isSolved);
    setsolvedDescription(data.solvedDescription);
  }, []);
  let chek = [...complainInfo].find((c) => c.id === data.complain);
  const handleToo = (item) => {
    setTooVal(item.value);
  };
  const handleNumChange = (event) => {
    const limit = 8;
    const inputNum = event.target.value.slice(0, limit);
    if (inputNum.length <= limit) {
      setPhoneNumber(inputNum);
    }
  };
  const editData = {
    id: `${data.id}`,
    complain: `${data.complain}`,
    complainType: `${complainType}`,
    description: `${desc}`,
    rule: `${rule}`,
    too: `${tooVAl}`,
    updatedBy: `${data.updatedBy}`,
    phoneNo: `${phoneNumber}`,
    isSolved: `${isSolved}`,
    solvedDesctiption: `${solvedDescription}`,
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    if (complainType.length === 0) {
      setCheckEmpty1(true);
    } else if (tooVAl.length === 0) {
      setCheckEmpty2(true);
    } else if (rule.length === 0) {
      setCheckEmpty3(true);
    } else if (desc.length === 0) {
      setCheckEmpty5(true);
    } else {
      axios({
        method: "put",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/Complain/edit`,
        data: JSON.stringify(editData),
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            const timer = setTimeout(() => navigate("/error-thanks"), 1000);
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
  const navigateIndex1 = (e) => {
    e.preventDefault();
    if (complainType.length === 0) {
      setCheckEmpty1(true);
    } else if (tooVAl.length === 0) {
      setCheckEmpty2(true);
    } else if (phoneNumber.length === 0 || phoneNumber.length < 8) {
      setCheckEmpty4(true);
    } else if (desc.length === 0) {
      setCheckEmpty5(true);
    } else {
      axios({
        method: "put",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/Complain/edit`,
        data: JSON.stringify(editData),
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            const timer = setTimeout(() => navigate("/error-thanks"), 1000);
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

            <p className="text-sm font-bold text-gray-900">
              ✍️ {chek && chek.category} засварах
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-lg border-2 lg:col-span-3 lg:p-12 mt-4">
          <div className="flex -mx-2">
            <div className="w-1/2 sm:w-full px-2  ">
              <div className="relative w-full mb-3">
                {chek?.id === "3" ? (
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
                  defaultValue={data.complainType}
                  onChange={(e) => {
                    setComplainType(e.target.value);
                    setCheckEmpty1(false);
                  }}
                  id={checkEmpty1 === true ? "border-red" : null}
                />
              </div>
            </div>
            <div className="w-1/2 sm:w-full px-2  ">
              <div className="relative w-full mb-3">
                {chek?.id === "3" ? (
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Тоогоор
                  </label>
                ) : chek?.id === "2" ? (
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
                    chek?.id === "3" ? "Талархалын тоо" : "Алдааны тоо"
                  }
                  defaultValue={{
                    value: data.too,
                  }}
                  options={options}
                  onChange={(item) => {
                    handleToo(item);
                    setCheckEmpty2(false);
                  }}
                  id={checkEmpty2 === true ? "border-red" : null}
                  className="text-sm  w-full rounded-lg  outline-none focus:border-indigo-500"
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.value}
                />
              </div>
              {chek?.id === "3" ? (
                <div className="relative w-full mb-3">
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Бүртгэгдсэн суваг{" "}
                  </label>
                  <textarea
                    rows="3"
                    className="px-3 py-3 text-gray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    type="text"
                    defaultValue={data.rule}
                    onChange={(e) => {
                      setRule(e.target.value);
                      setCheckEmpty3(false);
                    }}
                    id={checkEmpty3 === true ? "border-red" : null}
                  />
                </div>
              ) : (
                ""
              )}
              {chek?.id === "3" ? (
                ""
              ) : (
                <div className="relative w-full mb-3">
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Холбогдох дугаар
                  </label>
                  <input
                    type="number"
                    value={phoneNumber}
                    className="px-3 py-2 text-gray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    defaultValue={data.phoneNo}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setCheckEmpty4(false);
                      handleNumChange(e);
                    }}
                    id={checkEmpty4 === true ? "border-red" : null}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex -mx-2">
            <div className="w-1/2 sm:w-full px-2  ">
              <div className="relative w-full mb-3">
                {chek?.id === "3" ? (
                  ""
                ) : (
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Шийдвэрлэсэн эсэх
                  </label>
                )}

                <textarea
                  rows="3"
                  defaultValue={data.isSolved}
                  className="px-3 py-3 text-gray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  type="text"
                  onChange={(e) => {
                    setIsSolved(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 sm:w-full px-2  ">
              {chek?.id === "1" ? (
                <div className="relative w-full mb-3">
                  <label className="block font-bold  text-gray-600 text-sm  mb-2">
                    Шийдвэрлэсэн хариу
                  </label>
                  <textarea
                    rows="3"
                    defaultValue={data.solvedDescription}
                    className="px-3 py-3 text-gray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    type="text"
                    onChange={(e) => {
                      setsolvedDescription(e.target.value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="w-full sm:w-full px-2  ">
            <div className="relative w-full mb-3">
              {" "}
              {chek?.id === "3" ? (
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
                defaultValue={data.description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setCheckEmpty5(false);
                }}
                id={checkEmpty5 === true ? "border-red" : null}
              />
            </div>
          </div>
          <div className="col-span-5 text-right">
            <div className="inline-flex items-end">
              <button
                onClick={
                  chek?.category === "Талархал" ? navigateIndex : navigateIndex1
                }
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

export default EditErrorThanks;
