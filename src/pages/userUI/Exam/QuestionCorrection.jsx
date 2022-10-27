import { useState, useRef } from "react";
import Question from "./Question";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function QuestionCorrection() {
    const {gameStarted, setGameStarted, gameFinished, setGameFinished, uniqueRightAnswer, qlength, someValue} = useStateContext();
    var data = sessionStorage.getItem("exam_data");
    var obj = JSON.parse(data)

    const handleScore = (value) => {
      someValue.current.push(value)
    }
    return (
      <div className="correction">
        {obj && obj.questionList.map((question, index) => {
          return (
            <Question
              key={index}
              data={question}
              indexQ={index}
              handleScore={handleScore}
            />
          );
        })}
        <div className="w-full">
          <button
          onClick={() => {
            setGameStarted(!gameStarted)
            setGameFinished(!gameFinished)
          }}
            className="question-button w-full shadow"
          >
            Дуусгах
          </button>
        </div>
      </div>
    );
  }