import React, {
  useRef,
  useState,
  useEffect
} from "react";
import MyTimer from "../../components/Timer";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import getWindowDimensions from "../../components/SizeDetector";
import QuestionCorrection from "./Exam/QuestionCorrection";
import QuestionCorrectionShow from "./Exam/QuestionCorrectionShow";
import { useNavigate } from "react-router-dom";
import ResultExam from "./Exam/ResultExam";

function useCounter(initialState) {
  
  const [value, setValue] = useState(initialState);

  const reset = () => setValue(0);

  const add = () => setValue((value) => (value += 1));

  return { value, add, reset };
}

export default function ExamInit() {
  const { TOKEN, qlength, setQlength, error, setError, gameStarted, setGameStarted, gameFinished, 
    setGameFinished, uniqueRightAnswer, uniqueWrongAnswer, showAnswer, setShowAnswer } = useStateContext();
  const examId = sessionStorage.getItem("exam_id")
  const navigate = useNavigate();
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
      .catch(err => console.log("message"))
  }, [examId])


  //display width tootsooloh
  const { width } = getWindowDimensions();
  //display width tootsooloh

  // session storage dotor baih exam iin medeelel awah
  var data = sessionStorage.getItem("exam_data");
  var questions = JSON.parse(data)
  // session storage dotor baih exam iin medeelel awah
  const totalQuestion = questions ? questions.questionList.length : 0;
  const gameRef = useRef(null);

  //time generate hiih
  const time = new Date();
  time.setMinutes(time.getMinutes() + 10);
  //time generate hiih

  let score = uniqueRightAnswer.size * 100 / qlength
  let roundedScore = Math.round(score, -1)

  const indicatorBg = (index) => {
    if (qlength > index) {
      return "#fff";
    } else if (qlength === index) {
      return "#29b5d5";
    } else {
      return "rgba(255,255,255,.2)";
    }
  };
  return (
    <div className="body flex-col">
      {
        gameStarted &&
          <div className="flex justify-center md:absolute mt-[-50px] mb-4 md:m-0 top-[20px] md:left-1/2">
            <MyTimer expiryTimestamp={time} />
          </div>
      }
      <div
        className="game "
        ref={gameRef}
        data-game-started={gameStarted ? true : null}
      >
        <div className={gameStarted && !showAnswer ? 'hidden' : "intro"}>
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
            ЗӨВ : {uniqueRightAnswer.size}
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
            БУРУУ : {uniqueWrongAnswer.size}
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
          )
          : null
          }
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
                  onClick={() => 
                    {
                      setGameStarted(true)
                    setShowAnswer(false)
                    }
                  }
                >
                  Эхлэх
                </button>
              </>
            ) : null
            }
            {/* {!gameStarted && gameFinished ? (
              <>
              <div className="flex flex-col justify-start w-full">
              <span className="">
                {`Нийт асуулт : ${qlength}`}
              </span>
              <span className="text-green-500">
                {`Зөв : ${uniqueRightAnswer.size}`}
              </span>
              <span className="text-green-500">
                {`Оноо : ${roundedScore}%`}
              </span>
              </div>
              <button
                className="intro-button"
                onClick={() => 
                  {
                    navigate("/levelone-ui-take-exam")
                    setGameFinished(false)
                  }
                }
              >
                Хаах
              </button>
            </>
            ) : null
            } */}
          </div>
        </div>
        <div className="game-area">
          {gameStarted && !showAnswer ?(
            <>
              <QuestionCorrection data={questions}/>
            </>
          ) : null
          }
          {gameStarted && showAnswer ?(
            <>
              <QuestionCorrectionShow data={questions}/>
            </>
          ) : null
          }
        </div>
      </div>
    </div>
  );
}