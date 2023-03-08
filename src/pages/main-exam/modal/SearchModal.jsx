import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";

function SearhModal({
  showSearch,
  setShowSearch,
  exams,
  setExamModal,
  handleExamModal,
  setShowReport,
}) {
  const { activeMenu } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = exams.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div
      className={`fixed ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[25px] left-0"
      } 
      bg-black bg-opacity-50 flex justify-center items-center z-20
      `}
    >
      <div className="shrink w-[calc(90%)] h-[calc(75%)] bg-white flex flex-col rounded-lg">
        <div className="w-full min-h-[50px] bg-teal-700 flex justify-end items-center px-3 rounded-t-md">
          {/* <i className="bi bi-search text-2xl text-white"></i> */}
          <button
            onClick={() => {
              setShowSearch(false);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        <div className="h-full w-full rounded-b-lg p-3">
          <div className="h-[100px] w-full flex items-end justify-center ">
            <form action="">
              <div className="group">
                <input
                  // onChange={(e) => {
                  //   setName(e.target.value);
                  // }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={
                    "custom-validation !w-full !border-b-[2px] !border-[#50a3a2] font-[400]"
                  }
                  type="text"
                  required
                />

                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="">
                  <i className="bi bi-search"></i> Шалгалтын нэр ...
                </label>
              </div>
            </form>
          </div>
          <div className="h-[calc(65%)] w-full bg-gray-50 border rounded shadow-inner overflow-scroll p-2">
            {filteredData.map((exam, index) => (
              <div key={index} className="h-14 w-full flex  mt-[2px]">
                <div
                  onClick={
                    exam?.examSummary?.status !== "Ongoing"
                      ? () => {
                          setExamModal(true);
                          handleExamModal(exam.id, exam.examSummary.status);
                          setShowSearch(false);
                        }
                      : () => {
                          // setShowReport(true);
                          setExamModal(true);
                          handleExamModal(exam.id, exam.examSummary.status);
                          setShowSearch(false);
                        }
                  }
                  className={`w-full h-14 flex gap-1 ${
                    exam?.examSummary?.status == "Exam over"
                      ? "custom-btn btn-11 bg-gray-100 shadow-none hover:bg-gray-200 bg-opacity-50 "
                      : exam?.examSummary?.status == "Ongoing"
                      ? "cellt "
                      : "custom-btn btn-11 bg-amber-200 shadow-none hover:bg-amber-200 bg-opacity-50 px-2"
                  }
                  font-[600] cursor-pointer `}
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
                      setShowSearch(false);
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
                      <i className="bi bi-check2-circle text-[20px]"></i>
                    </div>
                  </div>
                ) : exam?.examSummary?.status == "Exam over" ? (
                  <div
                    onClick={() => {
                      setShowReport(true);
                      handleExamModal(exam.id);
                      setShowSearch(false);
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
                      setShowSearch(false);
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
      </div>
    </div>
  );
}

export default SearhModal;
