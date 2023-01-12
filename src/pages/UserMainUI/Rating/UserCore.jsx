import UserLayout from "../../../components/UserLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import RatingCellDes from "../RatingCellDes";
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
        setData(res.data.examList);
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
        setRating(res.data.ratings);
      })
      .catch((err) => console.log(err));
  }, []);
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
                  <a href="#" className="active">
                    Бүгд
                  </a>
                  <a href="#">Идэвхитэй</a>
                  <a href="#">Дууссан</a>
                  <a href="#">Бүртгэлгүй</a>
                  <a href="#">In process</a>
                </div>
              </div>
              <div className="content-main">
                <div className="card-grid">
                  {data?.map((item, index) => (
                    <article key={index} className="card">
                      <div className="card-header">
                        <div className="overflow-hidden w-[250px] h-[40px] flex justify-start">
                          <span>
                            <img src="https://feweek.co.uk/wp-content/uploads/2020/12/exams-covid-summer-plans-feat-1000x525.jpg" />
                          </span>
                          <h3 className="text-[11px] uppercase">{item.name}</h3>
                        </div>
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
                              navigate("/exam-init", { state: examID });
                              setExamID(item.id);
                              setExamName(item.name);
                              sessionStorage.setItem("exam_id", item.id);
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
          <div className="h-screen flex justify-center items-center w-full top-0 left-0 fixed z-10 bg-black bg-opacity-50">
            <div className="p-3 body-bg-cus2 rounded-lg w-3/4 md:w-1/3">
              <div className="body-bg-cus rounded-lg px-2 md:px-10 py-4">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-white text-[18px] font-[500]">
                    {examName}
                  </span>
                  <p className="text-white text-[18px] font-[500] m-0">
                    Та энэ шалгалтыг өгөх дөө итгэлтэй байна уу. ?
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      navigate("/exam-init", { state: examID });
                      setReadyCheck(false);
                    }}
                    className="intro-button"
                  >
                    Тийм
                  </button>
                  <button
                    onClick={() => {
                      setReadyCheck(false);
                    }}
                    id={"intro-bg"}
                    className="intro-button ml-2"
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
