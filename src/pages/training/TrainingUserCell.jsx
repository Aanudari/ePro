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
          <p className="focus:outline-none text-base sm:text-sm md:text-md lg:text-md font-bold leading-normal text-gray-800">
            Сургалтын нэр: {selectedTrain.name}
          </p>
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-md lg:text-md font-bold leading-normal text-gray-800">
              Хувиарлагдсан хэрэглэгчид (
              {filteredList?.length === 0
                ? watchedUsers?.length
                : filteredList?.length}
              )
            </p>
          </div>
        </div>

        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
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
            <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div className=" relative ">
                <input
                  value={searchQuery}
                  onChange={handleSearch}
                  type="text"
                  name="search"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Нэрээр хайх"
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                <i className="bi bi-search" />
              </button>
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
                      <td className="px-1 py-1 border">
                        {data.hugatsaa === "" ? (
                          <div
                            className="bg-red-200 border-red-600 text-red-600 border-l-2 p-1"
                            role="alert"
                          >
                            <p className="font-bold">Үзээгүй</p>
                          </div>
                        ) : (
                          <div
                            className="bg-green-200 border-green-600 text-green-600 border-l-2 p-1"
                            role="alert"
                          >
                            <p className="font-bold">Үзсэн</p>
                          </div>
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
                      <td className="px-1 py-1 border">
                        {data.hugatsaa === "" ? (
                          <div
                            className="bg-red-200 border-red-600 text-red-600 border-l-2 p-1"
                            role="alert"
                          >
                            <p className="font-bold">Үзээгүй</p>
                          </div>
                        ) : (
                          <div
                            className="bg-green-200 border-green-600 text-green-600 border-l-2 p-1"
                            role="alert"
                          >
                            <p className="font-bold">Үзсэн</p>
                          </div>
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
