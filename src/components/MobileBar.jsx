import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function MobileBar() {
  const navigate = useNavigate();
  const { roleId, mobileBar, setMobileBar } = useStateContext();
  let location = useLocation();
  let path = location.pathname;
  return (
    <div className="relative">
      <div className="core fixed top-[54px] left-0 expanded-menu">
        <nav id="side-nav">
          <div
            onClick={() => {
              navigate("/home");
            }}
            className="h-14 bg-gray-700 shadow text-gray-100
                flex items-center text-2xl font-[700] cursor-pointer 
                "
          >
            <span
              className="hover:scale-105 transition w-full h-full flex
                    items-center
                    font-bold ml-12"
            >
              E-PRO
            </span>
          </div>
          <ul className="h-full">
            <li>
              <a
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <i className="bi bi-calendar-check absolute top-[17px] left-[17px]"></i>
                <span>Хянах самбар</span>
              </a>
            </li>
            <li>
              <a className="relative">
                <i className="bi bi-clock absolute top-[17px] left-[17px]"></i>
                <span>Шалгалт</span>
              </a>
              <ul>
                <li>
                  <a
                    onClick={() => {
                      navigate("/exam-form");
                    }}
                  >
                    Шалгалтын форм{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/take-exam");
                    }}
                  >
                    Шалгалт өгөх
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/exam-result");
                    }}
                  >
                    Шалгалтын дүн харах
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a>
                <i className="bi bi-bar-chart-line absolute top-[17px] left-[17px]"></i>
                <span>Үнэлгээ</span>
              </a>
              <ul>
                <li>
                  <a
                    onClick={() => {
                      navigate("/level-one");
                    }}
                  >
                    level 1
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/telesales");
                    }}
                  >
                    Telesales
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/online");
                    }}
                  >
                    Online
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/branch");
                    }}
                  >
                    Branch
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/installer");
                    }}
                  >
                    Installer
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/care");
                    }}
                  >
                    Care
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/bank");
                    }}
                  >
                    Bank
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a>
                <i className="bi bi-book absolute top-[17px] left-[17px]"></i>
                <span>Сургалт</span>
              </a>
              <ul>
                <li>
                  <a
                    onClick={() => {
                      navigate("/online-training");
                    }}
                  >
                    Онлайн сургалт
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/training-schedule");
                    }}
                  >
                    Сургалтын хуваарь
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/training-files");
                    }}
                  >
                    Сургалтын файлууд
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/training-category");
                    }}
                  >
                    Сургалтын ангилал
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/training-rating");
                    }}
                  >
                    Сургалтын үнэлгээ
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/calendar");
                }}
              >
                <i className="bi bi-calendar-check absolute top-[17px] left-[17px]"></i>
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/error-thanks");
                }}
              >
                <i className="bi bi-bookmark-plus absolute top-[17px] left-[17px]"></i>
                <span>Алдаа / талархал</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setMobileBar(false);
                }}
              >
                <i className="bi bi-x-lg absolute top-[17px] left-[17px] text-black"></i>
                <span className="text-black">Хаах</span>
              </a>
            </li>
          </ul>
          <a id="toggle">
            <i className="fa fa-chevron-circle-left"></i>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default MobileBar;
