import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Document({setShowReport, id}) {
  const navigate = useStateContext();
  const [data, setData] = useState();
  const [users, setUsers] = useState();
  const [names, setNames] = useState();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const {TOKEN} = useStateContext();
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
      url: `${process.env.REACT_APP_URL}/v1/ExamNew`,
    })
      .then((res) => {
        setUsers(res.data.examList);
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
    return item.id === id
  })
  // console.log(filtered && filtered[0].devInfos)
  let final = []
  for (let index = 0; index < names?.length; index++) {
    const element = names[index];
    filtered && filtered[0]?.devInfos.filter(item => {
      return item.deviceId == element.deviceId && final.push(element)
    }) 
  }
  const [selected, setSelected] = useState();
  const selectedUser = (value) => {
    setSelected(value)
  }
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
    const {activeMenu} = useStateContext();
    return ( 
        <div className={`fixed ${activeMenu ? 'w-[calc(100%-250px)] left-[250px]' : "w-full left-0"}  
         !bg-black top-[56px] h-[calc(100%-56px)] !bg-opacity-50  flex justify-end`}>
      <div className="from-left bg-white w-[350px] h-full  flex flex-col justify-between shadow">
        <div className="px-3 pt-3">
          <h6 className="text-teal-600 text-[14px] flex justify-between">
            <span className="font-[500]">
              <i className="bi bi-caret-down-square-fill mr-2"></i>
              Шалгалтын дэлгэрэнгүй 
              </span>
            <i onClick={() => {
              setShowReport(false)
            }} className="bi bi-x-circle cursor-pointer"></i>
          </h6>
          <div className=" h-[calc(100%-25px)] overflow-scroll px-4">
            <h6 className="text-sm text-teal-600">Дундаж оноо: {data?.score}%</h6>
            <select onChange={(e) => {
              selectedUser(e.target.value)
            }} name="" id="">
              {
                final && final.map((item, i) => (
                  <option key={i} value={`${item.deviceId}`}>{item.username}</option>
                ))
              }
            </select>
            {
              userScore?.devScores == null ? 
              <span className="text-sm">Тухайн хэрэглэгчийн оноо бүртгэгдээгүй байна.</span> : 
              <span className="text-sm">{userScore?.devScores}</span>
            }
          </div>
        </div>
        <div className="bg-gray-100 border-t shadow-lg h-[56px] flex items-center px-3">
          {/* <div 
        //     onClick={() => {
        //     setShowModal(true)
        //   }} 
          className="h-9 min-w-[170px] hover:bg-teal-600 bg-teal-500 rounded-sm px-3 flex items-center font-[400] text-white
            cursor-pointer active:bg-teal-400">
            <span className="mr-2 mb-1 font-[400] text-white">
              Excel file татах
            </span>
            <div className="pl-2 h-full flex items-center border-l border-gray-300 ">
            <i className="bi bi-file-earmark-spreadsheet"></i>
            </div>
          </div> */}
        </div>
      </div>
    </div>
     );
}

export default Document;