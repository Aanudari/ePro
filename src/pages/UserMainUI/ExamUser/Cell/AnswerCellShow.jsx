function AnswerCellShow({ data, correct, wrong }) {
  return (
    <div className="font-[400]">
      <p className="border-b border-black pb-2 relative">
        {correct.includes(data.id) ? (
          <i className="bi bi-check-circle text-lg mr-2 text-green-500 "></i>
        ) : wrong.includes(data.id) ? (
          <i className="bi bi-x-circle text-red-400 mr-2 text-lg"></i>
        ) : (
          <i className="bi bi-circle text-gray-400 mr-2 text-lg"></i>
        )}
        <span className={`font-[500] text-[13px]  w-full`}>{data.answer}</span>
        {data.isTrue == "1" && (
          <i className="bi bi-check2 absolute text-2xl text-green-600 right-0"></i>
        )}
      </p>
    </div>
  );
}

export default AnswerCellShow;
