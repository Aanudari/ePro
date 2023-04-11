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
            className="h-14 bg-gray-800 shadow text-white
                    flex text-2xl font-[700] cursor-pointer select-none
                    "
          >
            <span
              className=" transition w-full h-full flex
                        items-center
                        font-bold ml-12 text-teal-500"
            >
              {/* <span className="text-2xl  mr-1 text-white bl-grad rounded-full px-[14px] py-1">
                E
              </span> */}
              <img
                className="w-12"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO3cQWrDUAxFUS3kaf+DDlOwwRoldF0tHseQtgrf0vc9kFkG5hI/Yj6JGQAAAAC0p1gfHut31dd+fVaZigfcX2c3ass7BNS2fCjWTyuoR8BYbntEK6hFwMoIeIWAYgOTAYMNnJZ3uIX/QtvyxRfpxAae8ii3rXebZQN9tltqNCdgDgHftIG/ee9liA0cx/kE5hDwABuYJDZwHGcDcwh4gA1MEhs4jnOg3usQ3jpQwTORXgGj3plIq4AVEfBKAcUGJgMGGzjtsabNxjnOfMazcJJ4Fh7HZ92mUZyAz9jAJLGB4zi3cA4BD7CBSWIDx3E2MIeAB9jAEzbQOd7s9dvif14uvENAFTwT6RUw6p2JtApYGQGvEFBsYDJgsIHT8ha3cPDHO1MHVPXfCwMAAACAvfIDr71nQNFVe6AAAAAASUVORK5CYII="
              ></img>
              <img
                className="mb-2"
                src="data:image/png;base64,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"
              ></img>
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
                <li className="relative cursor-pointer active:opacity-80 ">
                  <a
                    className="cursor-pointer select-none"
                    onClick={() => {
                      navigate("/online-training");
                    }}
                  >
                    Онлайн сургалт
                  </a>
                </li>
                <li className="relative cursor-pointer active:opacity-80 ">
                  <a
                    className="cursor-pointer select-none"
                    onClick={() => {
                      navigate("/training-schedule");
                    }}
                  >
                    Сургалтын хуваарь
                  </a>
                </li>
                <li className="relative cursor-pointer active:opacity-80">
                  <a
                    className="cursor-pointer select-none"
                    onClick={() => {
                      navigate("/training-files");
                    }}
                  >
                    Сургалтын файлууд
                  </a>
                </li>
                <li className="relative cursor-pointer active:opacity-80 ">
                  <a
                    className="cursor-pointer select-none"
                    onClick={() => {
                      navigate("/training-category");
                    }}
                  >
                    Сургалтын ангилал
                  </a>
                </li>
                <li className="relative cursor-pointer active:opacity-80 ">
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
