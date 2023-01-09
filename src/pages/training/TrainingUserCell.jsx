import React, { useEffect, useState, useRef } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";

import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
function TrainingUserCell() {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const selectedTrain = location.state.data;
  const [watchedUsers, setWatchedUsers] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        accept: "text/plain",
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/TrainingReport/training/watched?trainingId=${selectedTrain.id}`,
    })
      .then((res) => {
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
      department: "Борлуулалт үйлчилгээний алба",
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
    if (filtered.length === 0) {
      setFilteredList(watchedUsers);
    } else if (filtered.length > 0) {
      setFilteredList(filtered);
    }
  };

  return (
    <div className="w-full min-h-[calc(100%-56px)]">
      <Navigation />
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Хувиарлагдсан хэрэглэгчид
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
                Filter
              </button>
            </div>
          </div>
          <div className="mt-3 overflow-x-auto"></div>
          <table className="items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr className="text-sm text-left  bg-gray-200 border-b">
                <th className="px-4 py-3 font-bold">no </th>
                <th className="px-4 py-3 font-bold">unit </th>
                <th className="px-4 py-3 font-bold">Name </th>
                <th className="px-4 py-3 font-bold">status </th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm ">
              {filteredList
                ? filteredList.map((data, i) => (
                    <tr key={i}>
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">{data.unit}</td>
                      <td className="px-1 py-1 border">
                        {data.lastName[0]}. {data.firstName}
                      </td>
                      <td className="px-1 py-1 border">
                        {data.hugatsaa === "" ? (
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-grey-900 items-center">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-gray-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">Үзээгүй</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900 items-center">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">Үзсэн</span>
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
                      <td className="px-1 py-1 border">
                        {data.hugatsaa === "" ? (
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-grey-900 items-center">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-gray-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">Үзээгүй</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900 items-center">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">Үзсэн</span>
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
