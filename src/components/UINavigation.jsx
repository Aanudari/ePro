import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { logout } from "../service/examService";
import { useStateContext } from "../contexts/ContextProvider";
export default function UINavigation() {
  const navigate = useNavigate();
  const { user, deviceId } = useStateContext();
  const [isOpened, setIsOpened] = useState(false);
  function getOpen() {
    setIsOpened((wasOpened) => !wasOpened);
  }
  return (
    <div className="">
      <div className="h-[60px]"></div>
      <header className="header fixed top-0">
        <div className="header-content responsive-wrapper">
          <div className="header-logo">
            <a href="#">
              <div>
                <img src="https://assets.codepen.io/285131/untitled-ui-icon.svg" />
              </div>
              {/* <img src="https://assets.codepen.io/285131/untitled-ui.svg" /> */}
              <h6 className="text-black text-xl ml-2 vietnam-pro mb-0">
                E-PRO
              </h6>
            </a>
          </div>
          <div className="header-navigation">
            <nav className="header-navigation-links">
              {/* <a href="#"> Нүүр </a> */}
              <a
                className="cursor-pointer"
                onClick={() => {
                  navigate("/user-main");
                }}
              >
                {" "}
                Home{" "}
              </a>
              <a
                className="cursor-pointer"
                onClick={() => {
                  navigate("/user-training");
                }}
              >
                {" "}
                Сургалт{" "}
              </a>
              <a
                className="cursor-pointer"
                onClick={() => {
                  navigate("/user-error-thanks");
                }}
              >
                {" "}
                Алдаа бүртгэл{" "}
              </a>
            </nav>
            <div className="header-navigation-actions">
              {/* <a href="#" className="button">
              <i className="ph-lightning-bold"></i>
              <span>Upgrade now</span>
            </a> */}
              <a href="#" className="icon-button">
                <i className="bi bi-gear-wide"></i>
              </a>
              <a href="#" className="icon-button">
                <i className="bi bi-bell-fill"></i>
              </a>
              {/* <a
                onClick={() => {
                  setShow(!show);
                }}
                className="avatar cursor-pointer"
              >
                <img src="user2.png" alt="" />
              </a> */}
            </div>
          </div>
          <div className="relative inline-block text-left">
            <div>
              <button
                className="text-black flex items-center justify-center w-full px-2 py-2  text-sm rounded-md font-medium  hover:bg-gray-200  focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
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
              <div className="absolute right-0 w-56 mt-2 origin-top-right  rounded-md shadow-lg  ring-1 ring-black ring-opacity-5">
                <div className="py-1 ">
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
          {/* {show && (
            <div
              onClick={logout}
              className="fixed cursor-pointer bg-gray-100 text-sm top-12 shadow-md font-[400] rounded px-3 py-2 right-[60px] z-20"
            >
              <i className="bi bi-box-arrow-left mr-2"></i>
              Гарах
            </div> */}
          {/* )} */}
          <a href="#" className="button">
            <i className="ph-list-bold"></i>
            <span>Menu</span>
          </a>
        </div>
      </header>
    </div>
  );
}
