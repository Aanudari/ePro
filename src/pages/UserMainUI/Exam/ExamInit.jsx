import React, { useRef, useState, useEffect } from "react";
import MyTimer from "../../../components/Timer";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import QuestionCorrection from "./QuestionCorrection";
import QuestionCorrectionShow from "./QuestionCorrectionShow";
import { logout } from "../../../service/examService";

function useCounter(initialState) {
  const [value, setValue] = useState(initialState);
  const reset = () => setValue(0);
  const add = () => setValue((value) => (value += 1));
  return { value, add, reset };
}

export default function ExamInit() {
  const {
    TOKEN,
    qlength,
    setQlength,
    gameStarted,
    setGameStarted,
    gameFinished,
    showAnswer,
    setShowAnswer,
    rightAnswer,
    setVarientID,
  } = useStateContext();
  const examId = sessionStorage.getItem("exam_id");
  const [leftDuration, setleftDuration] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/start?examId=${examId}`,
    })
      .then((res) => {
        setleftDuration(res.data.leftduration);
        sessionStorage.setItem(
          "exam_data",
          JSON.stringify(res.data.variantInfo)
        );
        setQlength(res.data.variantInfo.questionList.length);
      })
      .catch((err) => console.log("message"));
  }, [examId]);
  // console.log(leftDuration);
  // session storage dotor baih exam iin medeelel awah
  var data = sessionStorage.getItem("exam_data");
  // var questions = JSON.parse(data)
  var questions = JSON.parse(data);
  // session storage dotor baih exam iin medeelel awah
  const gameRef = useRef(null);
  console.log(JSON.parse(data));
  //time generate hiih
  const time = new Date();
  time.setMinutes(time.getMinutes() + 10, time.getSeconds() + 10);
  //time generate hiih
  // console.log(rightAnswer)

  // console.log(questions.questionList)
  let correct = [];
  for (let index = 0; index < questions?.questionList.length; index++) {
    const element = questions?.questionList[index];
    for (let i = 0; i < element.answerList.length; i++) {
      const el = element.answerList[i];
      if (el.isTrue === "1") {
        correct.push(el.id);
      }
    }
  }
  let length = questions?.questionList.length;
  const [exam_chosen, Exam_chosen] = useState();
  // console.log(correct + " correct ALL")
  // console.log(rightAnswer && rightAnswer[1] + " chosen")
  const intersection =
    rightAnswer &&
    correct.filter((element) => rightAnswer[1].includes(element));
  const outsection =
    rightAnswer &&
    correct.filter((element) => !rightAnswer[1].includes(element));
  let score = (intersection?.length * 100) / length;
  let roundedScore = Math.round(score, -1);
  let eId = sessionStorage.getItem("exam_id");
  // console.log(eId)
  const handleStartExam = () => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/start?examId=${eId}`,
    })
      .then((res) => {
        setVarientID(res.data.variantInfo.id);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="body flex-col">
      {gameStarted && (
        <div className="flex justify-center md:absolute mt-[-50px] mb-4 md:m-0 top-[20px] md:left-1/2">
          <MyTimer expiryTimestamp={time} />
        </div>
      )}
      <div
        className="game "
        ref={gameRef}
        data-game-started={gameStarted ? true : null}
      >
        <div className={gameStarted && !showAnswer ? "hidden" : "intro"}>
          <div className="intro-inner relative">
            {gameStarted && !gameFinished && showAnswer ? (
              <div className="flex flex-col justify-center items-center">
                <div>
                  <span className="result-text text-green-500">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="css-i6dzq1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01 9 11.01"></path>
                    </svg>
                    ЗӨВ : {intersection.length}
                  </span>
                  <span className="result-text text-red-500 ">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="css-i6dzq1"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M15 9L9 15"></path>
                      <path d="M9 9L15 15"></path>
                    </svg>
                    БУРУУ : {length - intersection.length}
                  </span>
                  <span className="result-text">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="css-i6dzq1"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 12L16 12"></path>
                    </svg>
                    ОНОО : {roundedScore}%
                  </span>
                </div>
              </div>
            ) : null}
            {!gameStarted && !gameFinished ? (
              <>
                <p className="intro-desc mb-1 font-bold ">
                  {`Нийт асуулт: ${qlength} , Хугацаа: ${10} мин`}
                </p>
                <p className="intro-desc mb-1">
                  {`Хариулт сонгоогүй тохиолдолд буруу хариулсанд тооцогдох ба`}
                </p>
                <p className="intro-desc m-0">
                  {`Тухайн шалгалтыг нэг удаа өгөх эрхтэйг анхаарна уу !`}
                </p>
                <button
                  className="intro-button"
                  onClick={() => {
                    setGameStarted(true);
                    setShowAnswer(false);
                    handleStartExam();
                  }}
                >
                  Асуулт үзэх
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="game-area">
          {gameStarted && !showAnswer ? (
            <>
              <QuestionCorrection
                Exam_chosen={Exam_chosen}
                data={questions}
                roundedScore={roundedScore}
              />
            </>
          ) : null}
          {gameStarted && showAnswer ? (
            <>
              <QuestionCorrectionShow data={questions} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
