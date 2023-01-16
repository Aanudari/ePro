import { useEffect } from "react";

function AnswerCellAdmin({ data, setCheck }) {
  useEffect(() => {
    if (data.isTrue == "1" && data.isAnswered == "1") {
      setCheck(true);
    }
  }, []);
  return (
    <div className="font-[400]">
      <p className="border-b border-black pb-2 relative">
        {data.isTrue == "1" && data.isAnswered == "1" ? (
          <i className="bi bi-check-circle text-lg mr-2 text-green-500 "></i>
        ) : data.isTrue == "0" && data.isAnswered == "1" ? (
          <i className="bi bi-x-circle text-red-400 mr-2 text-lg"></i>
        ) : (
          <i className="bi bi-circle text-gray-400 mr-2 text-lg"></i>
        )}
        <span className={`font-[500] text-[13px]  w-full`}>
          {data.answerName}
        </span>
        {data.isTrue == "1" ? (
          <i className="bi bi-check2 absolute text-2xl text-green-600 right-0"></i>
        ) : null}
      </p>
    </div>
  );
}

export default AnswerCellAdmin;
