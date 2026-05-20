import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
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
  const { TOKEN } = useStateContext();

  const [checkEmpty1, setcheckEmpty1] = useState(false);
  const [checkEmpty2, setcheckEmpty2] = useState(false);

  const [category, setCategory] = useState([]);
  const [department, setDepartment] = useState([]);

  const [showCreate, setShowCreate] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [editData, setEditData] = useState({});

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

  const hideModalCreate = () => setShowCreate(null);
  const hideModalDelete = () => setShowDelete(null);
  const hideModalEdit = () => setShowEdit(null);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/department`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setDepartment(res.data.departments || []);
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
        if (res.data.isSuccess === true) {
          setCategory(res.data.trainingCatList || []);
          setFilteredList(res.data.trainingCatList || []);
          setSelectedIds([]);
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

  const handleEdit = (data) => {
    setShowEdit(true);
    setEditData(data);
    setNameEdit(data.name);
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
    if (selectedIds.length === 0) {
      notification.error("Устгах ангилал сонгоно уу.");
      hideModalDelete();
      return;
    }

    Promise.all(
      selectedIds.map((id) =>
        axios({
          method: "delete",
          headers: {
            Authorization: `${TOKEN}`,
            accept: "text/plain",
          },
          url: `${process.env.REACT_APP_URL}/v1/Training/category/delete?catId=${id}`,
        }),
      ),
    )
      .then((responses) => {
        const unauthorized = responses.find(
          (res) =>
            res.data.resultMessage === "Unauthorized" ||
            res.data.resultMessage ===
              "Input string was not in a correct format.",
        );

        if (unauthorized) {
          logout();
          return;
        }

        notification.success("Сонгосон ангилал амжилттай устлаа.");
        hideModalDelete();
        setSelectedIds([]);
        setTrigger(!trigger);
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

    if (name.length === 0) {
      setcheckEmpty1(true);
      return;
    }

    if (departmentID.length === 0) {
      setcheckEmpty2(true);
      return;
    }

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
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          hideModalCreate();
          setName("");
          setDepartmentID("");
          setTrigger(!trigger);
        }

        if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
        }

        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  };

  const editDataSet = {
    id: `${editData.id}`,
    name: nameEdit === "" ? editData.name : `${nameEdit}`,
    startDate: `${moment(editData.startDate).format(format)}`,
    endDate: `${moment(editData.endDate).format(format)}`,
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
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          hideModalEdit();
          setNameEdit("");
          setTrigger(!trigger);
        }

        if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
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
      return item.name?.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredList(searchList);
    setSelectedIds([]);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] w-full bg-slate-50">
      <Modal
        show={showCreate}
        onHide={hideModalCreate}
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
              Ангилал нэмэх
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Ангиллын нэр
              </label>
              <input
                type="text"
                value={name}
                className={`h-11 w-full rounded-xl border bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 ${
                  checkEmpty1 ? "border-red-400" : "border-slate-200"
                }`}
                placeholder="Ангиллын нэр оруулах"
                onChange={(e) => {
                  setName(e.target.value);
                  setcheckEmpty1(false);
                }}
              />
              {checkEmpty1 && (
                <p className="mt-1 text-xs text-red-500">
                  Ангиллын нэр оруулна уу.
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Эхлэх хугацаа
              </label>
              <DatePicker
                className="w-full px-3 text-sm border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 focus:border-indigo-500"
                selected={date1}
                onChange={(date) => setDate1(date)}
                selectsStart
                startDate={date1}
                dateFormat="yyyy, MM сарын dd"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Дуусах хугацаа
              </label>
              <DatePicker
                className="w-full px-3 text-sm border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 focus:border-indigo-500"
                selected={date2}
                onChange={(date) => setDate2(date)}
                selectsStart
                startDate={date2}
                dateFormat="yyyy, MM сарын dd"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Алба
              </label>
              <Select
                className="text-sm"
                options={department}
                onChange={(item) => {
                  handleOrg(item);
                  setcheckEmpty2(false);
                }}
                noOptionsMessage={({ inputValue }) =>
                  !inputValue && "Сонголт хоосон байна"
                }
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
              />
              {checkEmpty2 && (
                <p className="mt-1 text-xs text-red-500">Алба сонгоно уу.</p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={navigateIndex}
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
              Ангилал устгах
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-600 bg-red-100 rounded-full">
              <i className="text-xl bi bi-trash" />
            </div>

            <p className="mb-5 text-sm text-gray-500">
              Та сонгосон {selectedIds?.length} ангиллыг устгахдаа итгэлтэй
              байна уу?
            </p>

            <button
              type="button"
              onClick={deleteSelectedItems}
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

      <Modal
        show={showEdit}
        onHide={hideModalEdit}
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
              Ангилал засах
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Ангиллын нэр
              </label>
              <input
                type="text"
                className="w-full px-3 text-sm border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 focus:border-indigo-500"
                value={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={navigateIndexEdit}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Navigation />

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="p-4 mb-5 bg-white border shadow-sm rounded-2xl border-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Сургалтын ангилал
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Нийт {filteredList?.length || 0} ангилал
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                <i className="bi bi-plus-lg" />
                Ангилал нэмэх
              </button>

              <button
                onClick={() => setShowDelete(true)}
                disabled={selectedIds.length === 0}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  selectedIds.length === 0
                    ? "cursor-not-allowed bg-slate-100 text-slate-400"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                <i className="bi bi-trash" />
                Устгах {selectedIds.length > 0 ? `(${selectedIds.length})` : ""}
              </button>
            </div>
          </div>

          <div className="relative mt-4">
            <input
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-4 pr-10 text-sm border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Ангиллын нэрээр хайх..."
              type="text"
            />
            <i className="absolute -translate-y-1/2 bi bi-search right-3 top-1/2 text-slate-500" />
          </div>
        </div>

        <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="text-xs text-left uppercase border-b bg-slate-50 text-slate-500">
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={
                        filteredList.length > 0 &&
                        selectedIds.length === filteredList.length
                      }
                    />
                  </th>
                  <th className="w-16 px-4 py-3 font-semibold">№</th>
                  <th className="px-4 py-3 font-semibold">Эхлэх хугацаа</th>
                  <th className="px-4 py-3 font-semibold">Дуусах хугацаа</th>
                  <th className="px-4 py-3 font-semibold">Ангиллын нэр</th>
                  <th className="w-24 px-4 py-3 font-semibold text-center">
                    Үйлдэл
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-slate-100">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-12 text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 text-slate-500">
                        <i className="text-xl bi bi-folder2-open" />
                      </div>
                      <p className="font-medium text-slate-700">
                        Ангилал олдсонгүй
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Хайлт эсвэл жагсаалтаа дахин шалгана уу.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredList.map((data, i) => (
                    <tr key={data.id || i} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          onChange={() => handleCheckboxChange(data.id)}
                          checked={selectedIds.includes(data.id)}
                        />
                      </td>

                      <td className="px-4 py-3 text-slate-500">{i + 1}</td>

                      <td className="px-4 py-3 text-slate-600">
                        {moment(data.startDate).format("YYYY.MM.DD")}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {moment(data.endDate).format("YYYY.MM.DD")}
                      </td>

                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">
                          {data.name}
                        </p>
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button
                          className="inline-flex items-center justify-center rounded-lg h-9 w-9 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                          onClick={() => handleEdit(data)}
                        >
                          <i className="text-lg bi bi-pencil-square" />
                        </button>
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

export default TrainingCategory;
