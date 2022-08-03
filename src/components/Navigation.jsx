import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
function Navigation() {
  const { activeMenu, setActiveMenu } = useStateContext();
  return (
    <div className="h-14 flex w-full justify-between">
      <div className="p-2 flex items-center hover:bg-gray-100 hover:shadow rounded-full m-2">
        <svg
          onClick={() => {
            setActiveMenu(!activeMenu);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-list cursor-pointer text-sky-600"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
      <div className="p-2 w-[280px] flex justify-around">
        <div className=" flex items-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-bell text-sky-600"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-10">
            <img src="avatar2.jpg" alt="" className="w-full rounded-full" />
          </div>
          <div className="flex justify-between gap-3 cursor-pointer">
            <div className="flex items-center">
              <p className="text-[13px] m-0 font-bold">Хэрэглэгчийн нэр</p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
