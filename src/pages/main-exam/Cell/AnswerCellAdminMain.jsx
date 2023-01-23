function AnswerCellAdminMain({ data }) {
  //   console.log(data);
  return (
    <div className="font-[400]">
      <div className="border-b border-gray-400 pb-3 relative">
        {data.isTrue == "1" ? (
          <i className="bi bi-check-circle text-lg mr-2 text-green-500 "></i>
        ) : (
          <i className="bi bi-circle text-gray-400 mr-2 text-lg"></i>
        )}
        <span className={`font-[500] text-[13px]  w-full`}>
          {data.answerName}
        </span>
        <div
          className={`absolute w-[45px] right-5 text-sm font-[500] top-2 py-1 rounded-full ${
            data.isTrue == "1" ? "bg-gray-400" : "bg-gray-400"
          }  px-3  text-white`}
        >
          {data.answeredNumber}
        </div>
      </div>
    </div>
  );
}

export default AnswerCellAdminMain;
