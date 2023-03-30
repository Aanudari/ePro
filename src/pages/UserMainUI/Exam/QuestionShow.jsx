import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function QuestionShow({ data, indexQ }) {
  const [answer, setAnswer] = useState(null);
  const {
    wrongValue,
    someValue,
    rightAnswer,
    rightAnswerCount,
    setRightAnswerCount,
  } = useStateContext();
  const questionRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      questionRef.current.querySelector(".question-text"),
      {
        x: 40,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
      }
    );
    gsap.fromTo(
      questionRef.current.querySelectorAll("li"),
      {
        opacity: 0,
        x: 40,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
      }
    );
  }, [data]);
  // useEffect(()=> {
  //     rightAnswer[1].includes(text.id) && text.isTrue === "1" ?
  //     setRightAnswerCount(rightAnswerCount + 1) : null
  // }, [])
  return (
    <div className="question " ref={questionRef}>
      <div className="question-inner">
        <h4 className="question-text">
          {indexQ + 1}. {data.question}
        </h4>
        {data.imgUrl && (
          <img
            src={`http://${data.imgUrl}`}
            alt=""
            className="mb-4 w-full rounded h-[150px] md:h-[250px]"
          />
        )}
        <ul className="question-answers">
          {data &&
            data.answerList.map((text, index) => {
              const value = `q${text.id}-${index}`;
              return (
                <li
                  key={index}
                  className={
                    rightAnswer[1].includes(text.id) && text.isTrue === "0"
                      ? "bg-red-500 rounded"
                      : // returnCss() :
                      rightAnswer[1].includes(text.id) && text.isTrue === "1"
                      ? "bg-green-500 rounded"
                      : null
                  }
                >
                  <input
                    type="radio"
                    name={text.id}
                    value={value}
                    id={value}
                    checked={value === answer}
                    disabled
                  />
                  <label
                    className={
                      rightAnswer[1].includes(text.id) && text.isTrue === "0"
                        ? " text-white"
                        : rightAnswer[1].includes(text.id) &&
                          text.isTrue === "1"
                        ? "!text-white"
                        : null
                    }
                    htmlFor={value}
                  >
                    {text.answer}
                  </label>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
