import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import { logout } from "../../../service/examService";
import axios from "axios";
import ShowExamResult from "./ShowExamResult";
import ShowExamResultDetail from "../ShowExamResultDetail";
function Document({ setShowReport, id }) {
  const [data, setData] = useState();
  const [users, setUsers] = useState();
  const [names, setNames] = useState();
  const { TOKEN } = useStateContext();
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamReport/average?examId=${id}`,
    })
      .then((res) => {
        setData(res.data);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/GetDevicesByExamId?_examId=${id}`,
    })
      .then((res) => {
        setUsers(res.data.devices);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [id, trigger]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User`,
    })
      .then((res) => {
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
  const [showDetail, setShowDetail] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [userID, setUserID] = useState();
  const handleDeleteExamResult = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamReport/examRemove/${id}/${userID}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        } else {
          setTrigger(!trigger);
          setConfirm(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={`fixed ${
        activeMenu
          ? "w-[calc(100%-250px)] left-[250px] z-20"
          : "w-full left-0 z-20"
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
        {showDetail && <ShowExamResultDetail setShow={setShowDetail} id={id} />}
        <div className="h-full">
          <h6 className="text-teal-600 text-[14px] flex justify-between mx-3 py-3">
            <span className="font-[500]">
              <i className="bi bi-caret-down-square-fill mr-2"></i>
              Шалгалтын статус
            </span>
            <span
              onClick={() => {
                setShowDetail(true);
              }}
              className="font-[500] cursor-pointer hover:mt-[-2px] transition-all hover:text-teal-700"
            >
              <i className="bi bi-info-square  mr-2"></i>
              Ерөнхий
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
                  <div key={index} className="flex">
                    <div
                      onClick={
                        user.status == "C"
                          ? () => {
                              handleResultCertain(user);
                            }
                          : null
                      }
                      className={`py-2 px-3 w-full ${
                        user.status == "C"
                          ? "bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-all shadow-emerald-500"
                          : user.status == "P"
                          ? "bg-teal-700"
                          : "bg-teal-500"
                      } border-b mb-1 shadow-sm hover:border-b hover:shadow-lg hover:border-teal-400
                    flex justify-between items-center`}
                    >
                      <div className="flex flex-col h-full justify-between  ">
                        <span className="text-[13px] font-[400] m-0">
                          {user.deviceName}
                        </span>
                        <span className="text-white rounded-full text-[12px] py-1 mr-1 font-[400] m-0">
                          {user.unitName}
                        </span>
                      </div>

                      {user.status == "Not started" ? (
                        <span className="flex items-center justify-center bg-red-400 text-white px-3 rounded-full text-[13px] h-7  font-[400]">
                          Шалгалт өгөөгүй
                        </span>
                      ) : user.status == "C" ? (
                        <div className="flex">
                          <span className="flex items-center justify-center bg-white text-black px-3 rounded-full text-[13px] h-7  font-[400]">
                            {user.score}%
                          </span>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center bg-amber-600 text-white px-3 rounded-full text-[13px] h-7  font-[400]">
                          Шалгалт эхлүүлсэн ...
                        </span>
                      )}
                    </div>
                    {user.status == "C" && (
                      <div
                        onClick={() => {
                          setUserID(user.deviceId);
                          setConfirm(true);
                        }}
                        className="bg-rose-500 transition-all hover:bg-rose-600 cursor-pointer border-l mb-1 w-[50px] flex items-center justify-center border-b"
                      >
                        <i className="bi bi-eraser-fill text-xl text-white mr-2"></i>
                      </div>
                    )}
                    {confirm && (
                      <div
                        className="bg-gray-200 rounded-t absolute h-full w-full top-0 left-0 flex items-center
                        justify-center !shadow-none "
                      >
                        <div
                          className="w-[500px] h-[200px] bg-white rounded flex flex-col
                        justify-between p-4 shadow"
                        >
                          <div className="w-full flex justify-center">
                            <i className="bi bi-exclamation-circle text-3xl text-rose-500"></i>
                          </div>
                          <span className="font-[400] text-center">
                            Та тухайн хэрэглэгчийн шалгалтын мэдээллийг
                            устгахдаа итгэлтэй байна уу ?
                          </span>
                          <div className="flex justify-end">
                            <button
                              onClick={() => {
                                handleDeleteExamResult();
                              }}
                              className="px-3 py-2 border-[2px] rounded mt-2 mb-1 font-[500] text-[14px] text-rose-600 hover:bg-rose-500
          hover:text-white hover:!border-rose-500 transition-all border-rose-500"
                            >
                              Устгах
                            </button>
                            <button
                              onClick={() => {
                                setConfirm(false);
                              }}
                              className="px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded mt-2 mb-1 font-[500] text-[13px] text-gray-600 transition-all ml-2"
                            >
                              Цуцлах
                            </button>
                          </div>
                        </div>
                      </div>
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
