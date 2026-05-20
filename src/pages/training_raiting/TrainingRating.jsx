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
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const { width } = getWindowDimensions();

  const [trains, setTrains] = useState([]);
  const [tRate, setTRate] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [id, setId] = useState();
  const [showDelete, setShowDelete] = useState(null);
  const [showCreate, setShowCreate] = useState(null);

  const format = "YYYYMMDDHHmmss";
  const today = new Date();

  const [trigger, setTrigger] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tid, setTid] = useState("");

  const startDate = moment(date1).format(format);
  const endDate = moment(date2).format(format);

  const [checkEmpty1, setcheckEmpty1] = useState(false);
  const [checkEmpty2, setcheckEmpty2] = useState(false);
  const [checkEmpty3, setcheckEmpty3] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const hideModalDelete = () => setShowDelete(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);

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
          setTRate(res.data.trRatingForm || []);
          setFilteredList(res.data.trRatingForm || []);
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
        if (res.data.isSuccess === true) {
          setTrains(res.data.trainingList || []);
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
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          setTrigger(!trigger);
          hideModalDelete();
        }

        if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
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

    if (!name) {
      setcheckEmpty1(true);
    } else if (!description) {
      setcheckEmpty2(true);
    } else if (!tid) {
      setcheckEmpty3(true);
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
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            setTrigger(!trigger);
            hideModalCreate();
            setName("");
            setDescription("");
            setTid("");
          }

          if (res.data.isSuccess === false) {
            notification.error(`${res.data.resultMessage}`);
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
      return item.name?.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredList(searchList);
  };

  const handleDownloadClick = (data) => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ReportDownload/reportDownloader/3/${data.id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          window.open(res.data.excelFile);
        } else if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        } else {
          notification.error(res.data.resultMessage);
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error("Тайлан татах үед алдаа гарлаа.");
      });
  };

  const isExpired = (data) => {
    return (
      moment(today).format(format) >= moment(data.expireDate).format(format)
    );
  };

  return (
    <div className="min-h-[calc(100vh-56px)] w-full bg-slate-50">
      <Navigation />

      <Modal
        show={showCreate}
        onHide={hideModalCreate}
        size="ml"
        style={
          width < 768
            ? { width: "calc(100%)", left: "0" }
            : { width: "calc(100% - 250px)", left: "250px" }
        }
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-100w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-xl font-semibold text-slate-800">
              Сургалтын үнэлгээ нэмэх
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Нэр
              </label>
              <input
                type="text"
                value={name}
                className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 ${
                  checkEmpty1 ? "border-red-400" : "border-slate-200"
                }`}
                placeholder="Үнэлгээний нэр"
                onChange={(e) => {
                  setName(e.target.value);
                  setcheckEmpty1(false);
                }}
              />
              {checkEmpty1 && (
                <p className="mt-1 text-xs text-red-500">Нэр оруулна уу.</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Тайлбар
              </label>
              <textarea
                className={`w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 ${
                  checkEmpty2 ? "border-red-400" : "border-slate-200"
                }`}
                rows="4"
                placeholder="Үнэлгээний тайлбар"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setcheckEmpty2(false);
                }}
              />
              {checkEmpty2 && (
                <p className="mt-1 text-xs text-red-500">Тайлбар оруулна уу.</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Сургалтууд
              </label>

              <Select
                className="text-sm"
                options={trains}
                onChange={(item) => {
                  handleTraining(item);
                  setcheckEmpty3(false);
                }}
                noOptionsMessage={({ inputValue }) =>
                  !inputValue && "Сонголт хоосон байна"
                }
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
              />

              {checkEmpty3 && (
                <p className="mt-1 text-xs text-red-500">Сургалт сонгоно уу.</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Эхлэх хугацаа
                </label>
                <DatePicker
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
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

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Дуусах хугацаа
                </label>
                <DatePicker
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
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
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={navigateIndex}
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Үүсгэх
              </button>
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
            ? { width: "calc(100%)", left: "0" }
            : { width: "calc(100% - 250px)", left: "250px" }
        }
        keyboard={false}
        dialogClassName="modal-100w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-xl font-semibold text-slate-800">
              Сургалтын үнэлгээ устгах
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-600 bg-red-100 rounded-full">
              <i className="text-xl bi bi-trash" />
            </div>

            <p className="mb-5 text-sm text-gray-500">
              Та сургалтын үнэлгээг устгахдаа итгэлтэй юу?
            </p>

            <button
              type="button"
              onClick={handleDelete}
              className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
            >
              Тийм
            </button>

            <button
              onClick={hideModalDelete}
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              Үгүй
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="p-4 mb-5 bg-white border shadow-sm rounded-2xl border-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Сургалтын үнэлгээ
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Нийт {filteredList?.length || 0} үнэлгээ
              </p>
            </div>

            <button
              onClick={showModalCreate}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
              type="button"
            >
              <i className="bi bi-plus-lg" />
              Үнэлгээ нэмэх
            </button>
          </div>

          <div className="relative mt-4">
            <input
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-4 pr-10 text-sm border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Үнэлгээний нэрээр хайх..."
              type="text"
            />
            <i className="absolute -translate-y-1/2 bi bi-search right-3 top-1/2 text-slate-500" />
          </div>
        </div>

        <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse">
              <thead>
                <tr className="text-xs text-left uppercase border-b bg-slate-50 text-slate-500">
                  <th className="w-16 px-4 py-3 font-semibold">№</th>
                  <th className="px-4 py-3 font-semibold">Үнэлгээний нэр</th>
                  <th className="px-4 py-3 font-semibold">Сургалтын нэр</th>
                  <th className="px-4 py-3 font-semibold">Төлөв</th>
                  <th className="w-56 px-4 py-3 font-semibold text-center">
                    Үйлдэл
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-slate-100">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 text-slate-500">
                        <i className="text-xl bi bi-star" />
                      </div>
                      <p className="font-medium text-slate-700">
                        Үнэлгээ олдсонгүй
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Хайлт эсвэл жагсаалтаа дахин шалгана уу.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredList.map((data, index) => (
                    <tr key={data.id || index} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-500">{index + 1}</td>

                      <td
                        className="px-4 py-3 cursor-pointer"
                        onClick={() => navigateRatingReport(data)}
                      >
                        <p className="font-medium text-slate-900">
                          {data.name}
                        </p>
                        <p className="mt-1 text-xs line-clamp-1 text-slate-400">
                          {data.description}
                        </p>
                      </td>

                      <td className="px-4 py-3 text-slate-700">
                        {data.trainingName}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {isExpired(data) ? (
                            <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                              ИДЭВХГҮЙ
                            </span>
                          ) : (
                            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                              ИДЭВХТЭЙ
                            </span>
                          )}

                          {data.trRatingQuestions?.length === 0 && (
                            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                              Асуулт үүсээгүй
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            className="inline-flex items-center justify-center text-blue-600 rounded-lg h-9 w-9 hover:bg-blue-50"
                            onClick={() => navigateChoosedTRate(data)}
                          >
                            <i className="text-lg bi bi-eye-fill" />
                          </button>

                          <button
                            className="inline-flex items-center justify-center rounded-lg h-9 w-9 text-amber-600 hover:bg-amber-50"
                            onClick={() => handleEdit(data)}
                          >
                            <i className="text-lg bi bi-pencil-square" />
                          </button>

                          <button
                            onClick={() => showModalDelete(data)}
                            className="inline-flex items-center justify-center text-red-500 rounded-lg h-9 w-9 hover:bg-red-50"
                          >
                            <i className="text-lg bi bi-trash-fill" />
                          </button>

                          {data.trRatingQuestions?.length !== 0 && (
                            <button
                              onClick={() => handleDownloadClick(data)}
                              className="px-3 py-2 ml-1 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                            >
                              Тайлан
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
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
