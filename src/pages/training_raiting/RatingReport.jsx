import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import { logout } from "../../service/examService";
function RatingReport() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const selectedRate = location.state.data;
  const [questionResults, setQuestionResults] = useState([]);
  const [watched, setWatched] = useState([]);
  const format = "YYYYMMdivHHmmss";
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
  const [type1OpenQuestionIndex, setType1OpenQuestionIndex] = useState(null);
  const [type2OpenQuestionIndex, setType2OpenQuestionIndex] = useState(null);
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div className="sm:px-6">
        <button
          onClick={() => navigate("/training-rating")}
          className="bg-white border border-white p-2 rounded text-gray-700 flex items-center focus:outline-none focus:shadow-outline "
        >
          <svg widivh="24" height="24" viewBox="0 0 16 16">
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
        <div className="flex items-center justify-between">
          <p className="focus:outline-none text-base sm:text-sm md:text-sm lg:text-sm font-bold leading-normal text-gray-800">
            Үнэлгээний тайлан
          </p>
        </div>
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <div className="order-last text-sm font-medium text-gray-500">
                Үнэлгээ өгөх хүний тоо
              </div>

              <div className="text-sm font-extrabold text-blue-600 md:text-sm">
                <i className="bi bi-people" /> {watched.length}
              </div>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <div className="order-last text-sm font-medium text-gray-500">
                Үнэлгээ өгсөн хүний тоо
              </div>

              <div className="text-sm font-extrabold text-blue-600 md:text-sm">
                <i className="bi bi-people" />{" "}
                {questionResults[0]?.responseCount === ""
                  ? 0
                  : questionResults[0]?.responseCount}
              </div>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <div className="order-last text-sm font-medium text-gray-500">
                Статус
              </div>

              <div className="text-sm font-extrabold text-blue-600 md:text-sm">
                {moment(today).format(format) >=
                moment(selectedRate.expireDate).format(format)
                  ? "Идэвхгүй"
                  : "Идэвхтэй"}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2  bg-gray-100 text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Section 1</span>
              </div>
            </div>
            <div className="mt-2">
              {type1Arr?.map((q, i) => (
                <div key={i} className="flex flex-col space-y-1">
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => {
                      setType1OpenQuestionIndex(
                        i === type1OpenQuestionIndex ? null : i
                      );
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <i className="bi bi-ui-radios h-5 w-5 opacity-75" />
                      <span className="text-sm font-medium">{q.question}</span>
                    </div>

                    {q.answerResults1?.length === 0 ? null : (
                      <a
                        onClick={() => {
                          setType1OpenQuestionIndex(
                            i === type1OpenQuestionIndex ? null : i
                          );
                        }}
                        className="inline-block rounded px-3 py-2 text-xs font-medium text-black hover:bg-indigo-200 ml-1"
                      >
                        {i === type1OpenQuestionIndex ? (
                          <i className="bi bi-chevron-down shrink-0 transition duration-300 group-open:-rotate-180 " />
                        ) : (
                          <i className="bi bi-chevron-right" />
                        )}
                      </a>
                    )}
                  </div>
                  <div className=" flex flex-col px-4">
                    {i === type1OpenQuestionIndex && (
                      <div className="">
                        {q.answerResults1.map((a, ind) => (
                          <div
                            key={ind}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <div className="flex-1 mb-2 ">
                              <span className="text-sm font-medium">
                                {a.answerName}
                              </span>
                            </div>
                            <div className="flex justify-end text-xs  text-right font-bold text-gray-700">
                              <span className="text-sm font-medium">
                                {a.answeredNumber === "" ? 0 : a.answeredNumber}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2  bg-gray-100 text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Section 2</span>
              </div>
            </div>
            <div className="mt-2">
              {type2Arr?.map((q, i) => (
                <div key={i} className="flex flex-col space-y-1">
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => {
                      setType2OpenQuestionIndex(
                        i === type2OpenQuestionIndex ? null : i
                      );
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <i className="bi bi-input-cursor h-5 w-5 opacity-75" />

                      <span className="text-sm font-medium">{q.question}</span>
                    </div>

                    {q.answerResults2?.length === 0 ? null : (
                      <a
                        onClick={() => {
                          setType2OpenQuestionIndex(
                            i === type2OpenQuestionIndex ? null : i
                          );
                        }}
                        className="inline-block rounded px-3 py-2 text-xs font-medium text-black hover:bg-indigo-200 ml-1"
                      >
                        {i === type2OpenQuestionIndex ? (
                          <i className="bi bi-chevron-down shrink-0 transition duration-300 group-open:-rotate-180 " />
                        ) : (
                          <i className="bi bi-chevron-right" />
                        )}
                      </a>
                    )}
                  </div>
                  <div className=" flex flex-col px-4">
                    {i === type2OpenQuestionIndex && (
                      <div className="">
                        {q.answerResults2?.map((a, ind) => (
                          <div
                            key={ind}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                &ldquo; {a.answerName}&rdquo;
                              </p>
                            </div>
                            {/* <div className="flex justify-end text-xs  text-right font-bold text-gray-700">
                              <span className="text-sm font-medium">
                                {a.answeredNumber === "" ? 0 : a.answeredNumber}
                              </span>
                            </div> */}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default RatingReport;
