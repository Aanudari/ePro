import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { logout } from "../service/examService";

export default function UINavigation() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
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
                Бүртгэл{" "}
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
              <a
                onClick={() => {
                  setShow(!show);
                }}
                className="avatar cursor-pointer"
              >
                <img src="user2.png" alt="" />
              </a>
            </div>
          </div>
          {show && (
            <div
              onClick={logout}
              className="fixed cursor-pointer bg-gray-100 text-sm top-12 shadow-md font-[400] rounded px-3 py-2 right-[60px] z-20"
            >
              <i className="bi bi-box-arrow-left mr-2"></i>
              Гарах
            </div>
          )}
          <a href="#" className="button">
            <i className="ph-list-bold"></i>
            <span>Menu</span>
          </a>
        </div>
      </header>
    </div>
  );
}
