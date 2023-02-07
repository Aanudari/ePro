import { useNavigate } from "react-router-dom";

function MainNavigation() {
  const navigate = useNavigate();
  return (
    <div className="relative width-nav">
      <div className="core fixed">
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
            <li
              onClick={() => {
                navigate("/dashboard");
              }}
              className="cursor-pointer active:opacity-80"
            >
              <a>
                <i className="bi bi-calendar-check absolute top-[17px] left-[17px]"></i>
                <span>Хянах самбар</span>
              </a>
            </li>
            <li
              onClick={() => {
                navigate("/exam-dashboard");
              }}
              className="relative cursor-pointer active:opacity-80 "
            >
              <a>
                <i
                  onClick={() => {
                    navigate("/exam-dashboard");
                  }}
                  className="bi bi-clock absolute top-[17px] left-[17px] "
                ></i>
                <span>Шалгалт</span>
              </a>
            </li>
            <li
              onClick={() => {
                navigate("/rating");
              }}
              className="relative cursor-pointer active:opacity-80 "
            >
              <a>
                <i className="bi bi-bar-chart-line absolute top-[17px] left-[17px]"></i>
                <span>Үнэлгээ</span>
              </a>
              {/* <ul>
                <li>
                  <a
                    onClick={() => {
                      navigate("/rating");
                    }}
                  >
                    Үнэлгээ үүсгэх
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      navigate("/complain");
                    }}
                  >
                    Complain
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
              </ul> */}
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
                      navigate("/training");
                    }}
                  >
                    Сургалтууд
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
