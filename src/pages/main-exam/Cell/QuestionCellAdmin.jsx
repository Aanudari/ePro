function QuestionCellAdmin({ data }) {
  console.log(data);
  return (
    <div
      //   className={`p-4 my-4 rounded shadow-sm border ${
      //     correct.includes(tempo[0]) ? "bg-green-100" : "bg-red-100"
      //   } `}
      className={`p-4 my-4 rounded shadow-sm border  `}
    >
      <p className=" flex justify-between">
        <span className="font-[500] text-[14px]">{data.questionName}</span>
        <span className="font-[500]">
          {data.points + " "}
          оноо
        </span>
      </p>
      {data.imgUrl !== "" && (
        <div className="flex w-full justify-center">
          <img
            src={`http://${data.qimgurl}`}
            alt=""
            className="mb-3 w-2/3 h-[300px]"
          />
        </div>
      )}
      <div>
        {/* {data.answerList.map((e, i) => (
          <AnswerCellShow data={e} key={i} correct={correct} wrong={wrong} />
        ))} */}
      </div>
    </div>
  );
}

export default QuestionCellAdmin;
