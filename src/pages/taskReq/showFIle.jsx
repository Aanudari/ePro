import { useEffect, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { logout } from "../../service/examService";
import ShowVersion from "./showVersion";
import InsertVersion from "./insertVersion";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import TaskReq from "./taskReq";

function ShowFile({
  isOpen,
  selectedFile,
  showEmployee,
  taskName,
  taskId,
  onClose,
}) {
  const [key, setKey] = useState("home");
  const [secondSelectedFile, setSecondSelectedFile] = useState(null);
  const deviceIds =
    typeof showEmployee === "string" ? showEmployee.split(",") : [];
  const [allUsers, setallUsers] = useState([]);
  const { activeMenu, TOKEN } = useStateContext();
  const [reqUsers, setreqUsers] = useState(null);
  const [showInsertVersion, setshowInsertVersion] = useState(false);
  const [showVersion, setshowVersion] = useState(false);
  const [approveList, setapproveList] = useState(null);
  const [approvingTaskId, setApprovingTaskId] = useState(true);

  const isButtonDisabled =
    approveList == null ||
    approveList?.find(
      (e) => e.user_id == JSON.parse(localStorage.getItem("user"))["device_id"],
    )?.is_approved === "1";

  /* ================= USERS ================= */

  useEffect(() => {
    if (!TOKEN) return;
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TaskRequirement/GetAllReqUsers`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setallUsers(res.data.reqUserList);
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

  // /* ================= APPROVE LIST ================= */
  const fetchApproveList = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/TaskRequirement/ApproveList`,
      data: {
        tsMainId: taskId,
        tsHistoryId: "0",
      },
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          // alert(res.data.resultMessage);
        } else {
          setapproveList(res.data.taskApproveReqs);
          // alert(res.data.resultMessage);
        }
        // setCategoryModal(false);
        // setShowCategoryMenu(false);
        // setTriggerCat(triggerCat);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchApproveList();
  }, [taskId]);
  function addVersionClick(taskId) {
    setshowInsertVersion(true);
    onClose();
  }
  function showVersionClick(taskId) {
    setshowVersion(true);
    onClose();
  }

  /* ================= APPROVE ================= */

  // API function
  function ApprovedAPI(taskId) {
    if (approvingTaskId === taskId) alert("sjsj");
    // Already approving

    setApprovingTaskId(taskId); // тухайн task-г approve-д зориулж lock

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/TaskRequirement/Approved`,
      data: {
        tsMainId: taskId,
        HsId: "0",
        isApproved: "1",
      },
    })
      .then((res) => {
        if (!res.data.isSuccess) {
          toast.error(res.data?.resultMessage || "Алдаа");
        } else {
          toast.success(res.data?.resultMessage || "Амжилттай зөвшөөрлөө");
          fetchApproveList();
          setApprovingTaskId(false);
        }
      })
      .catch(() => {
        toast.error("Сервертэй холбогдож чадсангүй");
      });
  }

  useEffect(() => {
    console.log({ approvingTaskId });
  }, [approvingTaskId]);

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onClose}
        centered
        size="xl"
        dialogClassName="rounded-xl overflow-hidden"
      >
        {/* HEADER */}
        <Modal.Header
          closeButton
          className="bg-gradient-to-r  from-cyan-500 to-blue-600 text-white"
        >
          <Modal.Title className="text-lg font-semibold">
            {taskName}
          </Modal.Title>
        </Modal.Header>

        {/* BODY */}
        <Modal.Body className="bg-white space-y-6">
          {/* USERS + ACTIONS */}
          <div className="grid grid-cols-12 gap-6">
            {/* USERS */}
            <div className="col-span-9 p-4">
              <h3 className="text-base font-semibold mb-3 text-gray-700">
                👥 Хамаарах хүмүүс
              </h3>

              <div className="flex flex-wrap gap-2">
                {allUsers
                  .filter((u) => deviceIds.includes(u.device_id.toString()))
                  .map((u) => {
                    const isActive =
                      approveList?.find(
                        (e) => e.user_id == u.device_id.toString(),
                      )?.is_approved === "1";

                    return (
                      <span
                        key={u.device_id}
                        className={
                          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm" +
                          (isActive
                            ? " bg-green-100 text-green-700"
                            : " bg-blue-50 text-blue-700")
                        }
                      >
                        <span
                          className={
                            "w-2 h-2 rounded-full" +
                            (isActive ? " bg-green-500" : " bg-blue-500")
                          }
                        ></span>
                        {u.last_name?.[0]}. {u.first_name}
                      </span>
                    );
                  })}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="col-span-3   p-4">
              <h3 className="text-base font-semibold mb-3 text-gray-700">
                ⚙️ Үйлдлүүд
              </h3>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => showVersionClick(taskId)}
                  className="w-full py-2 rounded-xl text-sm font-medium text-white
              bg-gradient-to-r from-cyan-500 to-blue-600
              hover:from-cyan-600 hover:to-blue-700
              transition-all shadow"
                >
                  Хувилбар харах
                </button>

                <button
                  onClick={() => addVersionClick(taskId)}
                  className="w-full py-2 rounded-xl text-sm font-medium text-white
              bg-gradient-to-r from-green-500 to-emerald-600
              hover:from-green-600 hover:to-emerald-700
              transition-all shadow"
                >
                  Хувилбар нэмэх
                </button>
              </div>
            </div>
          </div>
          {/* FILE VIEWER */}
          <div className="  p-4">
            {selectedFile ? (
              <iframe
                src={selectedFile}
                title="PDF Viewer"
                className="w-full h-[600px] rounded-lg border"
              />
            ) : (
              <div className="text-center text-red-500 font-semibold py-20">
                📂 Файл олдсонгүй
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => ApprovedAPI(taskId)}
            disabled={isButtonDisabled} // зөвхөн энэ task-д disable
            className={`
    w-full py-3 rounded-xl text-white text-lg font-semibold shadow-lg transition-all
    ${
      isButtonDisabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-emerald-500 hover:bg-emerald-600"
    }
  `}
          >
            Зөвшөөрөх
          </button>
        </Modal.Body>

        {/* FOOTER */}
        {/* <Modal.Footer className=""></Modal.Footer> */}
      </Modal>
      {/* MODALS */}
      {showInsertVersion && (
        <InsertVersion
          show={showInsertVersion}
          task_id={taskId}
          onClose={() => setshowInsertVersion(false)}
        />
      )}
      {showVersion && (
        <ShowVersion
          show={showVersion}
          task_id={taskId}
          onClose={() => setshowVersion(false)}
        />
      )}
    </>
  );
}

export default ShowFile;
