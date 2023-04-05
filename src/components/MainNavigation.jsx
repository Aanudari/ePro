import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";
function MainNavigation() {
  const navigate = useNavigate();
  const { activeMenu } = useStateContext();
  const [selected, setSelected] = useState(0);
  const location = useLocation();
  const pathname = (pathname) => {
    let accepted = [
      "/training-files",
      "/training-category",
      "/online-training",
      "/training-rating",
      "/training-schedule",
    ];
    if (accepted.includes(pathname)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="relative width-nav">
      <div className="core fixed">
        <nav id="side-nav">
          <div
            // onClick={() => {
            //   navigate("/home");
            // }}
            className="h-14 bg-gray-700 shadow text-gray-100
                    flex items-center text-2xl font-[700] cursor-pointer select-none
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
            {/* <li
              onClick={() => {
                navigate("/dashboard");
              }}
              className="cursor-pointer active:opacity-80"
            >
              <a>
                <i className="bi bi-calendar-check absolute top-[17px] left-[17px]"></i>
                <span>Хянах самбар</span>
              </a>
            </li> */}
            <li
              onClick={() => {
                setSelected(0);
                navigate("/exam-dashboard");
              }}
              className={`relative cursor-pointer active:opacity-80 ${
                selected == 0 && "bg-teal-500"
              }`}
            >
              <a>
                <i
                  onClick={() => {
                    navigate("/exam-dashboard");
                  }}
                  className="bi bi-clock absolute top-[17px] left-[17px] "
                ></i>
                <span className="select-none">Шалгалт</span>
              </a>
            </li>
            <li
              onClick={() => {
                setSelected(1);
                navigate("/rating");
              }}
              className={`relative cursor-pointer active:opacity-80 ${
                selected == 1 && "bg-teal-500"
              }`}
            >
              <a>
                <i className="bi bi-bar-chart-line absolute top-[17px] left-[17px] select-none"></i>
                <span className="select-none">Үнэлгээ</span>
              </a>
            </li>
            <li
              onClick={() => {
                setSelected(2);
                // navigate("/online-training");
              }}
              className={`cursor-pointer select-none ${
                (selected == 2 && pathname(location.pathname) == true) ||
                (location.pathname == "/training-schedule" && "bg-teal-500")
              }`}
            >
              <a className={`cursor-pointer select-none `}>
                <i
                  className={`bi bi-book absolute top-[17px] left-[17px] `}
                ></i>
                <span>Сургалт</span>
              </a>
              <ul>
                <li>
                  <a
                    className="cursor-pointer select-none"
                    onClick={() => {
                      navigate("/online-training");
                    }}
                  >
                    Онлайн сургалт
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-pointer select-none"
                    onClick={() => {
                      navigate("/training-schedule");
                    }}
                  >
                    Сургалтын хуваарь
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-pointer select-none"
                    onClick={() => {
                      navigate("/training-files");
                    }}
                  >
                    Сургалтын файлууд
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-pointer select-none"
                    onClick={() => {
                      navigate("/training-category");
                    }}
                  >
                    Сургалтын ангилал
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-pointer select-none"
                    onClick={() => {
                      navigate("/training-rating");
                    }}
                  >
                    Сургалтын үнэлгээ
                  </a>
                </li>
              </ul>
            </li>

            <li
              onClick={() => {
                setSelected(3);
              }}
              className={`cursor-pointer select-none ${
                selected == 3 && "bg-teal-500"
              }`}
            >
              <a
                className="cursor-pointer select-none"
                onClick={() => {
                  navigate("/error-thanks");
                }}
              >
                <i className="bi bi-bookmark-plus absolute top-[17px] left-[17px]"></i>
                <span>Алдаа / талархал</span>
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

export default MainNavigation;
