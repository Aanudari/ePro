function AnswerCellAdminMain({ data }) {
  //   console.log(data);
  return (
    <div className="w-[calc(92%)] font-[400]">
      <div className="border-gray-300 py-1 relative">
        {data.isTrue === "1" ? (
          <i className="bi bi-check-circle text-lg mr-2 text-green-500 "></i>
        ) : (
          <i className="bi bi-circle text-gray-400 mr-2 text-lg"></i>
        )}
        <span className={`font-[500] text-[13px] m-0 w-full`}>
          {data.answerName}
        </span>
        <div
          className={`absolute w-[45px] right-[-8%] text-[13px] font-[500] top-2 py-1 rounded-full ${
            data.isTrue === "1" ? "bg-gray-300" : "bg-gray-300"
          }  px-3  text-white`}
        >
          {data.answeredNumber}
        </div>
      </div>
    </div>
  );
}

export default AnswerCellAdminMain;
