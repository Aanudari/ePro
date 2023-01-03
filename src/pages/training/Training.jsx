import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";

import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
function Traingings() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const data = location.state.data;
  const [id, setId] = useState();

  const [showView, setShowView] = useState(null);
  const [TRateChoosen, setTRateChoosen] = useState();
  const hideModalView = () => setShowView(null);
  const [showCreate, setShowCreate] = useState(null);
  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [showEdit, setShowEdit] = useState(null);
  const hideModalEdit = () => setShowEdit(null);
  const showModalDelete = (e) => {
    setShowDelete(true);
    setId(e.currentTarget.dataset.id);
  };
  const handleDelete = () => {
    console.log(id);
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `http://192.168.10.248:9000/v1/Training/delete?trId=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          const timer = setTimeout(() => navigate("/trainings"), 1000);
          return () => clearTimeout(timer);
        } else {
          console.log(res.data.resultMessage);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (data) => {
    navigate("/edit-training", {
      state: { data: data },
    });
  };
  return (
    <div className="w-full min-h-[calc(100%-56px)] ">
      <Navigation />
      <div>
        <Modal
          show={showView}
          onHide={hideModalView}
          size="lg"
          //   backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{TRateChoosen?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>йййййййй</div>
          </Modal.Body>
        </Modal>
        <Modal
          show={showDelete}
          onHide={hideModalDelete}
          size="ml"
          //   backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалтын үнэлгээ устгах</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Устгах уу?
              </h3>
              <button
                type="button"
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Тийм
              </button>
              <button
                onClick={hideModalDelete}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
          //   backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Сургалтын үнэлгээ засах</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="max-w-screen-lg mx-auto">
              <div className="md:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  name
                </label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input
                    type="text"
                    className="outline-none  w-full rounded bg-gray-50 h-10 block p-2"
                    // defaultValue={editData.name}
                    // onChange={(e) => {
                    //   setNameEdit(e.target.value);
                    // }}
                  />
                </div>
              </div>

              <div className="col-span-1 text-right mt-4">
                <div className="inline-flex items-end">
                  <button
                    // onClick={navigateIndexEdit}
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="container mx-auto ">
        <div className="flex justify-between w-full px-4 py-2">
          <div className="text-lg font-bold">Сургалтууд</div>
          {/* <div className="px-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            <i className="bi bi-clipboard-plus" onClick={showModalCreate} />
          </div> */}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border border-collapse table-auto">
            <thead className="">
              <tr className="text-base font-bold text-left bg-gray-50">
                <th className="px-4 py-3 border-b-2 border-red-500">no</th>
                <th className="px-4 py-3 border-b-2 border-yellow-500">name</th>
                <th className="px-4 py-3 border-b-2 border-green-500">
                  description
                </th>
                <th className="px-4 py-3 text-center border-b-2 border-blue-500 sm:text-left">
                  teacher
                </th>
                <th className="px-4 py-3 border-b-2 border-purple-500">
                  startDate
                </th>
                <th className="px-4 py-3 border-b-2 border-purple-500">
                  endDate
                </th>
                <th className="px-4 py-3 text-center border-b-2 border-pink-500 sm:text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-900">
              {data
                ? data.map((data, i) => (
                    <tr
                      key={i}
                      className="py-10 border-b border-gray-200 hover:bg-gray-200"
                      data-id={data}
                    >
                      <td className="flex flex-row items-center px-4 py-4">
                        {i + 1}
                      </td>
                      <td className="px-4 py-4">{data.name}</td>
                      <td className="px-4 py-4">{data.description}</td>
                      <td className="px-4 py-4">{data.teacher}</td>
                      <td className="px-4 py-4">{data.startDate}</td>
                      <td className="px-4 py-4">{data.endDate}</td>
                      <td className="px-4 py-4">
                        <a
                          data-id={data.id}
                          // onClick={() => {
                          //   showModalView(data);
                          // }}
                          className="text-blue-400 hover:text-black ml-2  text-lg"
                        >
                          <i className="bi bi-eye-fill"></i>
                        </a>
                        <a
                          className="text-yellow-600 hover:text-black ml-2 text-lg"
                          data-id={data}
                          onClick={() => {
                            handleEdit(data);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </a>
                        <a
                          data-id={data.id}
                          onClick={showModalDelete}
                          className="text-rose-400 hover:text-black ml-2 text-lg"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </a>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Traingings;
