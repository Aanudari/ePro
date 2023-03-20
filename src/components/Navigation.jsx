import React, { useState, Fragment } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import getWindowDimensions from "./SizeDetector";
import MobileBar from "./MobileBar";
import { Menu, Transition } from "@headlessui/react";
import { logout } from "../service/examService";
import Countdown from "./CountDown";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navigation() {
  const { width } = getWindowDimensions();
  const {
    activeMenu,
    setActiveMenu,
    user,
    deviceId,
    setInputValue,
    mobileBar,
    setMobileBar,
  } = useStateContext();
  const [show, setshow] = useState(false);
  const handleProfile = () => {
    setshow(!show);
  };
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.REACT_APP_URL}/v1/User/${deviceId}`,
    })
      .then((res) => setData(res.data.result))
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = () => {
    navigate("/search-result");
  };
  const [count, setCount] = useState(5);
  const [showCount, setShowCount] = useState(false);

  let logoutTimer = setTimeout(() => {
    localStorage.removeItem("loginTime");
    logout();
  }, 1800000);
  const mainUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="relative cus-index bg-[rgb(32, 73, 90)] ">
      <div className="h-14"></div>
      <div
        className={
          activeMenu
            ? "h-14 transition w-full md:w-[calc(100%-250px)] bg-gray-700 fixed top-0 flex justify-between md:px-4 shadow-sm"
            : " shadow-sm h-14 bg-gray-700 fixed top-0 flex w-full justify-between md:px-4"
        }
      >
        <div className="flex items-center md:gap-4">
          <div className="p-2 flex items-center rounded-full m-2 ">
            {width > 768 ? (
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
            ) : (
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
            )}
            {mobileBar && <MobileBar />}
          </div>
          {/* search */}
          <div className="flex nav">
            <form action="" onSubmit={handleSubmit}>
              <input
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                type="text"
                placeholder="Хайх"
                className="custom-input-2 h-10"
              />
            </form>
          </div>
          {showCount && <Countdown count={count} setCount={setCount} />}
        </div>
        <div className="w-[260px] flex justify-center rounded-md cursor-pointer m-2 call-call">
          {/* Notification */}

          <button
            onClick={() => {
              navigate("/notification");
            }}
            type="button"
            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <i className="bi bi-bell text-white"></i>
          </button>
          <Menu as="div" className="relative ml-3 h-full">
            <div className="h-full w-full">
              <Menu.Button className="flex h-full rounded-full !bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-10 w-10 rounded-full"
                  src="user2.png"
                  alt=""
                />
                <div className="text-white flex h-full items-center px-2 w-full">
                  {mainUser.last_name[0]}. {mainUser.first_name}
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      {mainUser.first_name[0]}. {mainUser.last_name}
                    </a>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => {
                        logout();
                      }}
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 text-end"
                      )}
                    >
                      Гарах
                      <i className="bi bi-door-closed-fill"></i>
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
