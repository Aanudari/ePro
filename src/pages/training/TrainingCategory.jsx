import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Modal } from "react-bootstrap";
import { logout } from "../../service/examService";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";

import getWindowDimensions from "../../components/SizeDetector";
import moment from "moment";
function TrainingCategory() {
  const { width } = getWindowDimensions();
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const [checkEmpty1, setcheckEmpty1] = useState(false);
  const [checkEmpty2, setcheckEmpty2] = useState(false);
  const [category, setCategory] = useState([]);
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const [showDelete, setShowDelete] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const hideModalDelete = () => setShowDelete(null);
  const [id, setId] = useState();
  const [showEdit, setShowEdit] = useState(null);
  const hideModalEdit = () => setShowEdit(null);
  const [editData, setEditData] = useState([]);
  const [department, setDepartment] = useState();
  const [selectedOptiondepartment, setSelectedOptiondepartment] =
    useState(null);
  const [name, setName] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const format = "YYYYMMDDHHmmss";
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);
  const [filteredList, setFilteredList] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/department`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setDepartment(res.data.departments);
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
      url: `${process.env.REACT_APP_URL}/v1/Training/category`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          setCategory(res.data.trainingCatList);
          setFilteredList(res.data.trainingCatList);
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
  const handleOrg = (item) => {
    setDepartmentID(item.id);
  };
  const showModalDelete = (e) => {
    setShowDelete(true);
    setId(e.currentTarget.dataset.id);
  };
  const handleEdit = (e) => {
    setShowEdit(true);
    setEditData(e);
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

  const deleteSelectedItems = () => {
    for (const id of selectedIds) {
      axios({
        method: "delete",
        headers: {
          Authorization: `${TOKEN}`,
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/Training/category/delete?catId=${id}`,
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            hideModalDelete();
            window.location.reload();
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
  const data = {
    name: `${name}`,
    startDate: `${startDate}`,
    endDate: `${endDate}`,
    department: `${departmentID}`,
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setcheckEmpty1(true);
    }
    if (departmentID.length === 0) {
      setcheckEmpty2(true);
    } else {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/Training/category/add`,
        data: JSON.stringify(data),
      })
        .then((res) => {
          if (res.data.isSuccess === false) {
            //
          }
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            hideModalCreate();
            setTrigger(!trigger);
          }
          if (res.data.resultMessage === "Unauthorized") {
            logout();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const startDateEdit = moment(editData.startDate).format(format);
  const endDateEdit = moment(editData.endDate).format(format);
  const editDataSet = {
    id: `${editData.id}`,
    name: `${nameEdit}` === "" ? editData.name : `${nameEdit}`,
    startDate: `${startDateEdit}`,
    endDate: `${endDateEdit}`,
    department: `${editData.department}`,
  };

  const navigateIndexEdit = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/Training/category/edit`,
      data: JSON.stringify(editDataSet),
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        console.log(res.data);
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          hideModalCreate();
          setTrigger(!trigger);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = category?.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };

  return (
    <div className="w-full min-h-[calc(100%-56px)]">
      <div>
        //create
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
            <Modal.Title>Ангилал нэмэх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="max-w-screen-lg mx-auto">
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Ангиллын нэр
                </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input
                    type="text"
                    className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                    onChange={(e) => {
                      setName(e.target.value);
                      setcheckEmpty1(false);
                    }}
                    id={checkEmpty1 === true ? "border-red" : null}
                  />
                </div>
              </div>

              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Эхлэх хугацаа
                </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <DatePicker
                    className="outline-none text-center text-sm  outline-none  focus:ring-0 bg-transparent"
                    selected={date1}
                    onChange={(date) => setDate1(date)}
                    selectsStart
                    startDate={date1}
                    dateFormat="yyyy, MM сарын dd"
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Дуусах хугацаа
                </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <DatePicker
                    className="outline-none text-center text-sm  outline-none  focus:ring-0 bg-transparent"
                    selected={date2}
                    onChange={(date) => setDate2(date)}
                    selectsStart
                    startDate={date2}
                    dateFormat="yyyy, MM сарын dd"
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Алба
                </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 ">
                  <Select
                    className="outline-none  w-full rounded bg-gray-50"
                    options={department}
                    defaultValue={selectedOptiondepartment}
                    onChange={(item) => {
                      handleOrg(item);
                      setcheckEmpty2(false);
                    }}
                    id={checkEmpty2 === true ? "border-red" : null}
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue && "Сонголт хоосон байна"
                    }
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                  />
                </div>
              </div>

              <div className="col-span-1 text-right mt-4">
                <div className="inline-flex items-end">
                  <button
                    onClick={navigateIndex}
                    className="flex bg-green-600 border border-green-600 shadow px-4 py-2 rounded text-white focus:outline-none focus:shadow-outline"
                  >
                    Үүсгэх
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        //delete
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
                Та сонгосон {selectedIds?.length} ангиллыг устгахдаа итгэлтэй
                байна уу?
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
        //edit
        <Modal
          show={showEdit}
          onHide={hideModalEdit}
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
            <Modal.Title>Ангилал засах</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="max-w-screen-lg mx-auto">
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  name
                </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input
                    type="text"
                    className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                    defaultValue={editData.name}
                    onChange={(e) => {
                      setNameEdit(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="col-span-1 text-right mt-4">
                <div className="inline-flex items-end">
                  <button
                    onClick={navigateIndexEdit}
                    className="flex bg-green-600 border border-green-600 shadow px-4 py-2 rounded text-white focus:outline-none focus:shadow-outline"
                  >
                    Хадгалах
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <Navigation />
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-sm lg:text-sm font-bold leading-normal text-gray-800">
              Сургалтын ангилал{" "}
              {filteredList?.length > 0
                ? `(${filteredList?.length})`
                : `(${category.length})`}
            </p>
          </div>
        </div>

        <div className="sm:flex items-center justify-between">
          <div className="flex items-center sm:justify-between sm:gap-4">
            <div className="relative hidden sm:block">
              <input
                value={searchQuery}
                onChange={handleSearch}
                type="text"
                name="search"
                className="w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 flex-1 py-2 px-4 bg-white  text-gray-700 placeholder-gray-400 shadow-sm text-base"
                placeholder="Ангиллын нэр"
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
              onClick={showModalCreate}
              className="mt-2 items-center px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
            >
              <i className="bi bi-trash mr-1" />
              Ангилал нэмэх
            </button>
            <button
              onClick={showModalDelete}
              className="mt-2 items-center px-2 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
            >
              <i className="bi bi-trash mr-1" />
              Устгах
            </button>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse ">
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
                <th className="px-4 py-3 font-bold">Эхлэх хугацаа </th>
                <th className="px-4 py-3 font-bold">Дуусах хугацаа </th>
                <th className="px-4 py-3 font-bold">Ангиллын нэр </th>
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
                      <td className="px-1 py-1 border">{data.startDate}</td>
                      <td className="px-1 py-1 border">{data.endDate}</td>
                      <td className="px-1 py-1 border">{data.name}</td>
                      <td className="px-1 py-1 border">
                        <a
                          className="text-yellow-600 hover:text-black mx-2 text-sm"
                          data-id={data}
                          onClick={() => {
                            handleEdit(data);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </a>
                        {/* <a
                            data-id={data.id}
                            onClick={showModalDelete}
                            className="text-rose-400 hover:text-black ml-2 text-sm"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </a> */}
                      </td>
                    </tr>
                  ))
                : category.map((data, i) => (
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
                      <td className="px-1 py-1 border">{data.startDate}</td>
                      <td className="px-1 py-1 border">{data.endDate}</td>
                      <td className="px-1 py-1 border">{data.name}</td>
                      {/* <td className="px-1 py-1 border">{data.createdAt}</td> */}
                      <td className="px-1 py-1 border">
                        <a
                          className="text-yellow-600 hover:text-black mx-2 text-sm"
                          data-id={data}
                          onClick={() => {
                            handleEdit(data);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </a>
                        {/* <a
                            data-id={data.id}
                            onClick={showModalDelete}
                            className="text-rose-400 hover:text-black ml-2 text-sm"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </a> */}
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

export default TrainingCategory;
