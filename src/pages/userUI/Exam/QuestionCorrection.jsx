import Question from "./Question";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function QuestionCorrection() {
    const {gameStarted, setGameStarted, gameFinished, setGameFinished} = useStateContext();
    var data = sessionStorage.getItem("exam_data");
    var obj = JSON.parse(data)
    return (
      <div className="correction">
        {obj && obj.questionList.map((question, index) => {
          return (
            <Question
              key={index}
              data={question}
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