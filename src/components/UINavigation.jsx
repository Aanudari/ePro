import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { logout } from "../service/examService";

export default function UINavigation() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const mainUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="">
      <div className="h-[60px]"></div>
      <header className="header w-[375px] md:w-full fixed top-0">
        <div className="header-content responsive-wrapper">
          <div className="header-logo">
            <a
              onClick={() => {
                navigate("/user-main");
              }}
              className="cursor-pointer"
            >
              <div>
                <img src="logo.png" className="h-12 rounded-full" />
              </div>
              {/* <img src="https://assets.codepen.io/285131/untitled-ui.svg" /> */}
              <h6 className="text-[#404089] text-xl ml-2 vietnam-pro mb-0">
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
            href="#"
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
