import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";

const navigation = [
  { name: "Шалгалт", href: "/levelone-ui-take-exam" },
  { name: "Сургалт", href: "/user-training" },
  // { name: "Календар", href: "/" },
  { name: "Алдаа / талархал", href: "/user-error-thanks" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UINavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="">
      <header className="header fixed">
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
              <a href="#" className="avatar ">
                <img src="user2.png" alt="" />
              </a>
            </div>
          </div>
          <a href="#" className="button">
            <i className="ph-list-bold"></i>
            <span>Menu</span>
          </a>
        </div>
      </header>
    </div>
  );
}
