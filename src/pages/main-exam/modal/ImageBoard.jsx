import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";

function ImageBoard({ imgStatus, setImgStatus }) {
  const { TOKEN, activeMenu } = useStateContext();
  const [data, setData] = useState();
  const [fileId, setFileId] = useState(false);
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
        if (res.data.errorCode === 401) {
          logout();
        } else {
          setData(res.data.examFileLists);
        }
      })
      .catch((err) => console.log(err));
  }, [fileId]);

  const deleteFile = (id) => {
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamFile/${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setFileId(!fileId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={`absolute top-[56px] shadow bg core-bg-g h-[calc(100%-68px)] mb-2 h-full flex justify-between px-3 
        py-3 gap-2 drop-down ${
          activeMenu ? "w-[calc(100%-10px)]" : "w-full left-0"
        } `}
    >
      <div className="flex gap-2 ">
        {data?.map((img, index) => (
          <div key={index} className="relative parent w-[300px] h-[200px] ">
            <img
              className="border border-black w-[300px] h-[200px] "
              src={`http://${img.filePath}`}
            />
            <div
              onClick={() => {
                deleteFile(img.fileId);
              }}
              className="child absolute bottom-[10px] right-[20px] border rounded-full px-2 py-1
                            border-[#000]
                            "
            >
              <i className="bi bi-trash3-fill text-red-500 cursor-pointer"></i>
            </div>
          </div>
        ))}
      </div>
      <div className="min-w-[50px] max-w-[50px] ml-2">
        <button
          onClick={() => {
            setImgStatus(false);
          }}
          className="p-2 hover:scale-110 transition"
        >
          <i className="bi bi-x-lg text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default ImageBoard;
