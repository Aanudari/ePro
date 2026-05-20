import React, { useEffect, useState, useMemo } from "react";
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
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();

  const chtrate = location.state.data;
  const id = chtrate.id;

  const [trigger, setTrigger] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [question, setQuestion] = useState("");
  const [radioFields, setRadioFields] = useState([{ answer: "", points: "" }]);
  const [checkEmpty11, setcheckEmpty11] = useState(false);
  const [trate, setTrate] = useState([]);

  const createQ = () => {
    setIsOpened((wasOpened) => !wasOpened);
    setQuestion("");
    setRadioFields([{ answer: "", points: "" }]);
    setcheckEmpty11(false);
  };

  const handleRadioChange = (event, index) => {
    let data = [...radioFields];
    data[index][event.target.name] = event.target.value;
    setRadioFields(data);
  };

  const addRadioFields = () => {
    setRadioFields([...radioFields, { answer: "", points: "" }]);
  };

  const removeRadioFields = (index) => {
    if (radioFields.length === 1) {
      setRadioFields([{ answer: "", points: "" }]);
      return;
    }

    let data = [...radioFields];
    data.splice(index, 1);
    setRadioFields(data);
  };

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setTrate(res.data.trRatingForm || []);
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

  const filteredData = useMemo(() => {
    return trate.find((item) => item.id === chtrate.id);
  }, [trate, chtrate.id]);

  const questions = filteredData?.trRatingQuestions || [];

  const submit = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setcheckEmpty11(true);
      return;
    }

    const validAnswers = radioFields.filter(
      (item) => item.answer && item.answer.trim() !== "",
    );

    if (validAnswers.length === 1) {
      notification.error("Нэг хариулттай асуулт үүсгэх боломжгүй.");
      return;
    }

    const questionType = validAnswers.length >= 2 ? "1" : "2";

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
            questionType: questionType,
            questionName: question,
            trRatingAnswer: questionType === "1" ? validAnswers : [],
          },
        ],
      },
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          setIsOpened(false);
          setQuestion("");
          setRadioFields([{ answer: "", points: "" }]);
          setTrigger(!trigger);
        }

        if (res.data.isSuccess === false) {
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

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Үнэлгээний асуултууд
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {chtrate.name} • Нийт {questions.length} асуулт
              </p>
            </div>

            <button
              onClick={createQ}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition ${
                isOpened
                  ? "bg-slate-600 hover:bg-slate-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              <i className={`bi ${isOpened ? "bi-x-lg" : "bi-plus-lg"}`} />
              {isOpened ? "Болих" : "Асуулт нэмэх"}
            </button>
          </div>
        </div>

        {isOpened && (
          <div className="p-4 mb-5 bg-white border shadow-sm rounded-2xl border-slate-100">
            <h2 className="mb-4 text-base font-semibold text-slate-900">
              Шинэ асуулт
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Асуулт
                </label>

                <input
                  value={question}
                  className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 ${
                    checkEmpty11 ? "border-red-400" : "border-slate-200"
                  }`}
                  placeholder="Асуултаа оруулна уу"
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    setcheckEmpty11(false);
                  }}
                />

                {checkEmpty11 && (
                  <p className="mt-1 text-xs text-red-500">
                    Асуулт оруулна уу.
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Хариултууд
                  </label>

                  <button
                    onClick={addRadioFields}
                    type="button"
                    className="px-3 py-2 text-xs font-medium text-indigo-700 rounded-lg bg-indigo-50 hover:bg-indigo-100"
                  >
                    + Хариулт нэмэх
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {radioFields.map((form, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-xl border-slate-100 bg-slate-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-slate-500">
                          Хариулт {index + 1}
                        </p>

                        <button
                          onClick={() => removeRadioFields(index)}
                          type="button"
                          className="flex items-center justify-center text-red-500 rounded-lg h-7 w-7 hover:bg-red-50"
                        >
                          <i className="bi bi-trash-fill" />
                        </button>
                      </div>

                      <input
                        name="answer"
                        type="text"
                        className="w-full px-3 py-2 text-sm bg-white border rounded-lg outline-none border-slate-200 text-slate-700 focus:border-indigo-500"
                        placeholder="Хариулт"
                        onChange={(event) => handleRadioChange(event, index)}
                        value={form.answer}
                      />
                    </div>
                  ))}
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Хариулт хоосон үлдээвэл нээлттэй асуулт хэлбэрээр үүснэ.
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={createQ}
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Болих
                </button>

                <button
                  onClick={submit}
                  type="submit"
                  className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Хадгалах
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-white border shadow-sm rounded-2xl border-slate-100">
          {questions.length === 0 ? (
            <div className="text-center py-14">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 text-slate-500">
                <i className="text-xl bi bi-question-circle" />
              </div>

              <p className="font-medium text-slate-700">
                Асуулт үүсээгүй байна
              </p>
              <p className="mt-1 text-sm text-slate-400">
                “Асуулт нэмэх” товчоор шинэ асуулт үүсгэнэ үү.
              </p>
            </div>
          ) : (
            <QuestionCell q={questions} setTrigger={setTrigger} />
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ChoosedTRate;
