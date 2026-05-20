import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { notification } from "../../service/toast";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";

function QuestionCell({ q, setTrigger }) {
  const { TOKEN } = useStateContext();
  const { width } = getWindowDimensions();

  const [showDelete, setShowDelete] = useState(null);
  const [id, setId] = useState();
  const [openQuestion, setOpenQuestion] = useState(null);

  const hideModalDelete = () => setShowDelete(null);

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
        if (res.data.isSuccess === true) {
          setTrigger((prev) => !prev);
          notification.success(`${res.data.resultMessage}`);
          hideModalDelete();
        }

        if (res.data.isSuccess === false) {
          notification.error(`${res.data.resultMessage}`);
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

  return (
    <div>
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
        dialogClassName="modal-100w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-xl font-semibold text-slate-800">
              Асуулт устгах
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-600 bg-red-100 rounded-full">
              <i className="text-xl bi bi-trash" />
            </div>

            <p className="mb-5 text-sm text-gray-500">
              Та асуултыг устгахдаа итгэлтэй юу?
            </p>

            <button
              type="button"
              onClick={handleDelete}
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

      <div className="space-y-3">
        {q?.map((item, i) => {
          const isOpen = openQuestion === item.questionId;
          const hasAnswers = item.trRatingAnswer?.length > 0;

          return (
            <div
              key={item.questionId || i}
              className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-100"
            >
              <div className="flex items-start justify-between gap-3 p-4">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center text-sm font-semibold text-indigo-700 h-9 w-9 shrink-0 rounded-xl bg-indigo-50">
                    {i + 1}
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">
                      {item.question}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {hasAnswers ? (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {item.trRatingAnswer.length} хариулттай
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
                          Нээлттэй асуулт
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {hasAnswers && (
                    <button
                      onClick={() =>
                        setOpenQuestion(isOpen ? null : item.questionId)
                      }
                      className="flex items-center justify-center rounded-lg h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                    >
                      <i
                        className={`bi ${
                          isOpen ? "bi-chevron-up" : "bi-chevron-down"
                        }`}
                      />
                    </button>
                  )}

                  <button
                    onClick={() => showModalDelete(item)}
                    className="flex items-center justify-center text-red-500 rounded-lg h-9 w-9 hover:bg-red-50"
                  >
                    <i className="bi bi-trash-fill" />
                  </button>
                </div>
              </div>

              {isOpen && hasAnswers && (
                <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {item.trRatingAnswer?.map((answer, ind) => (
                      <div
                        key={ind}
                        className="px-3 py-2 text-sm font-medium bg-white border rounded-xl border-slate-100 text-slate-700"
                      >
                        {answer.answer}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCell;
