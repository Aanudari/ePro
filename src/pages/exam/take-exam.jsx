import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import TakeExamCell from "../../components/sub-components/TakeExamCell";
import axios from "axios";

function TakeExam() {
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
      <div className="h-screen px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5 flex flex-col gap-2">
          {
            data ? data.map((item, index) => (
              <TakeExamCell key={index} data={item} />
            )) : <div>Идэвхитэй шалгалт байхгүй байна.</div>
          }
        </div>
      </div>
    </div>
  );
}

export default TakeExam;
