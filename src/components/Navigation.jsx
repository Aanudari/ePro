import React, { useState, Fragment } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import getWindowDimensions from "./SizeDetector";
import MobileBar from "./MobileBar";
import { Menu, Transition } from "@headlessui/react";
import { logout } from "../service/examService";

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
  const [isOpened, setIsOpened] = useState(false);
  function getOpen() {
    setIsOpened((wasOpened) => !wasOpened);
  }
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
          {/* <div className="flex nav">
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
          </div> */}
        </div>

        <div className="relative inline-block text-left">
          <div>
            <button
              className="text-white flex items-center justify-center w-full px-2 py-2 mt-2 text-sm rounded-md font-medium  hover:bg-gray-800  focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              onClick={getOpen}
            >
              👋 Сайн уу?{" "}
              <span className="font-bold ml-2">{user.last_name}</span>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
              </svg>
            </button>
          </div>
          {isOpened && (
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div className="py-1 ">
                {/* <a className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                  <span className="flex flex-col">
                    <span>a</span>
                  </span>
                </a>
                <a className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                  <span className="flex flex-col">
                    <span>a</span>
                  </span>
                </a> */}
                <a
                  onClick={() => {
                    logout();
                  }}
                  className="block block px-4 py-2 text-md text-gray-800 hover:bg-gray-200 hover:text-black"
                >
                  <span className="flex flex-col">
                    <span>
                      <i className="bi bi-box-arrow-right" /> Системээс гарах
                    </span>
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* <div className="w-[260px] flex justify-center rounded-md cursor-pointer m-2 call-call"> */}
        {/* Notification */}
        {/* <button
            onClick={() => {
              navigate("/notification");
            }}
            type="button"
            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <i className="bi bi-bell text-white"></i>
          </button> */}
        {/* <p className="px-2 py-2 text-sm text-white ">
            Сайн уу? {user.last_name}
          </p> */}
        {/* <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full !bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-10 w-10 rounded-full"
                  src="user2.png"
                  alt=""
                />
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
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Цэс 1
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Цэс 2
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => {
                        logout();
                      }}
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Гарах
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Navigation;
