import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import axios from "axios";
import TakeExamCellAdmin from "../../components/sub-components/TakeExamCellAdmin";
import { useStateContext } from "../../contexts/ContextProvider";
import CreateExamForm from "./ExamForm/CreateExamForm";

function ExamForm() {
  const [data, setData] = useState();
  const { TOKEN } = useStateContext();
  const [key, setKey] = useState('0');
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${TOKEN}`
      },
      url: "http://192.168.10.248:9000/v1/Exam",
    })
      .then(
        res => {
          setData(res.data.examList)
        }
      )
      .catch(err => console.log(err))
  }, [])
  console.log(data)
  return (
    <div className="w-full h-screen bg-[#23b499]">
      <Navigation />
      <div className="h-full">
        <div className="bg-gray-700 h-14 flex">
          <div onClick={() => {
            setKey("0")
          }} className="h-full w-1/6 md:w-[180px] hover:bg-gray-600 flex justify-center items-center text-white text-[14px]">
            <a>
              Идэвхитэй шалгалт
            </a>
          </div>
          <div onClick={() => {
            setKey("1")
          }} className="h-full w-1/6 md:w-[180px] hover:bg-gray-600 flex justify-center items-center text-white text-[14px]">
            <a>
              Шалгалт үүсгэх
            </a>
          </div>
          <div onClick={() => {
            setKey("2")
          }} className="h-full w-1/6 md:w-[180px] hover:bg-gray-600 flex justify-center items-center text-white text-[14px]">
            <a>
              Идэвхитэй шалгалт
            </a>
          </div>
          
        </div>
        <div className="p-2">
            {
              key === "1" && <CreateExamForm/>
            }
          </div>

      </div>
    </div >
  );
}

export default ExamForm;
