import { useState } from "react";
import CreateaExamForm from "./CreateaExamForm";
import CopyModal from "./modal/CopyExamModal";

function ExamBoard({
  exams,
  examModal,
  setExamModal,
  handleExamModal,
  setShowReport,
  setShowDocument,
  examTri,
  setExamTri,
  examNames,
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
  // console.log(examNames);
  const [detector, setDetector] = useState(1);
  const [show, setShow] = useState(false);
  let final = [];
  const monthsObj = exams
    ? temp[detector].reduce((acc, item) => {
        const [date, time] = item.startDate.split(" "); // Split the date and time
        const [year, month] = date.split("-");

        if (!acc[month]) {
          acc[month] = { month: month, items: [] };
        }
        acc[month].items.push(item);
        return acc;
      }, {})
    : "";

  const monthsArr = Object.values(monthsObj);
  monthsArr.forEach((month) => {
    final.push(month.month);
    final.push(month.items);
  });
  // console.log(final);
  const [smallMenuid, setSmallMenuid] = useState(0);
  const [showAddition, setShowAddition] = useState(false);
  const handleSmallMenu = (value) => {
    // console.log(value);
    setSmallMenuid(value);
  };

  const [copyModal, setCopyModal] = useState(false);
  return (
    <div className="min-w-[800px] bg-white shadow py-3 px-4 shadow-sm rounded-md">
      {show && (
        <CreateaExamForm
          closeForm={setShow}
          examTri={examTri}
          setExamTri={setExamTri}
          examNames={examNames}
        />
      )}
      {copyModal && (
        <CopyModal
          setCopyModal={setCopyModal}
          setSmallMenuid={setSmallMenuid}
          id={smallMenuid}
          examNames={examNames}
          setExamTri={setExamTri}
          examTri={examTri}
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
      <div className="!h-[calc(100vh-156px)] w-full overflow-scroll mt-2 border-b pr-1">
        {exams &&
          final.map((certainItem, certainIndex) => {
            if (certainIndex % 2 == 1) {
              // console.log(certainItem);
              return certainItem.map((exam, index) => (
                <div key={index} className="h-14 w-full flex mt-[2px] relative">
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
                    className={`w-full h-14 flex gap-1 ${
                      exam?.examSummary?.status == "Exam over"
                        ? "custom-btn btn-11 bg-gray-100 shadow-none hover:bg-gray-200 bg-opacity-50 "
                        : exam?.examSummary?.status == "Ongoing"
                        ? "cellt "
                        : "custom-btn btn-11 bg-amber-200 shadow-none hover:bg-amber-200 bg-opacity-50 px-2"
                    }
                    font-[600]  `}
                  >
                    <div
                      className="w-1/4 h-full flex justify-start pl-10 items-center text-[11px]
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
                        <div className="uppercase font-[500] h-full flex items-center">
                          <div className="h-[8px] w-[8px] bg-teal-500 rounded-full mr-2 mb-[2px]"></div>
                          Дууссан
                        </div>
                      ) : exam?.examSummary?.status == "Ongoing" ? (
                        <div className="px-2 py-1 rounded-md shadow bg-white">
                          <span className="!font-[700] text-red-500 text-[9px]">
                            <i className="bi bi-check2-circle mr-1 text-[12px]"></i>
                            Идэвхитэй{" "}
                          </span>
                        </div>
                      ) : (
                        <div className="uppercase font-[500] h-full flex items-center">
                          <div className="h-[8px] w-[8px] bg-yellow-500 rounded-full mr-2 mb-[2px] flex items-center justify-center">
                            {/* <div className="h-[8px] w-[8px] bg-gray-100 rounded-full"></div> */}
                          </div>
                          Эхлээгүй
                        </div>
                      )}
                    </div>
                    <div
                      className="w-1/4 h-full flex justify-center items-center text-[11px]
                         uppercase font-[500] relative"
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
                      className="w-[calc(25%-2.5px)] h-full flex justify-between items-center text-[11px] cursor-pointer
                         uppercase font-[500] custom-btn btn-5 rounded-none "
                    >
                      <div className="w-full flex justify-center items-center font-[500] ">
                        <span className="!font-[700]">
                          {exam?.examSummary?.taken}/{exam?.examSummary?.total}
                        </span>
                      </div>
                      <div className="h-full min-w-[50px] border-l flex justify-center items-center">
                        {/* <i className="bi bi-check2-circle text-[20px]"></i> */}
                        <div className=" font-[500] text-[12px] w-[20px] flex justify-center">
                          {exam?.examSummary?.avgScore}%
                        </div>
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
                      <div className="w-full h-full flex justify-center gap-4 items-center">
                        <div className="font-[500] text-[12px] ">
                          {exam?.examSummary?.taken}/{exam?.examSummary?.total}
                        </div>
                      </div>
                      <div className="h-full min-w-[50px] border-l flex justify-center items-center">
                        {/* <i className="bi bi-file-earmark-bar-graph text-[16px]"></i>
                         */}
                        <div className=" font-[500] text-[12px] w-[20px] flex justify-center">
                          {exam?.examSummary?.avgScore}%
                        </div>
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
                  <div
                    onClick={() => {
                      handleSmallMenu(exam.id);
                    }}
                    className="absolute right-[calc(22%)] top-[12px] bg-gray-200 rounded-full px-2 py-1"
                  >
                    <i className="bi bi-three-dots-vertical text-md text-gray-600"></i>
                  </div>
                  {smallMenuid === exam.id && (
                    <div
                      onBlur={() => {
                        setSmallMenuid(0);
                      }}
                      id={"clickbox"}
                      className="absolute right-[calc(22%-120px)] shrink z-10 w-[120px] border top-[12px] border bg-gray-100 rounded"
                    >
                      {/* <i className="bi bi-three-dots-vertical text-md text-gray-600"></i> */}
                      <div
                        onClick={() => {
                          setCopyModal(true);
                        }}
                        className="h-[30px] w-full !p-0 !m-0 bg-white hover:!bg-gray-200 flex items-center text-gray-500 text-[13px] px-3 font-[500] border-t rounded-t"
                      >
                        <i className="bi bi-clipboard2-check mr-2"></i>
                        Copy
                      </div>
                      <div className="h-[30px] w-full !p-0 !m-0 bg-white hover:!bg-gray-200 flex items-center text-gray-500 text-[13px] px-3 font-[500] border-t"></div>
                      <div
                        onClick={() => {
                          setSmallMenuid(0);
                        }}
                        className="h-[30px] w-full !p-0 !m-0 bg-white hover:!bg-gray-200 flex items-center text-gray-500 text-[13px] px-3 font-[500] border-t rounded-b"
                      >
                        <i className="bi bi-x-circle mr-2"></i>Xаах
                      </div>
                    </div>
                  )}
                </div>
              ));
            } else {
              return (
                <div key={certainIndex} className="w-full my-2">
                  <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded text-[12px] w-[100px]">
                    <span className="font-[500]">
                      {" "}
                      <i className="bi bi-arrow-down-short"></i>
                    </span>
                    <span className="font-[500]">
                      {certainItem.replace(/0/g, "")}-р сар{" "}
                    </span>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default ExamBoard;
