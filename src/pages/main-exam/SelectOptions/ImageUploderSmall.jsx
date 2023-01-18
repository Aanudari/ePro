import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";

export default function ImageUploaderSmall({ question }) {
  const { TOKEN } = useStateContext();
  const [data, setData] = useState();
  // console.log(question.qimgUrl);
  const [images, setImages] = React.useState([question.qimgUrl]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamFile`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setData(res.data.examFileLists);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  let str =
    "192.168.10.248:9000/files/ExamFiles/310837741_5650402448345638_7025071623941900526_n.jpg";
  console.log(question.qimgUrl.length);
  // console.log(question.question);
  // console.log(question.qimgUrl);
  return (
    <div className="border-b-[2px] border-[#50a3a2]">
      <img
        src={`http://192.168.10.248:9000/files/ExamFiles/310837741_5650402448345638_7025071623941900526_n.jpg`}
        alt="test"
      />
    </div>
  );
}
