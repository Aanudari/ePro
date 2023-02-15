import UserLayout from "../../components/UserLayout";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
function UserErrorThanks() {
  const location = useLocation();
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();
  const [complainInfo, setComplainInfo] = useState([]);
  const [complain, setComplain] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Complain/complainInfo`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setComplainInfo(res.data.complainInfos);
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
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Complain/device?deviceId=${deviceId}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setComplain(res.data.complains);
        }
        if (res.data.isSuccess == false) {
          //   const timer = setTimeout(() => navigate(0), 2000);
          //   return () => clearTimeout(timer);
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

  let nokori = [];
  const gotYa = (value) => {
    nokori.push(value);
  };
  complainInfo?.map((exam) => {
    if (exam.id == "0") {
      return gotYa(exam.id);
    }
  });
  const [detector, setDetector] = useState(0);
  const indexed = complainInfo;
  let tempo = [complain];
  for (let index = 0; index < indexed?.length; index++) {
    const element = indexed[index];
    let temp = [];
    for (let i = 0; i < complain?.length; i++) {
      const el = complain[i];
      if (el.complain == element.id) {
        temp.push(el);
      }
    }
    tempo.push(temp);
  }
  console.log(indexed);
  return (
    <UserLayout>
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
                Бодит гомдол
              </a>
              <a
                onClick={() => {
                  setDetector(2);
                }}
                className={`${detector == 2 && "active"}`}
              >
                Бодит бус гомдол
              </a>
              <a
                onClick={() => {
                  setDetector(3);
                }}
                className={`${detector == 3 && "active"}`}
              >
                Талархал
              </a>
            </div>
          </div>
          <div className="content-main">
            {complain.length === 0 ? (
              <div
                className={
                  showed
                    ? "hidden"
                    : "mt-2 flex items-center px-4 mb-2 text-gray-800 border-2 border-blue-500 rounded-md jusitfy-between"
                }
              >
                <div className="flex items-center w-full ">
                  Танд бүртгэл үүсээгүй байна.
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
                  Танд дараах бүртгэл бүртгэгдсэн байна.
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
              <div className="inline-block min-w-full overflow-hidden border border-t-2 border:bg-blue-400">
                <table className="min-w-full leading-normal">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-bold">Огноо </th>
                      <th className="px-4 py-3 font-bold">
                        Харьяалагдах хэлтэс{" "}
                      </th>
                      <th className="px-4 py-3 font-bold">Ажлын байр </th>
                      <th className="px-4 py-3 font-bold">Ажилтны нэр </th>
                      {detector === 3 ? (
                        <th className="px-4 py-3 font-bold">Төрөл </th>
                      ) : (
                        <th className="px-4 py-3 font-bold">Гомдлын төрөл </th>
                      )}
                      {detector === 3 ? (
                        <th className="px-4 py-3 font-bold">Дэлгэрэнгүй </th>
                      ) : (
                        <th className="px-4 py-3 font-bold">
                          Гомдлын дэлгэрэнгүй{" "}
                        </th>
                      )}
                      {detector === 3 ? (
                        <th className="px-4 py-3 font-bold">
                          Бүртгэгдсэн суваг{" "}
                        </th>
                      ) : (
                        <th className="px-4 py-3 font-bold">Журам </th>
                      )}
                      {detector === 3 ? (
                        <th className="px-4 py-3 font-bold">Тоогоор</th>
                      ) : (
                        <th className="px-4 py-3 font-bold">Алдаа </th>
                      )}
                    </tr>
                  </thead>
                  {tempo[detector]?.map((data, i) => (
                    <tbody>
                      <td className="px-1 py-1 border">{data.createdAt}</td>
                      <td className="px-1 py-1 border">
                        {data.departmentName}
                      </td>
                      <td className="px-1 py-1 border">{data.unitName}</td>
                      <td className="px-1 py-1 border">{data.firstName}</td>
                      <td className="px-1 py-1 border">{data.complainType}</td>
                      <td className="px-1 py-1 border">{data.description}</td>
                      <td className="px-1 py-1 border">{data.rule}</td>
                      <td className="px-1 py-1 border">{data.too}</td>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </UserLayout>
  );
}

export default UserErrorThanks;
