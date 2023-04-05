import { useStateContext } from "../../contexts/ContextProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../service/examService";
import QuestionCellAdminMain from "./Cell/QuestionCellAdminMain";
import bg from "../../assets/background-blue.jpg";

function ShowExamResultDetail({ setShow, id }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [data, setData] = useState();
  const [main, setMain] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamReport/questionResult/${id}`,
    })
      .then((res) => {
        setMain(res.data);
        if (res.data.isSuccess === true) {
          // console.log(res.data);
          // console.log(res.data);
          setData(res.data.examQuestions);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(data);
  return (
    <div
      className={`${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
      } 
top-[56px] fixed  h-[calc(100%-56px)] 
bg-black bg-opacity-50 flex items-center justify-center z-20`}
    >
      <div
        style={{ background: `url(${bg})` }}
        className="appear-smooth w-full h-[calc(100%)] relative pb-20"
      >
        <div className="w-full h-12 bg-teal-500 flex justify-between px-4 items-center shadow">
          <div className="flex items-center">
            <div className=" flex justify-start px-4 py-2">
              {/* <span claz */}
            </div>
          </div>
          <div className="flex items-center">
            <div className=" flex justify-start px-4 py-2">
              <span className="text-white font-[500] text-sm">
                Дундаж оноо: {main?.examAvgScore}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className=" flex justify-start px-4 py-2">
              <span className="text-white font-[500] text-sm">
                Шалгалт өгсөн : {main?.examTakenUsers}/{main?.examTotalUsers}
              </span>
            </div>
          </div>
          <div className="">
            <i
              onClick={() => {
                setShow(false);
              }}
              className="bi bi-x-lg text-xl cursor-pointer hover:scale-105"
            ></i>
          </div>
        </div>
        <div className="h-[calc(100%)] overflow-scroll pb-20 w-full flex justify-center">
          <div className="w-[900px]">
            {data?.map((el, index) => (
              <QuestionCellAdminMain data={el} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowExamResultDetail;
