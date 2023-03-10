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
  return (
    <div className="w-full min-h-[calc(100%-56px)]">
      <Navigation />
      <div className="sm:px-6 w-full">
        <button
          onClick={() => navigate("/training")}
          className="bg-white border border-white p-2 rounded text-gray-700 flex items-center focus:outline-none focus:shadow-outline mt-4"
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
        <div className="px-4 md:px-10 py-4 md:py-7">
          <p className="text-sm font-bold text-gray-900 sm:text-sm">
            Хувиарлагдсан хэрэглэгчид{" "}
            {filteredList.length > 0
              ? `(${filteredList.length})`
              : `(${watchedUsers.length})`}
          </p>
          <p className="mt-1.5 text-sm text-gray-500">
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
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-500 rounded-md bg-white rounded-md">
                            ҮЗЭЭГҮЙ
                          </span>
                        ) : (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-400 border-2 border-green-500 rounded-md bg-white rounded-md">
                            ҮЗСЭН
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
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-500 rounded-md bg-white rounded-md">
                            ҮЗЭЭГҮЙ
                          </span>
                        ) : (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-400 border-2 border-green-500 rounded-md bg-white rounded-md">
                            ҮЗСЭН
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
