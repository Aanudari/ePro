import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";
import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCellAdmin from "../Cell/QuestionCellAdmin";

function ShowExamResult({ setShow, result, id, score }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [data, setData] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setData(res.data.result);
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
  // console.log(result);
  return (
    <div
      className={`${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
      } 
    top-[56px] fixed  h-[calc(100%-56px)] 
    bg-black bg-opacity-50 flex items-center justify-center`}
    >
      <div className="bg-gray-200 appear-smooth w-full h-[calc(100%)] relative ">
        <div className="w-full h-12 bg-teal-500 flex justify-between px-4 items-center shadow">
          <div className="flex items-center">
            <div className=" flex justify-start px-4 py-2">
              <span className="text-white font-[500] text-sm">
                {data && data.lastName[0]}. {data && data.firstName} /{" "}
                {data && data.roleName}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className=" flex justify-start px-4 py-2">
              <span className="text-white font-[500] text-sm">
                Оноо : {score}%
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
        <div className="px-4 h-[calc(100%)] overflow-scroll pb-20">
          {result?.map((item, index) => (
            <QuestionCellAdmin key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowExamResult;
