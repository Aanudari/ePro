import React, { useEffect, useState, useRef } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import moment from "moment";
import TrainingProgressCell from "./TrainingProgressCell";
function TrainingUserCell() {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const selectedTrain = location.state.data;
  const navigate = useNavigate();
  const [filteredList, setFilteredList] = useState(selectedTrain?.trainingDevs);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = selectedTrain?.trainingDevs?.filter((item) => {
      return item.deviceName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };
  const handleOptions = (value) => {
    let filtered = selectedTrain.trainingDevs?.filter((item, i) => {
      return item.unit === value;
    });
    setFilteredList(filtered);
  };
  const uzeegui = filteredList?.filter((item) => item.status === "Үзээгүй");
  const uzsen = filteredList?.filter((item) => item.status === "Үзсэн");
  return (
    <div className="w-full min-h-[calc(100%-56px)]">
      <Navigation />
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <a
            onClick={() => {
              location.state.item === "schedule"
                ? navigate("/training-schedule")
                : navigate("/online-training");
            }}
            className="text-sm font-bold text-gray-900 sm:text-sm cursor-pointer"
          >
            <i className="bi bi-backspace" />
            <span className="mx-2">Буцах</span>
          </a>
          <p className="text-sm font-bold text-gray-900 sm:text-sm">
            Хувиарлагдсан хэрэглэгчид{" "}
            {filteredList.length > 0
              ? `(${filteredList.length})`
              : `(${selectedTrain?.trainingDevs?.length})`}
          </p>
          {location.state.item === "schedule" ? (
            ""
          ) : (
            <p className="mt-1.5 text-sm text-gray-500">
              <span className="font-bold">Сургалтын нэр:</span>{" "}
              {selectedTrain.name} 🚀
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col rounded-lg border border-gray-100 px-2 py-2 text-center">
            <div className="order-last text-sm font-medium text-gray-600">
              Үзсэн
            </div>

            <div className="text-sm font-extrabold text-blue-600 md:text-sm">
              <i className="bi bi-eye mr-1" />
              {uzsen.length}
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-gray-100 px-2 py-2 text-center">
            <div className="order-last text-sm font-medium text-gray-600">
              Үзээгүй
            </div>

            <div className="text-sm font-extrabold text-blue-600 md:text-sm">
              <i className="bi bi-eye-slash mr-1" />
              {uzeegui.length}
            </div>
          </div>
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
              {/* <select
                onChange={(e) => {
                  handleOptions(e.target.value);
                }}
              >
                {filterDep.map((el, i) => (
                  <option key={i} value={`${el.name}`}>
                    {el.name}
                  </option>
                ))}
              </select> */}
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
                    <tr key={data.devId}>
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">{data.unitName}</td>
                      <td className="px-1 py-1 border">{data.deviceName}</td>
                      <td className="px-1 py-1 border flex md:justify-center sm:justify-center ">
                        {data.status === "Үзээгүй" ? (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-500 border-2 border-red-400 rounded-md bg-white rounded-md">
                            Үзээгүй
                          </span>
                        ) : data.status === "Үзэж байгаа" ? (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-gray-500 border-2 border-gray-400 rounded-md bg-white rounded-md">
                            Үзэж байгаа
                          </span>
                        ) : (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 border-2 border-green-400 rounded-md bg-white rounded-md">
                            Үзсэн
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                : selectedTrain?.trainingDevs?.map((data, i) => (
                    <tr key={i}>
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">{data.unitName}</td>
                      <td className="px-1 py-1 border">
                        <td className="px-1 py-1 border">{data.deviceName}</td>
                      </td>
                      <td className="px-1 py-1 border flex md:justify-center sm:justify-center">
                        {data.status === "Үзээгүй" ? (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-500 border-2 border-red-400 rounded-md bg-white rounded-md">
                            Үзээгүй
                          </span>
                        ) : data.status === "Үзэж байгаа" ? (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-gray-500 border-2 border-gray-400 rounded-md bg-white rounded-md">
                            Үзэж байгаа
                          </span>
                        ) : (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 border-2 border-green-400 rounded-md bg-white rounded-md">
                            Үзсэн
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
