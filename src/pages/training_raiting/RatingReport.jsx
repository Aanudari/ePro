import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import { logout } from "../../service/examService";
import { Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function RatingReport() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const selectedRate = location.state.data;
  const [questionResults, setQuestionResults] = useState([]);
  const [watched, setWatched] = useState([]);
  const format = "YYYYMMDDHHmmss";
  const today = new Date();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingReport/training/QuestionReport/${selectedRate.trainingId}`,
    })
      .then((res) => {
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
        if (res.data.isSuccess === true) {
          setQuestionResults(res.data.questionResults);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingReport/training/watched?trainingId=${selectedRate.trainingId}`,
    })
      .then((res) => {
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
        if (res.data.isSuccess === true) {
          setWatched(res.data.watchedList);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const separatedArr = questionResults.reduce((acc, obj) => {
    const { questionType } = obj;
    if (!acc[questionType]) {
      acc[questionType] = [];
    }
    acc[questionType].push(obj);
    return acc;
  }, {});

  const type1Arr = separatedArr["1"];
  const type2Arr = separatedArr["2"];

  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div className="sm:px-6">
        <button
          onClick={() => navigate("/training-rating")}
          className="bg-white border border-white p-2 rounded text-gray-700 flex items-center focus:outline-none focus:shadow-outline "
        >
          <svg width="24" height="24" viewBox="0 0 16 16">
            <path
              d="M9 4 L5 8 L9 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <span className="mx-2">Буцах</span>
        </button>
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-xl lg:text-xl font-bold leading-normal text-gray-800">
              Үнэлгээний тайлан
            </p>
          </div>
          <div className="gap-8 md:flex">
            <div className="mb-8 text-center md:w-1/3 md:mb-0">
              <div className="p-2 text-gray-600 bg-white rounded-lg shadow-lg">
                <p className="font-body text-black">Үнэлгээ өгөх хүний тоо</p>
                <a className="text-blue-500 font-body hover:text-gray-800">
                  <i className="bi bi-people" /> {watched.length}
                </a>
              </div>
            </div>
            <div className="text-center md:w-1/2">
              <div className="p-2 text-gray-600 bg-white rounded-lg shadow-lg">
                <p className="font-body text-black">Үнэлгээ өгсөн хүний тоо</p>
                <a className="text-blue-500 font-body hover:text-gray-800">
                  <i className="bi bi-people" />{" "}
                  {questionResults.totalResponse === null
                    ? 0
                    : questionResults.totalResponse}
                </a>
              </div>
            </div>
            <div className="text-center md:w-1/2">
              <div className="p-2 text-gray-600 bg-white rounded-lg shadow-lg">
                <p className="font-body text-black">Статус</p>
                <a className="text-blue-500 font-body hover:text-gray-800">
                  {moment(today).format(format) >=
                  moment(selectedRate.expireDate).format(format) ? (
                    <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-500 bg-red-200 rounded-md">
                      ИДЭВХГҮЙ
                    </span>
                  ) : (
                    <span className="flex items-center px-2 py-1 text-xs font-semibold inline-flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      ИДЭВХТЭЙ
                    </span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center bg-gray-300 px-5 py-2 mb-2 text-lg font-medium text-gray-600 border border-blue-500  jusitfy-between">
            <div className="flex items-center w-full">Section 1</div>
          </div>

          <div className="mx-auto max-w-screen-xl px-2 py-12 sm:px-6 lg:px-8">
            <Swiper
              modules={[Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {type1Arr?.map((data, index) => (
                <SwiperSlide>
                  <div key={index} className="bg-gray-100 p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <p className="font-medium">
                          {" "}
                          Q{index + 1}. {data.question}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-2">
                      {data.answerResults1.map((a, i) => (
                        <li key={i} className="text-sm">
                          <div className="flex items-start">
                            <div className="flex-1 mb-1">
                              <div className="font-medium dark:text-white">
                                {a.answerName}
                              </div>
                            </div>
                            <div className="flex justify-end text-right">
                              {a.answeredNumber === "" ? 0 : a.answeredNumber}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SwiperSlide>
              ))}

              <div className="swiper-pagination !relative !bottom-0 mt-12"></div>
            </Swiper>
          </div>
        </div>
        <div>
          <div className="flex items-center bg-gray-300 px-5 py-2 mb-2 text-lg font-medium text-gray-600 border border-blue-500  jusitfy-between">
            <div className="flex items-center w-full">Section 2</div>
          </div>

          <div className="mx-auto max-w-screen-xl px-2 py-12 sm:px-6 lg:px-8">
            <Swiper
              modules={[Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {type2Arr?.map((data, index) => (
                <SwiperSlide>
                  <div key={index} className="bg-gray-100 p-8">
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <p className="font-medium">
                          {" "}
                          Q{index + 1}. {data.question}
                        </p>
                      </div>
                    </div>
                    {data.answerResults2.map((a, i) => (
                      <p key={i} className="relative mt-4 text-gray-500">
                        <span className="text-xl">&ldquo;</span>
                        {a.answerName}
                        <span className="text-xl">&rdquo;</span>
                      </p>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination !relative !bottom-0 mt-12"></div>
            </Swiper>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default RatingReport;
