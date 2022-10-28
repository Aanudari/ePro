import { useState, useRef } from "react";
import Question from "./Question";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function QuestionCorrection() {
  const { wrongValue, someValue, showAnswer, setShowAnswer, gameStarted, reminder, setReminder } = useStateContext();
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
                // setShowAnswer(!showAnswer)
                setReminder(true)
              }}
              className="question-button w-full shadow"
            >
              Дуусгах
            </button>
          </div>
          {
            reminder && 
            <div className='h-screen flex justify-center items-center w-full top-0 left-0 fixed z-10 bg-black bg-opacity-50'>
            <div className='p-3 body-bg-cus2 rounded-lg w-3/4 md:w-1/3'>
                <div className='body-bg-cus rounded-lg px-2 md:px-10 py-4'>
                  <p className="font-bold text-white">Та шалгалтаа дуусгахдаа итгэлтэй байна уу ?</p>
                    <div className='flex justify-end'>
                        <button onClick={() => {
                setShowAnswer(!showAnswer)
              }} className='intro-button'>Тийм</button>
                        <button onClick={() => {
                setReminder(false)
              }} id={"intro-bg"} className='intro-button ml-2'><i className="bi bi-x-lg"></i></button>
                    </div>
                </div>
            </div>
        </div>
          }
        </div>
      </div>
    </div>
  );
}