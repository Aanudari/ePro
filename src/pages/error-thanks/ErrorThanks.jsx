import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { arraySearch } from "../../service/searchArray";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";

// import "./pg.css";
function ErrorThanks() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  let color = "blue";
  const [currentTab, setCurrentTab] = useState("3");
  const [complainInfo, setComplainInfo] = useState();
  const [complain, setComplain] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const [showDelete, setShowDelete] = useState(null);
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
      url: `http://192.168.10.248:9000/v1/Complain/complainInfo`,
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
  // const total = complain.reduce(
  //   (total, currentItem) => (total = total + Math.floor(currentItem.too)),
  //   0
  // );
  // console.log(total);

  const handleTabClick = (e) => {
    if (e.target.id == 3) {
      navigate("/thanks", {
        state: { type: e.target.id },
      });
    }
    if (e.target.id == 2) {
      setCurrentTab(e.target.id);
    }
    if (e.target.id == 1) {
      setCurrentTab(e.target.id);
    }
  };
  const handleCreate = () => {
    if (selectedOption === null) {
      notification.error(`Сонголт хоосон байна!`);
    }
    if (selectedOption.id == 3) {
      navigate("/create-thanks", {
        state: { type: selectedOption },
      });
    }
    if (selectedOption.id == 1 || selectedOption.id == 2) {
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
      url: `http://192.168.10.248:9000/v1/Complain/delete?id=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => navigate(0), 1000);
          return () => clearTimeout(timer);
        } else {
          console.log(res.data.resultMessage);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (tab) => {
    navigate("/edit-error-thanks", {
      state: { data: tab },
    });
  };
  const [page, setPage] = useState(0);
  const dataPerPage = 3;
  const numberOfdataVistited = page * dataPerPage;

  let one = [];
  let two = [];
  let three = [];
  const [status, setStatus] = useState("1");
  for (let index = 0; index < complain.length; index++) {
    const element = complain[index];
    if (element.complain === "1") {
      one.push(element.complain);
    }
    if (element.complain === "2") {
      two.push(element.complain);
    }
    if (element.complain === "3") {
      three.push(element.complain);
    }
  }
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  let final;
  const handlePageCount = () => {
    if (status == "1") {
      final = one.length;
    }
    if (status == "2") {
      final = two.length;
    }
    if (status == "3") {
      final = three.length;
    }
  };
  const [count, setCount] = useState();
  handlePageCount();
  const totalPages = Math.ceil(parseInt(final) / dataPerPage);

  const handleOnChange = async (e) => {
    let value = e.target.value;
    if (value.length > 2) {
      let search = await arraySearch(complain, value);
      setComplain(search);
      setCount(search.length);
    } else {
      setComplainInfo(complainInfo);
      setComplain(complain);
      // setCount(complain.length);
    }
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
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
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete?
              </h3>
              <button
                type="button"
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={hideModalDelete}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Navigation />
      <div className=" w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Алдаа талархал
            </p>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="mr-2">
                <p>Count: {count}</p>
              </div>

              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <i className="bi bi-search" />
                </span>
                <input
                  name="search"
                  onChange={handleOnChange}
                  placeholder="Хайлт"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-black focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 mx-auto mt-0">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-1">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
              <div className="mt-4">
                <div className="sm:flex items-center justify-between">
                  <div className="flex items-center">
                    <ul
                      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                      role="tablist"
                    >
                      {complainInfo
                        ? complainInfo.map((tab, i) => (
                            <li
                              // onClick={() => {
                              //   setStatus(tab.id);
                              // }}
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

                  <button
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded 
               text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={showModalCreate}
                  >
                    <i className="bi bi-plus text-bold" />
                    Бүртгэл нэмэх
                  </button>
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
                        <th className="px-4 py-3 font-bold">Гомдлын төрөл </th>
                        <th className="px-4 py-3 font-bold">
                          Гомдлын дэлгэрэнгүй{" "}
                        </th>
                        <th className="px-4 py-3 font-bold">Журам </th>
                        <th className="px-4 py-3 font-bold">Алдаа </th>
                        <th className="px-4 py-3 font-bold">Action </th>
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
                              // onChange={() => {
                              //   setTotalPages(tab.complain);
                              // }}
                            >
                              <td className="px-1 py-1 border">
                                {tab.createdAt}
                              </td>
                              <td className="px-1 py-1 border">
                                {tab.departmentName}
                              </td>
                              <td className="px-1 py-1 border">
                                {tab.unitName}
                              </td>
                              <td className="px-1 py-1 border">
                                {tab.firstName}
                              </td>
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
                          ))
                        : // .slice(
                          //   numberOfdataVistited,
                          //   numberOfdataVistited + dataPerPage
                          // )
                          null}
                    </tbody>
                  </table>

                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    {/* <ReactPaginate
                previousLabel={"Өмнө"}
                nextLabel={"Дараах"}
                pageCount={totalPages}
                onPageChange={changePage}
                containerClassName={"navigationButtons"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"navigationDisabled"}
                activeClassName={"navigationActive"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                subContainerClassName={"pages pagination"}
              /> */}
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
