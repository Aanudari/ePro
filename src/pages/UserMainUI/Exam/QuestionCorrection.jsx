import { useState } from "react";
import Question from "./Question";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect } from "react";
import axios from "axios";

export default function QuestionCorrection({ roundedScore, Exam_chosen }) {
  const {
    showAnswer,
    gameStarted,
    reminder,
    setReminder,
    setRightAnswer,
    rightAnswer,
    varientID,
    setShowAnswer,
    examID,
  } = useStateContext();
  var data = sessionStorage.getItem("exam_data");
  var examMainId = sessionStorage.getItem("exam_id");
  var obj = JSON.parse(data);
  let user = localStorage.getItem("user");
  let userParsed = JSON.parse(user);
  const { TOKEN } = useStateContext();
  const [container, setContainer] = useState([]);
  let answer = [[], [], []];
  useEffect(() => {
    Exam_chosen(obj?.id);
    const sorted = container.sort((a, b) => b.count - a.count);
    for (let index = 0; index < sorted.length; index++) {
      const element = sorted[index];
      if (!answer[0].includes(sorted[index].AquestionId)) {
        answer[0].push(element.AquestionId);
        answer[1].push(element.answerId);
        answer[2].push(element.count);
      }
    }
  }, [container]);
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const [value, setValue] = useState(new Date());
  var datestring =
    value.getFullYear() +
    "" +
    addZero(value.getMonth() + 1) +
    addZero(value.getDate()) +
    addZero(value.getHours()) +
    addZero(value.getMinutes()) +
    addZero(value.getSeconds());
  console.log(rightAnswer);
  const handleSubmit = () => {
    let main = [];
    for (let index = 0; index < rightAnswer[1].length; index++) {
      const questionId = rightAnswer[0][index];
      const answerId = rightAnswer[1][index];
      const isTrue = rightAnswer[2][index];
      let small = {
        questionId: `${questionId}`,
        onlyAnswerId: [
          {
            answerId: `${answerId}`,
            isTrue: `${isTrue}`,
          },
        ],
      };
      main.push(small);
    }
    let schema = {
      examId: `${examMainId}`,
      variantId: `${varientID}`,
      devId: `${userParsed.device_id}`,
      score: `${roundedScore}`,
      endAt: `${datestring}`,
      onlyQuestionId: main,
    };
    console.log(JSON.stringify(schema));
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/end`,
      data: schema,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex w-full justify-center">
      <div
        className={gameStarted && !showAnswer ? "w-full md:w-10/12  " : null}
      >
        <div className="correction">
          {obj &&
            obj.questionList.map((question, index) => {
              return (
                <Question
                  key={index}
                  data={question}
                  indexQ={index}
                  container={container}
                  setContainer={setContainer}
                />
              );
            })}
          <div className="w-full">
            <button
              onClick={() => {
                // setShowAnswer(!showAnswer)
                setReminder(true);
                setRightAnswer(answer);
              }}
              className="question-button w-full shadow"
            >
              Дуусгах
            </button>
          </div>
          {reminder && (
            <div className="h-screen flex justify-center items-center w-full top-0 left-0 fixed z-10 bg-black bg-opacity-50">
              <div className="p-3 body-bg-cus2 rounded-lg w-3/4 md:w-1/3">
                <div className="body-bg-cus rounded-lg px-2 md:px-10 py-4">
                  <p className="font-bold text-white">
                    Та шалгалтаа дуусгахдаа итгэлтэй байна уу ?
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setShowAnswer(!showAnswer);
                        handleSubmit();
                      }}
                      className="intro-button"
                    >
                      Тийм
                    </button>
                    <button
                      onClick={() => {
                        setReminder(false);
                      }}
                      id={"intro-bg"}
                      className="intro-button ml-2"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
