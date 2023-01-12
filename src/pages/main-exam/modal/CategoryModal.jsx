import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import CreateQuestionMain from "../CreateQuestionMain";
import EditQuestionMain from "../EditQuestionMain";
import CreateExamMain from "../CreateExamMain";
import ImageUploaderSmall from "../SelectOptions/ImageUploderSmall";
import { logout } from "../../../service/examService";
function CategoryModal({
  setCategoryModal,
  id,
  depId,
  setShowCategoryMenu,
  setTriggerCat,
  triggerCat,
}) {
  const { TOKEN, activeMenu } = useStateContext();
  const [data, setData] = useState();
  const [addAnswer, setAddAnswer] = useState(false);
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
  const [success, setSuccess] = useState(false);
  const submitQuestion = () => {
    console.log(answerSchema);
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
        setAddAnswer(!addAnswer);
        setTriggerCat(triggerCat);
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
  const [imgSide, setImgSide] = useState(false);
  // console.log(checked)
  // console.log(data);
  return (
    <div
      className={`fixed ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[25px] left-0"
      } 
            bg-black bg-opacity-50 flex justify-center items-center
            `}
    >
      {examState ? (
        <div className="w-screen h-screen flex justify-center items-center gap-2 pl-2">
          <div className="w-[calc(80%)] shrink h-[600px] bg-white flex flex-col ">
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
            {addAnswer ? (
              <div className="w-full h-full">
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
              <div className="w-full h-full px-3 overflow-scroll py-5">
                <div className="">
                  {data?.map((question, index) => (
                    <div
                      key={index}
                      className="mb-4 p-2 rounded-lg border bg-teal-500"
                    >
                      <div
                        className={`w-full parent h-14 font-[400] flex items-center justify-between
                                             hover:text-sky-500 px-2 text-white
                                            ${
                                              checked.includes(question.id) &&
                                              "text-sky-400"
                                            } relative`}
                      >
                        <span className="m-0 font-[500]">
                          {question.question}
                          {question.id}
                        </span>
                        {createExam &&
                          !addAnswer &&
                          data?.length !== undefined && (
                            <div
                              onClick={() => {
                                handleCheck(question.id);
                              }}
                              className={`absolute cursor-pointer right-[20px] w-[20px] h-[20px] rounded border-[2px] 
                                             hover:!border-gray-200 ${
                                               checked.includes(question.id) &&
                                               "!border-white"
                                             }`}
                            >
                              {checked.includes(question.id) && (
                                <i className="bi bi-check2 text-xl absolute top-[-7px] right-[-1.5px] text-white"></i>
                              )}
                            </div>
                          )}
                        {createExam &&
                        !addAnswer &&
                        data?.length !== undefined ? null : (
                          <div
                            className={`child h-full w-[50px]  ${
                              answerContainer.includes(question.id)
                                ? "flex"
                                : "hidden"
                            } 
                                                justify-end items-center mb-1`}
                          >
                            <i
                              onClick={() => {
                                deleteQuestion(question.id);
                              }}
                              className="bi bi-trash3-fill cursor-pointer text-red-500 text-xl mb-1"
                            ></i>
                          </div>
                        )}
                      </div>
                      <EditQuestionMain
                        imgSide={imgSide}
                        setImgSide={setImgSide}
                        question={question}
                      />
                      {imgSide && (
                        <div className="w-[300px] h-screen bg-white appear-smooth p-2 fixed top-[30px] right-0">
                          <div className="h-[26px]"></div>
                          <div className="w-full h-full border">
                            <ImageUploaderSmall question={question} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
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
          {imgSide && (
            <div className="w-[300px] h-screen appear-smooth p-2">
              <div className="h-[26px]"></div>
              <div className="w-full h-full"></div>
            </div>
          )}
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
