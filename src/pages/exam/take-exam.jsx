import { useState } from "react";
import Navigation from "../../components/Navigation";
import CategoryPool from "./Exam-Pool/CategoryPool";

function TakeExam() {
  const [key, setKey] = useState('0');
  
  return (
    <div className="w-full h-full min-h-screen bg-[#23b499]">
      <Navigation />
      <div className="h-full">
        <div className="bg-gray-700 h-14 flex">
          <div onClick={() => {
            setKey("0")
          }} className={`h-full w-1/6 md:w-[180px] hover:bg-gray-600 flex
          justify-center items-center text-white text-[14px] ${key === "0" && 'border-b shadow pt-[1px]'}`}>
            <span className="font-[500] hidden md:block">
              Асуултын сан
            </span>
            <span className="font-[500] block md:hidden">
            <i className="bi bi-calendar-check"></i>
            </span>
          </div>
          <div onClick={() => {
            setKey("1")
          }} className={`h-full w-1/6 md:w-[180px] hover:bg-gray-600 flex
          justify-center items-center text-white text-[14px] ${key === "1" && 'border-b shadow pt-[1px]'}`}>
            <span className="font-[500] hidden md:block">
              Асуулт үүсгэх
            </span>
            <span className="font-[500] block md:hidden">
            <i className="bi bi-pencil"></i>
            </span>
          </div>
          <div onClick={() => {
            setKey("2")
          }} className={`h-full w-1/6 md:w-[180px] hover:bg-gray-600 flex
          justify-center items-center text-white text-[14px] ${key === "2" && 'border-b shadow pt-[1px]'}`}>
            <span className="font-[500] hidden md:block">
              Цэс нэмэх
            </span>
            <span className="font-[500] block md:hidden">
            <i className="bi bi-alarm"></i>
            </span>
          </div>
        </div>
        <div className="">
            {
              key === "0" && <CategoryPool/>
            }
            {
              key === "1" && <div>2222222222222</div>
            }
          </div>

      </div>
    </div >
  );
}

export default TakeExam;
