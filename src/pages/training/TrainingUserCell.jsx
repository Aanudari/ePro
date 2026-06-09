import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function TrainingUserCell() {
  const location = useLocation();
  const selectedTrain = location.state.data;
  const navigate = useNavigate();

  const [filteredList, setFilteredList] = useState(
    selectedTrain?.trainingDevs || [],
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const searchList = selectedTrain?.trainingDevs?.filter((item) => {
      return item.deviceName.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredList(searchList || []);
  };

  const uzeegui = filteredList.filter((item) => item.status === "Үзээгүй");
  const uzsen = filteredList.filter((item) => item.status === "Үзсэн");

  return (
    <div className="w-full min-h-[calc(100%-56px)]">
      <Navigation />

      <div className="w-full sm:px-6">
        <div className="px-4 py-4 md:px-10 md:py-7">
          <button
            type="button"
            onClick={() => {
              location.state.item === "schedule"
                ? navigate("/training-schedule")
                : navigate("/online-training");
            }}
            className="text-sm font-bold text-gray-900 cursor-pointer sm:text-sm"
          >
            <i className="bi bi-backspace" />
            <span className="mx-2">Буцах</span>
          </button>

          <p className="text-sm font-bold text-gray-900 sm:text-sm">
            Хувиарлагдсан хэрэглэгчид ({filteredList.length})
          </p>

          {location.state.item !== "schedule" && (
            <p className="mt-1.5 text-sm text-gray-500">
              <span className="font-bold">Сургалтын нэр:</span>{" "}
              {selectedTrain.name} 🚀
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col px-2 py-2 text-center border border-gray-100 rounded-lg">
            <div className="order-last text-sm font-medium text-gray-600">
              Үзсэн
            </div>
            <div className="text-sm font-extrabold text-blue-600 md:text-sm">
              <i className="mr-1 bi bi-eye" />
              {uzsen.length}
            </div>
          </div>

          <div className="flex flex-col px-2 py-2 text-center border border-gray-100 rounded-lg">
            <div className="order-last text-sm font-medium text-gray-600">
              Үзээгүй
            </div>
            <div className="text-sm font-extrabold text-blue-600 md:text-sm">
              <i className="mr-1 bi bi-eye-slash" />
              {uzeegui.length}
            </div>
          </div>
        </div>

        <div className="px-4 py-4 bg-white md:py-7 md:px-8 xl:px-10">
          <div className="items-center justify-between sm:flex">
            <div className="flex items-center sm:justify-between sm:gap-4">
              <div className="relative hidden sm:block">
                <input
                  value={searchQuery}
                  onChange={handleSearch}
                  type="text"
                  name="search"
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-lg shadow-sm outline-none focus:border-indigo-500"
                  placeholder="Овог нэр"
                />

                <button
                  type="button"
                  className="absolute p-2 text-gray-600 transition -translate-y-1/2 rounded-md top-1/2 right-1 bg-gray-50 hover:text-gray-700"
                >
                  <i className="bi bi-search" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr className="text-sm text-left bg-gray-200 border-b">
                  <th className="px-4 py-3 font-bold">№</th>
                  <th className="px-4 py-3 font-bold">Хэлтэс</th>
                  <th className="px-4 py-3 font-bold">Овог нэр</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>

              <tbody className="text-sm bg-white">
                {filteredList.map((data, i) => (
                  <tr key={data.devId || i}>
                    <td className="px-1 py-1 border">{i + 1}</td>
                    <td className="px-1 py-1 border">{data.unitName}</td>
                    <td className="px-1 py-1 border">{data.deviceName}</td>
                    <td className="px-1 py-1 border">
                      <div className="flex md:justify-center sm:justify-center">
                        {data.status === "Үзээгүй" ? (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-500 bg-white border-2 border-red-400 rounded-md">
                            Үзээгүй
                          </span>
                        ) : data.status === "Үзэж байгаа" ? (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-gray-500 bg-white border-2 border-gray-400 rounded-md">
                            Үзэж байгаа
                          </span>
                        ) : (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 bg-white border-2 border-green-400 rounded-md">
                            Үзсэн
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default TrainingUserCell;
