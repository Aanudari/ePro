import React, { useEffect, useState, useRef } from "react";
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
import Dropdown from "react-bootstrap/Dropdown";
import * as XLSX from "xlsx";

function ErrorThanks() {
  const { width } = getWindowDimensions();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [complainInfo, setComplainInfo] = useState([]);
  const [complain, setComplain] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const [showDelete, setShowDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, setTrigger] = useState(false);

  const [activeTab, setActiveTab] = useState("1");
  const [selectedIds, setSelectedIds] = useState([]);
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
          setFilteredData(res.data.complains);
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
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const filteredData = complain.filter(
      (item) => item.complain === activeTab.toString()
    );
    setFilteredData(filteredData);
  }, [activeTab]);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);
  const showModalDelete = (e) => {
    setShowDelete(true);
  };
  const hideModalDelete = () => setShowDelete(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const years = complain.map((item) => new Date(item.createdAt).getFullYear());
  const uniqueYears = [...new Set(years)];
  const seasons = complain.map((item) => {
    if (
      new Date(item.createdAt).getMonth() === 1 ||
      new Date(item.createdAt).getMonth() === 2 ||
      new Date(item.createdAt).getMonth() === 3
    ) {
      return "1-р улирал";
    }
    if (
      new Date(item.createdAt).getMonth() === 4 ||
      new Date(item.createdAt).getMonth() === 5 ||
      new Date(item.createdAt).getMonth() === 6
    ) {
      return "2-р улирал";
    }
    if (
      new Date(item.createdAt).getMonth() === 7 ||
      new Date(item.createdAt).getMonth() === 8 ||
      new Date(item.createdAt).getMonth() === 9
    ) {
      return "3-р улирал";
    }
    if (
      new Date(item.createdAt).getMonth() === 10 ||
      new Date(item.createdAt).getMonth() === 11 ||
      new Date(item.createdAt).getMonth() === 12
    ) {
      return "4-р улирал";
    }
  });
  const uniqueSeasons = [...new Set(seasons)];
  const divisionNames = complain.map((item) => item.divisionName);
  const uniqueDivisionNames = [...new Set(divisionNames)];
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const handleCreate = () => {
    if (selectedOption === null) {
      notification.error(`Сонголт хоосон байна!`);
    } else {
      navigate("/create-error-thanks", {
        state: { type: selectedOption },
      });
    }
  };
  const handleEdit = (tab) => {
    navigate("/edit-error-thanks", {
      state: { data: tab },
    });
  };
  const filterByCategory = (filteredData) => {
    if (!activeTab) {
      return filteredData;
    }
    const filteredComplains = filteredData.filter(
      (tr) => tr.complain === activeTab
    );
    return filteredComplains;
  };
  const filterByYear = (filteredData) => {
    if (!selectedYear) {
      return filteredData;
    }
    const filteredComplains = filteredData.filter((item) => {
      if (selectedYear === new Date(item.createdAt).getFullYear()) {
        return item;
      }
      // (item) => new Date(item.createdAt).getFullYear() === selectedYear
    });
    return filteredComplains;
  };
  const filterBySeason = (filteredData) => {
    if (!selectedSeason) {
      return filteredData;
    }
    const filteredComplains = filteredData.filter((item) => {
      if (selectedSeason === "1-р улирал") {
        return (
          new Date(item.createdAt).getMonth() === 1 ||
          new Date(item.createdAt).getMonth() === 2 ||
          new Date(item.createdAt).getMonth() === 3
        );
      }
      if (selectedSeason === "2-р улирал") {
        return (
          new Date(item.createdAt).getMonth() === 4 ||
          new Date(item.createdAt).getMonth() === 5 ||
          new Date(item.createdAt).getMonth() === 6
        );
      }
      if (selectedSeason === "3-р улирал") {
        return (
          new Date(item.createdAt).getMonth() === 7 ||
          new Date(item.createdAt).getMonth() === 8 ||
          new Date(item.createdAt).getMonth() === 9
        );
      }
      if (selectedSeason === "4-р улирал") {
        return (
          new Date(item.createdAt).getMonth() === 10 ||
          new Date(item.createdAt).getMonth() === 11 ||
          new Date(item.createdAt).getMonth() === 12
        );
      }
      // (item) => new Date(item.createdAt).getFullYear() === selectedSeason
    });
    return filteredComplains;
  };
  const filterByDivision = (filteredData) => {
    if (!selectedDivision) {
      return filteredData;
    }
    const filteredComplains = filteredData.filter((item) => {
      if (item.divisionName === selectedDivision) {
        return item;
      }
    });
    return filteredComplains;
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = complain.filter((item) => {
      return item.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredData(searchList);
  };
  const handleYearChange = (y) => {
    setSelectedYear(y);
  };
  const handleSeasonChange = (s) => {
    setSelectedSeason(s);
  };
  const handleDivisionChange = (d) => {
    setSelectedDivision(d);
  };
  useEffect(() => {
    var filteredData = filterByCategory(complain);
    setFilteredData(filteredData);
  }, [activeTab]);
  useEffect(() => {
    var filteredData = filterByYear(complain);
    setFilteredData(filteredData);
  }, [selectedYear]);
  useEffect(() => {
    var filteredData = filterBySeason(complain);
    setFilteredData(filteredData);
  }, [selectedSeason]);
  useEffect(() => {
    var filteredData = filterByDivision(complain);
    setFilteredData(filteredData);
  }, [selectedDivision]);

  const handleCheckboxChange = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else {
      setSelectedIds([...selectedIds, itemId]);
    }
  };
  const deleteSelectedItems = () => {
    for (const id of selectedIds) {
      axios({
        method: "delete",
        headers: {
          Authorization: `${TOKEN}`,
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/Complain/delete?id=${id}`,
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            setTrigger(!trigger);
            hideModalDelete();
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
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedIds(filteredData.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };
  const handleDownloadClick = () => {
    const worksheet = XLSX.utils.table_to_sheet(
      document.getElementById("table")
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const fileBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileName = "filtered_data.xlsx";
    const blob = new Blob([fileBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const niitAldaa = filteredData?.filter((item) => {
    if (item.complain === activeTab) return item;
  });

  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <div>
        <Modal
          show={showCreate}
          onHide={hideModalCreate}
          size="ml"
          // backdrop="static"
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
            <span className="text-sm text-black">Бүртгэл устгах</span>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <p className="mb-5  font-normal text-gray-500 dark:text-gray-400">
                Та бүртгэлийг устгахдаа итгэлтэй байна уу?
              </p>
              <button
                type="button"
                onClick={deleteSelectedItems}
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

      <div className="px-4 py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-bold text-md text-gray-900">Алдаа талархал</p>
          </div>

          <div className="flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <button
              onClick={showModalCreate}
              className="block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              Бүртгэл нэмэх
            </button>
          </div>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={handleSearch}
                className="h-10 px-6 py-2  rounded-lg border-2 border-gray-400 outline-none focus:border-indigo-500  pr-10 text-sm placeholder-gray-400 focus:z-10"
                placeholder="Ажилтны нэрээр хайх..."
                type="text"
              />

              <button
                type="submit"
                className="absolute inset-y-0 right-0 rounded-r-lg p-2 text-gray-600"
              >
                <i className="bi bi-search" />
              </button>
            </div>
          </div>
        </div>
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
                    {item.category}{" "}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <Dropdown
              alignstart="true"
              className="d-inline mx-2"
              autoClose="outside"
            >
              <Dropdown.Toggle variant="primary" className="mt-2" size="sm">
                Оноор ялгах
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleYearChange()} value="All">
                  <p className="block items-center font-bold rounded-lg text-sm text-gray-600 hover:border-gray-300 hover:text-blue-600">
                    Бүгд
                  </p>
                </Dropdown.Item>
                {uniqueYears.map((year) => (
                  <Dropdown.Item
                    onClick={() => handleYearChange(year)}
                    key={year}
                    value={year}
                  >
                    <p className="block items-center font-bold rounded-lg text-sm text-gray-600 hover:border-gray-300 hover:text-blue-600">
                      {year}
                    </p>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              alignstart="true"
              className="d-inline mx-2"
              autoClose="outside"
            >
              <Dropdown.Toggle variant="success" className="mt-2" size="sm">
                Улиралаар ялгах
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSeasonChange()} value="All">
                  <p className="block items-center font-bold rounded-lg text-sm text-gray-600 hover:border-gray-300 hover:text-blue-600">
                    Бүгд
                  </p>
                </Dropdown.Item>
                {uniqueSeasons.map((season) => (
                  <Dropdown.Item
                    onClick={() => handleSeasonChange(season)}
                    key={season}
                    value={season}
                  >
                    <p className="block items-center font-bold rounded-lg text-sm text-gray-600 hover:border-gray-300 hover:text-blue-600">
                      {season}
                    </p>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              alignstart="true"
              className="d-inline mx-2"
              autoClose="outside"
            >
              <Dropdown.Toggle variant="warning" className="mt-2" size="sm">
                Хэлтэсээр ялгах
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleDivisionChange()}
                  value="All"
                >
                  <p className="block items-center font-bold rounded-lg text-sm text-gray-600 hover:border-gray-300 hover:text-blue-600">
                    Бүгд
                  </p>
                </Dropdown.Item>
                {uniqueDivisionNames.map((divisionNames) => (
                  <Dropdown.Item
                    onClick={() => handleDivisionChange(divisionNames)}
                    key={divisionNames}
                    value={divisionNames}
                  >
                    <p className="block items-center font-bold rounded-lg text-sm text-gray-600 hover:border-gray-300 hover:text-blue-600">
                      {divisionNames}
                    </p>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center">
            <button
              onClick={showModalDelete}
              className="mt-2 items-center px-2 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
            >
              <i className="bi bi-trash mr-1" />
              Delete
            </button>
            <button
              onClick={handleDownloadClick}
              className="mt-2 items-center px-2 py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-md"
            >
              <i className="bi bi-file-excel mr-1 " />
              Download
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="mt-4 bg-gray-100 flex items-center justify-center bg-gray-100 font-sans">
            <table id="table" className=" min-w-full break-words shadow-sm">
              <thead className="bg-gray-600  uppercase text-xs leading-normal">
                {activeTab === "1" ? (
                  <tr className=" text-left text-white border-b">
                    <th className="px-2 py-2 font-bold">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedIds.length === filteredData.length}
                      />
                    </th>
                    <th className="px-2 py-2 font-bold">Он</th>
                    <th className="px-2 py-2 font-bold">Улирал </th>
                    <th className="px-2 py-2 font-bold">Огноо </th>
                    <th className="px-2 py-2 font-bold">Харьяалагдах хэлтэс</th>

                    <th className="px-2 py-2 font-bold">Ажлын байр </th>
                    <th className="px-2 py-2 font-bold">Ажилтны нэр </th>
                    <th className="px-2 py-2 font-bold">Гомдлын төрөл</th>
                    <th className="px-2 py-2 font-bold">Холбогдох дугаар </th>
                    <th className="px-2 py-2 font-bold">Гомдлын дэлгэрэнгүй</th>
                    <th className="px-2 py-2 font-bold">Шийдвэрлэсэн эсэх</th>
                    <th className="px-2 py-2 font-bold">Шийдвэрлэсэн хариу</th>
                    <th className="px-2 py-2 font-bold">
                      Алдаа
                      <span className="px-2 py-1 text-xs rounded text-white  bg-purple-600 font-medium ml-2">
                        {niitAldaa
                          .map((item) => parseInt(item.too))
                          .reduce((acc, val) => acc + val, 0)}
                      </span>
                    </th>
                    <th className="px-2 py-2 font-bold"></th>
                  </tr>
                ) : activeTab === "2" ? (
                  <tr className="text-xs text-left text-white border-b">
                    <th className="px-2 py-2 font-bold">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedIds.length === filteredData.length}
                      />
                    </th>
                    <th className="px-2 py-2 font-bold">Он</th>
                    <th className="px-2 py-2 font-bold">Улирал </th>
                    <th className="px-2 py-2 font-bold">Огноо </th>
                    <th className="px-2 py-2 font-bold">Харьяалагдах хэлтэс</th>

                    <th className="px-2 py-2 font-bold">Ажлын байр </th>
                    <th className="px-2 py-2 font-bold">Ажилтны нэр </th>
                    <th className="px-2 py-2 font-bold">Гомдлын төрөл</th>
                    <th className="px-2 py-2 font-bold">Холбогдох дугаар </th>
                    <th className="px-2 py-2 font-bold">Гомдлын дэлгэрэнгүй</th>
                    <th className="px-2 py-2 font-bold">Шийдвэрлэсэн эсэх</th>
                    <th className="px-2 py-2 font-bold">
                      Алдаа
                      <span className="px-2 py-1 text-xs rounded text-white  bg-purple-600 font-medium ml-2">
                        {niitAldaa
                          .map((item) => parseInt(item.too))
                          .reduce((acc, val) => acc + val, 0)}
                      </span>
                    </th>
                    <th className="px-2 py-2 font-bold"></th>
                  </tr>
                ) : (
                  <tr className="text-xs text-left text-white border-b">
                    <th className="px-2 py-2 font-bold">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedIds.length === filteredData.length}
                      />
                    </th>
                    <th className="px-2 py-2 font-bold">Он </th>
                    <th className="px-2 py-2 font-bold">Улирал </th>
                    <th className="px-2 py-2 font-bold">Огноо </th>
                    <th className="px-2 py-2 font-bold">Харьяалагдах хэлтэс</th>

                    <th className="px-2 py-2 font-bold">Ажлын байр </th>
                    <th className="px-2 py-2 font-bold">Ажилтны нэр </th>
                    <th className="px-2 py-2 font-bold">Төрөл</th>
                    <th className="px-2 py-2 font-bold">Дэлгэрэнгүй </th>
                    <th className="px-2 py-2 font-bold">Бүртгэгдсэн суваг</th>
                    <th className="px-2 py-2 font-bold">
                      Тоогоор
                      <span className="px-2 py-1 text-xs rounded text-white  bg-purple-600 font-medium ml-2">
                        {niitAldaa
                          .map((item) => parseInt(item.too))
                          .reduce((acc, val) => acc + val, 0)}
                      </span>
                    </th>
                    <th className="px-2 py-2 font-bold"></th>
                  </tr>
                )}
              </thead>
              <tbody className="bg-white text-xs">
                {currentRecords.map(
                  (item) =>
                    activeTab === `${item.complain}` &&
                    (item.complain === "1" ? (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 hover:bg-gray-200"
                      >
                        <td className="px-1 py-1 border">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            onChange={() => handleCheckboxChange(item.id)}
                            checked={selectedIds.includes(item.id)}
                          />
                        </td>
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
                          {item.divisionName}
                        </td>
                        <td className="px-1 py-1 border">{item.unitName}</td>
                        <td className="px-1 py-1 border">{item.firstName}</td>
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
                        <td className="px-1 py-1 border">
                          <button
                            data-id={item}
                            onClick={() => {
                              handleEdit(item);
                            }}
                            className="px-2 py-2 bg-gray-200 uppercase focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 rounded-md cursor-pointer hover:text-white"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ) : item.complain === "2" ? (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="px-1 py-1 border">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            onChange={() => handleCheckboxChange(item.id)}
                            checked={selectedIds.includes(item.id)}
                          />
                        </td>
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
                          {item.divisionName}
                        </td>
                        <td className="px-1 py-1 border">{item.unitName}</td>
                        <td className="px-1 py-1 border">{item.firstName}</td>
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
                        {/* <td className="px-1 py-1 border">
                            {item.solvedDescription === "" ? (
                              <span className="px-2 py-2  text-xs  text-yellow-600 ">
                                pending
                              </span>
                            ) : (
                              item.solvedDescription
                            )}
                          </td> */}
                        <td className="px-1 py-1 border">{item.too}</td>
                        <td className="px-1 py-1 border">
                          <button
                            data-id={item}
                            onClick={() => {
                              handleEdit(item);
                            }}
                            className="px-2 py-2 bg-gray-200 uppercase focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 rounded-md cursor-pointer hover:text-white"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="px-1 py-1 border">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            onChange={() => handleCheckboxChange(item.id)}
                            checked={selectedIds.includes(item.id)}
                          />
                        </td>
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
                          {item.divisionName}
                        </td>
                        <td className="px-1 py-1 border">{item.unitName}</td>
                        <td className="px-1 py-1 border">{item.firstName}</td>
                        <td className="px-1 py-1 border">
                          {item.complainType}
                        </td>
                        <td className="px-1 py-1 border">{item.description}</td>
                        <td className="px-1 py-1 border">{item.rule}</td>
                        <td className="px-1 py-1 border">{item.too}</td>
                        <td className="px-1 py-1 border">
                          <button
                            data-id={item}
                            onClick={() => {
                              handleEdit(item);
                            }}
                            className="px-2 py-2 bg-gray-200 uppercase focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 rounded-md cursor-pointer hover:text-white"
                          >
                            Edit
                          </button>
                        </td>
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
    </div>
  );
}

export default ErrorThanks;
