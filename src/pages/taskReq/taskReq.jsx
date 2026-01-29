import UserLayout from "../../components/UserLayout";
import React, { useEffect, useState, useRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../../service/examService";
import { Modal } from "react-bootstrap";
import moment from "moment";
import Pagination from "../../service/Pagination";
// import { Console } from "console";
import { Alarm } from "react-bootstrap-icons";
import AllEmployeeSelect from "../main-exam/modal/AllEmployeeSelect";
import AllEmployeeSelectReq from "../main-exam/modal/AllEmployeeSelectReq";
import ShowFile from "./showFIle";
import { ToastContainer } from "react-toastify";
import AddTestMaterials from "./addTestMaterials.jsx";

function TaskReq(depId) {
  const navigate = useNavigate();
  const { TOKEN, deviceId } = useStateContext();
  const [taskRequirements, setTaskRequirements] = useState([]);
  const statusMap = {
    APPROVED: "bg-primary",
    PENDING: "bg-warning",
    COMPLETED: "bg-success",
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [showTaskAddModal, setshowTaskAddModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [addTask, setAddTask] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [task_id, setTask_id] = useState("");
  const [task_name, setTask_name] = useState("");
  const [task_desc, setTask_desk] = useState("");
  const [task_file, setTask_file] = useState(null);
  const [task_status, setTask_status] = useState("");
  const [task_taggedPersons, setTask_taggedPersons] = useState("");
  const deviceIds = employees.map((e) => e.deviceId);
  const [showTaskEmployee, setshowTaskEmployee] = useState(null);
  const [showInsertVersion, setShowInsertVersion] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [addTestModal, setAddTestModal] = useState(false);
  const mainUser = JSON.parse(localStorage.getItem("user"));
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
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TaskRequirement/GetAllRequirements`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setTaskRequirements(res.data.taskRequirements);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(taskRequirements);
  function detailClick(item) {
    setSelectedFile(item.ts_file);
    setshowTaskEmployee(item.taggedPerson);
    setTask_name(item.ts_name);
    setShowFileModal(true);
    setTask_id(item.ts_main_id);
  }

  function AddTaskRequirement() {
    setshowTaskAddModal(true);
  }
  function AddTaskAPI(task_name, task_desc, task_file, deviceIds) {
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
    // formData.append("CreatedBy", task_createdBy ?? "");
    formData.append("pdfFIle", task_file, task_file.name);
    if (task_file) {
      formData.append("pdfFIle", task_file, task_file.name);
    }

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
          // ✅ Зөвхөн res.data-аас авна
          toast.error(
            res.data?.message || res.data?.resultMessage || "Алдаа гарлаа",
          );
        } else {
          toast.success(res.data?.resultMessage || "Амжилттай хадгалагдлаа");
          window.location.reload();
          setshowTaskAddModal(false);
          setTask_desk("");
          setTask_name("");
          setTask_file(null);
        }
      })
      .catch((err) => {
        console.log(err);
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
      alkNX
      <div className="max-w-screen-xl ml-auto mr-auto">
        <div className="overflow-x-auto p-2">
          {[
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
          ].includes(mainUser.job_id) && (
            <button
              type="button"
              className="mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl 
               focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 
               font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5"
              onClick={() => AddTaskRequirement()}
            >
              Нөхцөл нэмэх
            </button>
          )}

          <Modal
            show={showTaskAddModal}
            onHide={() => setshowTaskAddModal(false)}
            centered
            size="lg"
            dialogClassName="rounded-xl overflow-hidden"
          >
            <div>
              {" "}
              <Modal.Header
                closeButton
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500"
              >
                <Modal.Title>Нөхцөл нэмэх</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form class="space-y-4">
                  <div>
                    <label
                      for="visitors"
                      class="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Нэр
                    </label>
                    <input
                      type="text"
                      id="visitors"
                      class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                      placeholder=""
                      required
                      onChange={(e) => {
                        setTask_name(e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      for="visitors"
                      class="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Тайлбар
                    </label>
                    <input
                      type="text"
                      id="visitors"
                      class="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body"
                      placeholder=""
                      required
                      onChange={(e) => {
                        setTask_desk(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2.5 text-sm font-medium text-heading"
                      for="file_input"
                    >
                      Файл оруулах
                    </label>
                    <input
                      className="cursor-pointer bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
                      id="file_input"
                      type="file"
                      required
                      accept="application/pdf" // ⬅️ зөвхөн PDF сонгогдоно
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        // MIME type шалгах
                        if (file.type !== "application/pdf") {
                          alert("Зөвхөн PDF файл оруулах боломжтой");
                          e.target.value = ""; // input reset
                          return;
                        }

                        // Нэрийн өргөтгөл шалгах (нэмэлт хамгаалалт)
                        if (!file.name.toLowerCase().endsWith(".pdf")) {
                          alert("Файлын өргөтгөл .pdf байх ёстой");
                          e.target.value = "";
                          return;
                        }

                        setTask_file(file); // ✅ зөв файл
                      }}
                    />
                  </div>
                  <div>
                    {JSON.stringify(employees)}
                    <AllEmployeeSelectReq
                      getEmployees={(chosen) => setEmployees(chosen)}
                      setShowSelect={() => {}}
                      // setdeviceIds
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer className="text-white bg-gradient-to-r from-cyan-500 to-blue-500">
                <button
                  className="px-4 py-1 bg-gray-600 text-white rounded"
                  onClick={() =>
                    AddTaskAPI(task_name, task_desc, task_file, deviceIds)
                  }
                >
                  Хадгалах
                </button>
              </Modal.Footer>
            </div>
          </Modal>

          <div className="mt-4  flex items-center justify-center  font-sans">
            <table className="text-sm min-w-full break-words shadow-sm border-collapse">
              <thead className="uppercase text-sm leading-normal">
                <tr className="bg-gray-600  text-xs text-left text-white border-b">
                  <th className="px-2 py-2 font-bold">№</th>
                  <th className="px-2 py-2 font-bold">Нөхцөлийн нэр </th>
                  <th className="px-2 py-2 font-bold">Тайлбар </th>

                  <th className="px-2 py-2 font-bold">Нөхцөлийн төлөв</th>
                  <th className="px-2 py-2 font-bold">Үүсгэсэн ажилтан</th>
                  <th className="px-2 py-2 font-bold">Үүсгэсэн огноо</th>
                  <th
                    className="px-2 py-2 font-bold text-center"
                    colSpan={2}
                  ></th>
                </tr>
              </thead>

              {taskRequirements?.map((item, index) => (
                <tr key={index}>
                  <td class="px-2 py-2 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td class="px-2 py-2 border-b border-gray-200">
                    {item.ts_name}
                  </td>
                  <td class="px-2 py-2 border-b border-gray-200">
                    {item.ts_desc}
                  </td>
                  <td class="px-2 py-2 border-b border-gray-200">
                    <div className="flex items-center">
                      {/* Circle badge */}
                      {statusMap[item.status] ? (
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            statusMap[item.status]
                          } me-2`}
                        ></div>
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full bg-gray-300 me-2"></div>
                      )}

                      {/* Status текст */}
                      <div className="text-sm font-medium">
                        {item.status === "APPROVED"
                          ? "ОНЛАЙН БАТАЛГААЖСАН"
                          : item.status === "PENDING"
                            ? "ХҮЛЭЭГДЭЖ БАЙНА"
                            : item.status === "COMPLETED"
                              ? "ГҮЙЦЭТГЭХ ЗАХИРАЛ БАТАЛСАН"
                              : "ТОДОРХОЙГҮЙ"}
                      </div>
                    </div>
                  </td>
                  <td class="px-2 py-2 border-b border-gray-200">
                    {allUsers
                      .filter((u) =>
                        item.createdBy.includes(u.device_id.toString()),
                      )
                      .map((u) => (
                        <span key={u.device_id} className="font-medium">
                          {u.last_name?.[0]}. {u.first_name}
                        </span>
                      ))}
                  </td>
                  <td class="px-2 py-2 border-b border-gray-200">
                    {new Date(item.createdDate).toLocaleDateString()}
                  </td>
                  <td class="px-2 py-2 border-b border-gray-200">
                    <div className="flex gap-2">
                      {/* Eye / View Button */}
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded border-2 border-primary-100 p-2 text-primary-700 hover:bg-gray-300 w-10 h-10"
                        onClick={() => detailClick(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>

                      {/* Book / Document Button */}
                      {[
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
                      ].includes(mainUser.job_id) && (
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded border-2 border-primary-100 p-2 text-primary-700 hover:bg-gray-300 w-10 h-10"
                          onClick={() => AddTestMaterialsClick(item)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                  {/* <td class="px-2 py-2 border-b border-gray-200">
                    <button
                      type="button"
                      class="inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950 hover:bg-gray-300"
                      data-twe-ripple-init
                      onClick={() => addversionClick(item)}
                    >
                      Хувилбар
                    </button>
                  </td> */}
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      {task_id != "" && (
        <ShowFile
          isOpen={showFileModal}
          selectedFile={selectedFile}
          showEmployee={showTaskEmployee}
          taskName={task_name}
          taskId={task_id}
          onClose={() => setShowFileModal(false)}
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
