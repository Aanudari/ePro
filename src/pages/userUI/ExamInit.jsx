import React, {
  useRef,
  useState,
  useEffect
} from "react";
import MyTimer from "../../components/Timer";
import gsap from "gsap";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import getWindowDimensions from "../../components/SizeDetector";

function useCounter(initialState) {
  const [value, setValue] = useState(initialState);
  const reset = () => setValue(0);

  const add = () => setValue((value) => (value += 1));

  return { value, add, reset };
}


function Question({
  data,
}) {
  const [answer, setAnswer] = useState(null);
  console.log(answer)
  const parseValue = (value) => (value ? parseInt(value.split("-")[1]) : null);
  const questionRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      questionRef.current.querySelector(".question-text"),
      {
        x: 40,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4
      }
    );
    gsap.fromTo(
      questionRef.current.querySelectorAll("li"),
      {
        opacity: 0,
        x: 40
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1
      }
    );
  }, [data]);
  return (
    <div className="question" ref={questionRef}>
      <div className="question-inner">
        <h2 className="question-text">{data.question}</h2>
        <ul className="question-answers">
          {data && data.answerList.map((text, index) => {
            const value = `q${data.id}-${index}`;
            return (
              <li
                key={index}
              >
                <input
                  type="radio"
                  name={text.id}
                  value={value}
                  id={value}
                  onChange={(e) => {
                    setAnswer(e.target.value)
                  }}
                  checked={
                    value === answer
                  }
                />
                <label className="question-answer" htmlFor={value}>
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

function Results({ wrong, correct, empty }) {
  return (
    <div className="result">
      <div className="result-item is-correct">
        <span className="result-count">{correct}</span>
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
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01 9 11.01"></path>
          </svg>
          ЗӨВ
        </span>
      </div>
      <div className="result-item is-wrong">
        <span className="result-count">{wrong}</span>
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
            <path d="M15 9L9 15"></path>
            <path d="M9 9L15 15"></path>
          </svg>
          БУРУУ
        </span>
      </div>
      <div className="result-item is-empty">
        <span className="result-count">{empty}</span>
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
          ХООСОН
        </span>
      </div>
    </div>
  );
}

function QuestionCorrection({gameFinished, setGameFinished}) {
  var data = sessionStorage.getItem("exam_data");
  var obj = JSON.parse(data)
  return (
    <div className="correction">
      {obj && obj.questionList.map((question, index) => {
        return (
          <Question
            key={index}
            hasButton={true}
            showAnswer={true}
            data={question}
          />
        );
      })}
      <div className="w-full">
        <button
          className="question-button w-full shadow"
          onClick={() => {
            setGameFinished(!gameFinished)
          }}
        >
          Дуусгах
        </button>
      </div>

    </div>
  );
}

export default function ExamInit() {
  const { TOKEN, examID, qlength, setQlength, error, setError } = useStateContext();
  const examId = sessionStorage.getItem("exam_id")
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${TOKEN}`
      },
      url: `http://192.168.10.248:9000/v1/Exam/Question/${examId}`,
    })
      .then(
        res => {
          sessionStorage.setItem("exam_data", JSON.stringify(res.data.variantInfo));
          setQlength(res.data.variantInfo.questionList.length)
        }
      )
      .catch(err => setError(true))
  }, [examId])
  const { width } = getWindowDimensions();
  var data = sessionStorage.getItem("exam_data");
  var questions = JSON.parse(data)
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const totalQuestion = questions ? questions.questionList.length : 0;
  const gameRef = useRef(null);
  const question = useCounter(0);
  const correct = useCounter(0);
  const wrong = useCounter(0);
  const empty = useCounter(0);
  const time = new Date();
  time.setMinutes(time.getMinutes() + 10);

  useEffect(() => {
    if (gameStarted) {
      document.body.classList.add("game-started");
    } else {
      document.body.classList.remove("game-started");
    }
  }, [gameStarted]);

  useEffect(() => {
    if (question.value > totalQuestion) {
      gameRef.current.scrollTop = 0;
    }
  }, [question.value]);

  const handleNewQuestionClick = (selectedValue, currQuestion) => {
    console.log(selectedValue)
    // if (totalQuestion >= question.value) {
    //   if (selectedValue === currQuestion.correct) {
    //     correct.add();
    //   } else if (
    //     selectedValue !== null &&
    //     selectedValue !== currQuestion.correct
    //   ) {
    //     wrong.add();
    //   } else {
    //     empty.add();
    //   }
    //   questions[currQuestion.id].selection = selectedValue;
    //   question.add();
    // }
  };

  return (
    <div className="body flex-col">
      {
        width < 765 && gameStarted ?
          <div className="w-full flex justify-center mb-2">
            <MyTimer expiryTimestamp={time} />
          </div> : null
      }
      <div
        className="game"
        ref={gameRef}
        data-game-started={gameStarted ? true : null}
        data-game-finished={question.value > totalQuestion ? true : null}
      >


        <div className="intro">
          <div className="intro-inner">
            <h1 className="intro-title">

              {
                width > 765 && gameStarted ?
                  <div className="w-full flex justify-center mb-2">
                    <MyTimer expiryTimestamp={time} />
                  </div> : null
              }
            </h1>
            {!gameStarted && (
              <>
                <p className="intro-desc">
                  {`Нийт асуулт: ${qlength} , Хугацаа: ${10} мин`}
                </p>
                <button
                  className="intro-button"
                  onClick={() => setGameStarted(true)}
                >
                  Эхлэх
                </button>
              </>
            )}
          </div>
        </div>

        <div className="game-area">
          {questions && (
            <>
              <QuestionCorrection func={[gameFinished, setGameFinished]} data={questions} onQuestionButtonClick={handleNewQuestionClick} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}