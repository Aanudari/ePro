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
  const [tRate, setTRate] = useState();
  const location = useLocation();
  const { TOKEN } = useStateContext();
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
      url: `http://192.168.10.248:9000/v1/TrainingRating/rating`,
    })
      .then((res) => {
        setTRate(res.data.trRatingForm);

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
      url: `http://192.168.10.248:9000/v1/Training`,
    })
      .then((res) => {
        setTrains(res.data.trainingList);
        // console.log(trains);
        if (res.data.resultMessage === "Unauthorized") {
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
      url: `http://192.168.10.248:9000/v1/TrainingRating/rating/delete?trId=${id}`,
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
    axios({
      method: "put",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `http://192.168.10.248:9000/v1/TrainingRating/rating`,
      data: JSON.stringify(editDataSet),
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess === true) {
          console.log(res.data);
          notification.success(`${res.data.resultMessage}`);
          hideModalEdit();
          const timer = setTimeout(() => navigate(0), 1000);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => console.log(err));
  };
  const data = {
    name: `${name}`,
    description: `${description}`,
    trainingId: `${tid}`,
    beginDate: `${startDate}`,
    endDate: `${endDate}`,
  };
  const navigateIndex = (e) => {
    console.log(data);
    e.preventDefault();
    if (name.length == 0) {
      setcheckEmpty1(true);
    }
    if (description.length == 0) {
      setcheckEmpty2(true);
    }
    if (tid.length == 0) {
      setcheckEmpty2(true);
    } else {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `http://192.168.10.248:9000/v1/TrainingRating/rating/add`,
        data: JSON.stringify(data),
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.isSuccess == true) {
            notification.success(`${res.data.resultMessage}`);
            hideModalCreate();
            const timer = setTimeout(() => showModalCreateAnswers(), 1000);
            return () => clearTimeout(timer);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleTraining = (item) => {
    setTid(item.id);
  };
  const createAnswers = () => {};
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
          //   backdrop="static"
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
                  description
                </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input
                    type="text"
                    className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setcheckEmpty2(false);
                    }}
                    id={checkEmpty2 === true ? "border-red" : null}
                  />
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  trainingId
                </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 ">
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
          //   backdrop="static"
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
          //   backdrop="static"
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
          //   backdrop="static"
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
      <div className="container mx-auto ">
        <div className="flex justify-between w-full px-4 py-2">
          <div className="text-lg font-bold">Сургалтын үнэлгээ</div>
          <div className="px-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            <i className="bi bi-clipboard-plus" onClick={showModalCreate} />
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border border-collapse table-auto">
            <thead className="">
              <tr className="text-base font-bold text-left bg-gray-50">
                <th className="px-4 py-3 border-b-2 border-red-500">no</th>
                <th className="px-4 py-3 border-b-2 border-yellow-500">name</th>
                <th className="px-4 py-3 border-b-2 border-green-500">
                  trainingId
                </th>
                <th className="px-4 py-3 text-center border-b-2 border-blue-500 sm:text-left">
                  beginDate
                </th>
                <th className="px-4 py-3 border-b-2 border-purple-500">
                  expireDate
                </th>
                <th className="px-4 py-3 text-center border-b-2 border-pink-500 sm:text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-900">
              {tRate
                ? tRate.map((data, i) => (
                    <tr
                      key={i}
                      className="py-10 border-b border-gray-200 hover:bg-gray-200"
                      data-id={data}
                    >
                      <td className="flex flex-row items-center px-4 py-4">
                        {i + 1}
                      </td>
                      <td className="px-4 py-4">{data.name}</td>
                      <td className="px-4 py-4">{data.trainingId}</td>
                      <td className="px-4 py-4">{data.beginDate}</td>
                      <td className="px-4 py-4">{data.expireDate}</td>
                      <td className="px-4 py-4">
                        <a
                          data-id={data.id}
                          onClick={() => {
                            showModalView(data);
                          }}
                          className="text-blue-400 hover:text-black ml-2  text-lg"
                        >
                          <i className="bi bi-eye-fill"></i>
                        </a>
                        <a
                          className="text-yellow-600 hover:text-black ml-2 text-lg"
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
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default TrainingRating;
