import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { logout } from "../../service/examService";
import ShowVersion from "./showVersion";
import InsertVersion from "./insertVersion";
import { toast } from "react-toastify";

function ShowFile({
  isOpen,
  selectedFile,
  showEmployee,
  taskName,
  taskId,
  onClose,
}) {
  const { TOKEN } = useStateContext();

  const [allUsers, setAllUsers] = useState([]);
  const [approveList, setApproveList] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  const [currentFile, setCurrentFile] = useState(selectedFile);
  const [currentHistoryId, setCurrentHistoryId] = useState("0");
  const [currentTitle, setCurrentTitle] = useState("Үндсэн нөхцөл");

  const [showInsertVersion, setShowInsertVersion] = useState(false);
  const [showVersion, setShowVersion] = useState(false);

  const mainUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = mainUser?.device_id?.toString();

  const mainDeviceIds =
    typeof showEmployee === "string" ? showEmployee.split(",") : [];

  const activeVersion = historyList.find(
    (v) => v.hs_id?.toString() === currentHistoryId?.toString(),
  );

  const activeTaggedIds =
    currentHistoryId === "0"
      ? mainDeviceIds
      : activeVersion?.hs_tagged?.split(",") || [];

  const approvedCount =
    approveList?.filter((e) => e.is_approved === "1")?.length || 0;

  const totalApproveCount = activeTaggedIds.length || 0;

  const isButtonDisabled =
    approveList == null ||
    approveList?.find((e) => e.user_id?.toString() === currentUserId)
      ?.is_approved === "1";

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

  function fetchHistoryList() {
    if (!TOKEN || !taskId) return;

    axios
      .post(
        `${process.env.REACT_APP_URL}/v1/TaskRequirement/HistoryList`,
        {
          tsMainId: taskId,
          tsHistoryId: "0",
        },
        { headers: { Authorization: TOKEN } },
      )
      .then((res) => {
        const list = res.data?.taskVersionReqs || [];
        setHistoryList(list);

        if (res.data.isSuccess && list.length > 0) {
          const latest = [...list].sort(
            (a, b) => Number(b.hs_version || 0) - Number(a.hs_version || 0),
          )[0];

          setCurrentFile(latest.hs_file);
          setCurrentHistoryId(latest.hs_id?.toString());
          setCurrentTitle(`Version ${latest.hs_version}`);
        } else {
          setCurrentFile(selectedFile);
          setCurrentHistoryId("0");
          setCurrentTitle("Үндсэн нөхцөл");
        }
      })
      .catch((err) => {
        console.log(err);
        setCurrentFile(selectedFile);
        setCurrentHistoryId("0");
        setCurrentTitle("Үндсэн нөхцөл");
      });
  }

  function fetchApproveList() {
    if (!TOKEN || !taskId) return;

    axios
      .post(
        `${process.env.REACT_APP_URL}/v1/TaskRequirement/ApproveList`,
        {
          tsMainId: taskId,
          tsHistoryId: currentHistoryId || "0",
        },
        { headers: { Authorization: TOKEN } },
      )
      .then((res) => {
        if (res.data.isSuccess) setApproveList(res.data.taskApproveReqs || []);
        else setApproveList([]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isOpen) fetchHistoryList();
  }, [isOpen, taskId, TOKEN, selectedFile]);

  useEffect(() => {
    fetchApproveList();
  }, [TOKEN, taskId, currentHistoryId]);

  function ApprovedAPI() {
    axios
      .post(
        `${process.env.REACT_APP_URL}/v1/TaskRequirement/Approved`,
        {
          tsMainId: taskId,
          hsId: currentHistoryId || "0",
          isApproved: "1",
        },
        { headers: { Authorization: TOKEN } },
      )
      .then((res) => {
        if (!res.data.isSuccess) {
          toast.error(res.data?.resultMessage || "Алдаа");
        } else {
          toast.success(res.data?.resultMessage || "Амжилттай зөвшөөрлөө");
          fetchApproveList();
        }
      })
      .catch(() => toast.error("Сервертэй холбогдож чадсангүй"));
  }

  function addVersionClick() {
    setShowInsertVersion(true);
    onClose();
  }

  function showVersionClick() {
    setShowVersion(true);
    onClose();
  }

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onClose}
        centered
        size="xl"
        dialogClassName="rounded-2xl overflow-hidden"
      >
        <Modal.Header
          closeButton
          className="text-white border-0 bg-gradient-to-r from-cyan-500 to-blue-600"
        >
          <div>
            <Modal.Title className="text-lg font-bold">{taskName}</Modal.Title>
            <p className="m-0 mt-1 text-xs text-blue-50">
              {currentTitle} • {approvedCount}/{totalApproveCount} зөвшөөрсөн
            </p>
          </div>
        </Modal.Header>

        <Modal.Body className="p-0 bg-slate-50">
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 p-4 bg-white border border-gray-100 shadow-sm lg:col-span-8 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-700">
                    👥 Хамаарах хүмүүс
                  </h3>

                  <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                    {activeTaggedIds.length} хүн
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {allUsers
                    .filter((u) =>
                      activeTaggedIds.includes(u.device_id.toString()),
                    )
                    .map((u) => {
                      const isActive =
                        approveList?.find(
                          (e) =>
                            e.user_id?.toString() === u.device_id.toString(),
                        )?.is_approved === "1";

                      return (
                        <span
                          key={u.device_id}
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : "bg-blue-50 text-blue-700 border-blue-100"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-blue-500"
                            }`}
                          ></span>
                          {u.last_name?.[0]}. {u.first_name}
                        </span>
                      );
                    })}
                </div>
              </div>

              <div className="col-span-12 p-4 bg-white border border-gray-100 shadow-sm lg:col-span-4 rounded-2xl">
                <h3 className="mb-3 text-sm font-bold text-gray-700">
                  ⚙️ Үйлдлүүд
                </h3>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={addVersionClick}
                    className="w-full px-4 py-2 text-sm font-semibold text-white transition-all shadow-sm rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                  >
                    ＋ Хувилбар нэмэх
                  </button>

                  {/* <button
                    onClick={showVersionClick}
                    className="w-full px-4 py-2 text-sm font-semibold text-blue-700 transition-all border border-blue-100 bg-blue-50 rounded-xl hover:bg-blue-100"
                  >
                    🕘 Бүх хувилбар харах
                  </button> */}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex flex-col gap-3 mb-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h5 className="m-0 text-sm font-bold text-gray-700">
                    📄 Одоо харж байгаа файл
                  </h5>
                  <p className="m-0 mt-1 text-xs text-gray-500">
                    {currentTitle}
                  </p>
                </div>

                {historyList.length > 0 && (
                  <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                    Нийт {historyList.length} хувилбар
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentFile(selectedFile);
                    setCurrentHistoryId("0");
                    setCurrentTitle("Үндсэн нөхцөл");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    currentHistoryId === "0"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Үндсэн нөхцөл
                </button>

                {[...historyList]
                  .sort(
                    (a, b) =>
                      Number(b.hs_version || 0) - Number(a.hs_version || 0),
                  )
                  .map((v) => (
                    <button
                      key={v.hs_id}
                      type="button"
                      onClick={() => {
                        setCurrentFile(v.hs_file);
                        setCurrentHistoryId(v.hs_id?.toString());
                        setCurrentTitle(`Version ${v.hs_version}`);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                        currentHistoryId === v.hs_id?.toString()
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      Version {v.hs_version}
                    </button>
                  ))}
              </div>
            </div>

            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
              {currentFile ? (
                <iframe
                  src={currentFile}
                  title="PDF Viewer"
                  className="w-full h-[620px] border-0"
                />
              ) : (
                <div className="py-20 font-semibold text-center text-red-500">
                  📂 Файл олдсонгүй
                </div>
              )}
            </div>

            <div className="sticky bottom-0 p-3 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <button
                type="button"
                onClick={ApprovedAPI}
                disabled={isButtonDisabled}
                className={`w-full py-3 rounded-xl text-white text-base font-bold shadow-sm transition-all ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                {isButtonDisabled ? "Зөвшөөрсөн" : "Зөвшөөрөх"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {showInsertVersion && (
        <InsertVersion
          show={showInsertVersion}
          task_id={taskId}
          onClose={() => setShowInsertVersion(false)}
        />
      )}

      {showVersion && (
        <ShowVersion
          show={showVersion}
          task_id={taskId}
          onClose={() => setShowVersion(false)}
        />
      )}
    </>
  );
}

export default ShowFile;
