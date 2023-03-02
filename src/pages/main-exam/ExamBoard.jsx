import { useState } from "react";
import CreateaExamForm from "./CreateaExamForm";

function ExamBoard({
  exams,
  examModal,
  setExamModal,
  handleExamModal,
  setShowReport,
  setShowDocument,
  examTri,
  setExamTri,
}) {
  let tempo = ["Ongoing", "Exam over", "Not yet"];
  let temp = [exams];
  for (let index = 0; index < tempo.length; index++) {
    const element = tempo[index];
    let arr = [];
    for (let i = 0; i < exams?.length; i++) {
      const el = exams[i];
      if (el?.examSummary?.status == element) {
        arr.push(el);
      }
    }
    temp.push(arr);
  }

  const [detector, setDetector] = useState(1);
  const [show, setShow] = useState(false);
  const text = "2023-03-04 10:13:07";
  // console.log(text.split(" ", 1));
  return (
    <div className="min-w-[800px] bg-white shadow py-3 px-4 shadow-sm">
      {show && (
        <CreateaExamForm
          closeForm={setShow}
          examTri={examTri}
          setExamTri={setExamTri}
        />
      )}
      <div className="flex">
        <div className="flex w-full mb-2">
          <div
            onClick={() => {
              setDetector(0);
            }}
            className={`w-[150px] ${
              detector == 0
                ? "bg-teal-700 hover:!bg-teal-700 shadow"
                : "bg-teal-500"
            } h-9  hover:bg-teal-600 active:bg-teal-700 hover:mt-[-2px]   flex items-center justify-center font-[500] uppercase  
          text-white text-[11px] cursor-pointer transition-all`}
          >
            Бүгд
          </div>
          <div
            onClick={() => {
              setDetector(1);
            }}
            className={`w-[150px] ${
              detector == 1
                ? "bg-teal-700 hover:!bg-teal-700 shadow"
                : "bg-teal-500"
            } h-9  hover:bg-teal-600 active:bg-teal-700 hover:mt-[-2px]   flex items-center justify-center font-[500] uppercase  
          text-white text-[11px] cursor-pointer transition-all ml-1`}
          >
            Идэвхитэй
            <i className="bi bi-check2-circle ml-1"></i>
          </div>
          <div
            onClick={() => {
              setDetector(2);
            }}
            className={`w-[150px] ${
              detector == 2
                ? "bg-teal-700 hover:!bg-teal-700 shadow"
                : "bg-teal-500"
            } h-9  hover:bg-teal-600 active:bg-teal-700 hover:mt-[-2px]   flex items-center justify-center font-[500] uppercase  
          text-white text-[11px] cursor-pointer transition-all ml-1`}
          >
            Дууссан
            <i className="bi bi-hourglass-bottom ml-2"></i>
          </div>
          <div
            onClick={() => {
              setDetector(3);
            }}
            className={`w-[150px] ${
              detector == 3
                ? "bg-teal-700 hover:!bg-teal-700 shadow"
                : "bg-teal-500"
            } h-9  hover:bg-teal-600 active:bg-teal-700 hover:mt-[-2px]   flex items-center justify-center font-[500] uppercase  
          text-white text-[11px] cursor-pointer transition-all ml-1`}
          >
            Эхлээгүй
            <i className="bi bi-alarm-fill ml-2"></i>
          </div>
        </div>
        <div
          onClick={() => {
            setShow(true);
          }}
          className="w-1/4 h-9 p-0 custom-btn btn-13 h-full border-[1px]  transition-all !border-teal-500 rounded cursor-pointer flex justify-center items-center text-teal-700 text-[11px] uppercase font-bold mr-2"
        >
          <i className="bi bi-vector-pen text-lg text-md mr-2 "></i>
          Шалгалт үүсгэх
        </div>
      </div>

      {/* <div className="w-full h-8 flex gap-1">
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
        <div
          onClick={() => {
            setShow(true);
          }}
          className="w-1/4 p-0 custom-btn btn-13 h-full border-[1px]  transition-all !border-teal-500 rounded cursor-pointer flex justify-center items-center text-teal-700 text-[11px] uppercase font-bold mr-2"
        >
          <i className="bi bi-plus text-lg text-md mr-2 "></i>
          Шалгалт үүсгэх
        </div>
      </div> */}
      <div className="!h-[calc(100vh-156px)] w-full overflow-scroll mt-2 border-b">
        {exams &&
          temp[detector]?.map((exam, index) => (
            <div key={index} className="h-14 w-full flex border-b">
              <div
                onClick={
                  exam?.examSummary?.status !== "Ongoing"
                    ? () => {
                        setExamModal(true);
                        handleExamModal(exam.id, exam.examSummary.status);
                      }
                    : () => {
                        // setShowReport(true);
                        setExamModal(true);
                        handleExamModal(exam.id, exam.examSummary.status);
                      }
                }
                className={`w-full h-14 flex gap-1 border-b ${
                  exam?.examSummary?.status == "Exam over"
                    ? "text-gray-400 hover:text-teal-600  hover:border-b-teal-500"
                    : exam?.examSummary?.status == "Ongoing"
                    ? "cellt"
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
                  className="w-1/4 h-full flex flex-row gap-3 justify-center items-center text-[11px]
                     uppercase font-[500]"
                >
                  <span className="m-0 font-[600]">
                    {exam.startDate.split(" ", 1)}
                  </span>
                  <span
                    className={`m-0 font-[500] ${
                      exam?.examSummary?.status == "Ongoing" &&
                      "text-gray-900 font-[700]"
                    }`}
                  >
                    {exam?.expireDate.split(" ", 1)}
                  </span>
                </div>
                <div
                  className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[500]"
                >
                  {exam?.examSummary?.status == "Exam over" ? (
                    "Дууссан"
                  ) : exam?.examSummary?.status == "Ongoing" ? (
                    <div className="px-2 py-1 rounded-md shadow bg-white">
                      <span className="!font-[700] text-red-500 text-[9px]">
                        Идэвхитэй{" "}
                        <i className="bi bi-check2-circle ml-1 text-[12px]"></i>
                      </span>
                    </div>
                  ) : (
                    "Эхлээгүй ..."
                  )}
                </div>
                <div
                  className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[500]"
                >
                  {exam?.duration} мин
                </div>
              </div>
              {exam?.examSummary?.status == "Ongoing" ? (
                <div
                  onClick={() => {
                    setShowReport(true);
                    handleExamModal(exam.id);
                  }}
                  className="w-1/4 h-full flex justify-between items-center text-[11px] cursor-pointer
                     uppercase font-[500] custom-btn btn-5 p-0 rounded-none"
                >
                  <div className="w-full flex justify-center items-center font-[500] ">
                    <span className="!font-[700]">
                      {exam?.examSummary?.taken}/{exam?.examSummary?.total}
                    </span>
                  </div>
                  <div className="h-full min-w-[50px] border-l flex justify-center items-center">
                    <i className="bi bi-check2-circle text-[20px]"></i>
                  </div>
                </div>
              ) : exam?.examSummary?.status == "Exam over" ? (
                <div
                  onClick={() => {
                    setShowReport(true);
                    handleExamModal(exam.id);
                  }}
                  className="w-1/4 h-full flex justify-between items-center text-[11px] cursor-pointer custom-btn btn-13 p-0 rounded-none
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
                  className="w-1/4 h-full flex justify-between items-center text-[11px] cursor-pointer custom-btn btn-14 p-0
                               uppercase font-[500] bg-amber-500 rounded-none active:bg-amber-500 hover:bg-amber-600"
                >
                  <div className="w-full flex justify-center items-center font-[500]">
                    ХҮЛЭЭГДЭЖ БУЙ
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
