import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
function ErrorThanks() {
  const { TOKEN, deviceId } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const [currentTab, setCurrentTab] = useState("1");
  const [complainInfo, setComplainInfo] = useState();
  const [complain, setComplain] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const [showDelete, setShowDelete] = useState(null);
  const showModalDelete = () => setShowDelete(true);
  const hideModalDelete = () => setShowDelete(null);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `http://192.168.10.248:9000/v1/Complain/complainInfo`,
    })
      .then((res) => {
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
      url: `http://192.168.10.248:9000/v1/Complain`,
    })
      .then((res) => {
        setComplain(res.data.complains);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };
  const handleCreate = () => {
    navigate("/create-error-thanks", {
      state: { type: selectedOption },
    });
  };
  console.log(complainInfo);
  console.log(complain);

  return (
    <div className="w-full h-screen bg-gray-50">
      <div>
        <Modal
          show={showCreate}
          onHide={hideModalCreate}
          size="ml"
          //   backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Бүртгэл нэмэх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-2">
              <div className="px-5 pb-5">
                <Select
                  classname="text-black text-sm-center"
                  options={complainInfo}
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  className="outline-none"
                  classNamePrefix="!outline-none !hover:bg-red-100"
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.category}
                  getOptionValue={(option) => option.id}
                />
                <p></p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">
                    Бүртгэл үүсгэх төрлөө сонгоно уу. ✍
                  </span>
                  <button
                    onClick={handleCreate}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showDelete}
          onHide={hideModalDelete}
          size="ml"
          //   backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Бүртгэл устгах</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-2">
              <div className="px-5 pb-5">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Бүртгэл устгах уу?</span>
                  <button className="text-white bg-rose-700 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <Navigation />
      {/* <div className="container">
        <div className="tabs">
          {complainInfo
            ? complainInfo.map((tab, i) => (
                <button
                  key={i}
                  id={tab.id}
                  disabled={currentTab === `${tab.id}`}
                  onClick={handleTabClick}
                >
                  {tab.category}
                </button>
              ))
            : null}
        </div>
        <div className="content">
          {complainInfo
            ? complainInfo.map((tab, i) => (
                <div key={i}>
                  {currentTab === `${tab.id}` && (
                    <div>
                      <p className="title">{tab.id}</p>
                      <p>{tab.category}</p>
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>
      </div> */}
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Алдаа талархал
            </p>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-black py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-black"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Хайлт"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-black focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              {complainInfo
                ? complainInfo?.map((tab, i) => (
                    <button
                      key={i}
                      id={tab.id}
                      disabled={currentTab === `${tab.id}`}
                      onClick={handleTabClick}
                      className=" rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800 pr-2"
                    >
                      <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                        <p>{tab.category}</p>
                      </div>
                    </button>
                  ))
                : null}
            </div>

            <button
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-2 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded 
               text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={showModalCreate}
            >
              <i className="bi bi-plus text-bold" />
              Бүртгэл нэмэх
            </button>
          </div>
          <div className="mt-7 overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                  <th className="p-3">Огноо </th>
                  <th className="p-3 text-left">Харьяалагдах хэлтэс </th>
                  <th className="p-3 text-left">Ажлын байр </th>
                  <th className="p-3 text-left">Ажилтны нэр </th>
                  <th className="p-3 text-left">Гомдлын төрөл </th>
                  <th className="p-3 text-left">Гомдлын дэлгэрэнгүй </th>
                  <th className="p-3 text-left">Журам </th>
                  <th className="p-3 text-left">Алдаа </th>
                  <th className="p-3 text-left">Action </th>
                </tr>
              </thead>

              <tbody>
                <tr className="focus:outline-none h-16 border border-gray-100 rounded">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <a
                      href="#"
                      className="text-yellow-400 hover:text-black mx-2"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </a>
                    <a
                      onClick={showModalDelete}
                      className="text-rose-400 hover:text-black ml-2"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l">
                  Өмнөх
                </button>
                <button className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r">
                  Дараах
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorThanks;
