import UserLayout from "../../layout/UserLayout";
import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
function UserThanks() {
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();

  const location = useLocation();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const [currentTab, setCurrentTab] = useState(`${location.state.type}`);
  const [complainInfo, setComplainInfo] = useState();
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
        // setComplainInfo(
        //   res.data.complainInfos.sort((a, b) => (a.qty < b.qty ? 1 : -1))
        // );
        setComplainInfo(res.data.complainInfos);
        if (res.data.resultMessage === "Unauthorized") {
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
        setComplain(res.data.complains);

        if (res.data.isSuccess == false) {
          alert(`${res.data.resultMessage}`);
          //   const timer = setTimeout(() => navigate(0), 2000);
          //   return () => clearTimeout(timer);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);

  let color = "blue";
  console.log(deviceId);
  const handleTabClick = (e) => {
    if (e.target.id == 2 || e.target.id == 1) {
      navigate("/user-error-thanks", {
        state: { type: e.target.id },
      });
    }
  };
  return (
    <UserLayout>
      <ToastContainer />
      <div className="flex min-h-screen h-full">
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Алдаа талархал
              </p>
            </div>
          </div>

          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="sm:flex items-center justify-between">
              <div className="flex items-center">
                <ul
                  className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                  role="tablist"
                >
                  {complainInfo
                    ? complainInfo.map((tab, i) => (
                        <li
                          key={i}
                          className="-mb-px mr-2 last:mr-2 mt-2 flex-auto text-center"
                        >
                          <a
                            className={
                              "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                              (currentTab === `${tab.id}`
                                ? "text-white bg-" + color + "-600"
                                : "text-" + color + "-600 bg-white")
                            }
                            key={i}
                            id={tab.id}
                            disabled={currentTab === `${tab.id}`}
                            onClick={handleTabClick}
                          >
                            {tab.category}
                          </a>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse ">
                <thead>
                  <tr className="text-sm text-left  bg-gray-200 border-b">
                    <th className="px-4 py-3 font-bold">Огноо </th>
                    <th className="px-4 py-3 font-bold">
                      Харьяалагдах хэлтэс{" "}
                    </th>
                    <th className="px-4 py-3 font-bold">Ажлын байр </th>
                    <th className="px-4 py-3 font-bold">Ажилтны нэр </th>
                    <th className="px-4 py-3 font-bold">Төрөл </th>
                    <th className="px-4 py-3 font-bold">Дэлгэрэнгүй </th>
                    <th className="px-4 py-3 font-bold">Бүртгэгдсэн суваг </th>
                    <th className="px-4 py-3 font-bold">Тоогоор </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-sm">
                  {complain
                    ? complain.map((tab, i) => (
                        <tr
                          key={i}
                          className={
                            currentTab === `${tab.complain}`
                              ? "focus:outline-none h-16 border border-gray-100 rounded"
                              : "hidden"
                          }
                        >
                          <td className="px-1 py-1 border">{tab.createdAt}</td>
                          <td className="px-1 py-1 border">
                            {tab.departmentName}
                          </td>
                          <td className="px-1 py-1 border">{tab.unitName}</td>
                          <td className="px-1 py-1 border">{tab.firstName}</td>
                          <td className="px-1 py-1 border">
                            {tab.complainType}
                          </td>
                          <td className="px-1 py-1 border">
                            {tab.description}
                          </td>
                          <td className="px-1 py-1 border">{tab.rule}</td>
                          <td className="px-1 py-1 border">{tab.too}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>

              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"></div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default UserThanks;
