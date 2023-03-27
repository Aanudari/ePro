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
  const [filteredList, setFilteredList] = useState([]);
  const [id, setId] = useState();
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const format = "YYYYMMDDHHmmss";
  const today = new Date();
  const [trigger, setTrigger] = useState(false);
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
        }
        if (res.data.isSuccess === true) {
          setTRate(res.data.trRatingForm);
          setFilteredList(res.data.trRatingForm);
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
      url: `${process.env.REACT_APP_URL}/v1/Training`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
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
  }, [trigger]);
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

  const data = {
    name: `${name}`,
    description: `${description}`,
    trainingId: `${tid}`,
    beginDate: `${startDate}`,
    endDate: `${endDate}`,
  };
  const navigateIndex = (e) => {
    e.preventDefault();
    if (name === null) {
      setcheckEmpty1(true);
    } else if (description === null) {
      setcheckEmpty2(true);
    } else if (tid === null) {
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
          }
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            setTrigger(!trigger);
            hideModalCreate();
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

  const navigateChoosedTRate = (data) => {
    navigate("/chosed-trate", {
      state: { data: data },
    });
  };
  const navigateRatingReport = (data) => {
    navigate("/rating-report", {
      state: { data: data },
    });
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div>
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
            <Modal.Title>
              {" "}
              <p className="text-xl font-normal text-white text-center">
                Сургалтын үнэлгээ нэмэх
              </p>
            </Modal.Title>
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
              <div className="col-span-1 text-right text-sm mt-4">
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
            <p className="text-xl font-normal text-white text-center">
              Сургалтын үнэлгээ устгах
            </p>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Та сургалтын үнэлгээг устгахдаа итгэлтэй уу?
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

      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="focus:outline-none text-base sm:text-sm md:text-sm lg:text-sm font-bold leading-normal text-gray-800">
              Сургалтын үнэлгээ{" "}
              {filteredList.length > 0
                ? `(${filteredList.length})`
                : `(${tRate.length})`}
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
              onClick={showModalCreate}
              className="bg-green-600 border border-green-600 shadow p-2 rounded text-white flex items-center focus:outline-none focus:shadow-outline"
            >
              <span className="mx-2">Үнэлгээ нэмэх</span>
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

        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    №
                  </th>
                  <th className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    Нэр
                  </th>

                  <th className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    Сургалт
                  </th>
                  <th className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    Статус
                  </th>
                  <th className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredList?.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-100 ">
                    <td className="px-5 py-3 text-sm  border-b ">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {index + 1}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-5 py-3 text-sm  border-b cursor-pointer"
                      onClick={() => {
                        navigateRatingReport(data);
                      }}
                    >
                      <p className="text-gray-900 whitespace-no-wrap">
                        {data.name}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-sm  border-b ">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {data.trainingName}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-sm  border-b ">
                      {moment(today).format(format) >=
                      moment(data.expireDate).format(format) ? (
                        <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-500 bg-red-200 rounded-md">
                          ИДЭВХГҮЙ
                        </span>
                      ) : (
                        <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 bg-green-200 rounded-md">
                          ИДЭВХТЭЙ
                        </span>
                      )}
                      {data.trRatingQuestions.length === 0 ? (
                        <span className="flex items-center px-2 py-1 text-xs font-semibold text-red-500 bg-red-200 rounded-md mt-2">
                          Асуулт үүсээгүй
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3 text-sm  border-b ">
                      <div className="flex items-center">
                        <a
                          className="text-blue-600 hover:text-black mx-2 text-lg"
                          onClick={() => {
                            navigateChoosedTRate(data);
                          }}
                        >
                          <i className="bi bi-question-circle-fill"></i>
                        </a>

                        <a
                          className="text-yellow-600 hover:text-black mx-2 text-lg"
                          onClick={() => {
                            handleEdit(data);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </a>
                        <a
                          onClick={() => {
                            showModalDelete(data);
                          }}
                          className="text-rose-400 hover:text-black ml-2 text-lg"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TrainingRating;
