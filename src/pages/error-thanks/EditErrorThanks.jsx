import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";

import Select from "react-select";
function EditErrorThanks() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
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
      url: `http://192.168.10.248:9000/v1/Complain/complainInfo`,
    })
      .then((res) => {
        setComplainInfo(res.data.complainInfos);
        if (res.data.resultMessage === "Unauthorized") {
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
      url: `http://192.168.10.248:9000/v1/Complain/edit`,
      data: JSON.stringify(editData),
    })
      .then((res) => {
        console.log(res.data.resultMessage);
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => navigate("/error-thanks"), 1000);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />
      <div className="w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
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
                <div className="md:col-span-2">
                  {chek?.id === "3" ? (
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Бүртгэгдсэн суваг{" "}
                    </label>
                  ) : (
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Журам
                    </label>
                  )}

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

                <div className="md:col-span-1">
                  {chek?.id === "3" ? (
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Тоогоор
                    </label>
                  ) : (
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Алдаа
                    </label>
                  )}

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

export default EditErrorThanks;
