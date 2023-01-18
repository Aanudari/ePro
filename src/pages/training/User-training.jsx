import UserLayout from "../../components/UserLayout";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import { Modal } from "react-bootstrap";
function UserTraining() {
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();
  const [userTrain, setUserTrain] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Training`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          // alert(res.data.resultMessage);
        }
        if (res.data.isSuccess == true) {
          setUserTrain(res.data.trainingList);
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
  const [showed, setShowed] = useState(false);
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " цаг, " : " цаг, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " минут, " : " минут, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " секунд" : " секунд") : "";
    return hDisplay + mDisplay + sDisplay;
  }
  const [showReady, setShowReady] = useState(null);
  const hideModalReady = () => setShowReady(null);
  const [chosedTrain, setChosedTrain] = useState();
  const showModalReady = (data) => {
    setShowReady(true);
    setChosedTrain(data);
  };
  const navigatePlayer = () => {
    navigate("/player", {
      state: { data: chosedTrain },
    });
  };

  let nokori = [];
  const gotYa = (value) => {
    nokori.push(value);
  };
  userTrain?.map((exam) => {
    if (exam.sessionType == "0") {
      return gotYa(exam.sessionType);
    }
  });
  const [detector, setDetector] = useState(0);
  const indexed = [
    { id: "1", value: "Тэнхим" },
    { id: "2", value: "Онлайн" },
  ];
  let tempo = [userTrain];
  for (let index = 0; index < indexed?.length; index++) {
    const element = indexed[index];
    let temp = [];
    for (let i = 0; i < userTrain?.length; i++) {
      const el = userTrain[i];
      if (el.sessionType == element.id) {
        temp.push(el);
      }
    }
    tempo.push(temp);
  }
  return (
    <UserLayout>
      <div>
        <Modal
          show={showReady}
          onHide={hideModalReady}
          size="ml"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалт үзэх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                Та сургалтыг эхлүүлэх гэж байна.
              </h3>
              <button
                type="button"
                onClick={navigatePlayer}
                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Тийм
              </button>
              <button
                onClick={hideModalReady}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
              >
                Үгүй
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="max-w-screen-xl ml-auto mr-auto">
        <div className="content">
          <div className="content-panel">
            <div className="vertical-tabs">
              <a
                onClick={() => {
                  setDetector(0);
                }}
                className={`${detector == 0 && "active"}`}
              >
                Бүгд
              </a>
              <a
                onClick={() => {
                  setDetector(1);
                }}
                className={`${detector == 1 && "active"}`}
              >
                Тэнхим
              </a>
              <a
                onClick={() => {
                  setDetector(2);
                }}
                className={`${detector == 2 && "active"}`}
              >
                Онлайн
              </a>
            </div>
          </div>
          <div className="content-main">
            {userTrain.length === 0 ? (
              <div
                className={
                  showed
                    ? "hidden"
                    : "mt-2 flex items-center px-4 mb-2 text-gray-800 border-2 border-blue-500 rounded-md jusitfy-between"
                }
              >
                <div className="flex items-center w-full ">
                  Танд сургалт хувиарлагдаагүй байна.
                </div>
                <button
                  onClick={(e) => setShowed(true)}
                  type="button"
                  className="flex flex-shrink-0 p-2 -mr-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:-mr-2"
                >
                  <span className="sr-only">X</span>
                  <i className="bi bi-x" />
                </button>
              </div>
            ) : (
              <div
                className={
                  showed
                    ? "hidden"
                    : "mt-2 flex items-center px-4 mb-2 text-gray-800  border-2 border-blue-500  rounded-md jusitfy-between"
                }
              >
                <div className="flex items-center w-full">
                  Танд дараах сургалтууд хувиарлагдсан байна.
                </div>
                <button
                  onClick={(e) => setShowed(true)}
                  type="button"
                  className="flex flex-shrink-0 p-2 -mr-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:-mr-2"
                >
                  <span className="sr-only">X</span>
                  <i className="bi bi-x" />
                </button>
              </div>
            )}
            <div className="flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tempo[detector]?.map((data, i) => (
                  <div key={i} className="mx-auto w-full">
                    <div className="w-full mt-4 p-4 border border-2 block bg-white shadow-md hover:shadow-2xl rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between mb-4 space-x-12">
                        <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 bg-green-200 rounded-md">
                          ИДЭВХТЭЙ
                        </span>

                        {data.startedWatch === null ? (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-400 border-2 border-rose-500 rounded-md bg-white rounded-md">
                            ҮЗЭЭГҮЙ
                          </span>
                        ) : (
                          <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-400 border-2 border-green-500 rounded-md bg-white rounded-md">
                            ҮЗСЭН
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex flex-col">
                            <span className="font-bold text-black text-md dark:text-white">
                              {data.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-white">
                              {data.description}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center">
                          <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                            Багш:
                          </span>
                          <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md">
                            {data.teacher}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center">
                          <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                            Үргэлжлэх хугацаа:
                          </span>
                          <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                            {secondsToHms(data.duration)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center">
                          <span className="flex items-center px-2 py-1 text-sm font-semibold text-black ">
                            Байршил:
                          </span>
                          <span className="flex items-center px-2 py-1 text-sm font-semibold text-black bg-yellow-100 rounded-md ">
                            {data.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            showModalReady(data);
                          }}
                          className="py-2 text-sm bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-400 text-center  font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          Сургалт үзэх
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </UserLayout>
  );
}

export default UserTraining;
