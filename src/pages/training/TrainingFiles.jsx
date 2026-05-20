import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { logout } from "../../service/examService";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import getWindowDimensions from "../../components/SizeDetector";

const FormData = require("form-data");

function TrainingFiles() {
  const { width } = getWindowDimensions();
  const { TOKEN } = useStateContext();

  const [files, setFiles] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showDelete, setShowDelete] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const hideModalDelete = () => setShowDelete(null);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingFile/filelist`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setFiles(res.data.fileNames || []);
          setFilteredList(res.data.fileNames || []);
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

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const searchList = files.filter((item) => {
      return item.fileName?.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredList(searchList);
    setSelectedIds([]);
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
      notification.error("Устгах файл сонгоно уу.");
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
          url: `${process.env.REACT_APP_URL}/v1/TrainingFile/${id}`,
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

        notification.success("Сонгосон файлууд амжилттай устлаа.");
        hideModalDelete();
        setSelectedIds([]);
        setTrigger(!trigger);
      })
      .catch((err) => console.log(err));
  };

  const getFileIcon = (fileName) => {
    const ext = fileName?.split(".").pop()?.toLowerCase();

    if (["png", "jpg", "jpeg", "gif"].includes(ext)) return "bi-file-image";
    if (["mp4", "mov", "avi"].includes(ext)) return "bi-file-play";
    if (["mp3", "wav"].includes(ext)) return "bi-file-music";
    if (["pdf"].includes(ext)) return "bi-file-pdf";
    if (["xlsx", "xls"].includes(ext)) return "bi-file-spreadsheet";
    if (["docx", "doc"].includes(ext)) return "bi-file-word";
    if (["pptx", "ppt"].includes(ext)) return "bi-file-ppt";

    return "bi-file-earmark";
  };

  return (
    <div className="min-h-[calc(100vh-56px)] w-full bg-slate-50">
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
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-100w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-xl font-semibold text-slate-800">Файл устгах</p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-4 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-600 bg-red-100 rounded-full">
              <i className="text-xl bi bi-trash" />
            </div>

            <p className="mb-5 text-sm text-gray-500">
              Та сонгосон {selectedIds?.length} файлыг устгахдаа итгэлтэй байна
              уу?
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

      <Navigation />

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="p-4 mb-3 bg-white border shadow-sm rounded-2xl border-slate-100">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Сургалтын файлууд
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Нийт {filteredList?.length || 0} файл
              </p>
            </div>

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

          <div className="relative mt-2">
            <input
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-4 pr-10 text-sm border outline-none h-11 rounded-xl border-slate-200 bg-slate-50 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Файлын нэрээр хайх..."
              type="text"
            />

            <i className="absolute -translate-y-1/2 bi bi-search right-3 top-1/2 text-slate-500" />
          </div>
        </div>

        <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
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
                  <th className="px-4 py-3 font-semibold">Файлын нэр</th>
                  <th className="px-4 py-3 font-semibold">Үүсгэсэн хугацаа</th>
                  <th className="w-24 px-4 py-3 font-semibold text-center">
                    Үйлдэл
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm divide-y divide-slate-100">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 text-slate-500">
                        <i className="text-xl bi bi-folder2-open" />
                      </div>
                      <p className="font-medium text-slate-700">
                        Файл олдсонгүй
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

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 text-indigo-600 shrink-0 rounded-xl bg-indigo-50">
                            <i
                              className={`bi ${getFileIcon(data.fileName)} text-lg`}
                            />
                          </div>

                          <div>
                            <p className="max-w-[420px] truncate font-medium text-slate-800">
                              {data.fileName}
                            </p>
                            <p className="max-w-[420px] truncate text-xs text-slate-400">
                              {data.filePath}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {data.createdAt}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button
                          className="inline-flex items-center justify-center text-indigo-600 rounded-lg h-9 w-9 hover:bg-indigo-50 hover:text-indigo-800"
                          onClick={() => window.open(`http://${data.filePath}`)}
                        >
                          <i className="text-lg bi bi-download" />
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

export default TrainingFiles;
