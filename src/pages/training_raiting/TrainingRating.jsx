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
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
function TrainingRating() {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const { width } = getWindowDimensions();
  const [trains, setTrains] = useState([]);
  const [tRate, setTRate] = useState([]);
  const [filteredList, setFilteredList] = useState(tRate);
  const [id, setId] = useState();
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [showDeleteAnswer, setShowDeleteAnswer] = useState(null);
  const hideModalDeleteAnswer = () => setShowDeleteAnswer(null);
  const [showCreate, setShowCreate] = useState(null);
  const [showQuestion, setShowQuestion] = useState(null);
  const hideModalQuestion = () => setShowQuestion(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const format = "YYYYMMDDHHmmss";
  const today = new Date();
  const nowdateTime = moment(today).format(format);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [selectedOptionTrains, setSelectedOptionTrains] = useState(null);
  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);
  const [checkEmpty1, setcheckEmpty1] = useState(false);
  const [checkEmpty2, setcheckEmpty2] = useState(false);
  const [checkEmpty3, setcheckEmpty3] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tid, setTid] = useState();
  const [trateID, setTrateID] = useState();
  const [qId, setQId] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          // alert(res.data.resultMessage);
        }
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
        if (res.data.isSuccess === false) {
          // alert(res.data.resultMessage);
        }
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
  const navigateView = (data) => {
    navigate("/train-rate-view", {
      state: { data: data },
    });
  };
  const handleEdit = (data) => {
    navigate("/edit-train-rate", {
      state: { data: data },
    });
  };
  const showModalDelete = (data) => {
    setShowDelete(true);
    setId(data.id);
  };
  const showModalDeleteAnswer = (question) => {
    setShowDeleteAnswer(true);
    console.log(question);
    setQId(question.questionId);
  };
  const showModalQuestion = (data) => {
    setTrateID(data.id);
    setShowQuestion(true);
  };
  const showModalQuestionNew = () => {
    setShowQuestion(true);
  };
  const handleDelete = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/delete?trId=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
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
  const handleDeleteAnswer = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/deletequestion?queId=${qId}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
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
          if (res.data.isSuccess === false) {
            // alert(res.data.resultMessage);
          }
          if (res.data.isSuccess == true) {
            setTrateID(res.data.id);
            // notification.success(`${res.data.resultMessage}`);
            hideModalCreate();
            const timer = setTimeout(() => showModalQuestionNew(), 500);
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
  };
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchList = tRate.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(searchList);
  };
  const [question, setQuestion] = useState();
  const [checkEmpty11, setcheckEmpty11] = useState(false);
  const [formFields, setFormFields] = useState([{ answer: "", points: "" }]);

  const dataQUEST = {
    ratingId: `${trateID}`,
    questions: [
      {
        questionName: `${question}`,
        trRatingAnswer: formFields,
      },
    ],
  };
  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };
  const addFields = () => {
    let object = {
      answer: "",
      points: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };
  const submit = (e) => {
    e.preventDefault();
    if (question == null) {
      setcheckEmpty11(true);
    } else if (formFields[0].answer === "") {
      notification.error("Хариулт хоосон байна.");
    } else {
      axios({
        method: "post",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/addquestion`,
        data: dataQUEST,
      }).then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.isSuccess == true) {
          notification.success(`${res.data.resultMessage}`);
          hideModalQuestion();
          const timer = setTimeout(() => navigate(0), 500);
          return () => clearTimeout(timer);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      });
      //   .catch((err) => console.log(err));
    }
  };

  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div>
        <Modal
          show={showQuestion}
          onHide={hideModalQuestion}
          size="xl"
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
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Асуулт нэмэх</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4 grid grid-cols-1 gap-4  sm:grid-cols-1">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Асуулт
                </label>
                <input
                  className="px-3 py-3 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    setcheckEmpty11(false);
                  }}
                  id={checkEmpty11 === true ? "border-red" : null}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                {formFields.map((form, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Хариулт
                        </label>
                        <input
                          name="answer"
                          type="text"
                          className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          onChange={(event) => handleFormChange(event, index)}
                          value={form.answer}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Оноо
                        </label>
                        <input
                          name="points"
                          type="number"
                          className="px-3 py-2 text-blueGray-600 bg-white text-sm  w-full rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          onChange={(event) => handleFormChange(event, index)}
                          value={form.points}
                        />
                      </div>
                      <div>
                        <button
                          onClick={() => removeFields(index)}
                          className="mt-2 px-3 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                          <i className="bi bi-trash-fill" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-right">
                <div className="inline-flex items-end"></div>
              </div>
              <div className="mt-4 text-right text-xs">
                <div className="inline-flex items-end">
                  <button
                    onClick={addFields}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Хариулт нэмэх
                  </button>
                  <button
                    onClick={submit}
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Болсон
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showCreate}
          onHide={hideModalCreate}
          size="ml"
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
                  rows="4"
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Дараах
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
            <span className="text-xl text-black">Сургалтын үнэлгээ устгах</span>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Та сургалтын үнэлгээг устгахдаа итгэлтэй уу?
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
          show={showDeleteAnswer}
          onHide={hideModalDeleteAnswer}
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
            <span className="text-xl text-black">Үнэлгээний асуулт устгах</span>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Та сургалтын үнэлгээнд харгалзах асуултыг устгахдаа итгэлтэй
                байна уу?
              </h3>
              <button
                type="button"
                onClick={handleDeleteAnswer}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Тийм
              </button>
              <button
                onClick={hideModalDeleteAnswer}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Үгүй
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-xl lg:text-xl font-bold leading-normal text-gray-800">
              Сургалтын үнэлгээ
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
                placeholder="Үнэлгээний нэр"
              />

              <button
                type="button"
                className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
              >
                <i className="bi bi-search" />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0 md:justify-end sm:justify-end">
            <button
              className="flex-shrink-0 px-2 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              onClick={showModalCreate}
            >
              Үнэлгээ нэмэх
            </button>
          </div>
        </div>

        {tRate?.map((data, index) => (
          <div key={index} className="p-2">
            <div className="max-w-full mx-auto overflow-hidden border border-t-2 rounded-lg shadow-lg pricing-box lg:max-w-none lg:flex mt-2">
              <div className="w-full px-6 py-8 bg-white  lg:flex-shrink-2 lg:p-12">
                <h3 className="text-lg font-bold leading-8 text-gray-900 sm:text-lg sm:leading-9 dark:text-white">
                  {data.name}
                </h3>
                <p className="mt-2 text-base leading-6 text-gray-500 dark:text-gray-200">
                  {data.description}
                </p>

                {data.trRatingQuestions.length > 0 ? (
                  data.trRatingQuestions?.map((question, i) => (
                    <div key={i} className="mt-2">
                      <div className="sm:flex items-center justify-between p-2">
                        <div className="flex items-center w-full">
                          <h3 className="text-sm leading-8 text-indigo-600 uppercase bg-white">
                            {question.question}
                          </h3>{" "}
                        </div>
                        <div className="flex flex-col justify-center max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                          <a
                            data-id={question}
                            onClick={() => showModalDeleteAnswer(question)}
                            className="text-rose-400 hover:text-black "
                          >
                            <i className="bi bi-trash-fill mr-2"></i> Асуулт
                            устгах
                          </a>
                        </div>
                      </div>

                      <table className="items-center w-full bg-transparent border-collapse ">
                        <thead>
                          <tr className="text-sm text-left bg-gray-200 border-b">
                            <th className="px-4 py-1 font-bold">Хариулт </th>
                            <th className="px-4 py-1 font-bold">Оноо</th>
                          </tr>
                        </thead>
                        {question.trRatingAnswer.length > 0 ? (
                          question.trRatingAnswer?.map((answer, ind) => (
                            <tbody key={ind} className="bg-white text-sm">
                              <tr className="focus:outline-none h-8 border border-gray-100 rounded">
                                <td className="px-1 py-1 border">
                                  {answer.answer}
                                </td>
                                <td className="px-1 py-1 border">
                                  {answer.points}
                                </td>
                              </tr>
                            </tbody>
                          ))
                        ) : (
                          <div
                            className="bg-red-200 border-red-600 text-red-600 border-l-2 p-1"
                            role="alert"
                          >
                            <p className="font-bold text-xs">
                              Хариулт үүсээгүй байна.
                            </p>
                          </div>
                        )}
                      </table>
                    </div>
                  ))
                ) : (
                  <div
                    className="bg-red-200 border-red-600 text-red-600 border-l-2 p-1"
                    role="alert"
                  >
                    <p className="font-bold">Асуулт үүсээгүй байна.</p>
                  </div>
                )}
              </div>
              <div className="px-4 py-4 text-center bg-gray-50 dark:bg-gray-700 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                <ul className="w-full mt-4 mb-4 text-sm text-gray-600 dark:text-gray-100">
                  {data.beginDate === null ? (
                    ""
                  ) : (
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0 text-emerald-500 text-lg">
                        <i className="bi bi-calendar-check" />
                      </div>

                      <p className="ml-3 text-sm leading-5 text-gray-700 ">
                        Эхлэх хугацаа: {data.beginDate}
                      </p>
                    </li>
                  )}
                  {data.expireDate === null ? (
                    ""
                  ) : (
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0 text-emerald-500 text-lg">
                        <i className="bi bi-calendar-check-fill" />
                      </div>
                      {nowdateTime >= data.expireDate ? (
                        <p className="ml-3 text-sm leading-5 text-gray-700 ">
                          Дуусах хугацаа: {data.expireDate}
                        </p>
                      ) : (
                        <p className="ml-3 text-sm leading-5 text-red-500 ">
                          Дуусах хугацаа: {data.expireDate} (Хугацаа дууссан)
                        </p>
                      )}
                    </li>
                  )}
                  {data.trRatingQuestions.length === 0 ? (
                    ""
                  ) : (
                    <li className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0 text-emerald-500 text-lg">
                        <i className="bi bi-card-checklist" />
                      </div>
                      <p className="ml-3 text-sm leading-5 text-gray-700 ">
                        Асуултын тоо: {data.trRatingQuestions.length}
                      </p>
                    </li>
                  )}
                </ul>
                <div className="mt-2 px-2 py-2">
                  <button
                    onClick={() => {
                      showModalQuestion(data);
                    }}
                    className="mb-2 py-2  text-xs  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    <i className="bi bi-pencil-square mr-1" /> Асуулт нэмэх
                  </button>
                  <button
                    data-id={data}
                    onClick={() => {
                      handleEdit(data);
                    }}
                    className="mb-2 py-2 text-xs  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    <i className="bi bi-pencil-square mr-1" /> Үнэлгээ засварлах
                  </button>
                  <button
                    onClick={() => {
                      navigateView(data);
                    }}
                    className="mb-2 py-2  text-xs  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    <i className="bi bi-eye-fill mr-1" /> Хариултууд харах
                  </button>
                  <button
                    data-id={data}
                    onClick={() => {
                      showModalDelete(data);
                    }}
                    className="py-2 text-xs bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    <i className="bi bi-trash-fill mr-1" /> Устгах
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default TrainingRating;
