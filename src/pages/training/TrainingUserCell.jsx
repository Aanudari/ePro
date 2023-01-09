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
  console.log(watchedUsers);
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
          <div className="mt-3 overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse ">
              <thead>
                <tr className="text-sm text-left  bg-gray-200 border-b">
                  <th className="px-4 py-3 font-bold">no </th>
                  <th className="px-4 py-3 font-bold">unit </th>
                  <th className="px-4 py-3 font-bold">firstName </th>
                  <th className="px-4 py-3 font-bold">status </th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm ">
                {watchedUsers
                  ? watchedUsers.map((data, i) => (
                      <tr key={i}>
                        <td className="px-1 py-1 border">{i + 1}</td>
                        <td className="px-1 py-1 border">{data.unit}</td>
                        <td className="px-1 py-1 border">
                          {data.lastName[0]}. {data.firstName}
                        </td>
                        <td className="px-1 py-1 border">
                          {data.hugatsaa === "" ? (
                            <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-gray-900 items-center">
                              <span
                                aria-hidden="true"
                                class="absolute inset-0 bg-gray-300 rounded-full opacity-50"
                              ></span>
                              <span class="relative">Үзээгүй</span>
                            </span>
                          ) : (
                            <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900 items-center">
                              <span
                                aria-hidden="true"
                                class="absolute inset-0 bg-green-300 rounded-full opacity-50"
                              ></span>
                              <span class="relative">Үзсэн</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>

            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TrainingUserCell;
