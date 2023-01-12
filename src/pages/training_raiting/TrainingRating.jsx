import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";

import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
function TrainingRating() {
  const [tRate, setTRate] = useState([]);
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const [showView, setShowView] = useState(null);
  const [TRateChoosen, setTRateChoosen] = useState();
  const [showDelete, setShowDelete] = useState(null);
  //   const showModalView = () => setShowView(true);
  const hideModalView = () => setShowView(null);
  const [id, setId] = useState();
  const hideModalDelete = () => setShowDelete(null);
  const [showEdit, setShowEdit] = useState(null);
  const hideModalEdit = () => setShowEdit(null);
  const [editData, setEditData] = useState([]);
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const [showCreateAnswers, setShowCreateAnswers] = useState(null);
  const showModalCreateAnswers = () => setShowCreateAnswers(true);
  const hideModalCreateAnswers = () => setShowCreateAnswers(null);
  const hideModalCreate = () => setShowCreate(null);
  const format = "YYYYMMDDHHmmss";
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);
  const [trains, setTrains] = useState([]);
  const [selectedOptionTrains, setSelectedOptionTrains] = useState(null);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [checkEmpty1, setcheckEmpty1] = useState(false);
  const [checkEmpty2, setcheckEmpty2] = useState(false);
  const [checkEmpty3, setcheckEmpty3] = useState(false);
  const [filteredList, setFilteredList] = useState(tRate);
  const [searchQuery, setSearchQuery] = useState("");
  const [tid, setTid] = useState();
  const [formValues, setFormValues] = useState([{ answer: "" }]);
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  let addFormFields = () => {
    setFormValues([...formValues, { name: "", maxPoints: "" }]);
  };
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setTRate(res.data.trRatingForm);
        }
        if (
          res.data.resultMessage == "Unauthorized" ||
          res.data.resultMessage == "Input string was not in a correct format."
        ) {
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
      url: `${process.env.REACT_APP_URL}/v1/Training`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setTrains(res.data.trainingList);
        }
        // console.log(trains);
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const showModalView = (data) => {
    setShowView(true);
    setTRateChoosen(data);
  };
  const handleEdit = (e) => {
    setShowEdit(true);
    setEditData(e);
  };
  const showModalDelete = (e) => {
    setShowDelete(true);
    setId(e.currentTarget.dataset.id);
  };
  const handleDelete = () => {
    console.log(id);
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/delete?trId=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => navigate(0), 1000);
          return () => clearTimeout(timer);
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
  const editDataSet = {
    id: "string",
    name: "string",
    description: "string",
    trainingId: "string",
    beginDate: "string",
    expireDate: "string",
    createdBy: "string",
    createdAt: "string",
    trRatingQuestions: [
      {
        questionId: "string",
        question: "string",
        trRatingAnswer: [
          {
            answerId: "string",
            answer: "string",
          },
        ],
      },
    ],
  };
  const navigateIndexEdit = (e) => {
    e.preventDefault();
    // axios({
    //   method: "put",
    //   headers: {
    //     Authorization: `${TOKEN}`,
    //     "Content-Type": "application/json",
    //     accept: "text/plain",
    //   },
    //   url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating`,
    //   data: JSON.stringify(editDataSet),
    // })
    //   .then((res) => {
    //     if (res.data.isSuccess === true) {
    //       console.log(res.data);
    //       notification.success(`${res.data.resultMessage}`);
    //       hideModalEdit();
    //       const timer = setTimeout(() => navigate(0), 1000);
    //       return () => clearTimeout(timer);
    //     }
    //     if (res.data.resultMessage === "Unauthorized") {
    //       logout();
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };
  const data = {
    name: `${name}`,
    description: `${description}`,
    trainingId: `${tid}`,
    beginDate: `${startDate}`,
    endDate: `${endDate}`,
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    if (name == null) {
      setcheckEmpty1(true);
    } else if (description == null) {
      setcheckEmpty2(true);
    } else if (tid == null) {
      setcheckEmpty2(true);
    } else if (startDate === endDate || startDate > endDate) {
      notification.error("Эхлэх дуусах хугацаа алдаатай байна.");
    } else {
      console.log(data);
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/add`,
        data: JSON.stringify(data),
      })
        .then((res) => {
          if (res.data.isSuccess == true) {
            notification.success(`${res.data.resultMessage}`);
            hideModalCreate();
            // const timer = setTimeout(() => showModalCreateAnswers(), 1000);
            const timer = setTimeout(() => navigate(0), 1000);
            return () => clearTimeout(timer);
          }
          if (res.data.resultMessage === "Unauthorized") {
            logout();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleTraining = (item) => {
    setTid(item.id);
    console.log(item.id);
  };
  const createAnswers = () => {};
  let unique = trains.filter(
    (value, index, self) => index === self.findIndex((t) => t.id == value.id)
  );
  let mainOption = [
    {
      createdAt: null,
      createdBy: null,
      department: null,
      endDate: null,
      id: "10000",
      name: "Бүгд",
      startDate: null,
      status: null,
    },
  ];
  mainOption.push(...unique);
  const handleOptions = (value) => {
    let filtered = tRate.filter((item) => {
      return item.trainingId === value;
    });
    setFilteredList(filtered);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = tRate.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div>
        <Modal
          show={showCreateAnswers}
          onHide={hideModalCreateAnswers}
          size="ml"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалтын үнэлгээний асуулт нэмэх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <a
                className="block mt-2 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 
                        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Асуулт
                      </label>
                      <input
                        type="text"
                        //  onChange={(e) => {
                        //      setCategoryName(e.target.value);
                        //      checkCatNameEmpty(false);
                        //  }}
                        //  id={catNameEmpty === true ? "border-red" : null}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    {formValues.map((element, index) => (
                      <div key={index}>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Хариулт
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={element.name || ""}
                          onChange={(e) => handleChange(index, e)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                        />
                        {index ? (
                          <div className="button-section float-right px-2">
                            <button
                              type="button"
                              onClick={() => removeFormFields(index)}
                              className="block mt-2 inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            >
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </a>

              <div className="float-right">
                <button
                  // onClick={submitAddCategory}
                  className="mt-2 inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  SUBMIT
                </button>
              </div>

              <div className="button-section float-right px-2">
                <button
                  type="button"
                  className="mt-2 inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  onClick={() => addFormFields()}
                >
                  Хариулт нэмэх
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showCreate}
          onHide={hideModalCreate}
          size="ml"
          style={
            activeMenu
              ? {
                  width: "calc(100% - 250px)",
                  left: "250px",
                }
              : {
                  width: "calc(100%)",
                  left: "0",
                }
          }
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалтын үнэлгээ нэмэх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="max-w-screen-lg mx-auto">
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Нэр
                </label>
                <input
                  type="text"
                  className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  onChange={(e) => {
                    setName(e.target.value);
                    setcheckEmpty1(false);
                  }}
                  id={checkEmpty1 === true ? "border-red" : null}
                />
              </div>
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Тайлбар
                </label>
                <textarea
                  className="px-3 py-2 text-blueGray-600 bg-white text-sm w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  rows="2"
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setcheckEmpty2(false);
                  }}
                  id={checkEmpty2 === true ? "border-red" : null}
                ></textarea>
              </div>
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Сургалтууд
                </label>

                {trains === null ? (
                  <p className="ml-2 mt-2">Сургалт олдсонгүй</p>
                ) : (
                  <Select
                    className="outline-none  w-full rounded bg-gray-50"
                    options={trains}
                    defaultValue={selectedOptionTrains}
                    onChange={(item) => {
                      handleTraining(item);
                      setcheckEmpty3(false);
                    }}
                    id={checkEmpty3 === true ? "border-red" : null}
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue && "Сонголт хоосон байна"
                    }
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                  />
                )}
              </div>
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Эхлэх хугацаа
                </label>
                <DatePicker
                  className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  selected={date1}
                  onChange={(date) => setDate1(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  selectsStart
                  startDate={date1}
                  dateFormat="yyyy.MM.dd, HH:mm"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Дуусах хугацаа
                </label>

                <DatePicker
                  className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  selected={date2}
                  onChange={(date) => setDate2(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  selectsStart
                  startDate={date2}
                  dateFormat="yyyy.MM.dd, HH:mm"
                />
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
        <Modal
          show={showView}
          onHide={hideModalView}
          size="lg"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{TRateChoosen?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="col-span-1 text-right mt-4">
                <div className="inline-flex items-end">
                  <button
                    onClick={createAnswers}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Асуулт нэмэх
                  </button>
                </div>
              </div>
              {TRateChoosen
                ? TRateChoosen.trRatingQuestions.map((question, i) => (
                    <div key={i}>
                      <div className="flex justify-between w-full px-4 py-2">
                        <div className="text-lg font-bold">
                          Асуулт: {question?.question}
                        </div>
                      </div>
                      <div className="mt-6 overflow-x-auto">
                        <table className="w-full border border-collapse table-auto">
                          <thead className="">
                            <tr className="text-base font-bold text-left bg-gray-50">
                              <th className="px-4 py-3 border-b-2 border-red-500">
                                №
                              </th>
                              <th className="px-4 py-3 border-b-2 border-yellow-500">
                                Асуултууд
                              </th>
                              <th className="px-4 py-3 text-center border-b-2 border-pink-500 sm:text-left">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-sm font-normal text-gray-900">
                            {question
                              ? question.trRatingAnswer.map((answer, i) => (
                                  <tr
                                    key={i}
                                    className="py-10 border-b border-gray-200 hover:bg-gray-200"
                                    data-id={answer}
                                    //   onClick={() => {
                                    //     showModalView(answer);
                                    //   }}
                                  >
                                    <td className="flex flex-row items-center px-4 py-4">
                                      {i + 1}
                                    </td>
                                    <td className="px-4 py-4">
                                      {answer?.answer}
                                    </td>

                                    <td className="px-4 py-4">
                                      <a
                                        className="text-yellow-600 hover:text-black ml-2 text-lg"
                                        data-id={answer}
                                        //   onClick={() => {
                                        //     handleEdit(data);
                                        //   }}
                                      >
                                        <i className="bi bi-pencil-square"></i>
                                      </a>
                                      <a
                                        data-id={answer.id}
                                        //   onClick={showModalDelete}
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
                      </div>
                    </div>
                  ))
                : "Үнэлгээнд харгалзах асуулт байхгүй байна."}
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showDelete}
          onHide={hideModalDelete}
          size="ml"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалтын үнэлгээ устгах</Modal.Title>
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
        <Modal
          show={showEdit}
          onHide={hideModalEdit}
          size="ml"
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалтын үнэлгээ засах</Modal.Title>
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
                    // onChange={(e) => {
                    //   setNameEdit(e.target.value);
                    // }}
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

      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none  sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Сургалтын үнэлгээ ({`${tRate.length}`})
            </p>
          </div>
        </div>
        <div className="sm:flex items-center justify-between p-2">
          <div className="flex items-center">
            <select
              onChange={(e) => {
                handleOptions(e.target.value);
              }}
            >
              {mainOption.map((el, i) => (
                <option key={i} value={`${el.id}`}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className=" relative ">
              <input
                value={searchQuery}
                onChange={handleSearch}
                type="text"
                name="search"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Нэрээр хайх"
              />
            </div>
            <button
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              <i className="bi bi-search" />
            </button>
            <button
              className="flex-shrink-0 px-2 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              onClick={showModalCreate}
            >
              <i className="bi bi-plus text-bold mr-1" />
              Үнэлгээ нэмэх
            </button>
          </div>
        </div>
        {filteredList.length > 0
          ? filteredList.map((data, index) => (
              <div key={index} className="p-2">
                {/* <div class="max-w-lg mx-auto overflow-hidden rounded-lg shadow-lg pricing-box lg:max-w-none lg:flex">
                  <div class="px-6 py-8 bg-white dark:bg-gray-800 lg:flex-shrink-1 lg:p-12">
                    <h3 class="text-2xl font-extrabold leading-8 text-gray-900 sm:text-3xl sm:leading-9 dark:text-white">
                      Zero Commission
                    </h3>
                    <p class="mt-6 text-base leading-6 text-gray-500 dark:text-gray-200">
                      Start selling online for free with all the features you
                      need to launch your local delivery and pick-up service,
                      nothing more. We don&#x27;t charge commission or monthly
                      fees, keep all your margin.
                    </p>
                    <div class="mt-8">
                      <div class="flex items-center">
                        <h4 class="flex-shrink-0 pr-4 text-sm font-semibold leading-5 tracking-wider text-indigo-600 uppercase bg-white dark:bg-gray-800">
                          What&#x27;s included
                        </h4>
                        <div class="flex-1 border-t-2 border-gray-200"></div>
                      </div>
                      <ul class="mt-8 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            All illimited components
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Own custom Tailwind styles
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Unlimited Templates
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Free premium dashboard
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Best ranking
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Prenium svg
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            My wife
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div class="mt-8">
                      <div class="flex items-center">
                        <h4 class="flex-shrink-0 pr-4 text-sm font-semibold leading-5 tracking-wider text-indigo-600 uppercase bg-white dark:bg-gray-800">
                          &amp; What&#x27;s not
                        </h4>
                      </div>
                      <ul class="mt-8 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              class="w-6 h-6 mr-2"
                              fill="red"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            No Contracts. No monthly, setup, or additional
                            payment processor fees
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              class="w-6 h-6 mr-2"
                              fill="red"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            No 2-week on-boarding, it takes 20 minutes!
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="px-6 py-8 text-center bg-gray-50 dark:bg-gray-700 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                    <p class="text-lg font-bold leading-6 text-gray-900 dark:text-white">
                      Free
                    </p>
                    <div class="flex items-center justify-center mt-4 text-5xl font-extrabold leading-none text-gray-900 dark:text-white">
                      <span>$0/mo</span>
                    </div>
                    <p class="mt-4 text-sm leading-5">
                      <span class="block font-medium text-gray-500 dark:text-gray-400">
                        Card payments:
                      </span>
                      <span class="inline-block font-medium text-gray-500  dark:text-gray-400">
                        2.9% + 20p per transaction
                      </span>
                    </p>
                    <div class="mt-6">
                      <div class="rounded-md shadow">
                        <button
                          type="button"
                          class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          Create your store
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            ))
          : tRate?.map((data, index) => (
              <div key={index} className="p-2">
                {/* <div class="max-w-lg mx-auto overflow-hidden rounded-lg shadow-lg pricing-box lg:max-w-none lg:flex">
                  <div class="px-6 py-8 bg-white dark:bg-gray-800 lg:flex-shrink-1 lg:p-12">
                    <h3 class="text-2xl font-extrabold leading-8 text-gray-900 sm:text-3xl sm:leading-9 dark:text-white">
                      Zero Commission
                    </h3>
                    <p class="mt-6 text-base leading-6 text-gray-500 dark:text-gray-200">
                      Start selling online for free with all the features you
                      need to launch your local delivery and pick-up service,
                      nothing more. We don&#x27;t charge commission or monthly
                      fees, keep all your margin.
                    </p>
                    <div class="mt-8">
                      <div class="flex items-center">
                        <h4 class="flex-shrink-0 pr-4 text-sm font-semibold leading-5 tracking-wider text-indigo-600 uppercase bg-white dark:bg-gray-800">
                          What&#x27;s included
                        </h4>
                        <div class="flex-1 border-t-2 border-gray-200"></div>
                      </div>
                      <ul class="mt-8 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            All illimited components
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Own custom Tailwind styles
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Unlimited Templates
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Free premium dashboard
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Best ranking
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            Prenium svg
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              class="w-6 h-6 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              stroke="currentColor"
                              fill="#10b981"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            My wife
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div class="mt-8">
                      <div class="flex items-center">
                        <h4 class="flex-shrink-0 pr-4 text-sm font-semibold leading-5 tracking-wider text-indigo-600 uppercase bg-white dark:bg-gray-800">
                          &amp; What&#x27;s not
                        </h4>
                      </div>
                      <ul class="mt-8 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              class="w-6 h-6 mr-2"
                              fill="red"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            No Contracts. No monthly, setup, or additional
                            payment processor fees
                          </p>
                        </li>
                        <li class="flex items-start lg:col-span-1">
                          <div class="flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="6"
                              class="w-6 h-6 mr-2"
                              fill="red"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                            </svg>
                          </div>
                          <p class="ml-3 text-sm leading-5 text-gray-700 dark:text-gray-200">
                            No 2-week on-boarding, it takes 20 minutes!
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="px-6 py-8 text-center bg-gray-50 dark:bg-gray-700 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                    <p class="text-lg font-bold leading-6 text-gray-900 dark:text-white">
                      Free
                    </p>
                    <div class="flex items-center justify-center mt-4 text-5xl font-extrabold leading-none text-gray-900 dark:text-white">
                      <span>$0/mo</span>
                    </div>
                    <p class="mt-4 text-sm leading-5">
                      <span class="block font-medium text-gray-500 dark:text-gray-400">
                        Card payments:
                      </span>
                      <span class="inline-block font-medium text-gray-500  dark:text-gray-400">
                        2.9% + 20p per transaction
                      </span>
                    </p>
                    <div class="mt-6">
                      <div class="rounded-md shadow">
                        <button
                          type="button"
                          class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          Create your store
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default TrainingRating;
