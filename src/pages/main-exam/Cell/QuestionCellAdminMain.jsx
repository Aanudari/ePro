import AnswerCellAdminMain from "./AnswerCellAdminMain";
function QuestionCellAdminMain({ data }) {
  return (
    <div className={`p-4 my-4 rounded shadow-sm border bg-gray-100`}>
      <div className=" flex justify-between">
        <span className="font-[500] text-[14px]">{data.questionName}</span>
        <span className="font-[500] ml-2 flex items-center">
          Нийт хариулсан:
          <div className=" top-2 py-1 rounded-full bg-gray-400 mr-5 px-3 font-[400] text-white ml-2">
            {data.totalTry + " "}
          </div>
        </span>
      </div>
      {data.qimgurl !== "" && (
        <div className="flex w-full justify-center">
          <img
            src={`http://${data.qimgurl}`}
            alt=""
            className="mb-3 w-2/3 h-[300px]"
          />
        </div>
      )}
      <div className=" pt-4">
        {data.answerDtl.map((e, i) => (
          <AnswerCellAdminMain data={e} key={i} />
        ))}
      </div>
      <div className="h-8 flex justify-end items-center mt-2">
        <span className="mr-2 font-[500] text-sm ">
          <i className="bi bi-bar-chart-fill mr-2"></i>
          Success rate :
        </span>
        <div className="w-[200px] h-full bg-gray-300 flex justify-end rounded shadow-sm">
          <div
            style={{ width: `${data.successRate}%` }}
            className={`${
              data.successRate > 80 ? "bg-emerald-600" : "bg-red-500"
            }  h-full text-sm font-[500] text-white flex items-center justify-end px-2 rounded`}
          >
            {data.successRate}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCellAdminMain;
