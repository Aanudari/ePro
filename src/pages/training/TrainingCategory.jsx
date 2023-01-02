import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Modal } from "react-bootstrap";

import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";
function TrainingCategory() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const [checkEmpty1, setcheckEmpty1] = useState(false);
  const [checkEmpty2, setcheckEmpty2] = useState(false);
  const [category, setCategory] = useState();
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const [showDelete, setShowDelete] = useState(null);
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
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/department`,
    })
      .then((res) => {
        setDepartment(res.data.departments);
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
      url: `${process.env.REACT_APP_URL}/v1/Training/category`,
    })
      .then((res) => {
        setCategory(res.data.trainingCatList);
        if (res.data.isSuccess == true) {
          setCategory(res.data.trainingCatList);
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
  const handleCreate = () => {
    setShowCreate(true);
    // setId(e.currentTarget.dataset.id);
  };
  const handleDelete = () => {
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
          const timer = setTimeout(() => navigate(0), 1000);
          return () => clearTimeout(timer);
        } else {
          console.log(res.data.resultMessage);
        }
      })
      .catch((err) => console.log(err));
  };
  const data = {
    name: `${name}`,
    startDate: `${startDate}`,
    endDate: `${endDate}`,
    department: `${departmentID}`,
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    if (name.length == 0) {
      setcheckEmpty1(true);
    }
    if (departmentID.length == 0) {
      setcheckEmpty2(true);
    } else {
      console.log(data);
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
          if (res.data.isSuccess == true) {
            notification.success(`${res.data.resultMessage}`);
            hideModalCreate();
            const timer = setTimeout(() => navigate(0), 1000);
            return () => clearTimeout(timer);
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
        console.log(res.data);
        if (res.data.isSuccess === true) {
          console.log(res.data);
          notification.success(`${res.data.resultMessage}`);
          hideModalCreate();
          const timer = setTimeout(() => navigate(0), 1000);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-screen bg-gray-50">
      <div>
        //create
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
            <Modal.Title>Ангилал нэмэх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="max-w-screen-lg mx-auto">
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  name
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  startDate
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  endDate
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  department
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
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
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
          //   backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Ангилал устгах</Modal.Title>
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
        //edit
        <Modal
          show={showEdit}
          onHide={hideModalEdit}
          size="ml"
          //   backdrop="static"
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
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
            <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Сургалтын ангилал
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
              Ангилал нэмэх
            </button>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse ">
              <thead>
                <tr className="text-sm text-left  bg-gray-200 border-b">
                  <th className="px-4 py-3 font-bold">no </th>
                  <th className="px-4 py-3 font-bold">startDate </th>
                  <th className="px-4 py-3 font-bold">endDate </th>
                  <th className="px-4 py-3 font-bold">name </th>
                  <th className="px-4 py-3 font-bold">createdAt</th>
                  <th className="px-4 py-3 font-bold">Action </th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm">
                {category
                  ? category.map((data, i) => (
                      <tr key={i}>
                        <td className="px-1 py-1 border">{i + 1}</td>
                        <td className="px-1 py-1 border">{data.startDate}</td>
                        <td className="px-1 py-1 border">{data.endDate}</td>
                        <td className="px-1 py-1 border">{data.name}</td>
                        <td className="px-1 py-1 border">{data.createdAt}</td>
                        <td className="px-1 py-1 border">
                          <a
                            className="text-yellow-600 hover:text-black mx-2 text-lg"
                            data-id={data}
                            onClick={() => {
                              handleEdit(data);
                            }}
                          >
                            <i className="bi bi-pencil-square"></i>
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

export default TrainingCategory;
