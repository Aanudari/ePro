import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { arraySearch } from "../../service/searchArray";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
function Traingings() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const data = location.state.data;
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />

      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Сургалтууд
            </p>
          </div>
        </div>

        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="mt-3 overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse ">
              <thead>
                <tr className="text-sm text-left  bg-gray-200 border-b">
                  <th className="px-4 py-3 font-bold">no </th>
                  <th className="px-4 py-3 font-bold">name </th>
                  <th className="px-4 py-3 font-bold">description </th>
                  <th className="px-4 py-3 font-bold">fileUrl </th>
                  <th className="px-4 py-3 font-bold">duration</th>
                  <th className="px-4 py-3 font-bold">teacher </th>
                  <th className="px-4 py-3 font-bold">sessionType </th>
                  <th className="px-4 py-3 font-bold">startDate </th>
                  <th className="px-4 py-3 font-bold">endDate </th>
                  <th className="px-4 py-3 font-bold">location </th>
                  <th className="px-4 py-3 font-bold">action </th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm">
                {data
                  ? data.map((data, i) => (
                      <tr key={i}>
                        <td className="px-1 py-1 border">{i + 1}</td>
                        <td className="px-1 py-1 border">{data.name}</td>
                        <td className="px-1 py-1 border">{data.description}</td>
                        <td className="px-1 py-1 border">{data.fileUrl}</td>
                        <td className="px-1 py-1 border">{data.duration}</td>
                        <td className="px-1 py-1 border">{data.teacher}</td>
                        <td className="px-1 py-1 border">{data.sessionType}</td>
                        <td className="px-1 py-1 border">{data.startDate}</td>
                        <td className="px-1 py-1 border">{data.endDate}</td>
                        <td className="px-1 py-1 border">{data.location}</td>
                        <td className="px-1 py-1 border">
                          <a
                            className="text-yellow-600 hover:text-black mx-2 text-lg"
                            data-id={data}
                            // onClick={() => {
                            //   handleEdit(data);
                            // }}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </a>
                          <a
                            data-id={data.id}
                            // onClick={showModalDelete}
                            className="text-rose-400 hover:text-black ml-2 text-lg"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </a>
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

export default Traingings;
