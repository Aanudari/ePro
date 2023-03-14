import UserLayout from "../../components/UserLayout";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import Pagination from "../../service/Pagination";
function UserErrorThanks() {
  const { TOKEN, deviceId } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [complainInfo, setComplainInfo] = useState([]);
  const [complain, setComplain] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [filteredData, setFilteredData] = useState([]);
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

        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(filteredData.length / recordsPerPage);
  useEffect(() => {
    var filteredData = complain.filter((item) => item.complain === activeTab);
    setFilteredData(filteredData);
  }, [filteredData]);
  return (
    <UserLayout>
      <div className="max-w-screen-xl ml-auto mr-auto">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
          <div className="mt-4">
            <ul className="flex flex-wrap -mb-px">
              {complainInfo.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="mr-2"
                >
                  <p
                    className={
                      activeTab === `${item.id}`
                        ? "inline-block p-2 font-bold text-purple-600 border-b-2 border-purple-600 rounded-t-lg active "
                        : "inline-block p-2 font-bold border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
                    }
                  >
                    {item.category}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="overflow-x-auto p-2">
          <div className="mt-4 bg-gray-100 flex items-center justify-center bg-gray-100 font-sans">
            <table className="text-sm min-w-full break-words shadow-sm">
              <thead className="uppercase text-sm leading-normal">
                {activeTab === "1" ? (
                  <tr className="bg-gray-600  text-xs text-left text-white border-b">
                    <th className="px-2 py-2 font-bold">Он</th>
                    <th className="px-2 py-2 font-bold">Улирал </th>
                    <th className="px-2 py-2 font-bold">Огноо </th>

                    <th className="px-2 py-2 font-bold">Гомдлын төрөл</th>
                    <th className="px-2 py-2 font-bold">Холбогдох дугаар </th>
                    <th className="px-2 py-2 font-bold">Гомдлын дэлгэрэнгүй</th>
                    <th className="px-2 py-2 font-bold">Шийдвэрлэсэн эсэх</th>
                    <th className="px-2 py-2 font-bold">Шийдвэрлэсэн хариу</th>
                    <th className="px-2 py-2 font-bold">Алдаа </th>
                  </tr>
                ) : activeTab === "2" ? (
                  <tr className="bg-gray-600  text-xs text-left text-white border-b">
                    <th className="px-2 py-2 font-bold">Он</th>
                    <th className="px-2 py-2 font-bold">Улирал </th>
                    <th className="px-2 py-2 font-bold">Огноо </th>

                    <th className="px-2 py-2 font-bold">Гомдлын төрөл</th>
                    <th className="px-2 py-2 font-bold">Холбогдох дугаар </th>
                    <th className="px-2 py-2 font-bold">Гомдлын дэлгэрэнгүй</th>
                    <th className="px-2 py-2 font-bold">Шийдвэрлэсэн эсэх</th>
                    <th className="px-2 py-2 font-bold">Алдаа </th>
                  </tr>
                ) : (
                  <tr className="bg-gray-600  text-xs text-left text-white border-b">
                    <th className="px-2 py-2 font-bold">Он </th>
                    <th className="px-2 py-2 font-bold">Улирал </th>
                    <th className="px-2 py-2 font-bold">Огноо </th>

                    <th className="px-2 py-2 font-bold">Төрөл</th>
                    <th className="px-2 py-2 font-bold">Дэлгэрэнгүй </th>
                    <th className="px-2 py-2 font-bold">Бүртгэгдсэн суваг</th>
                    <th className="px-2 py-2 font-bold">Тоогоор </th>
                  </tr>
                )}
              </thead>
              <tbody className="bg-white text-sm">
                {currentRecords.map(
                  (item) =>
                    activeTab === `${item.complain}` &&
                    (item.complain === "1" ? (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 hover:bg-gray-200"
                      >
                        <td className="px-1 py-1 border">
                          {new Date(item.createdAt).getFullYear()}
                        </td>
                        <td className="px-1 py-1 border">
                          {new Date(item.createdAt).getMonth() === 1 ||
                          new Date(item.createdAt).getMonth() === 2 ||
                          new Date(item.createdAt).getMonth() === 3
                            ? "1-р улирал"
                            : new Date(item.createdAt).getMonth() === 4 ||
                              new Date(item.createdAt).getMonth() === 5 ||
                              new Date(item.createdAt).getMonth() === 6
                            ? "2-р улирал"
                            : new Date(item.createdAt).getMonth() === 7 ||
                              new Date(item.createdAt).getMonth() === 8 ||
                              new Date(item.createdAt).getMonth() === 9
                            ? "3-р улирал"
                            : new Date(item.createdAt).getMonth() === 10 ||
                              new Date(item.createdAt).getMonth() === 11 ||
                              new Date(item.createdAt).getMonth() === 12
                            ? "4-р улирал"
                            : ""}
                        </td>
                        <td className="px-1 py-1 border">
                          {new Date(item.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>

                        <td className="px-1 py-1 border">
                          {item.complainType}
                        </td>
                        <td className="px-1 py-1 border">{item.phoneNo}</td>
                        <td className="px-1 py-1 border">{item.description}</td>
                        <td className="px-1 py-1 border ">
                          {item.isSolved === "" ? (
                            <span className="px-2 py-2  text-xs text-yellow-600 ">
                              pending
                            </span>
                          ) : (
                            item.isSolved
                          )}
                        </td>
                        <td className="px-1 py-1 border">
                          {item.solvedDescription === "" ? (
                            <span className="px-2 py-2  text-xs  text-yellow-600 ">
                              pending
                            </span>
                          ) : (
                            item.solvedDescription
                          )}
                        </td>
                        <td className="px-1 py-1 border">{item.too}</td>
                      </tr>
                    ) : item.complain === "2" ? (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="px-1 py-1 border">
                          {new Date(item.createdAt).getFullYear()}
                        </td>
                        <td className="px-1 py-1 border">
                          {new Date(item.createdAt).getMonth() === 1 ||
                          new Date(item.createdAt).getMonth() === 2 ||
                          new Date(item.createdAt).getMonth() === 3
                            ? "1-р улирал"
                            : new Date(item.createdAt).getMonth() === 4 ||
                              new Date(item.createdAt).getMonth() === 5 ||
                              new Date(item.createdAt).getMonth() === 6
                            ? "2-р улирал"
                            : new Date(item.createdAt).getMonth() === 7 ||
                              new Date(item.createdAt).getMonth() === 8 ||
                              new Date(item.createdAt).getMonth() === 9
                            ? "3-р улирал"
                            : new Date(item.createdAt).getMonth() === 10 ||
                              new Date(item.createdAt).getMonth() === 11 ||
                              new Date(item.createdAt).getMonth() === 12
                            ? "4-р улирал"
                            : ""}
                        </td>
                        <td className="px-1 py-1 border">
                          {new Date(item.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>

                        <td className="px-1 py-1 border">
                          {item.complainType}
                        </td>
                        <td className="px-1 py-1 border">{item.phoneNo}</td>
                        <td className="px-1 py-1 border">{item.description}</td>
                        <td className="px-1 py-1 border ">
                          {item.isSolved === "" ? (
                            <span className="px-2 py-2  text-xs text-yellow-600 ">
                              pending
                            </span>
                          ) : (
                            item.isSolved
                          )}
                        </td>

                        <td className="px-1 py-1 border">{item.too}</td>
                      </tr>
                    ) : (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="px-1 py-1 border">
                          {new Date(item.createdAt).getFullYear()}
                        </td>
                        <td className="px-1 py-1 border">
                          {new Date(item.createdAt).getMonth() === 1 ||
                          new Date(item.createdAt).getMonth() === 2 ||
                          new Date(item.createdAt).getMonth() === 3
                            ? "1-р улирал"
                            : new Date(item.createdAt).getMonth() === 4 ||
                              new Date(item.createdAt).getMonth() === 5 ||
                              new Date(item.createdAt).getMonth() === 6
                            ? "2-р улирал"
                            : new Date(item.createdAt).getMonth() === 7 ||
                              new Date(item.createdAt).getMonth() === 8 ||
                              new Date(item.createdAt).getMonth() === 9
                            ? "3-р улирал"
                            : new Date(item.createdAt).getMonth() === 10 ||
                              new Date(item.createdAt).getMonth() === 11 ||
                              new Date(item.createdAt).getMonth() === 12
                            ? "4-р улирал"
                            : ""}
                        </td>
                        <td className="px-1 py-1 border">
                          {new Date(item.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>

                        <td className="px-1 py-1 border">
                          {item.complainType}
                        </td>
                        <td className="px-1 py-1 border">{item.description}</td>
                        <td className="px-1 py-1 border">{item.rule}</td>
                        <td className="px-1 py-1 border">{item.too}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </UserLayout>
  );
}

export default UserErrorThanks;
