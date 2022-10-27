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

function useCounter(initialState) {
  
  const [value, setValue] = useState(initialState);

  const reset = () => setValue(0);

  const add = () => setValue((value) => (value += 1));

  return { value, add, reset };
}

export default function ExamInit() {
  const { TOKEN, qlength, setQlength, error, setError, gameStarted, setGameStarted, gameFinished, 
    setGameFinished, uniqueRightAnswer, showAnswer, setShowAnswer } = useStateContext();
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
      .catch(err => setError(true))
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
        className="game"
        ref={gameRef}
        data-game-started={gameStarted ? true : null}
      >

        <div className="intro">
          <div className="intro-inner">
          {gameStarted && (
            <div className="indicator">
              {questions && questions.questionList.map((q, index) => {
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
            {!gameStarted && !gameFinished ? (
              <>
                <p className="intro-desc">
                  {`Нийт асуулт: ${qlength} , Хугацаа: ${10} мин`}
                </p>
                <p className="intro-desc">
                  {`Хариулт сонгоогүй тохиолдолд буруу хариулсанд тооцогдохыг анхаарна уу !`}
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
            {!gameStarted && gameFinished ? (
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
            }
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