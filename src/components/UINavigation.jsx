import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { logout } from "../service/examService";
import { useLocation } from "react-router-dom";

export default function UINavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const mainUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="select-none">
      <div className="h-[60px]"></div>
      <header className="header w-[375px] md:w-full fixed top-0">
        <div className="header-content responsive-wrapper">
          <div className="header-logo">
            <a
              onClick={() => {
                // navigate("/user-main");
              }}
              className=""
            >
              <span
                className=" transition w-full h-full flex
                        items-center
                        font-bold text-teal-500"
              >
                <span className="text-[45px] text-[#585395] mr-1 rounded-full">
                  E
                </span>

                <img
                  className="mb-2"
                  src="data:image/png;base64,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"
                ></img>
              </span>
            </a>
          </div>
          <div className="header-navigation">
            <nav className="header-navigation-links">
              {/* <a > Нүүр </a> */}
              <a
                className="cursor-pointer"
                onClick={() => {
                  navigate("/user-exam");
                }}
              >
                {" "}
                Шалгалт{" "}
              </a>
              <a
                className="cursor-pointer"
                onClick={() => {
                  navigate("/user-rating");
                }}
              >
                {" "}
                Үнэлгээ{" "}
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
                Бүртгэл{" "}
              </a>
            </nav>
            <div className="header-navigation-actions relative">
              {/* <a  className="button">
              <i className="ph-lightning-bold"></i>
              <span>Upgrade now</span>
            </a> */}
              <a className="icon-button">
                <i className="bi bi-gear-wide"></i>
              </a>
              <a className="icon-button">
                <i className="bi bi-bell-fill"></i>
              </a>
              <a
                onClick={() => {
                  setShow(!show);
                }}
                className="avatar cursor-pointer"
              >
                <img src="user2.png" alt="" />
              </a>
              <div className="text-[#404089] flex px-2 font-[400]">
                {mainUser.last_name[0]}. {mainUser.first_name}
              </div>
              {show && (
                <div
                  onClick={logout}
                  className="fixed cursor-pointer bg-gray-100 text-sm top-12 shadow-md font-[400] rounded px-3 py-2  z-20"
                >
                  <i className="bi bi-box-arrow-left mr-2"></i>
                  Гарах
                </div>
              )}
            </div>
          </div>

          <a
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="button"
          >
            <i className="ph-list-bold"></i>
            <span>Menu</span>
          </a>
          {showMenu && (
            <div
              className="absolute w-[150px] h-[200px] bg-white rounded shadow-md top-[60px] right-0 flex md:hidden flex-col items-start
            p-4 gap-2 
            "
            >
              <a
                className="cursor-pointer active:border-b"
                onClick={() => {
                  navigate("/user-main");
                }}
              >
                {" "}
                Home{" "}
              </a>
              <a
                className="cursor-pointer active:border-b"
                onClick={() => {
                  navigate("/user-training");
                }}
              >
                {" "}
                Сургалт{" "}
              </a>
              <a
                className="cursor-pointer active:border-b"
                onClick={() => {
                  navigate("/user-error-thanks");
                }}
              >
                {" "}
                Бүртгэл{" "}
              </a>
              <a className="cursor-pointer active:border-b"> Мэдэгдэл </a>
              <a
                className="cursor-pointer active:border-b"
                onClick={() => {
                  logout();
                }}
              >
                {" "}
                Гарах{" "}
              </a>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
