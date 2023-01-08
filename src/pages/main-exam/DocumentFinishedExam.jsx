import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DocumentFinishedExam({ setShowDocument, id }) {
  const { activeMenu, TOKEN } = useStateContext();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamReport/oddQuestion?examId=${id}`,
    })
      .then((res) => {
        setData(res.data);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data?.mostDiffQuestion);
  let rate = 100 - parseInt(data?.mostDiffQuestion.successRate);
  let totalTry = data?.mostDiffQuestion.totalTry;
  console.log(
    typeof JSON.stringify(
      Math.round(
        (parseInt(data?.mostEzQuestion.answerDtl[0].answeredNumber) /
          parseInt(data?.mostEzQuestion.totalTry)) *
          100
      )
    ).trim()
  );
  // console.log(data?.mostDiffQuestion.answerDtl[0].answeredNumber);
  // console.log(data?.mostDiffQuestion.answerDtl[1].answeredNumber);
  // console.log(data?.mostDiffQuestion.answerDtl[2].answeredNumber);
  return (
    <div
      className={`fixed ${
        activeMenu ? "w-[calc(100%-250px)] left-[250px]" : "w-full left-0"
      }  
         !bg-black top-[56px] h-[calc(100%-56px)] !bg-opacity-50  flex justify-end`}
    >
      <div className="from-left bg-gray-100 w-[450px] h-[calc(100%)] flex flex-col justify-between shadow">
        <div className="h-full">
          <h6 className="text-teal-600 text-[14px] flex justify-between mx-3 py-3">
            <span className="font-[500]">
              <i className="bi bi-caret-down-square-fill mr-2"></i>
              Шалгалтын мэдээлэл
            </span>
            <i
              onClick={() => {
                setShowDocument(false);
              }}
              className="bi bi-x-circle cursor-pointer"
            ></i>
          </h6>
          <div className="h-[calc(100%-70px)] overflow-scroll pb-2">
            <div className=" w-full px-3">
              <h6>Хамгийн олон алдсан асуулт: </h6>
              <div>
                <div className="bg-emerald-500 px-3 py-2 w-full text-white text-[13px] font-[400] flex justify-between">
                  {data?.mostDiffQuestion.questionName}
                  <span className="font-[500]">{JSON.stringify(rate)}%</span>
                </div>
                <div>
                  {data?.mostDiffQuestion.answerDtl.map((element, index) => (
                    <div
                      key={index}
                      className="text-[13px] font-[400] py-1 px-3 flex justify-between"
                    >
                      {element.answerName}
                      <div className="bg-gray-200 !w-[200px]">
                        <div
                          className={`w-[calc(${JSON.stringify(
                            Math.round(
                              (parseInt(element.answeredNumber) /
                                parseInt(data?.mostDiffQuestion.totalTry)) *
                                100
                            )
                          ).trim()}%)] 
                          !max-w-[calc(${JSON.stringify(
                            Math.round(
                              (parseInt(element.answeredNumber) /
                                parseInt(data?.mostDiffQuestion.totalTry)) *
                                100
                            )
                          ).trim()}%)] 
                          bg-gray-400 h-full`}
                        ></div>
                      </div>
                      {/* {element.isTrue == "1" && (
                        <i className="bi bi-check-circle text-green-500 text-md"></i>
                      )} */}
                    </div>
                  ))}
                </div>
              </div>
              <h6 className="mt-2">Хамгийн олон зөв хариулсан асуулт: </h6>
              <div>
                <div className="bg-emerald-500 px-3 py-2 w-full text-white text-[13px] font-[400] flex justify-between mt-2">
                  {data?.mostEzQuestion.questionName}
                  <span className="font-[500]">
                    {data?.mostEzQuestion.successRate}%
                  </span>
                </div>
                <div>
                  {data?.mostEzQuestion.answerDtl.map((element, index) => (
                    <div
                      key={index}
                      className="text-[13px] font-[400] py-1 px-3 flex justify-between"
                    >
                      {element.answerName}
                      <div className="bg-gray-200 w-[200px]">
                        <div
                          className={`!w-[calc(${JSON.stringify(
                            Math.round(
                              (parseInt(element.answeredNumber) /
                                parseInt(data?.mostEzQuestion.totalTry)) *
                                100
                            )
                          ).trim()}%)] 
                          bg-gray-400 h-full`}
                        ></div>
                      </div>
                      {/* {element.isTrue == "1" && (
                        <i className="bi bi-check-circle text-green-500 text-md"></i>
                      )} */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentFinishedExam;
