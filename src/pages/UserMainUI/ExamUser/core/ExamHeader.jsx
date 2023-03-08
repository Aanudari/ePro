import MyTimer from "../../../../components/Timer";
import { useEffect, useState } from "react";
function ExamHeader({
  finisher,
  minute,
  second,
  creater,
  examName,
  data,
  length,
}) {
  let time = new Date();
  time.setMinutes(
    time.getMinutes() + parseInt(minute),
    time.getSeconds() + parseInt(second)
  );
  const [show, setShow] = useState(false);
  const check = parseInt(minute);
  let uniqueArr = [...new Set(data)];
  const [reminder, setReminder] = useState(false);
  return (
    <div className="h-[60px] top-0 fixed bottom-0 bg-white shadow-sm w-full flex items-center justify-around px-2 md:px-10 ">
      <div className="flex flex-col justify-center h-[60px] items-start m-0">
        <h6 className="mb-0 text-[10px] md:text-[14px]">{examName}</h6>
        <h6 className="text-[9px] md:text-[13px] m-0 text-gray-500">
          Шалгалт үүсгэсэн: {creater}
        </h6>
      </div>
      <div className="flex h-[60px]">
        {minute != undefined && (
          <nav
            className={`${
              check < 5 ? "!bg-red-500 " : "bg-black"
            } px-3 my-2 w-[100px] mr-2 flex justify-center items-center`}
          >
            {" "}
            <MyTimer
              expiryTimestamp={time}
              finisher={finisher}
              minute={minute}
            />
          </nav>
        )}
        <nav
          onClick={() => {
            uniqueArr.length < length ? setReminder(true) : setShow(true);
          }}
          className="flex items-center cursor-pointer hover:bg-teal-600 bg-teal-500 px-3 my-2 rounded"
        >
          <a className=" !text-white mb-1"> Дуусгах </a>
        </nav>
      </div>

      {show && (
        <div
          className="fixed w-screen h-screen bg-opacity-50 bg-black z-10 top-0 left-0 flex items-center
      justify-center"
        >
          <div
            className="pt-6 px-6 pb-6 bg-white w-5/6 md:w-2/6 flex flex-col items-center
      justify-between text-black rounded shadow"
          >
            <i className="bi bi-info-circle text-teal-500 text-2xl"></i>
            <span className="font-[500] mb-2 text-center">
              Та энэ шалгалтыг дуусгахдаа итгэлтэй байна уу ?
            </span>
            <div className="flex justify-center w-full">
              <button
                onClick={() => {
                  finisher();
                }}
                className="px-4 py-2 border-[2px] !border-teal-600  bg-teal-600 hover:bg-teal-700 active:bg-teal-600 text-white font-[500] mr-2"
              >
                Тийм
              </button>
              <button
                onClick={() => {
                  setShow(false);
                }}
                className="px-4 py-2 text-teal-600 border-[2px] !border-teal-600 font-[500]"
              >
                Үгүй
              </button>
            </div>
          </div>
        </div>
      )}
      {reminder && (
        <div
          className="fixed w-screen h-screen bg-opacity-50 bg-black z-10 top-0 left-0 flex items-center
      justify-center"
        >
          <div
            className="pt-6 px-6 pb-6 bg-white w-5/6 md:w-2/6 flex flex-col items-center
      justify-between text-black rounded shadow"
          >
            <i className="bi bi-info-circle text-teal-500 text-2xl"></i>
            <span className="font-[500] mb-2 text-center">
              Шалгалтын хариултыг бүрэн сонгоно уу.
            </span>
            <span className="font-[500] mb-2 text-center">
              Дутуу: {length - uniqueArr.length}
            </span>
            <div className="flex justify-center w-full">
              <button
                onClick={() => {
                  setReminder(false);
                }}
                className="px-4 py-2 text-teal-600 border-[2px] !border-teal-600 font-[500]"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamHeader;
