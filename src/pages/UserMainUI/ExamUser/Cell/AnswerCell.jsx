function AnswerCell({ data, handleAnswer, answer, index }) {
  return (
    <div className="font-[400]">
      <p className="">
        {answer == data.id ? (
          <i className="bi bi-record-circle text-lg mr-2 text-sky-600 cursor-pointer"></i>
        ) : (
          <i
            onClick={() => {
              handleAnswer(data.id, data.isTrue, index);
            }}
            className="bi bi-circle text-gray-400 mr-2 cursor-pointer text-lg"
          ></i>
        )}
        <span
          className={`font-[500] text-[13px] ${
            answer == data.id && "text-sky-600"
          }`}
        >
          {data.answer}
        </span>
      </p>
    </div>
  );
}

export default AnswerCell;
