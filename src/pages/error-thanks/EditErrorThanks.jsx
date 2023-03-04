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
  const options = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
  ];
  const data = location.state.data;
  const [complainInfo, setComplainInfo] = useState("");
  const [results, setResults] = useState("");
  const [complainType, setComplainType] = useState("");
  const [rule, setRule] = useState("");
  const [desc, setDescription] = useState("");
  const [tooVAl, setTooVal] = useState("");

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

  let chek = [...complainInfo].find((c) => c.id === data.complain);

  const handleToo = (item) => {
    setTooVal(item.value);
  };
  const editData = {
    id: `${data.id}`,
    complain: `${data.complain}`,
    complainType:
      `${complainType}` === "" ? data.complainType : `${complainType}`,
    description: `${desc}` === "" ? data.description : `${desc}`,
    rule: `${rule}` === "" ? data.rule : `${rule}`,
    too: `${tooVAl}` === "" ? data.too : `${rule}`,
    updatedBy: `${data.updatedBy}`,
  };
  const navigateIndex = (e) => {
    e.preventDefault();
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
        if (res.data.isSuccess === false) {
        }
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
  };
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />
      <div className="w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <button
            onClick={() => navigate("/error-thanks")}
            className=" border border-white p-2 rounded text-gray-700 flex items-center focus:outline-none focus:shadow-outline"
          >
            <svg width="24" height="24" viewBox="0 0 16 16">
              <path
                d="M9 4 L5 8 L9 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <span className="mx-2">Буцах</span>
          </button>
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-xl lg:text-xl font-bold leading-normal text-gray-800">
              {chek && chek.category}
            </p>
          </div>
        </div>
        <div className="p-4 container max-w-screen-lg mx-auto">
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2">
                  {chek?.id === "3" ? (
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Төрөл
                    </label>
                  ) : (
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Гомдлын төрөл
                    </label>
                  )}

                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      type="text"
                      defaultValue={data.complainType}
                      className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                      onChange={(e) => {
                        setComplainType(e.target.value);
                        // setcheckEmpty1(false);
                      }}
                      // id={checkEmpty1 === true ? "border-red" : null}
                    />
                  </div>
                </div>

                {chek?.id === "3" ? (
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Бүртгэгдсэн суваг{" "}
                    </label>

                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                        defaultValue={data.rule}
                        type="text"
                        onChange={(e) => {
                          setRule(e.target.value);
                          // setcheckEmpty2(false);
                        }}

                        // id={checkEmpty2 === true ? "border-red" : null}
                      />
                    </div>
                  </div>
                ) : chek?.id === "2" ? (
                  ""
                ) : (
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Журам
                    </label>

                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                        defaultValue={data.rule}
                        type="text"
                        onChange={(e) => {
                          setRule(e.target.value);
                          // setcheckEmpty2(false);
                        }}

                        // id={checkEmpty2 === true ? "border-red" : null}
                      />
                    </div>
                  </div>
                )}

                {chek?.id === "3" ? (
                  <div className="md:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Тоогоор
                    </label>
                    <Select
                      options={options}
                      defaultValue={data.too}
                      onChange={(item) => {
                        handleToo(item);
                        // setcheckEmpty3(false);
                      }}
                      // id={checkEmpty3 === true ? "border-red" : null}
                      className="outline-none  w-full rounded bg-gray-50"
                      getOptionLabel={(option) => option.value}
                      getOptionValue={(option) => option.value}
                    />
                  </div>
                ) : chek?.id === "2" ? (
                  <div className="md:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Сануулга
                    </label>
                    <Select
                      options={options}
                      defaultValue={data.too}
                      onChange={(item) => {
                        handleToo(item);
                        // setcheckEmpty3(false);
                      }}
                      // id={checkEmpty3 === true ? "border-red" : null}
                      className="outline-none  w-full rounded bg-gray-50"
                      getOptionLabel={(option) => option.value}
                      getOptionValue={(option) => option.value}
                    />
                  </div>
                ) : (
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Алдаа
                  </label>
                )}

                <div className="md:col-span-5">
                  {chek?.id === "3" ? (
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Дэлгэрэнгүй
                    </label>
                  ) : (
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Гомдлын дэлгэрэнгүй
                    </label>
                  )}

                  <div
                    className="block 2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <textarea
                      rows="4"
                      defaultValue={data.description}
                      className="outline-none block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  focus:ring-blue-500 
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      onChange={(e) => {
                        setDescription(e.target.value);
                        // setcheckEmpty4(false);
                      }}
                      // id={checkEmpty4 === true ? "border-red" : null}
                    />
                  </div>
                </div>

                <div className="col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      onClick={navigateIndex}
                      className="flex bg-green-600 border border-green-600 shadow px-4 py-2 rounded text-white focus:outline-none focus:shadow-outline"
                    >
                      Үүсгэх
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

export default EditErrorThanks;
