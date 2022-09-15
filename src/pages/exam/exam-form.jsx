import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import axios from "axios";
import TakeExamCellAdmin from "../../components/sub-components/TakeExamCellAdmin";
import ExamCell from "../../components/sub-components/examCell";
import { useNavigate } from "react-router-dom";

function ExamForm() {
  const [data, setData] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://192.168.10.248:9000/api/Exam",
    })
      .then(
        res => {
          setData(res.data.result)
        }
      )
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="w-full h-screen bg-gray-50">
      <Navigation />
      <div className="h-full px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5 flex flex-col gap-2">
          {
            data ? data.map((item, index) => (
              <TakeExamCellAdmin key={index} data={item} />
            )) : <div>Идэвхитэй шалгалт байхгүй байна.</div>
          }
        </div>
      </div>
    </div >
  );
}

export default ExamForm;
