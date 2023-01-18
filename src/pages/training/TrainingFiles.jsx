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
  const [files, setFiles] = useState();
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
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
        if (res.data.isSuccess == true) {
          setFiles(res.data.fileNames);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
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
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          hideModalDelete();
          const timer = setTimeout(() => navigate(0), 500);
          return () => clearTimeout(timer);
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
        console.log(res.data);
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => navigate(0), 500);
          return () => clearTimeout(timer);
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
            <Modal.Title>Файл устгах</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Устгах уу?
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
            <p className="focus:outline-none text-base sm:text-sm md:text-md lg:text-md font-bold leading-normal text-gray-800">
              Сургалтын файлууд
            </p>
          </div>
        </div>

        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center"></div>
            <button
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded 
               text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={showModalCreate}
            >
              <i className="bi bi-plus text-bold" />
              Файл нэмэх
            </button>
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
                {files
                  ? files.map((data, i) => (
                      <tr key={i}>
                        <td className="px-1 py-1 border">{i + 1}</td>
                        <td className="px-1 py-1 border">{data.fileName}</td>
                        <td className="px-1 py-1 border">{data.createdAt}</td>
                        <td className="px-1 py-1 border">
                          <a
                            className="text-blue-600 hover:text-black mx-2 text-lg"
                            data-id={data.filePath}
                            onClick={() =>
                              window.open(`http://${data.filePath}`)
                            }
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
                  : null}
              </tbody>
            </table>

            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TrainingFiles;
