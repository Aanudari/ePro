import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
function ErrorThanks() {
  const { TOKEN, deviceId } = useStateContext();
  console.log(deviceId);
  function dropdownFunction(element) {
    var dropdowns = document.getElementsByclassNameName("dropdown-content");
    var i;
    let list =
      element.parentElement.parentElement.getElementsByclassNameName(
        "dropdown-content"
      )[0];
    list.classNameList.add("target");
    for (i = 0; i < dropdowns.length; i++) {
      if (!dropdowns[i].classNameList.contains("target")) {
        dropdowns[i].classNameList.add("hidden");
      }
    }
    list.classNameList.toggle("hidden");
  }
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />

      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Алдаа талархал
            </p>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-black py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-black"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Хайлт"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-black focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <a
                className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                href=""
              >
                <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                  <p>Талархал</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href=""
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Бодит гомдол</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href=""
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Бодит бус гомдол</p>
                </div>
              </a>
            </div>
            <button
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-2 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded 
               text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Бүртгэл нэмэх
            </button>
          </div>
          <div className="mt-7 overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr
                  tabindex="0"
                  className="focus:outline-none h-16 border border-gray-100 rounded"
                >
                  <th className="p-3">Огноо </th>
                  <th className="p-3 text-left">Харьяалагдах хэлтэс </th>
                  <th className="p-3 text-left">Ажлын байр </th>
                  <th className="p-3 text-left">Ажилтны нэр </th>
                  <th className="p-3 text-left">Гомдлын төрөл </th>
                  <th className="p-3 text-left">Гомдлын дэлгэрэнгүй </th>
                  <th className="p-3 text-left">Журам </th>
                  <th className="p-3 text-left">Алдаа </th>
                  <th className="p-3 text-left">Action </th>
                </tr>
              </thead>

              <tbody>
                <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                  <td>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-gray-100 mx-2"
                    >
                      <i className="material-icons-outlined text-base">edit</i>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-gray-100 ml-2"
                    >
                      <i className="bi bi-trash-fill">delete</i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorThanks;
