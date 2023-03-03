import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
import Pagination from "../../service/Pagination";
function ErrorThanks() {
  const { width } = getWindowDimensions();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [complainInfo, setComplainInfo] = useState();
  const [complain, setComplain] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const [showDelete, setShowDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [id, setId] = useState();
  const showModalDelete = (e) => {
    setShowDelete(true);
    setId(e.currentTarget.dataset.id);
  };
  const hideModalDelete = () => setShowDelete(null);
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
        if (res.data.isSuccess == true) {
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
  }, [trigger]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Complain`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess == true) {
          setComplain(res.data.complains);
          setFilteredList(res.data.complains);
          setLoading(false);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);

  const handleCreate = () => {
    if (selectedOption === null) {
      notification.error(`Сонголт хоосон байна!`);
    } else {
      navigate("/create-error-thanks", {
        state: { type: selectedOption },
      });
    }
  };
  const handleDelete = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/Complain/delete?id=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          setTrigger(!trigger);
          hideModalDelete();
        } else {
          console.log(res.data.resultMessage);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (tab) => {
    navigate("/edit-error-thanks", {
      state: { data: tab },
    });
  };
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = complain.filter((item) => {
      return item.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
    setLoading(false);
    // setCurrentTab(value);
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const filterByCategory = (filteredData) => {
    if (!selectedCategory) {
      return filteredData;
    }
    const filteredComplains = filteredData.filter(
      (tr) => tr.complain === selectedCategory
    );
    return filteredComplains;
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  useEffect(() => {
    var filteredData = filterByCategory(complain);
    setFilteredList(filteredData);
    setLoading(false);
  }, [selectedCategory]);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(filteredList.length / recordsPerPage);
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <div>
        <Modal
          show={showCreate}
          onHide={hideModalCreate}
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
                    type="button"
                    onClick={handleCreate}
                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center ml-4"
                  >
                    Next
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
            <span className="text-xl text-black">Бүртгэл устгах</span>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Та бүртгэлийг устгахдаа итгэлтэй байна уу?
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
              Алдаа талархал
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
                placeholder="Ажилтны нэр"
              />

              <button
                type="button"
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              >
                <i className="bi bi-search" />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Бүгд</option>
              {complainInfo?.map((el, i) => (
                <option key={i} value={`${el.id}`}>
                  {el.category}
                </option>
              ))}
            </select>
            <button
              onClick={showModalCreate}
              className="bg-blue-700 border border-blue-700 shadow p-2 rounded text-white flex items-center focus:outline-none focus:shadow-outline"
            >
              <span className="mx-2">Бүртгэл нэмэх</span>
              <svg width="24" height="24" viewBox="0 0 16 16">
                <path
                  d="M7 4 L11 8 L7 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full px-4 mx-auto mt-2">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-1">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
              <div className="mt-4">
                <div className="sm:flex items-center justify-between"></div>
                <div className="mt-3 overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse ">
                    <thead>
                      <tr className="text-sm text-left  bg-gray-200 border-b">
                        <th className="px-4 py-3 font-bold">№ </th>
                        <th className="px-4 py-3 font-bold">Огноо </th>
                        <th className="px-4 py-3 font-bold">
                          Харьяалагдах хэлтэс{" "}
                        </th>
                        <th className="px-4 py-3 font-bold">Ажлын байр </th>
                        <th className="px-4 py-3 font-bold">Ажилтны нэр </th>
                        {selectedCategory === "3" ? (
                          <th className="px-4 py-3 font-bold">Төрөл </th>
                        ) : (
                          <th className="px-4 py-3 font-bold">
                            Гомдлын төрөл{" "}
                          </th>
                        )}
                        {selectedCategory === "3" ? (
                          <th className="px-4 py-3 font-bold">Дэлгэрэнгүй </th>
                        ) : (
                          <th className="px-4 py-3 font-bold">
                            Гомдлын дэлгэрэнгүй{" "}
                          </th>
                        )}
                        {selectedCategory === "3" ? (
                          <th className="px-4 py-3 font-bold">
                            Бүртгэгдсэн суваг{" "}
                          </th>
                        ) : (
                          <th className="px-4 py-3 font-bold">Журам </th>
                        )}
                        {selectedCategory === "3" ? (
                          <th className="px-4 py-3 font-bold">Тоогоор</th>
                        ) : (
                          <th className="px-4 py-3 font-bold">Алдаа </th>
                        )}

                        <th className="px-4 py-3 font-bold">Action </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-sm">
                      {currentRecords.map((tab, i) => (
                        <tr key={i}>
                          <td className="px-1 py-1 border">{i + 1}</td>
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
                          <td className="px-1 py-1 border">
                            <a
                              className="text-yellow-400 hover:text-black mx-2"
                              data-id={tab}
                              onClick={() => {
                                handleEdit(tab);
                              }}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </a>
                            <a
                              data-id={tab.id}
                              onClick={showModalDelete}
                              className="text-rose-400 hover:text-black ml-2"
                            >
                              <i className="bi bi-trash-fill"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3">
                    <Pagination
                      nPages={nPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ErrorThanks;
