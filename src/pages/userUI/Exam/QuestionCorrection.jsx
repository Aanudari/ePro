import { useState, useRef } from "react";
import Question from "./Question";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function QuestionCorrection() {
    const {wrongValue, someValue, showAnswer, setShowAnswer, gameStarted} = useStateContext();
    var data = sessionStorage.getItem("exam_data");
    var obj = JSON.parse(data)

    const handleScore = (value) => {
      someValue.current.push(value)
    }
    const handleWrong = (value) => {
      wrongValue.current.push(value)
    }
    return (
      <div className="flex w-full justify-center">
        <div className={gameStarted && !showAnswer ? 'w-full md:w-10/12  ' : null}>
        <div className="correction">
        {obj && obj.questionList.map((question, index) => {
          return (
            <Question
              key={index}
              data={question}
              indexQ={index}
              handleScore={handleScore}
              handleWrong={handleWrong}
            />
          );
        })}
        <div className="w-full">
          <button
          onClick={() => {
            // setGameStarted(!gameStarted)
            // setGameFinished(!gameFinished)
            setShowAnswer(!showAnswer)
          }}
            className="question-button w-full shadow"
          >
            Дуусгах
          </button>
        </div>
      </div>
      </div>
      </div>
    );
  }