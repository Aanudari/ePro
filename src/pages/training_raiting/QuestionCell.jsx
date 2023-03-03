import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import DatePicker from "react-datepicker";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
function QuestionCell({ q, setTrigger }) {
  const location = useLocation();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const { width } = getWindowDimensions();
  const [showDelete, setShowDelete] = useState(null);
  const hideModalDelete = () => setShowDelete(null);
  const [id, setId] = useState();
  const showModalDelete = (data) => {
    setShowDelete(true);
    setId(data.questionId);
  };
  const handleDelete = () => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/TrainingRating/rating/deletequestion?queId=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
        }
        if (res.data.isSuccess === true) {
          notification.success(`${res.data.resultMessage}`);
          setTrigger(true);
          hideModalDelete();
        } else {
          console.log(res.data.resultMessage);
        }
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
      })
      .catch((err) => console.log(err));
  };
  const [openQuestion, setOpenQuestion] = useState(null);

  return (
    <div>
      <Modal
        show={showDelete}
        onHide={hideModalDelete}
        size="ml"
        backdrop="static"
        style={
          width < 768
            ? {
                width: "calc(100%)",
                left: "0",
              }
            : {
                width: "calc(100% - 250px)",
                left: "250px",
              }
        }
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-100w"
        centered
      >
        <Modal.Header closeButton>
          <span className="text-xl text-black">Асуулт устгах устгах</span>
        </Modal.Header>
        <Modal.Body>
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Та асуултыг устгахдаа итгэлтэй уу?
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

      {q?.map((q, i) => (
        <div key={i} className="mb-2 border-gray-400">
          <div className="shadow-sm border border-t-4 cursor-pointer bg-white rounded-md flex flex-1 items-center p-4">
            <div className="flex-1 pl-1 md:mr-16">
              <div className="font-medium dark:text-white">{q.question}</div>
              {q.trRatingAnswer.length === 0 ? null : (
                <div className="text-sm text-gray-600 dark:text-gray-200">
                  Хариултын тоо {q.trRatingAnswer.length}
                </div>
              )}
            </div>
            <div>
              <a
                onClick={() => {
                  showModalDelete(q);
                }}
                className="inline-block rounded bg-indigo-600 px-2 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                <i className="bi bi-trash-fill" />
              </a>
              {q.trRatingAnswer.length === 0 ? null : (
                <a
                  onClick={() =>
                    setOpenQuestion(
                      q.question === openQuestion ? null : q.question
                    )
                  }
                  className="inline-block rounded px-3 py-2 text-xs font-medium text-black hover:bg-indigo-200 ml-1"
                >
                  <i className="bi bi-chevron-double-right" />
                </a>
              )}
            </div>
            <div>
              {openQuestion === q.question && (
                <div className="ml-6">
                  {q.trRatingAnswer?.map((a, ind) => (
                    <div key={ind} className="flex justify-between">
                      <span className="block text-sm mr-4 font-bold">
                        {a.answer}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionCell;
