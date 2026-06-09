import UserLayout from "../../components/UserLayout";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import { Modal } from "react-bootstrap";
import AllEmployeeSelectReq from "../main-exam/modal/AllEmployeeSelectReq";
import ShowFile from "./showFIle";
import AddTestMaterials from "./addTestMaterials.jsx";

function TaskReq() {
  const { TOKEN } = useStateContext();

  const [taskRequirements, setTaskRequirements] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [showTaskAddModal, setshowTaskAddModal] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [task_id, setTask_id] = useState("");
  const [task_name, setTask_name] = useState("");
  const [task_desc, setTask_desk] = useState("");
  const [task_file, setTask_file] = useState(null);

  const [showTaskEmployee, setshowTaskEmployee] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [addTestModal, setAddTestModal] = useState(false);

  const mainUser = JSON.parse(localStorage.getItem("user"));

  const allowedJobIds = [
    "8",
    "9",
    "10",
    "11",
    "15",
    "37",
    "40",
    "42",
    "43",
    "21",
    "22",
  ];

  const canManage = allowedJobIds.includes(mainUser?.job_id);

  const statusConfig = {
    APPROVED: {
      dot: "bg-blue-500",
      badge: "bg-blue-50 text-blue-700 border-blue-100",
      text: "ОНЛАЙН БАТАЛГААЖСАН",
    },
    PENDING: {
      dot: "bg-amber-500",
      badge: "bg-amber-50 text-amber-700 border-amber-100",
      text: "ХҮЛЭЭГДЭЖ БАЙНА",
    },
    COMPLETED: {
      dot: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
      text: "ГҮЙЦЭТГЭХ ЗАХИРАЛ БАТАЛСАН",
    },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (!TOKEN) return;

    axios
      .get(`${process.env.REACT_APP_URL}/v1/TaskRequirement/GetAllReqUsers`, {
        headers: { Authorization: TOKEN },
      })
      .then((res) => {
        if (res.data.isSuccess) setAllUsers(res.data.reqUserList || []);
        else logout();
      })
      .catch((err) => console.log(err));
  }, [TOKEN]);

  useEffect(() => {
    if (!TOKEN) return;

    axios({
      method: "get",
      headers: {
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/TaskRequirement/GetAllRequirements`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setTaskRequirements(res.data.taskRequirements || []);
          setFilteredTasks(res.data.taskRequirements || []);
        }

        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [TOKEN]);

  useEffect(() => {
    const keyword = searchText.toLowerCase().trim();

    if (!keyword) {
      setFilteredTasks(taskRequirements);
      setCurrentPage(1);
      return;
    }

    const result = taskRequirements.filter((item) => {
      return (
        item.ts_name?.toLowerCase().includes(keyword) ||
        item.ts_desc?.toLowerCase().includes(keyword) ||
        item.status?.toLowerCase().includes(keyword)
      );
    });

    setFilteredTasks(result);
    setCurrentPage(1);
  }, [searchText, taskRequirements]);

  function getCreatedUserName(createdBy) {
    const users = allUsers.filter((u) =>
      createdBy?.includes(u.device_id.toString()),
    );

    if (users.length === 0) return "-";

    return users
      .map((u) => `${u.last_name?.[0] || ""}. ${u.first_name || ""}`)
      .join(", ");
  }

  function detailClick(item) {
    setSelectedFile(item.ts_file);
    setshowTaskEmployee(item.taggedPerson);
    setTask_name(item.ts_name);
    setTask_id(item.ts_main_id);
    setShowFileModal(true);
  }

  function AddTaskAPI() {
    if (!task_name?.trim()) {
      toast.error("Нэр оруулна уу");
      return;
    }

    if (!task_desc?.trim()) {
      toast.error("Тайлбар оруулна уу");
      return;
    }

    if (!task_file) {
      toast.error("PDF файл оруулна уу");
      return;
    }

    const formData = new FormData();

    formData.append("Ts_name", task_name);
    formData.append("Ts_desc", task_desc);
    formData.append("TaggedPerson", employees.map((e) => e.deviceId).join(","));
    formData.append("Status", "PENDING");
    formData.append("pdfFIle", task_file, task_file.name);

    axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/TaskRequirement/AddWithFile`,
      data: formData,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          toast.error(
            res.data?.message || res.data?.resultMessage || "Алдаа гарлаа",
          );
        } else {
          toast.success(res.data?.resultMessage || "Амжилттай хадгалагдлаа");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Сервертэй холбогдож чадсангүй");
      });
  }

  function AddTestMaterialsClick(item) {
    setAddTestModal(true);
    setTask_id(item.ts_main_id);
  }

  return (
    <UserLayout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
        style={{ zIndex: 999999 }}
      />

      <div className="max-w-screen-xl px-4 py-6 mx-auto">
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="p-5 border-b bg-gradient-to-r from-slate-50 to-blue-50">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-800">Нөхцөлүүд</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Нийт {taskRequirements.length} нөхцөл байна
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Нэр, төлөв, тайлбараар хайх..."
                    className="w-full py-2 pl-10 pr-4 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-72"
                  />
                  <span className="absolute text-gray-400 left-3 top-2.5">
                    🔍
                  </span>
                </div>

                {canManage && (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all shadow-sm rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    onClick={() => setshowTaskAddModal(true)}
                  >
                    <span>＋</span>
                    Нөхцөл нэмэх
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 text-5xl">📂</div>
                <h3 className="mb-1 text-lg font-semibold text-gray-700">
                  Нөхцөл олдсонгүй
                </h3>
                <p className="text-sm text-gray-500">
                  Хайлтын утгаа өөрчлөөд дахин шалгаарай.
                </p>
              </div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                    <th className="px-2 py-1.5">№</th>
                    <th className="px-2 py-1.5">Нөхцөлийн нэр</th>
                    <th className="px-2 py-1.5">Тайлбар</th>
                    <th className="px-2 py-1.5">Төлөв</th>
                    <th className="px-2 py-1.5">Үүсгэсэн ажилтан</th>
                    <th className="px-2 py-1.5">Огноо</th>
                    <th className="px-2 py-1.5 text-center">Үйлдэл</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {paginatedTasks.map((item, index) => {
                    const status = statusConfig[item.status] || {
                      dot: "bg-gray-400",
                      badge: "bg-gray-50 text-gray-600 border-gray-100",
                      text: "ТОДОРХОЙГҮЙ",
                    };

                    return (
                      <tr
                        key={item.ts_main_id || index}
                        className="transition hover:bg-blue-50/40"
                      >
                        <td className="px-2 py-1.5 text-gray-500">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        <td className="px-2 py-1.5">
                          <div className="font-semibold text-gray-800">
                            {item.ts_name}
                          </div>
                        </td>

                        <td className="px-2 py-1.5 text-gray-600 max-w-[360px]">
                          <div className="line-clamp-2">
                            {item.ts_desc || "-"}
                          </div>
                        </td>

                        <td className="px-2 py-1.5">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border rounded-full ${status.badge}`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${status.dot}`}
                            ></span>
                            {status.text}
                          </span>
                        </td>

                        <td className="px-2 py-1.5 text-gray-700">
                          {getCreatedUserName(item.createdBy)}
                        </td>

                        <td className="px-2 py-1.5 text-gray-500">
                          {item.createdDate
                            ? new Date(item.createdDate).toLocaleDateString(
                                "mn-MN",
                              )
                            : "-"}
                        </td>

                        <td className="px-2 py-1.5">
                          <div className="flex justify-center gap-2">
                            <button
                              type="button"
                              title="Харах"
                              className="inline-flex items-center justify-center w-10 h-10 text-blue-700 transition border border-blue-100 bg-blue-50 rounded-xl hover:bg-blue-100"
                              onClick={() => detailClick(item)}
                            >
                              👁️
                            </button>

                            {canManage && (
                              <button
                                type="button"
                                title="Материал нэмэх"
                                className="inline-flex items-center justify-center w-10 h-10 transition border text-emerald-700 bg-emerald-50 border-emerald-100 rounded-xl hover:bg-emerald-100"
                                onClick={() => AddTestMaterialsClick(item)}
                              >
                                📘
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                Нийт {filteredTasks.length} бичлэг
              </div>

              <div className="flex gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  Өмнөх
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === totalPages || totalPages === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  Дараах
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showTaskAddModal}
        onHide={() => setshowTaskAddModal(false)}
        centered
        size="lg"
        dialogClassName="rounded-xl overflow-hidden"
      >
        <Modal.Header
          closeButton
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-600"
        >
          <Modal.Title>Нөхцөл нэмэх</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-6 bg-white">
          <form className="space-y-5">
            <div>
              <label
                htmlFor="task_name"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Нэр
              </label>
              <input
                type="text"
                id="task_name"
                value={task_name}
                className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Нөхцөлийн нэр оруулна уу"
                onChange={(e) => setTask_name(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="task_desc"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Тайлбар
              </label>
              <textarea
                id="task_desc"
                value={task_desc}
                rows={3}
                className="block w-full px-4 py-3 text-sm border border-gray-200 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Тайлбар оруулна уу"
                onChange={(e) => setTask_desk(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="file_input"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                PDF файл
              </label>
              <input
                id="file_input"
                type="file"
                accept="application/pdf"
                className="block w-full text-sm border border-gray-200 cursor-pointer rounded-xl file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-3 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  if (file.type !== "application/pdf") {
                    toast.error("Зөвхөн PDF файл оруулах боломжтой");
                    e.target.value = "";
                    return;
                  }

                  if (!file.name.toLowerCase().endsWith(".pdf")) {
                    toast.error("Файлын өргөтгөл .pdf байх ёстой");
                    e.target.value = "";
                    return;
                  }

                  setTask_file(file);
                }}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Хамаарах хүмүүс
              </label>
              <div className="p-3 border border-gray-100 rounded-xl bg-gray-50">
                <AllEmployeeSelectReq
                  getEmployees={(chosen) => setEmployees(chosen)}
                  setShowSelect={() => {}}
                />
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer className="bg-gray-50">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-100"
            onClick={() => setshowTaskAddModal(false)}
          >
            Болих
          </button>

          <button
            className="px-5 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            onClick={AddTaskAPI}
          >
            Хадгалах
          </button>
        </Modal.Footer>
      </Modal>

      {showFileModal && task_id && (
        <ShowFile
          isOpen={showFileModal}
          selectedFile={selectedFile}
          showEmployee={showTaskEmployee}
          taskName={task_name}
          taskId={task_id}
          onClose={() => {
            setShowFileModal(false);
            setSelectedFile(null);
            setTask_id("");
          }}
        />
      )}

      {addTestModal && (
        <AddTestMaterials
          show={addTestModal}
          task_id={task_id}
          onClose={() => setAddTestModal(false)}
        />
      )}
    </UserLayout>
  );
}

export default TaskReq;
