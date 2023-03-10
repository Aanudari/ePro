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
  const [filteredList, setFilteredList] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const [id, setId] = useState();
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
  const nPages = Math.ceil(filteredList.length / recordsPerPage);
  const showModalDelete = (e) => {
    setShowDelete(true);
    setId(e.currentTarget.dataset.id);
  };
  const hideModalDelete = () => setShowDelete(null);
  const [selectedCategory, setSelectedCategory] = useState("1");
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
  const currentRecords = filteredList.slice(
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
  const filterByCategory = (filteredData) => {
    if (!selectedCategory) {
      return filteredData;
    }
    const filteredComplains = filteredData.filter(
      (tr) => tr.complain === selectedCategory
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
  const handleCategoryChange = (tab) => {
    setSelectedCategory(tab.id);
  };
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = complain.filter((item) => {
      return item.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
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
    setFilteredList(filteredData);
  }, [selectedCategory]);
  useEffect(() => {
    var filteredData = filterByYear(complain);
    setFilteredList(filteredData);
  }, [selectedYear]);
  useEffect(() => {
    var filteredData = filterBySeason(complain);
    setFilteredList(filteredData);
  }, [selectedSeason]);
  useEffect(() => {
    var filteredData = filterByDivision(complain);
    setFilteredList(filteredData);
  }, [selectedDivision]);
  // const [activeTab, setActiveTab] = useState(1);

  // const filteredData = complain.filter(
  //   (item) => item.complain === activeTab.toString()
  // );
  // console.log(filteredData.length);
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
      {/* <div>
        <ul>
          {complainInfo.map((item) => (
            <li key={item.id} onClick={() => setActiveTab(item.id)}>
              {item.category}
            </li>
          ))}
        </ul>
        <div>
          {filteredData.map((item) => (
            <div key={item.id}>{item.complainType}</div>
          ))}
        </div>
      </div> */}
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-bold text-sm text-gray-900">Алдаа талархал</p>
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
                <span className="sr-only">Submit Search</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <button
              className="mt-2 inline-flex items-center justify-center rounded-lg  border-2 border-gray-400 px-3 py-1 text-gray-600 transition hover:bg-green-600 hover:text-white focus:outline-none focus:ring"
              type="button"
            >
              <span className="text-sm font-medium">Excel татах</span>
              <i className="bi bi-file-arrow-down ml-2 " />
            </button>
          </div>
        </div>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
          <div className="mt-4">
            <ul className="flex flex-wrap -mb-px">
              {complainInfo?.map((tab, i) => (
                <li
                  key={i}
                  id={tab.id}
                  disabled={selectedCategory === `${tab.id}`}
                  onClick={() => {
                    handleCategoryChange(tab);
                  }}
                  className="mr-2"
                >
                  <p
                    className={
                      selectedCategory === `${tab.id}`
                        ? "inline-block p-2 font-bold text-purple-600 border-b-2 border-purple-600 rounded-t-lg active "
                        : "inline-block p-2 font-bold border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
                    }
                  >
                    {tab.category}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Dropdown
          alignstart="true"
          className="d-inline mx-2"
          autoClose="outside"
        >
          <Dropdown.Toggle variant="primary" className="mt-2" size="sm">
            Оноор ялгах
          </Dropdown.Toggle>
          <Dropdown.Menu>
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
        <div className="overflow-x-auto mt-4">
          <table className="text-sm min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              {selectedCategory === "1" ? (
                <tr className="text-xs text-left  bg-gray-200 border-b">
                  <th className="px-2 py-2 font-bold"></th>
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
                  <th className="px-2 py-2 font-bold">Алдаа </th>
                  <th className="px-2 py-2 font-bold"></th>
                </tr>
              ) : selectedCategory === "2" ? (
                <tr className="text-xs text-left  bg-gray-200 border-b">
                  <th className="px-2 py-2 font-bold"></th>
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
                  <th className="px-2 py-2 font-bold">Алдаа </th>
                  <th className="px-2 py-2 font-bold"></th>
                </tr>
              ) : (
                <tr className="text-xs text-left  bg-gray-200 border-b">
                  <th className="px-2 py-2 font-bold"></th>
                  <th className="px-2 py-2 font-bold">Он </th>
                  <th className="px-2 py-2 font-bold">Улирал </th>
                  <th className="px-2 py-2 font-bold">Огноо </th>
                  <th className="px-2 py-2 font-bold">Харьяалагдах хэлтэс</th>

                  <th className="px-2 py-2 font-bold">Ажлын байр </th>
                  <th className="px-2 py-2 font-bold">Ажилтны нэр </th>
                  <th className="px-2 py-2 font-bold">Төрөл</th>
                  <th className="px-2 py-2 font-bold">Дэлгэрэнгүй </th>
                  <th className="px-2 py-2 font-bold">Бүртгэгдсэн суваг</th>
                  <th className="px-2 py-2 font-bold">Тоогоор </th>
                  <th className="px-2 py-2 font-bold"></th>
                </tr>
              )}
            </thead>
            <tbody className="bg-white text-sm">
              {currentRecords.map(
                (tab, i) =>
                  selectedCategory === `${tab.complain}` &&
                  (tab.complain === "1" ? (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">
                        {new Date(tab.createdAt).getFullYear()}
                      </td>
                      <td className="px-1 py-1 border">
                        {new Date(tab.createdAt).getMonth() === 1 ||
                        new Date(tab.createdAt).getMonth() === 2 ||
                        new Date(tab.createdAt).getMonth() === 3
                          ? "1-р улирал"
                          : new Date(tab.createdAt).getMonth() === 4 ||
                            new Date(tab.createdAt).getMonth() === 5 ||
                            new Date(tab.createdAt).getMonth() === 6
                          ? "2-р улирал"
                          : new Date(tab.createdAt).getMonth() === 7 ||
                            new Date(tab.createdAt).getMonth() === 8 ||
                            new Date(tab.createdAt).getMonth() === 9
                          ? "3-р улирал"
                          : new Date(tab.createdAt).getMonth() === 10 ||
                            new Date(tab.createdAt).getMonth() === 11 ||
                            new Date(tab.createdAt).getMonth() === 12
                          ? "4-р улирал"
                          : ""}
                      </td>
                      <td className="px-1 py-1 border">
                        {new Date(tab.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-1 py-1 border">{tab.divisionName}</td>
                      <td className="px-1 py-1 border">{tab.unitName}</td>
                      <td className="px-1 py-1 border">{tab.firstName}</td>
                      <td className="px-1 py-1 border">{tab.complainType}</td>
                      <td className="px-1 py-1 border">{tab.phoneNo}</td>
                      <td className="px-1 py-1 border">{tab.description}</td>
                      <td className="px-1 py-1 border ">
                        {tab.isSolved === "" ? (
                          <span className="px-2 py-2  text-xs text-yellow-600 ">
                            pending
                          </span>
                        ) : (
                          tab.isSolved
                        )}
                      </td>
                      <td className="px-1 py-1 border">
                        {tab.solvedDescription === "" ? (
                          <span className="px-2 py-2  text-xs  text-yellow-600 ">
                            pending
                          </span>
                        ) : (
                          tab.solvedDescription
                        )}
                      </td>
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
                  ) : tab.complain === "2" ? (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">
                        {new Date(tab.createdAt).getFullYear()}
                      </td>
                      <td className="px-1 py-1 border">
                        {new Date(tab.createdAt).getMonth() === 1 ||
                        new Date(tab.createdAt).getMonth() === 2 ||
                        new Date(tab.createdAt).getMonth() === 3
                          ? "1-р улирал"
                          : new Date(tab.createdAt).getMonth() === 4 ||
                            new Date(tab.createdAt).getMonth() === 5 ||
                            new Date(tab.createdAt).getMonth() === 6
                          ? "2-р улирал"
                          : new Date(tab.createdAt).getMonth() === 7 ||
                            new Date(tab.createdAt).getMonth() === 8 ||
                            new Date(tab.createdAt).getMonth() === 9
                          ? "3-р улирал"
                          : new Date(tab.createdAt).getMonth() === 10 ||
                            new Date(tab.createdAt).getMonth() === 11 ||
                            new Date(tab.createdAt).getMonth() === 12
                          ? "4-р улирал"
                          : ""}
                      </td>
                      <td className="px-1 py-1 border">
                        {new Date(tab.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-1 py-1 border">{tab.divisionName}</td>
                      <td className="px-1 py-1 border">{tab.unitName}</td>
                      <td className="px-1 py-1 border">{tab.firstName}</td>
                      <td className="px-1 py-1 border">{tab.complainType}</td>
                      <td className="px-1 py-1 border">{tab.phoneNo}</td>
                      <td className="px-1 py-1 border">{tab.description}</td>
                      <td className="px-1 py-1 border ">
                        {tab.isSolved === "" ? (
                          <span className="px-2 py-2  text-xs text-yellow-600 ">
                            pending
                          </span>
                        ) : (
                          tab.isSolved
                        )}
                      </td>
                      {/* <td className="px-1 py-1 border">
                            {tab.solvedDescription === "" ? (
                              <span className="px-2 py-2  text-xs  text-yellow-600 ">
                                pending
                              </span>
                            ) : (
                              tab.solvedDescription
                            )}
                          </td> */}
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
                  ) : (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="px-1 py-1 border">{i + 1}</td>
                      <td className="px-1 py-1 border">
                        {new Date(tab.createdAt).getFullYear()}
                      </td>
                      <td className="px-1 py-1 border">
                        {new Date(tab.createdAt).getMonth() === 1 ||
                        new Date(tab.createdAt).getMonth() === 2 ||
                        new Date(tab.createdAt).getMonth() === 3
                          ? "1-р улирал"
                          : new Date(tab.createdAt).getMonth() === 4 ||
                            new Date(tab.createdAt).getMonth() === 5 ||
                            new Date(tab.createdAt).getMonth() === 6
                          ? "2-р улирал"
                          : new Date(tab.createdAt).getMonth() === 7 ||
                            new Date(tab.createdAt).getMonth() === 8 ||
                            new Date(tab.createdAt).getMonth() === 9
                          ? "3-р улирал"
                          : new Date(tab.createdAt).getMonth() === 10 ||
                            new Date(tab.createdAt).getMonth() === 11 ||
                            new Date(tab.createdAt).getMonth() === 12
                          ? "4-р улирал"
                          : ""}
                      </td>
                      <td className="px-1 py-1 border">
                        {new Date(tab.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-1 py-1 border">{tab.divisionName}</td>
                      <td className="px-1 py-1 border">{tab.unitName}</td>
                      <td className="px-1 py-1 border">{tab.firstName}</td>
                      <td className="px-1 py-1 border">{tab.complainType}</td>
                      <td className="px-1 py-1 border">{tab.description}</td>
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

      {/* <div className="sm:flex items-center justify-between p-2">
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Бүгд</option>
              {complainInfo?.map((el, i) => (
                <option key={i} value={`${el.id}`}>
                  {el.category}
                </option>
              ))}
            </select>
          </div>
        </div> */}

      <ToastContainer />
    </div>
  );
}

export default ErrorThanks;
