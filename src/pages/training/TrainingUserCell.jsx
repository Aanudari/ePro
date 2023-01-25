import React, { useEffect, useState, useRef } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import moment from "moment";
function TrainingUserCell() {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const selectedTrain = location.state.data;
  const [watchedUsers, setWatchedUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        accept: "text/plain",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingReport/training/watched?trainingId=${selectedTrain.id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.isSuccess == true) {
          setWatchedUsers(res.data.watchedList);
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
  const [filteredList, setFilteredList] = useState(watchedUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = watchedUsers.filter((item) => {
      return item.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };
  let unique = watchedUsers.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.unit == value.unit)
  );
  let mainOption = [
    {
      department: "",
      unit: "Бүгд",
      lastName: "all_employee",
      firstName: "all_employee",
      deviceId: "0000",
      hugatsaa: "",
    },
  ];
  mainOption.push(...unique);

  const handleOptions = (value) => {
    let filtered = watchedUsers.filter((item, i) => {
      return item.unit == value;
    });
    setFilteredList(filtered);
  };
  function secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    // var hDisplay = h > 0 ? h + (h == 1 ? " цаг, " : " цаг, ") : "";
    // var mDisplay = m > 0 ? m + (m == 1 ? " минут, " : " минут, ") : "";
    // var sDisplay = s > 0 ? s + (s == 1 ? " секунд" : " секунд") : "";
    return `${h}:${m}:${s}`;
  }
  console.log(secondsToHms(selectedTrain.duration));
  return (
    <div className="w-full min-h-[calc(100%-56px)]">
      <Navigation />
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <h1 className="text-xl font-bold text-gray-900 sm:text-xl">
            Хувиарлагдсан хэрэглэгчид{" "}
            {filteredList.length > 0 ? `(${filteredList.length})` : ""}
          </h1>
          <p className="mt-1.5 text-md text-gray-500">
            <span className="font-bold">Сургалтын нэр:</span>{" "}
            {selectedTrain.name} 🚀
          </p>
        </div>

        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center sm:justify-between sm:gap-4">
              <div className="relative hidden sm:block">
                <input
                  value={searchQuery}
                  onChange={handleSearch}
                  type="text"
                  name="search"
                  className="w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 flex-1 py-2 px-4 bg-white  text-gray-700 placeholder-gray-400 shadow-sm text-base"
                  placeholder="Овог нэр"
                />

                <button
                  type="button"
                  className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                >
                  <i className="bi bi-search" />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <select
                onChange={(e) => {
                  handleOptions(e.target.value);
                }}
              >
                {mainOption.map((el, i) => (
                  <option key={i} value={`${el.unit}`}>
                    {el.unit}
                  </option>
                ))}
              </select>
              <button
                onClick={() => navigate("/training")}
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Exit
              </button>
            </div>
          </div>
          <div className="mt-3 overflow-x-auto"></div>
          <table className="items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr className="text-sm text-left  bg-gray-200 border-b">
                <th className="px-4 py-3 font-bold">№ </th>
                <th className="px-4 py-3 font-bold">Хэлтэс </th>
                <th className="px-4 py-3 font-bold">Овог нэр </th>
                <th className="px-4 py-3 font-bold">Status </th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm ">
              {filteredList.length > 0
                ? filteredList.map((data, i) => (
                    <tr key={i}>
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">{data.unit}</td>
                      <td className="px-1 py-1 border">
                        {data.lastName[0]}. {data.firstName}
                      </td>
                      <td className="px-1 py-1 border flex md:justify-center sm:justify-center">
                        {data.hugatsaa === "" ? (
                          <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="-ml-1 mr-1.5 h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                              />
                            </svg>

                            <p className="whitespace-nowrap text-sm">Үзээгүй</p>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="-ml-1 mr-1.5 h-4 w-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>

                            <p className="whitespace-nowrap text-sm">Үзсэн</p>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                : watchedUsers?.map((data, i) => (
                    <tr key={i}>
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">{data.unit}</td>
                      <td className="px-1 py-1 border">
                        {data.lastName[0]}. {data.firstName}
                      </td>
                      <td className="px-1 py-1 border flex md:justify-center sm:justify-center">
                        {data.hugatsaa === "" ? (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                            <p className="whitespace-nowrap text-sm ">
                              <i className="bi bi-exclamation-triangle mr-2" />
                              Үзээгүй
                            </p>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                            <p className="whitespace-nowrap text-sm">
                              <i className="bi bi-check-circle" />
                              Үзсэн
                            </p>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"></div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default TrainingUserCell;
