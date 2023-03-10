import AnswerCellAdmin from "./AnswerCellAdmin";
import { useState } from "react";
function QuestionCellAdmin({ data, index }) {
  const [check, setCheck] = useState(false);
  return (
    <div
      className={`p-4 my-4 rounded shadow-sm border ${
        check ? "bg-green-200" : "bg-red-200"
      } `}
    >
      <p className=" flex justify-between">
        <span className="font-[500] text-[15px]">
          {index + 1}. {data.questionName}
        </span>
        <span className="font-[500]">
          {data.points + " "}
          оноо
        </span>
      </p>
      {data.qimgurl !== "" && (
        <div className="flex w-full justify-center">
          <img
            src={`http://${data.qimgurl}`}
            alt=""
            className="mb-3 w-2/3 h-[300px]"
          />
        </div>
      )}
      <div>
        {data.answerDtl.map((e, i) => (
          <AnswerCellAdmin data={e} key={i} setCheck={setCheck} />
        ))}
      </div>
    </div>
  );
}

export default QuestionCellAdmin;
