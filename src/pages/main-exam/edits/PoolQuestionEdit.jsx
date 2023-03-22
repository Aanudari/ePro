import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import React, { useEffect } from "react";
import DeleteConfirm from "../modal/DeleteComfirm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactImageUploading from "react-images-uploading";
import { logout } from "../../../service/examService";
import Offcanvas from "react-bootstrap/Offcanvas";
function PoolQuestionEdit({
  data,
  indexed,
  setTrigger,
  trigger,
  handleCheck,
  createExam,
  checked,
}) {
  const [answers, setAnswers] = useState(data.answers);
  useEffect(() => {
    setAnswers(data.answers);
  }, [data]);
  const { TOKEN } = useStateContext();
  const [edit, setEdit] = useState(false);
  const [question, setQuestion] = useState(data.question);
  const [points, setPoints] = useState(data.points);
  const [qimgUrl, setQimgUrl] = useState(data.qimgUrl);
  const main = {
    questionId: data.id,
    question: question,
    points: points,
    qimgUrl: qimgUrl,
    status: data.status,
    answers: answers,
  };
  const [noti, setNoti] = useState(false);
  const handleEdit = (value, answerId, isTrue) => {
    setNoti(false);
    let tempo = main.answers;
    let temp = tempo.map((el, i) => {
      if (i == answerId) {
        return { ...el, answer: value };
      } else {
        return el;
      }
    });
    setAnswers(temp);
  };
  const handleIsTrue = (value, answerId) => {
    let tempo = main.answers;
    let temp = tempo.map((el, i) => {
      if (i == answerId) {
        return { ...el, answer: value, isTrue: "1" };
      } else {
        return { ...el, isTrue: "0" };
      }
    });
    setAnswers(temp);
  };
  const handleDelete = (index, obj) => {
    if (obj.isTrue !== "1") {
      let tempo = main.answers;
      let temp = tempo.filter((item, ind) => {
        if (index !== ind && tempo.length > 0) {
          return item;
        }
      });
      main.answers = temp;
      setAnswers(temp);
    } else {
      toast.error(
        "Зөв хариулт устгахгүй !, Утгыг нь засаж болно, Эсвэл өөр хариултыг зөв болго тэгвэл болно.",
        {
          position: "bottom-right",
        }
      );
    }
  };
  const addAnswer = () => {
    let tempo = main.answers;
    let blueP = { answer: "", aImgUrl: "", isTrue: "0" };
    let toStr = tempo.map((el) => {
      return JSON.stringify(el);
    });
    if (!toStr.includes(JSON.stringify(blueP))) {
      tempo.push(blueP);
    } else {
      toast.info(
        `${tempo.length}-р хариултдаа утга оруул, Тэгээд дараагийн хариулт үүсгэж болно`,
        {
          position: "bottom-right",
        }
      );
    }
    let newSet = tempo.map((el) => {
      return el;
    });
    setAnswers(newSet);
  };
  const handleSubmit = (e) => {
    let tri = false;
    // e.preventDefault();
    for (let index = 0; index < main.answers.length; index++) {
      const element = main.answers[index];
      if (element.answer == "") {
        tri = true;
        toast.error("Хариултын утга оруулна уу !", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      }
    }
    if (tri === false) {
      axios({
        method: "put",
        headers: {
          Authorization: `${TOKEN}`,
          "Content-Type": "application/json",
          accept: "text/plain",
        },
        url: `${process.env.REACT_APP_URL}/v1/Pool/update/question`,
        data: main,
      })
        .then((res) => {
          setTrigger(!trigger);
          setEdit(false);
          setImgSide(false);
        })
        .catch((err) => console.log(err));
    }
  };
  // console.log(main);
  const [imgSide, setImgSide] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [questionId, setQuestionId] = useState();
  const deleteQuestion = (val) => {
    setQuestionId(val);
    setConfirm(true);
  };
  const actualDelete = () => [
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/question/${questionId}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setTrigger(!trigger);
        setConfirm(false);
      })
      .catch((err) => {
        console.log(err);
      }),
  ];
  const deletePicture = (value) => {
    axios({
      method: "delete",
      headers: {
        Authorization: `${TOKEN}`,
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamFile/${value}`,
    })
      .then((res) => {
        // console.log(res.data);
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        }
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        } else {
          setTrigger(!trigger);
          setQimgUrl("");
          handleSubmit();
        }
      })
      .catch((err) => console.log(err));
  };
  const [list, setList] = useState();
  const [showList, setShowList] = useState(false);
  // console.log(main);
  // console.log(main);
  const getLockedQuestionExams = (value) => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/getExamInfo/${value}`,
    })
      .then((res) => {
        if (
          res.data.resultMessage === "Unauthorized" ||
          res.data.resultMessage === "Input string was not in a correct format."
        ) {
          logout();
        } else {
          setList(res.data.examinfos);
        }
      })
      .catch((err) => console.log(err));
  };
  // console.log(list);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <ToastContainer />
      <div
        className={`border-t-[6px] border-l-[2px] border-r-[2px] border-[#50a3a2] rounded-lg relative bg-[#50a3a2]`}
      >
        <Offcanvas
          style={{ width: "300px" }}
          placement="end"
          show={show}
          onHide={handleClose}
          responsive="lg"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="text-white font-[500] text-[15px] text-container">
                {data.question}
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {list?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="text-white text-sm px-3 rounded py-2 bg-teal-500 font-[400] mt-2 w-full"
                >
                  {item.examName}
                </div>
              );
            })}
          </Offcanvas.Body>
        </Offcanvas>
        {confirm && (
          <DeleteConfirm setConfirm={setConfirm} deleteCat={actualDelete} />
        )}
        {!edit && createExam ? (
          <button
            onClick={() => {
              handleCheck(data.id);
            }}
            className="absolute bottom-[20px] right-[20px] px-2 hover:bg-teal-600 py-1 bg-teal-500 font-[500] flex justify-center 
        items-center text-white rounded-lg active:bg-teal-500"
          >
            {checked.includes(data.id) ? (
              <i className="bi bi-check2 text-2xl "></i>
            ) : (
              <i className="bi bi-plus text-2xl"></i>
            )}
          </button>
        ) : null}
        {data.status == "NE" && !createExam ? (
          <button
            onClick={() => {
              getLockedQuestionExams(data.id);
              handleShow();
            }}
            className="absolute active:bg-teal-400 bottom-[20px] right-[20px] px-3 py-2 bg-teal-500 font-[500] flex justify-center 
        items-center text-white rounded-lg "
          >
            <i className="bi bi-lock-fill text-xl"></i>
          </button>
        ) : null}
        {data.status == "SE" && !createExam && edit ? (
          <button
            onClick={() => {
              deleteQuestion(data.id);
            }}
            className="absolute bottom-[25px] right-[calc(25%)] px-2 py-1s bg-red-500 font-[500] flex justify-center 
        items-center text-white rounded-lg "
          >
            <i className="bi bi-trash3 text-lg"></i>
          </button>
        ) : null}
        <div
          onClick={() => {
            data.status !== "NE" && setEdit(true);
          }}
          className={`w-full shadow-md py-3 px-3 font-[400] ${
            edit
              ? "bg-gray-500 bg-opacity-90"
              : data.status == "NE"
              ? "bg-gray-200"
              : null
          }  bg-gray-50 flex flex-col transition rounded-lg pt-10 `}
        >
          <div className="flex justify-between gap-2">
            <div className=" w-full flex items-start">
              <span className="font-[500] mt-[2px]">{indexed + 1}.</span>
              {edit ? (
                <input
                  defaultValue={data.question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                  type="text"
                  className="outline-none rounded-md ml-2 h-[40px] focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[16px] w-[calc(90%)] font-[400]"
                  autoCorrect="false"
                  spellCheck={false}
                  autoFocus
                />
              ) : (
                <div className="w-full">
                  <h6 className="mb-0 mt-1 ml-2 font-[400]">{data.question}</h6>
                  <div
                    className={`${
                      data.qimgUrl !== ""
                        ? "border p-2 w-full mt-2 rounded flex justify-center bg-white"
                        : "hidden"
                    }`}
                  >
                    <img
                      className="w-[300px] h-[200px] mt-2"
                      src={`http://${data.qimgUrl}`}
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>

            {edit ? (
              <div className="h-[42px] flex items-center justify-end">
                <i
                  onClick={() => {
                    setImgSide(!imgSide);
                  }}
                  className="bi active:text-teal-500 bi-images text-xl mr-3 text-teal-600 "
                ></i>
                <span className="mb-0 font-[500]">Оноо </span> :
                <input
                  onChange={(e) => {
                    setPoints(e.target.value);
                  }}
                  defaultValue={data.points}
                  type="text"
                  className="outline-none rounded-md ml-2 h-[40px] focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[15px] w-1/3 font-[400]"
                  autoCorrect="false"
                  spellCheck={false}
                />
              </div>
            ) : (
              <div className="h-[32px] flex items-start mt-1 rounded-full border px-3 flex items-center bg-teal-500 text-white">
                <span className="mb-0 font-[400] text-[15px]">
                  {data.points}
                </span>
                <span className="mb-0 font-[400] text-[15px] mt-0 ml-1">
                  оноо
                </span>
              </div>
            )}
          </div>

          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="flex !w-full"
          >
            <div className="mt-3 w-[calc(70%)]">
              {edit
                ? main.answers.map((item, index) => (
                    <div
                      key={JSON.stringify(item)}
                      className="flex w-full parent"
                    >
                      <div className="relative w-full">
                        <h6 className=" font-[400] pl-3 flex items-center ">
                          <i
                            onClick={() => {
                              handleDelete(index, item);
                            }}
                            className="bi cursor-pointer hover:scale-105 transition-all active:text-red-500 bi-trash3 absolute right-[-10px] text-gray-600 child top-[12px]"
                          ></i>
                          {item.isTrue == "1" ? (
                            <i
                              onClick={() => {
                                handleIsTrue(item.answer, index, item.isTrue);
                              }}
                              className="bi bi-check-circle text-xl px-1 text-teal-500"
                            ></i>
                          ) : (
                            <i
                              onClick={() => {
                                handleIsTrue(item.answer, index, item.isTrue);
                              }}
                              className="bi bi-circle text-xl px-1 text-gray-400"
                            ></i>
                          )}
                          <input
                            onChange={(e) => {
                              handleEdit(e.target.value, index);
                            }}
                            defaultValue={item.answer}
                            type="text"
                            className={`outline-none rounded-md ml-2 h-[40px] 
focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[14px] w-[calc(92%)] font-[400]`}
                            autoCorrect="false"
                            spellCheck={false}
                            autoFocus
                          />
                        </h6>
                      </div>
                    </div>
                  ))
                : data.answers.map((item, index) => (
                    <div key={index} className="">
                      <h6 className=" font-[400] pl-3 flex items-center">
                        {item.isTrue == "1" ? (
                          <i className="bi bi-check-circle text-xl px-1 text-teal-500"></i>
                        ) : (
                          <i className="bi bi-circle text-xl px-1 text-gray-400"></i>
                        )}
                        <span className="ml-2 text-[14px] font-[400]">
                          {item.answer}
                        </span>
                      </h6>
                    </div>
                  ))}
              {edit && (
                <div className="mt-4 ">
                  <span
                    onClick={() => {
                      addAnswer();
                    }}
                    className="text-teal-500 hover:text-teal-400 font-[500] cursor-pointer"
                  >
                    <i className="bi bi-plus-lg mr-2"></i>
                    Хариулт нэмэх
                  </span>
                </div>
              )}
              {data.qimgUrl !== "" && edit && (
                <div className="w-[500px] h-[200px] flex appear-smooth p-2 !bg-white mt-2 rounded p-2">
                  {/* <ImageUploader setImageUrl={setQimgUrl} /> */}
                  <img
                    className="h-full"
                    src={`http://${data.qimgUrl}`}
                    alt=""
                  />
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deletePicture(data.id);
                      }}
                      className="ml-1 bottom-[20px] right-[20px] px-3 hover:bg-teal-600 py-2 bg-teal-500 font-[500] flex justify-center 
        items-center text-white rounded-lg active:bg-teal-500"
                    >
                      <i className="bi bi-trash3 text-lg"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // deletePicture(data.id);
                      }}
                      className="m-1 bottom-[20px] right-[20px] px-3 hover:bg-teal-600 py-2 bg-teal-500 font-[500] flex justify-center 
        items-center text-white rounded-lg active:bg-teal-500"
                    >
                      <i className="bi bi-arrow-clockwise text-lg"></i>
                    </button>
                  </div>
                </div>
              )}
              <ReactImageUploading />
            </div>
            {edit && (
              <button
                type="submit"
                className="absolute bottom-[20px] right-[20px] px-3 hover:bg-teal-600 py-2 bg-teal-500 font-[500] flex justify-center 
        items-center text-white rounded-lg active:bg-teal-500"
              >
                Өөрчлөлт хадгалах
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="py-3"></div>
    </div>
  );
}

export default PoolQuestionEdit;
