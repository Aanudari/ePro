import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import { logout } from "../../../service/examService";
import axios from "axios";
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
  const { activeMenu } = useStateContext();
  return (
    <div
      className={`fixed ${
        activeMenu ? "w-[calc(100%-250px)] left-[250px]" : "w-full left-0"
      }  
         !bg-black top-[56px] h-[calc(100%-56px)] !bg-opacity-50  flex justify-end`}
    >
      <div className="from-left bg-white w-[450px] h-[calc(100%)] flex flex-col justify-between shadow">
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
                    className={`py-2 px-3 ${
                      user.status == "C"
                        ? "bg-green-500"
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
                        Not scored
                      </span>
                    ) : user.status == "C" ? (
                      <span className="flex items-center justify-center bg-white text-black px-3 rounded-full text-[13px] h-7  font-[400]">
                        {user.score}%
                      </span>
                    ) : (
                      <span className="flex items-center justify-center bg-amber-600 text-white px-3 rounded-full text-[13px] h-7  font-[400]">
                        In process ...
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
