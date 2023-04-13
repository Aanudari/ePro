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
                            <div className="overflow-hidden w-[250px] h-[40px] flex justify-start">
                              <span>
                                <img src="https://feweek.co.uk/wp-content/uploads/2020/12/exams-covid-summer-plans-feat-1000x525.jpg" />
                              </span>
                              <h3 className="text-[12px] font-[600] uppercase">
                                {item.name}
                              </h3>
                            </div>
                          </div>
                          {item.isExamTaken.status === "A" ? (
                            <div className="w-full h-6 px-3 bg-[#F7F7F7] flex items-end font-[500] justify-end text-[13px] text-gray-500">
                              {/* {item.expireDate} */}
                              <span className="text-[13px] text-gray-500 font-[500] mr-1">
                                Дуусах:
                              </span>
                              {timeDiffDays > 0 && timeDiffDays + "хоног"}
                              <span className="text-[13px] text-gray-500 font-[500] ml-1">
                                {timeDiffHours}цаг
                              </span>
                            </div>
                          ) : (
                            <div className="w-full h-6 px-3 bg-[#F7F7F7] flex items-end font-[500] justify-end text-[13px] text-gray-500">
                              {item.expireDate}
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
