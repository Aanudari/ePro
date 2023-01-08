import { useStateContext } from "../../../contexts/ContextProvider";

function ExamCard({ data }) {
  const { readyCheck, setReadyCheck, setExamID, examName, setExamName } =
    useStateContext();
  let status = parseInt(data.isExamTaken.score);
  return data.isExamTaken.status == "C" ? (
    <div className="shadow-md transition-all">
      <div
        className={`w-[250px] min-h-[320px] max-h-[320px] overflow-hidden bg-gray-100`}
      >
        <div className="w-full h-[150px] bg-white flex justify-center items-center font-bold text-2xl text-emerald-600">
          {/* <img className="w-full h-full" src="completed.jpg" alt="" /> */}
          COMPLETED
          <i className="bi bi-check2-circle ml-2"></i>
        </div>

        <div className="flex flex-col justify-between h-[170px] bg-gray-100">
          <div className="px-6 pt-2">
            <div className="font-bold text-[15px] text-gray-600/90">
              {data.name}
            </div>
            <p className="text-gray-700 text-base text-[14px] font-[500] ">
              Оноо : {data.isExamTaken.score}%
            </p>
            <p className="text-gray-700 text-base font-[400]"></p>
          </div>
          <div className="px-3 pb-2 mt-auto">
            <span
              className={`inline-block ${
                status > 80
                  ? "bg-green-500"
                  : status < 80 && status > 50
                  ? "bg-orange-500"
                  : "bg-red-500"
              } rounded-full px-3 py-1 text-sm
               font-semibold text-white mr-2 mb-2`}
            >
              Дүн : {status > 80 ? "Сайн" : "Хангалтгүй"}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="cursor-pointer shadow-md hover:mt-[-3px] transition-all "
      onClick={() => {
        setReadyCheck(!readyCheck);
        setExamID(data.id);
        setExamName(data.name);
        sessionStorage.setItem("exam_id", data.id);
      }}
    >
      <div className={`w-[250px] min-h-[320px] overflow-hidden bg-gray-100`}>
        <img
          className="w-full h-[150px]"
          src="https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg?w=2000"
          alt=""
        />
        <div className="flex flex-col justify-between h-[170px]">
          <div className="px-6 pt-2">
            <div className="font-bold text-[15px]">{data.name}</div>
            <p className="text-gray-700 text-base text-[14px] font-[400] m-0">
              Нээх цаг : {data.startDate}
            </p>
            <p className="text-gray-700 text-base text-[14px] font-[400] m-0">
              Хаах цаг : {data.expireDate}
            </p>
            <p className="text-gray-700 text-base font-[400]"></p>
          </div>
          <div className="px-3 pb-2">
            <span
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2
                    "
            >
              Хугацаа : {data.duration}мин
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamCard;
