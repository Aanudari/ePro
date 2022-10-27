import QuestionShow from "./QuestionShow";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function QuestionCorrectionShow() {
    const {gameStarted, setGameStarted, gameFinished, setGameFinished, someValue} = useStateContext();
    var data = sessionStorage.getItem("exam_data");
    var obj = JSON.parse(data)

    return (
      <div className="">
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
            setGameFinished(!gameFinished)
            sessionStorage.clear()
          }}
            className="question-button w-full shadow"
          >
            Оноотой танилцсан
          </button>
        </div>
      </div>
    );
  }