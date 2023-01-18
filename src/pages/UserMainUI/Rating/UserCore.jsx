import UserLayout from "../../../components/UserLayout";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Rating/${deviceId}`,
      data: {
        startDate: "",
        endDate: "",
      },
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setRating(res.data.ratings);
      })
      .catch((err) => console.log(err));
  }, []);
  // const [nokori, setNokori] = useState([]);
  let nokori = [];
  const gotYa = (value) => {
    nokori.push(value);
  };
  data?.map((exam) => {
    if (exam.isExamTaken.status == "O") {
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
      if (el.isExamTaken.status == element) {
        temp.push(el);
      }
    }
    tempo.push(temp);
  }
  return (
    <UserLayout>
      <div className="w-full">
        {/* <UserNav />
      <div className="h-[60px]"></div> */}
        <main className="main">
          <div className="responsive-wrapper">
            <div className="main-header">
              <h1>Үнэлгээ</h1>
              <div className="search">
                <input type="text" placeholder="Search" />
                <button type="submit">
                  <i className="ph-magnifying-glass-bold"></i>
                </button>
              </div>
            </div>
            <div className="horizontal-tabs">
              <a className="cursor-pointer">Нийт</a>
              <a className="cursor-pointer">Мессеж</a>
              <a className="cursor-pointer">Password</a>
              <a className="cursor-pointer">API</a>
            </div>
            <div className="flex gap-[5px]">
              {rating?.map((element, index) => {
                return <RatingCellDes data={element} key={index} />;
              })}
            </div>
            <div className="content">
              <div className="content-panel">
                <div className="vertical-tabs">
                  <a
                    onClick={() => {
                      setDetector(0);
                    }}
                    href="#"
                    className={`${detector == 0 && "active"}`}
                  >
                    Бүгд
                  </a>
                  <a
                    onClick={() => {
                      setDetector(1);
                    }}
                    href="#"
                    className={`${detector == 1 && "active"}`}
                  >
                    Идэвхитэй
                  </a>
                  <a
                    onClick={() => {
                      setDetector(2);
                    }}
                    href="#"
                    className={`${detector == 2 && "active"}`}
                  >
                    Дууссан
                  </a>
                  <a
                    onClick={() => {
                      setDetector(3);
                    }}
                    className={`${detector == 3 && "active"}`}
                    href="#"
                  >
                    Бүртгэлгүй
                  </a>
                  <a
                    onClick={() => {
                      setDetector(4);
                    }}
                    className={`${detector == 4 && "active"}`}
                    href="#"
                  >
                    In process
                  </a>
                </div>
              </div>
              <div className="content-main">
                <div className="card-grid">
                  {tempo[detector]?.map((item, index) => (
                    <article key={index} className="card">
                      <div className="card-header">
                        <div className="overflow-hidden w-[250px] h-[40px] flex justify-start">
                          <span>
                            <img src="https://feweek.co.uk/wp-content/uploads/2020/12/exams-covid-summer-plans-feat-1000x525.jpg" />
                          </span>
                          <h3 className="text-[11px] uppercase">{item.name}</h3>
                        </div>
                        <span>{item.id}</span>
                        {/* <label className="toggle">
                        <input type="checkbox" defaultChecked />
                        <span></span>
                      </label> */}
                      </div>
                      <div className="card-body">
                        <p className="flex flex-col m-0">
                          <span className="font-[400]">
                            <i className="bi bi-circle-half mr-2"></i>
                            {item.startDate}
                          </span>
                          <span className="font-[400]">
                            <i className="bi bi-circle-fill mr-2"></i>
                            {item.expireDate}
                          </span>
                        </p>
                      </div>
                      <div className="card-footer">
                        {item.isExamTaken.status == "A" ? (
                          <a
                            className="cursor-pointer"
                            onClick={() => {
                              setReadyCheck(!readyCheck);
                              setExamID(item.id);
                              setExamName(item.name);
                              sessionStorage.setItem("exam_id", item.id);
                            }}
                          >
                            Шалгалт өгөх
                          </a>
                        ) : item.isExamTaken.status == "C" ? (
                          <div className="font-[500] text-[13.5px]">
                            <i className="bi bi-graph-up-arrow text mr-2"></i>:
                            <span
                              className={`font-[500] text-[14px] ml-2 ${
                                item.isExamTaken.score > 80
                                  ? "!text-green-600"
                                  : item.isExamTaken.score < 80 &&
                                    item.isExamTaken.score > 50
                                  ? "!text-orange-500"
                                  : "!text-red-500"
                              } `}
                            >
                              {item.isExamTaken.score}%
                            </span>
                          </div>
                        ) : item.isExamTaken.status == "O" ? (
                          <span className="font-[500] text-[14px]">
                            No score recorded!
                          </span>
                        ) : item.isExamTaken.status == "P" ? (
                          <a
                            className="cursor-pointer"
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
                  ))}
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
                    Та энэ шалгалтыг өгөх дөө итгэлтэй байна уу. ?
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
