function AnswerCellShow({ data, answer, correct }) {
  console.log(correct);
  console.log(data.id);
  return (
    <div className="font-[400]">
      <p className="border-b border-black pb-2">
        {data.isTrue === "1" ? (
          <i className="bi bi-check-circle text-lg mr-2 text-green-500 cursor-pointer"></i>
        ) : (
          <i className="bi bi-circle text-gray-400 mr-2 cursor-pointer text-lg"></i>
        )}
        <span
          className={`font-[500] text-[13px]  w-full ${
            data.isTrue === "1" && "text-green-600"
          }`}
        >
          {data.answer}
        </span>
      </p>
    </div>
  );
}

export default AnswerCellShow;
