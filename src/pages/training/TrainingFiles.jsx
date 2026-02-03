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
  const [filteredList, setFilteredList] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [id, setId] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
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
        } else if (res.data.isSuccess === true) {
          setFiles(res.data.fileNames);
          setFilteredList(res.data.fileNames);
        } else if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
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
  const deleteSelectedItems = () => {
    for (const id of selectedIds) {
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
            res.data.resultMessage ===
              "Input string was not in a correct format."
          ) {
            logout();
          }
        })
        .catch((err) => console.log(err));
    }
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
  const handleCheckboxChange = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else {
      setSelectedIds([...selectedIds, itemId]);
    }
  };
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedIds(filteredList.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)]">
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
          <span className="text-sm text-black">Бүртгэл устгах</span>
        </Modal.Header>
        <Modal.Body>
          <div className="p-6 text-center">
            <p className="mb-5  font-normal text-gray-500 dark:text-gray-400">
              Та сонгосон {selectedIds?.length} файлыг устгахдаа итгэлтэй байна
              уу?
            </p>
            <button
              type="button"
              onClick={deleteSelectedItems}
              className=" bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Тийм
            </button>

            <button
              onClick={hideModalDelete}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover: dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Үгүй
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Navigation />
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-center text-left">
            <p className="font-bold text-md text-gray-900">
              Сургалтын файлууд
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

          <div className="flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center">
            <button
              onClick={showModalDelete}
              className="mt-2 items-center px-2 py-2 bg-red-600 hover:bg-red-700  text-sm font-medium rounded-md"
            >
              <i className="bi bi-trash mr-1" />
              Устгах
            </button>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table
            id="table"
            className="items-center w-full bg-transparent border-collapse "
          >
            <thead>
              <tr className="text-sm text-left  bg-gray-200 border-b">
                <th className="px-2 py-2 font-bold">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedIds.length === filteredList.length}
                  />
                </th>
                <th className="px-4 py-3 font-bold">№ </th>
                <th className="px-4 py-3 font-bold">Файлын нэр</th>
                <th className="px-4 py-3 font-bold">Үүсгэсэн хугацаа </th>
                <th className="px-4 py-3 font-bold"> </th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {filteredList > 0
                ? filteredList.map((data, i) => (
                    <tr key={i}>
                      <td className="px-1 py-1 border">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          onChange={() => handleCheckboxChange(data.id)}
                          checked={selectedIds.includes(data.id)}
                        />
                      </td>
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">{data.fileName}</td>
                      <td className="px-1 py-1 border">{data.createdAt}</td>
                      <td className="px-1 py-1 border">
                        <a
                          className="text-blue-600 hover:text-black mx-2 text-sm"
                          data-id={data.filePath}
                          onClick={() => window.open(`http://${data.filePath}`)}
                        >
                          <i className="bi bi-download"></i>
                        </a>
                      </td>
                    </tr>
                  ))
                : files?.map((data, i) => (
                    <tr key={i}>
                      <td className="px-1 py-1 border">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          onChange={() => handleCheckboxChange(data.id)}
                          checked={selectedIds.includes(data.id)}
                        />
                      </td>
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">{data.fileName}</td>
                      <td className="px-1 py-1 border">{data.createdAt}</td>
                      <td className="px-1 py-1 border">
                        <a
                          className="text-blue-600 hover:text-black mx-2 text-sm"
                          data-id={data.filePath}
                          onClick={() => window.open(`http://${data.filePath}`)}
                        >
                          <i className="bi bi-download"></i>
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
