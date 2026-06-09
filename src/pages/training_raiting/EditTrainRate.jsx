import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import { logout } from "../../service/examService";

function EditTrainRate() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();

  const trainrate = location.state.data;
  const format = "YYYYMMDDHHmmss";

  const [trains, setTrains] = useState([]);
  const [trateName, settrateName] = useState(trainrate.name || "");
  const [trateDesc, settrateDesc] = useState(trainrate.description || "");
  const [date1, setDate1] = useState(new Date(trainrate.beginDate));
  const [date2, setDate2] = useState(new Date(trainrate.expireDate));

  const [tID, setTID] = useState(trainrate.trainingId || "");
  const [tNAME, setTNAME] = useState(trainrate.trainingName || "");
  const [raw, setRaw] = useState(trainrate?.trRatingQuestions || []);

  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Training`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setTrains(res.data.trainingList || []);
        }

        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [TOKEN]);

  const handleTrainId = (item) => {
    setTID(item.id);
    setTNAME(item.name);
  };

  const updateQuestion = (questionId, value) => {
    const updated = raw.map((item) => {
      if (item.questionId === questionId) {
        return {
          ...item,
          question: value,
        };
      }

      return item;
    });

    setRaw(updated);
  };

  const updateAnswer = (questionId, answerId, field, value) => {
    const updated = raw.map((item) => {
      if (item.questionId === questionId) {
        return {
          ...item,
          trRatingAnswer: item.trRatingAnswer.map((ans) => {
            if (ans.answerId === answerId) {
              return {
                ...ans,
                [field]: value,
              };
            }

            return ans;
          }),
        };
      }

      return item;
    });

    setRaw(updated);
  };

  const dataEditTrate = {
    id: `${trainrate.id}`,
    name: `${trateName}`,
    description: `${trateDesc}`,
    trainingId: `${tID}`,
    trainingName: `${tNAME}`,
    beginDate: `${startDate}`,
    expireDate: `${endDate}`,
    createdBy: `${trainrate.createdBy}`,
    createdAt: `${trainrate.createdAt}`,
    trRatingQuestions: raw,
  };

  const navigateIndex = (e) => {
    e.preventDefault();

    if (!trateName.trim()) {
      notification.error("Үнэлгээний нэр оруулна уу.");
      return;
    }

    if (!trateDesc.trim()) {
      notification.error("Үнэлгээний тайлбар оруулна уу.");
      return;
    }

    if (!tID) {
      notification.error("Сургалт сонгоно уу.");
      return;
    }

    if (startDate === endDate || startDate > endDate) {
      notification.error("Эхлэх дуусах хугацаа алдаатай байна.");
      return;
    }

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
          setTimeout(() => navigate("/training-rating"), 600);
        } else if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
        }

        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-[calc(100vh-56px)] w-full bg-slate-50">
      <Navigation />

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="p-4 mb-5 bg-white border shadow-sm rounded-2xl border-slate-100">
          <button
            onClick={() => navigate("/training-rating")}
            className="inline-flex items-center gap-2 mb-3 text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            <i className="bi bi-arrow-left" />
            Буцах
          </button>

          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Сургалтын үнэлгээ засварлах
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Үнэлгээний мэдээлэл болон асуулт, хариултуудыг засна.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100">
              <h2 className="mb-4 text-base font-semibold text-slate-900">
                Үндсэн мэдээлэл
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Үнэлгээний нэр
                  </label>
                  <input
                    type="text"
                    value={trateName}
                    onChange={(e) => settrateName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Үнэлгээний тайлбар
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500"
                    rows="4"
                    value={trateDesc}
                    onChange={(e) => settrateDesc(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100">
              <h2 className="mb-4 text-base font-semibold text-slate-900">
                Асуулт, хариулт
              </h2>

              {raw.length === 0 ? (
                <div className="py-10 text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 text-slate-500">
                    <i className="text-xl bi bi-question-circle" />
                  </div>
                  <p className="font-medium text-slate-700">
                    Асуулт байхгүй байна
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {raw.map((quest, index) => (
                    <div
                      key={quest.questionId || index}
                      className="p-4 border rounded-2xl border-slate-100 bg-slate-50"
                    >
                      <div>
                        <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                          Асуулт {index + 1}
                        </label>
                        <input
                          type="text"
                          value={quest.question}
                          onChange={(e) =>
                            updateQuestion(quest.questionId, e.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500"
                        />
                      </div>

                      {quest.trRatingAnswer?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3 mt-4 md:grid-cols-2">
                          {quest.trRatingAnswer.map((ans, i) => (
                            <div
                              key={ans.answerId || i}
                              className="p-3 bg-white border rounded-xl border-slate-100"
                            >
                              <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                                Хариулт {i + 1}
                              </label>

                              <input
                                type="text"
                                value={ans.answer}
                                onChange={(e) =>
                                  updateAnswer(
                                    quest.questionId,
                                    ans.answerId,
                                    "answer",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-3 py-2 mb-3 text-sm border rounded-lg outline-none border-slate-200 bg-slate-50 text-slate-700 focus:border-indigo-500"
                              />

                              <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                                Оноо
                              </label>

                              <input
                                type="text"
                                value={ans.points || ""}
                                onChange={(e) =>
                                  updateAnswer(
                                    quest.questionId,
                                    ans.answerId,
                                    "points",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-3 py-2 text-sm border rounded-lg outline-none border-slate-200 bg-slate-50 text-slate-700 focus:border-indigo-500"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-3 py-2 mt-3 text-xs font-medium rounded-xl bg-amber-50 text-amber-700">
                          Нээлттэй асуулт
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100">
              <h2 className="mb-4 text-base font-semibold text-slate-900">
                Тохиргоо
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Сургалт
                  </label>

                  <Select
                    className="text-sm"
                    options={trains}
                    defaultValue={{
                      id: trainrate.trainingId,
                      name: trainrate.trainingName,
                    }}
                    onChange={handleTrainId}
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue && "Сонголт хоосон байна"
                    }
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Эхлэх хугацаа
                  </label>
                  <DatePicker
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500"
                    selected={date1}
                    onChange={(date) => setDate1(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    selectsStart
                    startDate={date1}
                    dateFormat="yyyy.MM.dd, HH:mm"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs font-bold uppercase text-slate-600">
                    Дуусах хугацаа
                  </label>
                  <DatePicker
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500"
                    selected={date2}
                    onChange={(date) => setDate2(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    selectsStart
                    startDate={date2}
                    dateFormat="yyyy.MM.dd, HH:mm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={navigateIndex}
              className="w-full px-4 py-3 text-sm font-semibold text-white transition bg-indigo-600 shadow-sm rounded-xl hover:bg-indigo-700"
            >
              Хадгалах
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default EditTrainRate;
