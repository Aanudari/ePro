import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";

import { logout } from "../../service/examService";
import QuestionCell from "./QuestionCell";
function ChoosedTRate() {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const chtrate = location.state.data;
  const id = chtrate.id;
  const [trigger, setTrigger] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  function createQ() {
    setIsOpened((wasOpened) => !wasOpened);
    setRadioFields([]);
  }
  const [question, setQuestion] = useState("");
  const [radioFields, setRadioFields] = useState([{ answer: "", points: "" }]);
  const [checkEmpty11, setcheckEmpty11] = useState(false);
  const handleRadioChange = (event, index) => {
    let data = [...radioFields];
    data[index][event.target.name] = event.target.value;
    setRadioFields(data);
  };
  const addRadioFields = () => {
    let object = {
      answer: "",
      points: "",
    };
    setRadioFields([...radioFields, object]);
  };
  const removeRadioFields = (index) => {
    let data = [...radioFields];
    data.splice(index, 1);
    setRadioFields(data);
  };
  const [trate, setTrate] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setTrate(res.data.trRatingForm);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  const filtredData = [];
  trate.filter((item) => {
    if (item.id === chtrate.id) {
      filtredData.push(item);
      return;
    }
  });

  const submit = (e) => {
    e.preventDefault();
    if (question === null) {
      setcheckEmpty11(true);
    } else if (
      radioFields.length === 0 ||
      radioFields[0].answer.length === 0 ||
      radioFields[0].answer.length === 0
    ) {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/addquestion`,
        data: {
          ratingId: `${id}`,
          questions: [
            {
              questionType: `2`,
              questionName: question,
              trRatingAnswer: [],
            },
          ],
        },
      }).then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          setIsOpened(false);
          setRadioFields([]);
          setTrigger(!trigger);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      });
    } else if (radioFields.length === 1) {
      notification.error("Нэг хариулттай асуулт үүсгэх боломжгүй.");
    } else if (radioFields.length >= 2) {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/addquestion`,
        data: {
          ratingId: `${id}`,
          questions: [
            {
              questionType: `1`,
              questionName: question,
              trRatingAnswer: radioFields,
            },
          ],
        },
      }).then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          setIsOpened(false);
          setRadioFields([]);
          setTrigger(!trigger);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      });
    }
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <button
            onClick={() => navigate("/training-rating")}
            className="bg-white border border-white p-2 rounded text-gray-700 flex items-center focus:outline-none focus:shadow-outline mb-2"
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
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-sm lg:text-sm font-bold leading-normal text-gray-800">
              Үнэлгээний асуултууд
            </p>
          </div>
        </div>

        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center sm:justify-between sm:gap-4">
              {/* <div className="relative hidden sm:block">
                <input
                  value={searchQuery}
                  onChange={handleSearch}
                  type="text"
                  name="search"
                  className="w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 flex-1 py-2 px-4 bg-white  text-gray-700 placeholder-gray-400 shadow-sm text-base"
                  placeholder="Асуулт"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                >
                  <i className="bi bi-search" />
                </button>
              </div> */}
            </div>
            <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0 md:justify-end sm:justify-end">
              <button
                onClick={createQ}
                className="bg-blue-600 border border-blue-600 shadow p-2 rounded text-white flex items-center focus:outline-none focus:shadow-outline"
              >
                <span className="mx-2">Асуулт нэмэх</span>
              </button>
            </div>
          </div>
          <div className="mt-3 overflow-x-auto">
            {isOpened && (
              <div className="p-4 mx-auto text-center ">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mb-6">
                  <div className="mt-2 mb-0 space-y-4 rounded-lg p-8 shadow-2xl border-t-4 border-indigo-500 rounded shadow">
                    <div className="space-y-4 grid grid-cols-1 gap-4  sm:grid-cols-1">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Асуулт
                        </label>
                        <input
                          className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          onChange={(e) => {
                            setQuestion(e.target.value);
                            setcheckEmpty11(false);
                          }}
                          id={checkEmpty11 === true ? "border-red" : null}
                        />
                      </div>
                      <div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                          {radioFields.map((form, index) => {
                            return (
                              <div key={index}>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Хариулт
                                  </label>
                                  <input
                                    name="answer"
                                    type="text"
                                    className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                    onChange={(event) =>
                                      handleRadioChange(event, index)
                                    }
                                    value={form.answer}
                                  />
                                </div>

                                <div>
                                  <button
                                    onClick={() => removeRadioFields(index)}
                                    className="mt-2 px-3 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                  >
                                    <i className="bi bi-trash-fill" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-4 text-right text-xs">
                          <div className="inline-flex items-end">
                            <button
                              onClick={addRadioFields}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                              Хариулт нэмэх
                            </button>
                          </div>
                          <div className="inline-flex items-end">
                            <button
                              onClick={submit}
                              type="submit"
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                              submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {filtredData[0]?.trRatingQuestions.length === 0 ? (
              <div className="mt-2 flex items-center px-4 mb-2 text-gray-800">
                <div className="flex items-center w-full">
                  Асуулт үүсээгүй байна.
                </div>
              </div>
            ) : (
              <QuestionCell
                q={filtredData[0]?.trRatingQuestions}
                setTrigger={setTrigger}
              />
            )}
            {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"></div> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ChoosedTRate;
