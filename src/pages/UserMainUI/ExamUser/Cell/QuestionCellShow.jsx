import AnswerCellShow from "./AnswerCellShow";
function QuestionCellShow({ data, correct }) {
  return (
    <div className="p-4 my-4 rounded shadow-sm border bg-gray-200">
      <p className="font-[500] text-[14px]">
        {data.question}
        {data.id}
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
          <AnswerCellShow data={e} key={i} correct={correct} />
        ))}
      </div>
    </div>
  );
}

export default QuestionCellShow;
