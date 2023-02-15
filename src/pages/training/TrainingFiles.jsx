import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { logout } from "../../service/examService";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";

import getWindowDimensions from "../../components/SizeDetector";
const FormData = require("form-data");
function TrainingFiles() {
  const { width } = getWindowDimensions();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [filteredList, setFilteredList] = useState(files);
  const [trigger, setTrigger] = useState(false);
  const [id, setId] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingFile/filelist`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        } else if (res.data.isSuccess == true) {
          setFiles(res.data.fileNames);
        } else if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  const showModalDelete = (e) => {
    setShowDelete(true);
    setId(e.currentTarget.dataset.id);
  };
  const handleDelete = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingFile/${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          hideModalDelete();
          setTrigger(!trigger);
        } else {
          console.log(res.data.resultMessage);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  };
  const [selectedFile, setSelectedFile] = useState(false);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleCreate = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", selectedFile);
    axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingFile/fileadd`,
      data,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          setTrigger(!trigger);
          hideModalCreate();
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
        if (
          res.data.resultMessage === "File мэдээлэл оруулахад алдаа гарлаа."
        ) {
          notification.invalidFileUpload("File бүртгэгдсэн байна.");
        } else {
          console.log(res.data.resultMessage);
        }
      })
      .catch((err) => console.log(err));
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = files.filter((item) => {
      return item.fileName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)]">
      <div>
        <Modal
          show={showCreate}
          onHide={hideModalCreate}
          size="ml"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Файл нэмэх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <div className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                <label className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Файлаа оруулна уу 📁
                </label>
                <input
                  className="block w-full text-sm-100 font-normal text-black dark:text-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  onChange={handleFileSelect}
                />
              </div>

              <button
                type="button"
                onClick={handleCreate}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                ✔️ Yes, I'm sure
              </button>
              <button
                onClick={hideModalCreate}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                ❌ No, cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showDelete}
          onHide={hideModalDelete}
          size="ml"
          backdrop="static"
          style={
            width < 768
              ? {
                  width: "calc(100%)",
                  left: "0",
                }
              : {
                  width: "calc(100% - 250px)",
                  left: "250px",
                }
          }
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <span className="text-xl text-black">Файл устгах</span>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Та файлыг устгахдаа игэлтэй байна уу?
              </h3>
              <button
                type="button"
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Тийм
              </button>
              <button
                onClick={hideModalDelete}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Үгүй
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Navigation />
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-xl lg:text-xl font-bold leading-normal text-gray-800">
              Сургалтын файлууд{" "}
              {filteredList?.length > 0
                ? `(${filteredList?.length})`
                : `(${files.length})`}
            </p>
          </div>
        </div>

        <div className="sm:flex items-center justify-between p-2">
          <div className="flex items-center sm:justify-between sm:gap-4">
            <div className="relative hidden sm:block">
              <input
                value={searchQuery}
                onChange={handleSearch}
                type="text"
                name="search"
                className="w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 flex-1 py-2 px-4 bg-white  text-gray-700 placeholder-gray-400 shadow-sm text-base"
                placeholder="Файлын нэр"
              />

              <button
                type="button"
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              >
                <i className="bi bi-search" />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0 md:justify-end sm:justify-end">
            <button
              onClick={showModalCreate}
              className="bg-blue-600 border border-blue-600 shadow p-2 rounded text-white flex items-center focus:outline-none focus:shadow-outline"
            >
              <span className="mx-2"> Файл нэмэх</span>
              <svg width="24" height="24" viewBox="0 0 16 16">
                <path
                  d="M7 4 L11 8 L7 12"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr className="text-sm text-left  bg-gray-200 border-b">
                <th className="px-4 py-3 font-bold">no </th>
                <th className="px-4 py-3 font-bold">fileName </th>
                <th className="px-4 py-3 font-bold">createdAt </th>
                <th className="px-4 py-3 font-bold">Action </th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {filteredList > 0
                ? filteredList.map((data, i) => (
                    <tr key={i}>
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">{data.fileName}</td>
                      <td className="px-1 py-1 border">{data.createdAt}</td>
                      <td className="px-1 py-1 border">
                        <a
                          className="text-blue-600 hover:text-black mx-2 text-lg"
                          data-id={data.filePath}
                          onClick={() => window.open(`http://${data.filePath}`)}
                        >
                          <i className="bi bi-download"></i>
                        </a>
                        <a
                          data-id={data.id}
                          onClick={showModalDelete}
                          className="text-rose-400 hover:text-black ml-2 text-lg"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </a>
                      </td>
                    </tr>
                  ))
                : files?.map((data, i) => (
                    <tr key={i}>
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">{data.fileName}</td>
                      <td className="px-1 py-1 border">{data.createdAt}</td>
                      <td className="px-1 py-1 border">
                        <a
                          className="text-blue-600 hover:text-black mx-2 text-lg"
                          data-id={data.filePath}
                          onClick={() => window.open(`http://${data.filePath}`)}
                        >
                          <i className="bi bi-download"></i>
                        </a>
                        <a
                          data-id={data.id}
                          onClick={showModalDelete}
                          className="text-rose-400 hover:text-black ml-2 text-lg"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>

          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TrainingFiles;
