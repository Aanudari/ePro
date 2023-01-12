import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DocumentFinishedExam({ setShowDocument, id, exams }) {
  const { activeMenu, TOKEN } = useStateContext();
  let filtered = exams.filter((item) => {
    return item.id == id;
  });
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
  let rate = 100 - parseInt(data?.mostDiffQuestion?.successRate);
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
              <h6 className="text-sm">Хамгийн олон алдсан асуулт: </h6>
              <div>
                <div className="bg-emerald-500 px-3 py-2 w-full text-white text-[13px] font-[400] flex justify-between">
                  {data?.mostDiffQuestion?.questionName}
                  <span className="font-[500]">{JSON.stringify(rate)}%</span>
                </div>
                <div>
                  {data?.mostDiffQuestion?.answerDtl.map((element, index) => (
                    <div
                      key={index}
                      className="text-[13px] font-[400] py-1 px-3 flex justify-between"
                    >
                      <span>
                        {element.isTrue == "1" ? (
                          <i className="bi bi-check-circle mr-2 text-green-500"></i>
                        ) : (
                          <i className="bi bi-x-circle mr-2 text-red-500"></i>
                        )}
                        {element.answerName}
                      </span>

                      <div className="w-[230px] flex justify-between">
                        <span>
                          {Math.round(
                            (parseInt(element.answeredNumber) /
                              parseInt(data?.mostDiffQuestion.totalTry)) *
                              100
                          )}
                          %
                        </span>
                        <div className="bg-gray-200 !w-[200px]">
                          <div
                            style={{
                              width: `${Math.round(
                                (parseInt(element.answeredNumber) /
                                  parseInt(data?.mostDiffQuestion.totalTry)) *
                                  100
                              )}%`,
                            }}
                            className={` 
                          bg-gray-400 h-full`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <h6 className="mt-2 text-sm">
                Хамгийн олон зөв хариулсан асуулт:{" "}
              </h6>
              <div>
                <div className="bg-emerald-500 px-3 py-2 w-full text-white text-[13px] font-[400] flex justify-between mt-2">
                  {data?.mostEzQuestion?.questionName}
                  <span className="font-[500]">
                    {data?.mostEzQuestion?.successRate}%
                  </span>
                </div>
                <div>
                  {data?.mostEzQuestion?.answerDtl.map((element, index) => (
                    <div
                      key={index}
                      className="text-[13px] font-[400] py-1 px-3 flex justify-between"
                    >
                      <span>
                        {element.isTrue == "1" ? (
                          <i className="bi bi-check-circle mr-2 text-green-500"></i>
                        ) : (
                          <i className="bi bi-x-circle mr-2 text-red-500"></i>
                        )}
                        {element.answerName}
                      </span>
                      <div className="w-[230px] flex justify-between">
                        <span>
                          {Math.round(
                            (parseInt(element.answeredNumber) /
                              parseInt(data?.mostEzQuestion.totalTry)) *
                              100
                          )}
                          %
                        </span>
                        <div className="bg-gray-200 !w-[200px]">
                          <div
                            style={{
                              width: `${Math.round(
                                (parseInt(element.answeredNumber) /
                                  parseInt(data?.mostEzQuestion.totalTry)) *
                                  100
                              )}%`,
                            }}
                            className={` 
                          bg-gray-400 h-full`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex border mt-2">
                <div className="w-1/3 border-r text-center text-sm py-1 bg-teal-500 text-white font-[400]">
                  Статус
                </div>
                <div className="w-1/3 border-r text-center text-sm py-1 bg-teal-500 text-white font-[400]">
                  Нийт
                </div>
                <div className="w-1/3 text-center text-sm py-1 bg-teal-500 text-white font-[400]">
                  Өгсөн
                </div>
              </div>
              <div className="w-full flex border">
                <div className="w-1/3 border-r text-center text-[13px] py-1">
                  {filtered[0].examSummary.status}
                </div>
                <div className="w-1/3 border-r text-center text-[13px] py-1">
                  {filtered[0].examSummary.total}
                </div>
                <div className="w-1/3 text-center text-[13px] py-1">
                  {filtered[0].examSummary.taken}
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
