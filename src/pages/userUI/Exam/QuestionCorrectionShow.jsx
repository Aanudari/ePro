import QuestionShow from "./QuestionShow";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
export default function QuestionCorrectionShow() {
  const navigate = useNavigate();
    var data = sessionStorage.getItem("exam_data");
    var obj = JSON.parse(data)
    const {setGameFinished, setGameStarted, gameStarted} = useStateContext();
    return (
      <div className="w-full">
        {obj && obj.questionList.map((question, index) => {
          return (
            <QuestionShow
              key={index}
              data={question}
              indexQ={index}
            />
          );
        })}
        <div className="w-full">
          <button
          onClick={() => {
            setGameStarted(!gameStarted)
            setGameFinished(false)
            sessionStorage.clear()
            navigate("/levelone-ui-take-exam")
            window.location.reload();
          }}
            className="question-button w-full shadow"
          >
            Оноотой танилцсан
          </button>
        </div>
      </div>
    );
  }