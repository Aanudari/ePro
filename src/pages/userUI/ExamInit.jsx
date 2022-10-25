import React, {
  useRef,
  useState,
  useEffect
} from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
// const questions = [
//   {
//     id: 0,
//     text: "What does CSS stand for?",
//     answers: [
//       "Computer Style Sheets",
//       "Cascading Style Sheets",
//       "Creative Style Sheets",
//       "Colorful Style Sheets"
//     ],
//     correct: 1,
//     selection: null
//   },


function useCounter(initialState) {
  const [value, setValue] = useState(initialState);
  const reset = () => setValue(0);

  const add = () => setValue((value) => (value += 1));

  return { value, add, reset };
}

function Question({
  data,
  buttonText,
  hasButton = true,
  onQuestionButtonClick,
  showAnswer = false,
  markSelection = null
}) {
  const [answer, setAnswer] = useState(null);
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
  console.log(data)
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
                // className={
                //   index === data.correct && showAnswer ? "is-true" : ""
                // }
                data-selected={markSelection === index ? true : null}
                
              >
                <input
                  type="radio"
                  name={`q_${data.id}`}
                  value={text.isTrue}
                  id={value}
                  onChange={(e) => setAnswer(e.target.value)}
                  // onClick={(e) => {
                  //   console.log(e.target.value)
                  // }}
                  checked={
                    !showAnswer ? answer === value : markSelection === index
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
      {hasButton && (
        <button
          className="question-button"
          onClick={() => onQuestionButtonClick(parseValue(answer), data)}
        >
          {buttonText}
        </button>
      )}

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

function QuestionCorrection() {
  var data = sessionStorage.getItem("exam_data");
  var obj = JSON.parse(data)
  return (
    <div className="correction">
      {obj && obj.questionList.map((question, index) => {
        return (
          <Question
            key={index}
            hasButton={false}
            showAnswer={true}
            data={question}
          />
        );
      })}
    </div>
  );
}

export default function ExamInit() {
  // const [questions, setquestions] = useState([]);
  const { TOKEN, examID, qlength, setQlength } = useStateContext();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${TOKEN}`
      },
      url: `http://192.168.10.248:9000/v1/Exam/Question/${examID}`,
    })
      .then(
        res => {
          sessionStorage.setItem("exam_data", JSON.stringify(res.data.variantInfo));
          setQlength(res.data.variantInfo.questionList.length)
        }
      )
      .catch(err => console.log('err'))
  }, [examID])
  var data = sessionStorage.getItem("exam_data");
  var questions = JSON.parse(data)
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameSize, setGameSize] = useState({});
  const totalQuestion = questions.questionList.length ;
  const gameRef = useRef(null);
  const gameOverlayRef = useRef(null);
  const location = useLocation();
  const question = useCounter(0);
  const correct = useCounter(0);
  const wrong = useCounter(0);
  const empty = useCounter(0);

  const handleNewQuestionClick = (selectedValue, currQuestion) => {
    console.log("cell clicked")
    if (totalQuestion >= question.value) {
      if (selectedValue === currQuestion.correct) {
        correct.add();
      } else if (
        selectedValue !== null &&
        selectedValue !== currQuestion.correct
      ) {
        wrong.add();
      } else {
        empty.add();
      }
      questions[currQuestion.id].selection = selectedValue;
      question.add();
    }
  };

  const resetSelection = () => {
    questions.forEach((q) => (q.selection = null));
  };

  const handleRestartClick = () => {
    setGameFinished(false);
    setGameStarted(false);
    resetSelection();
    question.reset();
    correct.reset();
    wrong.reset();
    empty.reset();
  };

  const indicatorBg = (index) => {
    if (question.value > index) {
      return "#fff";
    } else if (question.value === index) {
      return "#29b5d5";
    } else {
      return "rgba(255,255,255,.2)";
    }
  };

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

  return (
    <div className="body">
      <div
        className="game"
        ref={gameRef}
        data-game-started={gameStarted ? true : null}
        data-game-finished={question.value > totalQuestion ? true : null}
      >
        <div className="intro">
          <div className="intro-inner">
            <h1 className="intro-title">Шалгалт</h1>
            {!gameStarted && (
              <>
                <p className="intro-desc">
                  {`Нийт ${qlength} асуулт мөн цагын хязгаар байхгүй.`}
                </p>
                <button
                  className="intro-button"
                  onClick={() => setGameStarted(true)}
                >
                  Эхлэх
                </button>
              </>
            )}
            {gameStarted && (
              <div className="indicator">
                {questions.questionList.map((q, index) => {
                  return (
                    <span
                    key={index}
                      className="indicator-item"
                      style={{
                        backgroundColor: indicatorBg(index)
                      }}
                    />
                  );
                })}
              </div>
            )}

              <div>
                <Results
                  wrong={wrong.value}
                  correct={correct.value}
                  empty={empty.value}
                />
                <button
                  className="restart-button"
                  onClick={() => handleRestartClick()}
                >
                  Шинээр эхлүүлэх
                </button>
              </div>
            

          </div>
        </div>
        <div className="game-area">
          {questions[question.value] && (
            <Question
              data={questions[question.value]}
              buttonText={
                question.value !== totalQuestion ? "Дараагын асуулт" : "Дуусгах"
              }
              onQuestionButtonClick={handleNewQuestionClick}
              // onClick={handleNewQuestionClick}
            />
          )}
          {!questions[question.value] && (
            <>
              <QuestionCorrection data={questions} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}