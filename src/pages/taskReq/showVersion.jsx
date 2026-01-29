import { useEffect, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { logout } from "../../service/examService";
import { toast, ToastContainer } from "react-toastify";

function ShowVersion({ show, onClose, task_id }) {
  const { TOKEN } = useStateContext();

  const [historyList, setHistoryList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [approveList, setApproveList] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const isButtonDisabled =
    approveList == null ||
    approveList?.find(
      (e) => e.user_id == JSON.parse(localStorage.getItem("user"))["device_id"],
    )?.is_approved === "1";
  const [historyError, setHistoryError] = useState(false);

  /* ================= USERS ================= */
  useEffect(() => {
    if (!TOKEN) return;

    axios
      .get(`${process.env.REACT_APP_URL}/v1/TaskRequirement/GetAllReqUsers`, {
        headers: { Authorization: TOKEN },
      })
      .then((res) => {
        if (res.data.isSuccess) setAllUsers(res.data.reqUserList || []);
        else logout();
      });
  }, [TOKEN]);

  /* ================= HISTORY LIST ================= */
  function HistoryListFunction() {
    axios
      .post(
        `${process.env.REACT_APP_URL}/v1/TaskRequirement/HistoryList`,
        { tsMainId: task_id, tsHistoryId: "0" },
        { headers: { Authorization: TOKEN } },
      )
      .then((res) => {
        if (res.data.isSuccess) {
          setHistoryList(res.data.taskVersionReqs || []);

          if (res.data.taskVersionReqs?.length > 0) {
            setActiveTab(res.data.taskVersionReqs[0].hs_id);
          } else {
            setHistoryError(true);
          }
        } else {
          setHistoryError(true);
        }
      });
  }
  useEffect(() => {
    console.log(task_id);
    if (!TOKEN || !task_id) return;

    HistoryListFunction();
  }, [TOKEN, task_id]);

  // /* ================= APPROVE LIST ================= */
  useEffect(() => {
    if (!TOKEN || !task_id || !activeTab) return;

    axios
      .post(
        `${process.env.REACT_APP_URL}/v1/TaskRequirement/ApproveList`,
        { tsMainId: task_id, tsHistoryId: activeTab },
        { headers: { Authorization: TOKEN } },
      )
      .then((res) => {
        if (res.data.isSuccess) setApproveList(res.data.taskApproveReqs || []);
      });
  }, [TOKEN, task_id, activeTab]);

  /* ================= APPROVE ================= */
  function ApprovedAPI() {
    axios
      .post(
        `${process.env.REACT_APP_URL}/v1/TaskRequirement/Approved`,
        {
          tsMainId: task_id,
          hsId: activeTab,
          isApproved: "1",
        },
        { headers: { Authorization: TOKEN } },
      )
      .then((res) => {
        if (!res.data.isSuccess) {
          toast.error(res.data?.resultMessage || "Алдаа");
        } else {
          toast.success("Амжилттай зөвшөөрлөө");
          onClose(); // modal хаана
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Modal show={show} onHide={onClose} centered size="xl">
        <Modal.Header
          closeButton
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
        >
          <Modal.Title>Хувилбарууд</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {historyError ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Хувилбарын мэдээлэл олдсонгүй
              </h3>
            </div>
          ) : (
            <>
              {
                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                  {historyList.map((v) => (
                    <Tab
                      key={v.hs_id}
                      eventKey={v.hs_id}
                      title={`Version ${v.hs_version}`}
                    >
                      <div className="grid grid-cols-12 gap-6">
                        {/* USERS */}
                        <div className="col-span-9 p-4">
                          <h3 className="text-base font-semibold mb-3 text-gray-700">
                            👥 Хамаарах хүмүүс
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {allUsers
                              .filter((u) =>
                                v.hs_tagged.includes(u.device_id.toString()),
                              )
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
                                        (isActive
                                          ? " bg-green-500"
                                          : " bg-blue-500")
                                      }
                                    ></span>
                                    {u.last_name?.[0]}. {u.first_name}
                                  </span>
                                );
                              })}
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="col-span-3 p-4">
                          <h3 className="text-base font-semibold mb-3 text-gray-700">
                            ⚙️ Үйлдлүүд
                          </h3>
                          <div className="flex items-center gap-1">
                            👤{" "}
                            <span>
                              {allUsers
                                .filter((u) =>
                                  v.hs_created_by.includes(
                                    u.device_id.toString(),
                                  ),
                                )
                                .map((u) => {
                                  return (
                                    <span>
                                      {u.last_name?.[0]}. {u.first_name}
                                    </span>
                                  );
                                })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            📅{" "}
                            <span>
                              {new Date(v.hs_created_date).toLocaleDateString(
                                "mn-MN",
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            🗒️ <span>{v.hs_desc}</span>
                          </div>
                        </div>
                      </div>
                      <iframe
                        src={v.hs_file}
                        className="w-full h-[600px] border rounded"
                        title="pdf"
                      />
                    </Tab>
                  ))}
                </Tabs>
              }
              <p></p>
              <p></p>
              <button
                type="button"
                onClick={() => ApprovedAPI(task_id)}
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
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShowVersion;
