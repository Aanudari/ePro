import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import getWindowDimensions from "./SizeDetector"
import MobileBar from "./MobileBar";

function Navigation() {
  const {width} = getWindowDimensions();
  const { activeMenu, setActiveMenu, user, deviceId, setInputValue, mobileBar, setMobileBar } = useStateContext();
  const [show, setshow] = useState(false);
  const handleProfile = () => {
    setshow(!show);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const [data, setData] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://192.168.10.248:9000/v1/User/${deviceId}`,
    })
      .then(
        res => setData(res.data.result)
      )
      .catch(err => console.log(err))
  }, [])
  const handleSubmit = () => {
    navigate("/search-result")
  }
  return (
    <div className="relative cus-index ">
      <div className="h-14"></div>
      <div className={activeMenu ? "h-14 w-full md:w-[calc(100%-250px)] bg-gray-100 fixed top-0 flex justify-between md:px-4 shadow-sm" 
      : " shadow-cus h-14 bg-gray-100 fixed top-0 flex w-full justify-between md:px-4"}>
        <div className="flex items-center md:gap-4">
          <div className="p-2 flex items-center rounded-full m-2 hover:bg-gray-100">
            {
              width > 768 ?
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
            : 
            <svg
              onClick={() => {
                setMobileBar(!mobileBar);
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
            }
            {
              mobileBar && <MobileBar/>
            }
          </div>
          {/* search */}
          <div className="flex nav">
            <form action="" onSubmit={handleSubmit}>
              <input onChange={(e) => {
                setInputValue(e.target.value)
              }} type="text" placeholder="Хайх" className="custom-input-2 h-10" />
            </form>
          </div>
        </div>

        <div className="w-[260px] flex justify-around  rounded-md cursor-pointer m-2">
          {/* Notification */}
          <div onClick={() => {
            navigate("/notification");
          }} className=" flex items-center cursor-pointer relative">
            <div className="w-[15px] h-[15px] absolute rounded-full bg-red-500 text-white text-[11.5px] z-10 flex justify-center items-center top-[5px] right-[20px]">3</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-bell text-sky-700 active:scale-105"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
          </div>
          <div onClick={handleProfile} className="flex gap-3 hover:bg-gray-300 p-2 rounded-md mr-4">
            <div className=" w-10 flex items-center">
              <img src="avatar2.jpg" alt="profile" className="w-[35px] h-[35px] rounded-full" />
            </div>
            <div className="flex justify-between gap-3 cursor-pointer relative">
              <div className="hidden md:flex items-center w-[80px]">
                <button

                  className="text-[13px] m-0 font-bold"
                >
                  {user.last_name.slice(0, 1)}.
                  <span className="ml-1">
                    {user.first_name}
                  </span>
                </button>
              </div>
              <div className="hidden md:flex items-center">
                <svg
                  onClick={handleProfile}
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
              {show ? (
                <div className="fixed w-[300px] h-[230px] bg-white top-[50px] rounded right-[30px] shadow-cus p-3 flex flex-col justify-between cus-index">
                  <div className="flex justify-between ">
                    <h6 className="mt-2">Хэрэглэгчийн хэсэг</h6>
                    <button
                      onClick={handleProfile}
                      className="hover:bg-gray-200  p-2 rounded-full text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="avatar2.jpg"
                      alt="propic"
                      className="rounded-full w-[100px]"
                    />
                    <div className="flex flex-col">
                      <span className="ml-2 font-bold">{user.last_name.slice(0, 1)}.
                        <span className="ml-1 font-bold">{user.first_name}</span></span>
                      <span className="ml-2 ">{data.roleName}</span>
                      <span className="ml-2 ">email хаяг</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full rounded font-bold bg-sky-600 hover:shadow-md text-white h-10"
                  >
                    Гараx
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
