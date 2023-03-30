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
import DatePicker from "react-datepicker";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
function EditTrainRate() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const { width } = getWindowDimensions();
  const [trains, setTrains] = useState([]);
  const [trateName, settrateName] = useState("");
  const [trateDesc, settrateDesc] = useState("");
  const trainrate = location.state.data;
  const format = "YYYYMMDDHHmmss";
  const [date1, setDate1] = useState(new Date(trainrate.beginDate));
  const [date2, setDate2] = useState(new Date(trainrate.expireDate));
  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [tID, setTID] = useState("");
  const [tNAME, setTNAME] = useState("");
  const [checkName, setCheckName] = useState(false);
  const [checkDesc, setCheckDesc] = useState(false);
  const [checkQuest, setCheckQuest] = useState(false);
  const [checkAns, setCheckAns] = useState(false);
  const [checkTrain, setCheckTrain] = useState(false);
  const [raw, setRaw] = useState([]);

  const handleTrainId = (item) => {
    console.log(item);
    setTID(item.id);
    setTNAME(item.name);
  };
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Training`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setTrains(res.data.trainingList);
        }
        // console.log(trains);
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const dataEditTrate = {
    id: `${trainrate.id}`,
    name: `${trateName}` === "" ? trainrate.name : `${trateName}`,
    description: `${trateDesc}` === "" ? trainrate.description : `${trateDesc}`,
    trainingId: `${tID}` === "" ? trainrate.trainingId : `${tID}`,
    trainingName: `${tNAME}` === "" ? trainrate.trainingName : `${tNAME}`,
    beginDate: `${startDate}` === "" ? trainrate.beginDate : `${startDate}`,
    expireDate: `${endDate}` === "" ? trainrate.expireDate : `${endDate}`,
    createdBy: `${trainrate.createdBy}`,
    createdAt: `${trainrate.createdAt}`,
    trRatingQuestions: raw,
  };
  const navigateIndex = (e) => {
    e.preventDefault();

    console.log(JSON.stringify(dataEditTrate));
    if (startDate === endDate || startDate > endDate) {
      notification.invalidFileUpload("Эхлэх дуусах хугацаа алдаатай байна.");
    } else {
      axios({
        method: "put",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/edit`,
        data: JSON.stringify(dataEditTrate),
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            const timer = setTimeout(() => navigate("/training-rating"), 1000);
            return () => clearTimeout(timer);
          }
          if (res.data.isSuccess === false) {
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    setRaw(trainrate?.trRatingQuestions);
  }, []);
  const collector = (question, answer, id, answerId, questionType) => {
    setQuestion(question);
    setQuestionType(questionType);
    setAnswer(answer);
    let single = raw.filter((item) => {
      return item.questionId === id;
    });
    let tempo = single[0].trRatingAnswer.map((el) => {
      if (el.answerId === answerId) {
        return {
          ...el,
          answer: answer,
          points: "",
        };
      } else {
        return el;
      }
    });
    let arr = [
      {
        questionId: `${id}`,
        question: `${question}`,
        questionType: `${questionType}`,
        trRatingAnswer: tempo,
      },
    ];
    let final = raw.map((item) => {
      if (item.questionId === id) {
        return arr[0];
      } else {
        return item;
      }
    });
    setRaw(final);
  };
  console.log(raw);
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />

      <div className="w-full">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
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
          <p className="text-sm font-bold text-gray-900 sm:text-sm">
            Сургалтын үнэлгээ засварлах
          </p>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mb-6">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <div className="space-y-4">
              <div>
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Үнэлгээний нэр
                </label>
                <input
                  type="text"
                  defaultValue={trainrate.name}
                  onChange={(e) => {
                    settrateName(e.target.value);
                    setCheckName(false);
                  }}
                  id={checkName === true ? "border-red" : null}
                  className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Үнэлгээний тайлбар
                </label>
                <textarea
                  className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  rows="4"
                  defaultValue={trainrate.description}
                  onChange={(e) => {
                    settrateDesc(e.target.value);
                    setCheckDesc(false);
                  }}
                  id={checkDesc === true ? "border-red" : null}
                ></textarea>
              </div>
              <div className="grid grid-cols-1 gap-4  sm:grid-cols-3">
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Сургалт
                  </label>
                  <Select
                    className="px-2 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    options={trains}
                    defaultValue={{
                      id: trainrate.trainingId,
                      name: trainrate.trainingName,
                    }}
                    onChange={(item) => {
                      handleTrainId(item);
                      setCheckTrain(false);
                    }}
                    id={checkTrain === true ? "border-red" : null}
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue && "Сонголт хоосон байна"
                    }
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                  />
                </div>
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    startDate
                  </label>
                  <DatePicker
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    selected={date1}
                    onChange={(date) => setDate1(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    selectsStart
                    startDate={date1}
                    dateFormat="yyyy.MM.dd, HH:mm:ss"
                  />
                </div>
                <div>
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    endDate
                  </label>
                  <DatePicker
                    className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    selected={date2}
                    onChange={(date) => setDate2(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    selectsStart
                    startDate={date2}
                    dateFormat="yyyy.MM.dd, HH:mm:ss"
                  />
                </div>
              </div>

              {raw.map((quest, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Асуулт
                    </label>
                    <input
                      type="text"
                      defaultValue={quest.question}
                      onChange={(e) => {
                        // setQuestion(e.target.value);
                        collector(
                          e.target.value,
                          answer,
                          quest.questionId,
                          quest.questionType
                        );
                        //    setcheckEmptyname(false);
                      }}
                      //  id={checkEmptyname === true ? "border-red" : null}
                      className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                  {quest.trRatingAnswer?.map((ans, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-1 gap-4  sm:grid-cols-3"
                    >
                      <div>
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Хариулт
                        </label>
                        <input
                          type="text"
                          defaultValue={ans.answer}
                          onChange={(e) => {
                            // setAnswer(e.target.value);
                            collector(
                              question,
                              e.target.value,
                              quest.questionId,
                              ans.answerId
                            );
                            //    setcheckEmptyname(false);
                          }}
                          //  id={checkEmptyname === true ? "border-red" : null}
                          className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Оноо
                        </label>
                        <input
                          type="text"
                          defaultValue={ans.points}
                          onChange={(e) => {
                            // setPoints(e.target.value);
                            collector(
                              question,
                              answer,
                              e.target.value,
                              quest.questionId,
                              ans.answerId
                            );
                            //    setcheckEmptyname(false);
                          }}
                          //  id={checkEmptyname === true ? "border-red" : null}
                          className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="mt-4 text-right">
                <div className="inline-flex items-end">
                  <button
                    onClick={navigateIndex}
                    className="flex bg-green-600 border border-green-600 shadow px-4 py-2 rounded text-white focus:outline-none focus:shadow-outline"
                  >
                    Хадгалах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditTrainRate;
