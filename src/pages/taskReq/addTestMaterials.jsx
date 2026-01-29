import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { logout } from "../../service/examService";

function AddTestMaterials({ show, task_id, onClose }) {
  const [testMaterial, setTestMaterial] = useState(null);
  const { activeMenu, TOKEN } = useStateContext();
  const [test_file, setTest_file] = useState(null);

  useEffect(() => {
    if (!TOKEN || !task_id) return;
    GetTestMaterialFunction();
    console.log(task_id + "func duudaw");
  }, [TOKEN, task_id]);

  function GetTestMaterialFunction() {
    if (!TOKEN) return;
    console.log(task_id + "func APi");
    axios
      .get(
        `${process.env.REACT_APP_URL}/v1/TaskRequirement/GetTestMaterial/${task_id}`,
        {
          headers: { Authorization: TOKEN },
        },
      )
      .then((res) => {
        if (res.data.isSuccess) {
          setTestMaterial(res.data);
        }
      });
  }

  function AddTestAPI() {
    if (!test_file) {
      toast.error("EXCEL файл оруулна уу");
      return;
    }
    const formData = new FormData();
    formData.append("tsMainId", task_id);
    if (test_file) {
      formData.append("xlsxFIle", test_file, test_file.name);
    }

    axios({
      method: "post",
      headers: {
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/TaskRequirement/AddTestMaterials`,
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
          setTest_file(null);
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
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
        >
          <Modal.Title>Тестийн материал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* FILE VIEWER */}
          <div className="flex flex-col items-center justify-center py-10 text-center">
            {testMaterial?.path ? (
              (() => {
                const ext = testMaterial.path.split(".").pop()?.toLowerCase();

                // ✅ Excel → DOWNLOAD
                if (ext === "xlsx" || ext === "xls") {
                  return (
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-5xl">📊</div>

                      <a
                        href={testMaterial.path}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        ⬇️ Excel файл татах
                      </a>
                    </div>
                  );
                }

                // ❌ Дэмжигдэхгүй файл
                return (
                  <div className="text-red-500 font-semibold">
                    Энэ төрлийн файлыг дэмжихгүй байна
                  </div>
                );
              })()
            ) : (
              // ✅ testMaterial.path БАЙХГҮЙ → FILE UPLOAD
              <div className="w-full max-w-md space-y-6">
                <div>
                  <div className="relative">
                    <input
                      id="file_input"
                      type="file"
                      accept=".xlsx,.xls"
                      className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const ext = file.name.split(".").pop()?.toLowerCase();
                        if (ext !== "xlsx" && ext !== "xls") {
                          alert("Зөвхөн Excel файл оруулах боломжтой");
                          e.target.value = "";
                          return;
                        }

                        setTest_file(file);
                      }}
                    />

                    <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 text-center border-2 border-dashed rounded-xl border-emerald-300 bg-emerald-50 text-emerald-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16.5V19a1.5 1.5 0 001.5 1.5h13A1.5 1.5 0 0020 19v-2.5"
                        />
                      </svg>

                      <p className="text-sm font-medium">
                        Excel файл сонгох эсвэл чирж оруулах
                      </p>
                      <p className="text-xs text-emerald-600">.xlsx, .xls</p>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full py-3 rounded-xl text-white text-lg font-semibold shadow-md transition-all
               bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98]"
                  onClick={AddTestAPI}
                >
                  Хадгалах
                </button>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddTestMaterials;
