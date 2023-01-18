import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import { logout } from "../../../service/examService";
import axios from "axios";
import ShowExamResult from "./ShowExamResult";
function Document({ setShowReport, id }) {
  const [data, setData] = useState();
  const [users, setUsers] = useState();
  const [names, setNames] = useState();
  const { TOKEN } = useStateContext();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamReport/average?examId=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setData(res.data);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/GetDevicesByExamId?_examId=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setUsers(res.data.devices);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setNames(res.data.result);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [id]);
  const [userScore, setUserScore] = useState();
  let filtered = users?.filter((item, index) => {
    return item.id === id;
  });
  let final = [];
  const [selected, setSelected] = useState();
  const selectedUser = (value) => {
    setSelected(value);
  };
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamReport/device/score`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setUserScore(res.data);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [selected]);
  const [finalScore, setfinalScore] = useState();
  const { activeMenu } = useStateContext();
  const [result, setResult] = useState();
  const [uId, setUId] = useState();
  const handleResultCertain = (user) => {
    setUId(user.deviceId);
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamReport/examResult/${id}/${user.deviceId}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setfinalScore(res.data.score);
          setResult(res.data.examQuestions);
          setShow(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(false);
  return (
    <div
      className={`fixed ${
        activeMenu ? "w-[calc(100%-250px)] left-[250px]" : "w-full left-0"
      }  
         !bg-black top-[56px] h-[calc(100%-56px)] !bg-opacity-50  flex justify-end`}
    >
      <div className="from-left bg-white w-[450px] h-[calc(100%)] flex flex-col justify-between shadow">
        {show && (
          <ShowExamResult
            setShow={setShow}
            result={result}
            id={uId}
            score={finalScore}
          />
        )}
        <div className="h-full">
          <h6 className="text-teal-600 text-[14px] flex justify-between mx-3 py-3">
            <span className="font-[500]">
              <i className="bi bi-caret-down-square-fill mr-2"></i>
              Шалгалтын статус
            </span>
            <i
              onClick={() => {
                setShowReport(false);
              }}
              className="bi bi-x-circle cursor-pointer"
            ></i>
          </h6>
          <div className="h-[calc(100%-70px)] overflow-scroll pb-2">
            <div className=" w-full px-3">
              {users &&
                users.map((user, index) => (
                  <div
                    onClick={
                      user.status == "C"
                        ? () => {
                            handleResultCertain(user);
                          }
                        : null
                    }
                    className={`py-2 px-3 ${
                      user.status == "C"
                        ? "bg-green-500 cursor-pointer"
                        : user.status == "P"
                        ? "bg-teal-700"
                        : "bg-teal-500"
                    } border-b mb-1 shadow-sm hover:border-b hover:shadow-lg hover:border-teal-400
                    flex justify-between items-center`}
                    key={index}
                  >
                    <div className="flex flex-col">
                      <span className="text-[13px] font-[400]">
                        {user.deviceName}
                      </span>
                      <span className="text-white rounded-full text-[12px] py-1 mr-1 font-[400]">
                        {user.unitName}
                      </span>
                    </div>
                    {user.status == "Not started" ? (
                      <span className="flex items-center justify-center bg-red-400 text-white px-3 rounded-full text-[13px] h-7  font-[400]">
                        Шалгалт өгөөгүй
                      </span>
                    ) : user.status == "C" ? (
                      <span className="flex items-center justify-center bg-white text-black px-3 rounded-full text-[13px] h-7  font-[400]">
                        {user.score}%
                      </span>
                    ) : (
                      <span className="flex items-center justify-center bg-amber-600 text-white px-3 rounded-full text-[13px] h-7  font-[400]">
                        Шалгалт эхлүүлсэн ...
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Document;
