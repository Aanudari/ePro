import AnswerCellShow from "./AnswerCellShow";
function QuestionCellShow({ data, correct, wrong }) {
  let tempo = [];
  for (let index = 0; index < data.answerList.length; index++) {
    const element = data.answerList[index];
    element.isTrue == "1" && tempo.push(element.id);
  }
  return (
    <div
      className={`p-4 my-4 rounded shadow-sm border ${
        correct.includes(tempo[0]) ? "bg-green-100" : "bg-red-100"
      } `}
    >
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
          <AnswerCellShow data={e} key={i} correct={correct} wrong={wrong} />
        ))}
      </div>
    </div>
  );
}

export default QuestionCellShow;
