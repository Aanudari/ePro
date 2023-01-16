function ExamBoard({
  exams,
  examModal,
  setExamModal,
  handleExamModal,
  setShowReport,
  setShowDocument,
}) {
  return (
    <div className="min-w-[1150px] min-h-full max-h-full bg-white py-3 px-4 shadow-sm">
      <h6 className="text-gray-500 font-[500]">Шалгалтууд</h6>
      <div className="w-full h-8 flex gap-1">
        <div className="w-1/4 h-full flex justify-center items-center bg-teal-500 text-white text-[11px] uppercase font-[500]">
          Нэр
        </div>
        <div className="w-1/4 h-full flex justify-center items-center bg-teal-500 text-white text-[11px] uppercase font-[500]">
          эхлэх, дуусах
        </div>
        <div className="w-1/4 h-full flex justify-center items-center bg-teal-500 text-white text-[11px] uppercase font-[500]">
          Статус
        </div>
        <div className="w-1/4 h-full flex justify-center items-center bg-teal-500 text-white text-[11px] uppercase font-[500]">
          Хугацаа
        </div>
        <div className="w-1/4 h-full flex justify-center items-center  text-[11px] uppercase font-[500] mr-2"></div>
      </div>
      <div className="w-full h-full h-[570px]  overflow-scroll mt-2 border-b">
        {exams?.map((exam, index) => (
          <div key={index} className="h-14 w-full flex border-b">
            <div
              onClick={
                exam.examSummary.status !== "Ongoing"
                  ? () => {
                      setExamModal(true);
                      handleExamModal(exam.id);
                    }
                  : () => {
                      setShowReport(true);
                      handleExamModal(exam.id);
                    }
              }
              className={`w-full h-14 flex gap-1 border-b ${
                exam.examSummary.status == "Exam over"
                  ? "text-gray-400 hover:text-teal-600  hover:border-b-teal-500"
                  : exam.examSummary.status == "Ongoing"
                  ? "hover:text-green-600  hover:border-b-green-500 bg-gray-50"
                  : "text-gray-400 hover:text-amber-600  hover:border-b-amber-600 bg-amber-100"
              }
                font-[600] cursor-pointer `}
            >
              <div
                className="w-1/4 h-full flex justify-start pl-2 items-center text-[11px]
                     uppercase font-[500]"
              >
                {exam.name}
              </div>
              <div
                className="w-1/4 h-full flex flex-col justify-center items-center text-[11px]
                     uppercase font-[500]"
              >
                <span className="m-0 font-[500]">{exam.startDate}</span>
                <span
                  className={`m-0 font-[500] ${
                    exam.examSummary.status == "Ongoing" && "text-red-400"
                  }`}
                >
                  {exam.expireDate}
                </span>
              </div>
              <div
                className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[500]"
              >
                {exam.examSummary.status == "Exam over" ? (
                  "Дууссан"
                ) : exam.examSummary.status == "Ongoing" ? (
                  <span className="font-[500] text-green-500">Идэвхитэй</span>
                ) : (
                  "Хүлээгдэж буй"
                )}
              </div>
              <div
                className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[500]"
              >
                {exam.duration} мин {exam.id}
              </div>
            </div>
            {exam.examSummary.status == "Ongoing" ? (
              <div
                onClick={() => {
                  setShowReport(true);
                  handleExamModal(exam.id);
                }}
                className="w-1/4 h-full flex justify-between items-center text-[11px] cursor-pointer
                     uppercase font-[500] bg-green-500 !text-white active:bg-green-500 hover:bg-green-600"
              >
                <div className="w-full flex justify-center items-center font-[500]">
                  <span className="font-[500]">
                    {exam.examSummary.taken}/{exam.examSummary.total}
                  </span>
                </div>
                <div className="h-full min-w-[50px] border-l flex justify-center items-center">
                  <i className="bi bi-check2-circle text-[20px]"></i>
                </div>
              </div>
            ) : exam.examSummary.status == "Exam over" ? (
              <div
                onClick={() => {
                  setShowReport(true);
                  handleExamModal(exam.id);
                }}
                className="w-1/4 h-full flex justify-between items-center text-[11px] cursor-pointer
                               uppercase font-[500] bg-teal-500 !text-white active:bg-teal-500 hover:bg-teal-600"
              >
                <div className="w-full flex justify-center items-center font-[500]">
                  Тайлан
                </div>
                <div className="h-full min-w-[50px] border-l flex justify-center items-center">
                  <i className="bi bi-file-earmark-bar-graph text-[16px]"></i>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setShowReport(true);
                  handleExamModal(exam.id);
                }}
                className="w-1/4 h-full flex justify-between items-center text-[11px] cursor-pointer
                               uppercase font-[500] bg-amber-500 !text-white active:bg-amber-500 hover:bg-amber-600"
              >
                <div className="w-full flex justify-center items-center font-[500]">
                  NOT YET ...
                </div>
                <div className="h-full min-w-[50px] border-l flex justify-center items-center">
                  <i className="bi bi-alarm-fill text-[16px]"></i>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamBoard;
