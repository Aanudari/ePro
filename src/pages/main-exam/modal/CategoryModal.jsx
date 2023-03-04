import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import CreateQuestionMain from "../CreateQuestionMain";
import CreateExamMain from "../CreateExamMain";
import { logout } from "../../../service/examService";
import PoolQuestionEdit from "../edits/PoolQuestionEdit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CategoryModal({
  setCategoryModal,
  id,
  depId,
  setShowCategoryMenu,
  setTriggerCat,
  triggerCat,
  addAnswer,
  setAddAnswer,
}) {
  const { TOKEN, activeMenu } = useStateContext();
  const [data, setData] = useState();

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/Question/${id}`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setData(res.data.questionList);
        }
      })
      .catch((err) => console.log(err));
  }, [addAnswer, trigger]);
  const [answers, setAnswers] = useState(false);
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState("");
  const [qImgUrl, setQImgUrl] = useState("");
  const [answerSchema, setAnswerSchema] = useState({
    id: id,
    newQuestions: [
      {
        question: question,
        points: point,
        qimgUrl: qImgUrl,
        addAnswers: [
          {
            answer: "string",
            aImgUrl: "string",
            isTrue: "string",
          },
        ],
      },
    ],
  });
  const [answerArr, setAnswerArr] = useState();
  const [checked, setChecked] = useState([]);
  const handleCheck = (id) => {
    if (checked.includes(id)) {
      setChecked(
        checked.filter((item, index) => {
          return item !== id;
        })
      );
    } else {
      setChecked((prev) => [...prev, id]);
    }
  };
  const handleSchema = (question, point, qImgUrl) => {
    setQuestion(question);
    setPoint(point);
    setQImgUrl(qImgUrl);
    let arr = {
      id: id,
      newQuestions: [
        {
          question: question,
          points: point,
          qimgUrl: qImgUrl,
          addAnswers: answerArr,
        },
      ],
    };
    setAnswerSchema(arr);
  };
  const [createExam, setCreateExam] = useState(false);
  const [finalArr, setFinalArr] = useState([]);

  const handleCreateQuesiton = (object, correct) => {
    // console.log(object)
    let newArr = object?.map((answer, index) => {
      return index == correct
        ? { ...answer, isTrue: "1" }
        : { ...answer, isTrue: "0" };
    });
    setFinalArr(newArr);
  };

  const submitQuestion = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/add/Question`,
      data: JSON.stringify(answerSchema),
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setAddAnswer(!addAnswer);
          setTriggerCat(triggerCat);
          setQImgUrl("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const collector = () => {
    let arr = {
      id: id,
      newQuestions: [
        {
          question: question,
          points: point,
          qimgUrl: qImgUrl,
          addAnswers: finalArr,
        },
      ],
    };
    setAnswerSchema(arr);
  };
  useEffect(() => {
    collector();
  }, [finalArr, checked, question, answers, point]);

  const deleteQuestion = (id) => {
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/question/${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setTrigger(!trigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [answerContainer, setAnswerContainer] = useState([]);
  const editQuestion = (prop) => {
    if (answerContainer.includes(prop)) {
      setAnswerContainer([prop]);
    } else {
      setAnswerContainer((prev) => [prop]);
    }
    setAnswers(true);
    // console.log("edit question !" + prop)
  };
  const [examState, setExamState] = useState(true);
  const handleExamHalf = () => {
    setExamState(!examState);
  };

  return (
    <div
      className={`fixed w-full z-20 h-[calc(100vh-56px)] ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] "
          : "top-[56px] w-full h-full top-[25px] left-0"
      } 
            bg-black bg-opacity-50 flex justify-center items-center
            `}
    >
      <ToastContainer />
      {examState ? (
        <div className="w-screen h-screen flex justify-center items-center gap-2 ">
          <div
            // style={{
            //   background:
            //     "url(https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000)",
            // }}
            style={{
              background:
                "url(https://wallup.net/wp-content/uploads/2016/01/259906-wavy_lines-abstract-blue.jpg)",
            }}
            className="w-[calc(100%)] shrink h-[calc(100vh-56px)] bg-white flex flex-col "
          >
            <div className="w-full min-h-[60px] flex items-center justify-between px-3 glass shadow">
              <div
                onClick={() => {
                  setAddAnswer(!addAnswer);
                  setCreateExam(false);
                  setChecked([]);
                  setAnswers();
                }}
                className="w-[20px] h-full "
              >
                {addAnswer ? (
                  <button className="custom-btn btn-13 w-[150px] mt-2">
                    Буцах
                  </button>
                ) : (
                  // <i className="bi bi-plus-circle text-white text-2xl font-[500]"></i>
                  <button className="custom-btn btn-13 w-[150px] mt-2">
                    Асуулт нэмэх
                  </button>
                )}
              </div>

              <div>
                <button
                  onClick={() => {
                    setCategoryModal(false);
                    setAddAnswer(false);
                  }}
                  className="custom-btn btn-14 w-[150px] mt-1 rounded-none"
                >
                  Хаах
                </button>
              </div>
            </div>
            {addAnswer ? (
              <div className="w-full h-full overflow-scroll">
                {/* CREATE QUESTION !!!
                            CREATE QUESTION !!!
                            CREATE QUESTION !!!
                            CREATE QUESTION !!! */}
                <CreateQuestionMain
                  question={question}
                  handleSchema={handleSchema}
                  setQuestion={setQuestion}
                  setPoint={setPoint}
                  point={point}
                  setQImgUrl={setQImgUrl}
                  qImgUrl={qImgUrl}
                  handleCreateQuesiton={handleCreateQuesiton}
                />
              </div>
            ) : (
              <div className="w-full px-5 overflow-scroll pt-5 pb-5 flex justify-center ">
                <div className="w-[900px]">
                  {data?.length > 0 ? (
                    data.map((question, ind) => (
                      <PoolQuestionEdit
                        setTrigger={setTrigger}
                        trigger={trigger}
                        key={JSON.stringify(question)}
                        data={question}
                        indexed={ind}
                        handleCheck={handleCheck}
                        createExam={createExam}
                        checked={checked}
                      />
                    ))
                  ) : (
                    <div className="font-[400]">
                      Асуултын сан хоосон байна. Та "+" icon дээр дарж шинэ
                      асуулт үүсгэх боломжтой.{" "}
                    </div>
                  )}
                </div>
              </div>
            )}
            {addAnswer && (
              <div
                onClick={submitQuestion}
                className="w-full h-14 bg-gray-600 hover:bg-gray-700 cursor-pointer flex 
                justify-center items-center font-[500] text-sky-500
                "
              >
                Асуулт үүсгэх
              </div>
            )}
            {createExam &&
            !addAnswer &&
            data?.length !== undefined &&
            checked.length > 0 ? (
              <div
                onClick={handleExamHalf}
                className="w-full h-14 bg-gray-600 hover:bg-gray-700 cursor-pointer flex 
                justify-center items-center font-[500] text-sky-500
                "
              >
                Шалгалт үүсгэх {checked.length}/10
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        // page !!!
        // page !!!
        // page !!!
        // page !!!
        // page !!!
        <div className="w-[calc(85%)] shrink h-[600px] bg-white flex flex-col ">
          <div className="w-full min-h-[50px] bg-gray-700 flex justify-between px-3 ">
            <button
              onClick={() => {
                setAddAnswer(!addAnswer);
                setCreateExam(false);
                setChecked([]);
                setAnswers();
              }}
              className="w-[20px] h-full "
            >
              {addAnswer ? (
                <i className="bi bi-x-circle text-sky-500 text-2xl font-[500]"></i>
              ) : (
                <i className="bi bi-plus-circle text-white text-2xl font-[500]"></i>
              )}
            </button>

            <div>
              {data?.length !== undefined && (
                <button
                  onClick={() => {
                    setCreateExam(!createExam);
                    setAddAnswer(false);

                    setAnswers();
                  }}
                  className="w-[20px] h-full "
                >
                  {createExam && !addAnswer && data?.length !== undefined ? (
                    <i className="bi bi-bookmark-x text-sky-500 text-2xl font-[500] "></i>
                  ) : (
                    <i className="bi bi-bookmark-plus text-white text-2xl font-[500] "></i>
                  )}
                </button>
              )}
              <button
                onClick={() => {
                  setCategoryModal(false);
                }}
                className="w-[20px] h-full ml-5 "
              >
                <i className="bi bi-x-lg text-red-500 text-2xl font-[500]"></i>
              </button>
            </div>
          </div>
          <CreateExamMain
            setTriggerCat={setTriggerCat}
            triggerCat={triggerCat}
            setShowCategoryMenu={setShowCategoryMenu}
            setCategoryModal={setCategoryModal}
            setExamState={setExamState}
            depId={depId}
            checked={checked}
          />
          {addAnswer && (
            <div
              onClick={submitQuestion}
              className="w-full h-14 bg-gray-600 hover:bg-gray-700 cursor-pointer flex 
                justify-center items-center font-[500] text-sky-500
                "
            >
              Асуулт үүсгэх
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryModal;
