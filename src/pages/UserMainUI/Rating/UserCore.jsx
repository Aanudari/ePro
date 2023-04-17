import UserLayout from "../../../components/UserLayout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import RatingCellDes from "../RatingCellDes";
import { logout } from "../../../service/examService";
function UserCore() {
  const [data, setData] = useState();
  const [rating, setRating] = useState();
  const navigate = useNavigate();
  const {
    TOKEN,
    readyCheck,
    setReadyCheck,
    examID,
    examName,
    setExamID,
    setExamName,
    deviceId,
  } = useStateContext();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew`,
    })
      .then((res) => {
        res.data.errorCode === 401 ? logout() : setData(res.data.examList);
      })
      .catch((err) => console.log(err));
  }, []);
  let nokori = [];
  const gotYa = (value) => {
    nokori.push(value);
  };
  data?.map((exam) => {
    if (exam.isExamTaken.status === "O") {
      return gotYa(exam.id);
    }
  });
  const [detector, setDetector] = useState(0);
  let indexed = ["A", "C", "O", "P"];
  let tempo = [data];
  for (let index = 0; index < indexed?.length; index++) {
    const element = indexed[index];
    let temp = [];
    for (let i = 0; i < data?.length; i++) {
      const el = data[i];
      if (el.isExamTaken.status === element) {
        temp.push(el);
      }
    }
    tempo.push(temp);
  }
  // console.log(data);
  return (
    <UserLayout>
      <div className="w-full">
        <main className="main">
          <div className="responsive-wrapper">
            <div className="content">
              <div className="content-panel">
                <div className="vertical-tabs select-none">
                  <a
                    onClick={() => {
                      setDetector(0);
                    }}
                    className={`${detector === 0 && "active"} cursor-pointer`}
                  >
                    Бүгд
                  </a>
                  <a
                    onClick={() => {
                      setDetector(1);
                    }}
                    className={`${detector === 1 && "active"} cursor-pointer`}
                  >
                    Идэвхитэй
                  </a>
                  <a
                    onClick={() => {
                      setDetector(2);
                    }}
                    className={`${detector === 2 && "active"} cursor-pointer`}
                  >
                    Дууссан
                  </a>
                  <a
                    onClick={() => {
                      setDetector(3);
                    }}
                    className={`${detector === 3 && "active"} cursor-pointer`}
                  >
                    Бүртгэлгүй
                  </a>
                  <a
                    onClick={() => {
                      setDetector(4);
                    }}
                    className={`${detector === 4 && "active"} cursor-pointer`}
                  >
                    Эхлүүлсэн
                  </a>
                </div>
              </div>
              <div className="content-main">
                <div className="card-grid">
                  {tempo[detector]?.length > 0 ? (
                    tempo[detector]?.map((item, index) => {
                      const now = new Date();
                      const examExpirationDate = new Date(item.expireDate);
                      const timeDiffMs =
                        examExpirationDate.getTime() - now.getTime();
                      const timeDiffDays = Math.floor(
                        timeDiffMs / (1000 * 60 * 60 * 24)
                      );
                      const timeDiffHours = Math.floor(
                        (timeDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                      );
                      return (
                        <article
                          key={index}
                          className="card !border-none hover:!shadow-lg select-none"
                        >
                          <div className="card-header !border-none">
                            <div className="overflow-hidden w-[250px] h-[60px] flex justify-start">
                              <span className="!h-[100px] !w-[100px]">
                                <img
                                  className="h-full w-full"
                                  src="data:image/jpeg;base64,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"
                                />
                              </span>
                              <h3 className="text-[12px] font-[600] uppercase">
                                {item.name}
                              </h3>
                            </div>
                          </div>
                          {item.isExamTaken.status === "A" ? (
                            <div className="w-full h-6 px-3 bg-[#F7F7F7] flex items-end font-[500] justify-end text-[13px] text-gray-500">
                              Дуусах: {item.expireDate}
                              {/* <span className="text-[13px] text-gray-500 font-[500] mr-1">
                                Дуусах:
                              </span>
                              {timeDiffDays > 0 && timeDiffDays + "хоног"}
                              <span className="text-[13px] text-gray-500 font-[500] ml-1">
                                {timeDiffHours}цаг
                              </span> */}
                            </div>
                          ) : item.isExamTaken.status === "P" ? (
                            <div className="w-full h-6 px-3 bg-[#F7F7F7] flex items-end font-[500] justify-end text-[13px] text-gray-500"></div>
                          ) : item.isExamTaken.status === "O" ? (
                            <div className="w-full h-6 px-3 bg-[#F7F7F7] flex items-end font-[500] justify-end text-[13px] text-gray-500"></div>
                          ) : (
                            <div className="w-full h-6 px-3 bg-[#F7F7F7] flex items-end font-[500] justify-end text-[13px] text-gray-500">
                              Өгсөн: {item?.isExamTaken.endAt}
                            </div>
                          )}

                          <div className="card-footer !m-0 !border-none">
                            {item.isExamTaken.status === "A" ? (
                              <a
                                className="cursor-pointer text-[13px]"
                                onClick={() => {
                                  setReadyCheck(!readyCheck);
                                  setExamID(item.id);
                                  setExamName(item.name);
                                  sessionStorage.setItem("exam_id", item.id);
                                }}
                              >
                                Шалгалт өгөх
                              </a>
                            ) : item.isExamTaken.status === "C" ? (
                              <div className="font-[500] text-[13px] !border-none">
                                <i className="bi bi-graph-up-arrow text mr-2"></i>
                                :
                                <span
                                  className={`font-[500] !border-none text-[13px] ml-2 ${
                                    item.isExamTaken.score > 80
                                      ? "!text-green-600"
                                      : item.isExamTaken.score < 80 &&
                                        item.isExamTaken.score > 50
                                      ? "!text-orange-500"
                                      : "!text-red-500"
                                  } `}
                                >
                                  Шалгалтын дүн: {item.isExamTaken.score}%
                                </span>
                              </div>
                            ) : item.isExamTaken.status === "O" ? (
                              <span className="font-[500] text-[13px]">
                                Шалгалт өгөөгүй!
                              </span>
                            ) : item.isExamTaken.status === "P" ? (
                              <a
                                className="cursor-pointer text-[13px]"
                                onClick={() => {
                                  setExamID(item.id);
                                  setExamName(item.name);
                                  sessionStorage.setItem("exam_id", item.id);
                                  navigate("/exam", { state: examID });
                                }}
                              >
                                Үргэлжлүүлэх !
                              </a>
                            ) : null}
                          </div>
                        </article>
                      );
                    })
                  ) : (
                    <div className="w-[300px] md:!w-[500px] h-full bg-red-100">
                      <img src="notfound.webp" alt="" />{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        {readyCheck && (
          <div className="h-screen flex justify-center items-center w-full top-0 left-0 fixed custom-z bg-black bg-opacity-50">
            <div className="p-3 bg-gray-100 rounded-lg w-3/4 md:w-1/3">
              <div className="bg-white rounded-lg px-2 md:px-10 pt-3">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-gray-600 text-[15px] font-[500]">
                    {examName}
                  </span>
                  <p className="text-gray-600 text-[15px] font-[500] m-0">
                    Та энэ шалгалтыг эхлүүлэхдээ итгэлтэй байна уу. ?
                  </p>
                </div>
                <div className="flex justify-end items-end">
                  <button
                    onClick={() => {
                      navigate("/exam", { state: examID });
                      setReadyCheck(false);
                    }}
                    className="px-3 py-2 border rounded mt-2 mb-1 font-[500] text-[14px] text-gray-600 hover:bg-teal-500
                    hover:text-white hover:!border-teal-500 transition-all"
                  >
                    Тийм
                  </button>
                  <button
                    onClick={() => {
                      setReadyCheck(false);
                    }}
                    id={"intro-bg"}
                    className="px-3 py-2 border hover:bg-teal-500 transition-all
                    hover:text-white hover:!border-teal-500 rounded ml-2 mt-2 mb-1 text-[14px] border-box min-w-[50px]"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}

export default UserCore;
