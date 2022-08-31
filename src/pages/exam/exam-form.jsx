import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import ExamCell from "../../components/sub-components/examCell";

function ExamForm() {
  const [newExam, setnewExam] = useState(false);
  const [showForm, setshowForm] = useState(false);
  const [examName, setExamName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault()
    setshowForm(true)
  }


  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />
      <div className="h-full px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5 ">
          {
            !newExam ?
              <div onClick={() => {
                setnewExam(true)
              }} className="bg-green-400 w-1/3 h-20 flex items-center justify-center rounded-lg text-white cursor-pointer hover:shadow font-medium">Шалгалтын форм үүсгэх
              </div> : null
          }
          {
            newExam ? <div className="w-full mt-2">
              {
                showForm ? <span>Шалгалтын нэр: {examName}</span> : <span>Шалгалтын нэр оруулна уу...</span>
              }
              {showForm == false ?
                <form onSubmit={handleSubmit} action="" className="bg-green-300 mt-2">
                  <input onChange={(e) => {
                    setExamName(e.target.value)
                  }} type="text" className="text-[14px] bg-white" autoFocus />
                </form> : null
              }
              {showForm ?
                <div className="h-full rounded mt-2 p-2 w-full">
                  <div className="mb-2 flex gap-10">
                    <span>Формд оруулсан асуултын тоо: 1/10</span>
                    <div className="flex gap-1">
                      <span className="">Нийт асуултууд: </span>
                      <div className="border hover:bg-gray-100 px-1 flex items-center justify-center rounded-lg cursor-pointer">Асуулт 1</div>
                      <div className="border hover:bg-gray-100 px-1 flex items-center justify-center rounded-lg cursor-pointer">Асуулт 2</div>
                      <div className="border hover:bg-gray-100 px-1 flex items-center justify-center rounded-lg cursor-pointer">Асуулт 3</div>
                      <div className="border hover:bg-gray-100 px-1 flex items-center justify-center rounded-lg cursor-pointer">Асуулт 4</div>
                      <div className="border hover:bg-gray-100 px-1 flex items-center justify-center rounded-lg cursor-pointer">Асуулт 5</div>
                    </div>
                  </div>
                  <div className="h-10 mb-2 flex gap-2">
                    <button className="border px-2 flex items-center hover:bg-green-300">Асуулт нэмэх</button>
                    <button className="border px-2 flex items-center hover:bg-red-300">Асуулт устгах</button>
                  </div>
                  <ExamCell />
                </div> : null
              }
            </div> : null
          }
        </div>
      </div>
    </div >
  );
}

export default ExamForm;
