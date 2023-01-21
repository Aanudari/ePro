import AnswerCell from "./AnswerCell";
import { useState } from "react";
import { useEffect } from "react";
function QuestionCell({ data, collector }) {
  const [answer, setAnswer] = useState();
  const [tempo, setTempo] = useState([
    {
      answerId: null,
      isTrue: "0",
    },
  ]);
  let question = {
    questionId: `${data.id}`,
    onlyAnswerId: tempo,
    point: `${data.points}`,
  };
  const handleAnswer = (id, isTrue, index) => {
    let data = {
      answerId: id,
      isTrue: isTrue,
    };
    setTempo([data]);
    setAnswer(id);
  };

  useEffect(() => {
    collector(question, data.id);
  }, [tempo]);
  return (
    <div className="p-3 my-3 rounded shadow-sm border bg-white">
      <p className=" flex justify-between">
        <span className="font-[500] text-[14px]">{data.question}</span>
        <span className="font-[500]">
          {data.points + " "}
          оноо
        </span>
      </p>
      {data.imgUrl !== "" && (
        <div className="flex w-full justify-center">
          <img
            src={`http://${data.imgUrl}`}
            alt=""
            className="mb-3 w-2/3 h-[300px]"
          />
        </div>
      )}
      <div>
        {data.answerList.map((e, i) => (
          <AnswerCell
            data={e}
            key={i}
            handleAnswer={handleAnswer}
            answer={answer}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionCell;
