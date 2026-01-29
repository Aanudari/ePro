import { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import AllEmployeeSelectReq from "../main-exam/modal/AllEmployeeSelectReq";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

function InsertVersion({ show, onClose, task_id }) {
  const [employees, setEmployees] = useState([]);
  const [version, setVersion] = useState("");
  const [version_desc, setVersion_desc] = useState("");
  const [version_file, setVersion_file] = useState(null);

  const { TOKEN } = useStateContext();

  const deviceIds = employees.map((e) => e.deviceId);

  function AddVersionAPI() {
    const formData = new FormData();
    formData.append("Ts_main_id", task_id);
    formData.append("Version", version);
    formData.append("VersionDesc", version_desc);
    formData.append("VersionStatus", "PENDING");
    formData.append(
      "VersionTagged",
      employees.map((e) => e.deviceId).join(","),
    );

    if (version_file) {
      formData.append("pdfFIle", version_file, version_file.name);
    }

    axios({
      method: "post",
      headers: {
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/TaskRequirement/AddVersion`,
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
          onClose();

          setVersion("");
          setVersion_desc("");
          setVersion_file(null);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        centered
        size="xl"
        dialogClassName="rounded-xl overflow-hidden"
      >
        <Modal.Header
          closeButton
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          <Modal.Title>Хувилбар оруулах</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Хувилбар</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setVersion(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Тайлбар</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setVersion_desc(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Файл</label>
              <input
                className="cursor-pointer bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
                id="file_input"
                type="file"
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

                  setVersion_file(file); // ✅ зөв файл
                }}
              />
            </div>

            <AllEmployeeSelectReq
              getEmployees={(chosen) => setEmployees(chosen)}
              setShowSelect={() => {}}
            />
          </div>
          <p></p>
          <p></p>
          <button
            className="w-full py-3 rounded-xl text-white text-lg font-semibold shadow-lg transition-all bg-emerald-500 hover:bg-emerald-600"
            onClick={() => AddVersionAPI()}
          >
            Хадгалах
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InsertVersion;
