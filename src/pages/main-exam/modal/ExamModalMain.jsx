import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import ExamHeader from "../ExamHeader";
import ExamEditHeader from "../ExamEditHeader";
import EditQuestionMenu from "../edits/EditQuestionMenu";
import { logout } from "../../../service/examService";
import ExamEditHeader2 from "../ExamEditHeader2";
function ExamModalMain({
  setExamModal,
  id,
  exams,
  examTri,
  setExamTri,
  examSummary,
}) {
  const [filtered, setFiltered] = useState();
  const [showButton, setShowButton] = useState(false);
  const [data, setData] = useState();
  const { TOKEN, activeMenu } = useStateContext();
  let chosen = exams.filter((item, index) => {
    return item.id == id;
  });
  let deviceIds = [];
  const [trigger2, setTrigger2] = useState(false);
  const [users, setUsers] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setUsers(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const [checked, setChecked] = useState([]);
  let array1 = users?.filter((val) =>
    deviceIds.includes(JSON.stringify(val.deviceId))
  );
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/variants?examId=${id}`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setData(res.data.variants);
        }
      })
      .catch((err) => console.log(err));
  }, [trigger2, showButton]);
  const handleDeleteExam = () => {
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/delete?examId=${id}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setExamModal(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleQuestion = (id, name, point) => {
    if (checked.includes(id)) {
      setChecked([]);
      setQuestionName();
    } else {
      setChecked([id]);
      setFilteredQuestion(id);
      setQuestionName(name);
      setPoints(point);
    }
  };
  const [filteredQuestion, setFilteredQuestion] = useState("");
  let questions =
    data &&
    data[0]?.questionList?.map((item) => {
      return item;
    });

  const handleFilter = () => {
    let filtered = questions?.filter((item, index) => {
      return item.id == filteredQuestion;
    });
    setFiltered(filtered);
  };
  useEffect(() => {
    handleFilter();
  }, [filteredQuestion]);
  // console.log(filtered)
  const handleEditQuestion = (value, index) => {
    let arr = filtered[0].answerList.map((item, i) => {
      return index == i ? { ...item, answer: value } : item;
    });
    let assigned = Object.assign(filtered[0], { answerList: arr });
    setFiltered([assigned]);
  };
  const deleteAnswer = (id) => {
    // console.log(id)
    let removed = filtered[0].answerList.filter((item, index) => {
      return index !== id;
    });
    let assigned = Object.assign(filtered[0], { answerList: removed });
    setFiltered([assigned]);
  };
  const [questionName, setQuestionName] = useState("");
  const [points, setPoints] = useState("");
  let schema = {
    questionId: `${[...checked]}`,
    question: `${questionName}`,
    points: `${points}`,
    qimgUrl: "",
    answers: filtered && filtered[0]?.answerList,
  };
  const addAnswer = (id) => {
    let obj = {
      answer: "",
      isTrue: "0",
      answerImgUrl: "",
    };
    let arr = filtered[0].answerList;
    arr.push(obj);
    let assigned = Object.assign(filtered[0], { answerList: arr });
    setFiltered([assigned]);
  };
  // const handleEditSubmit = () => {
  //     console.log('submitting !!!')
  // }
  const handleEditSubmit = (id) => {
    if (checked.includes(id)) {
      setChecked([]);
    } else {
      setChecked([id]);
      setFilteredQuestion(id);
    }
    axios({
      method: "put",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/update/question`,
      data: JSON.stringify(schema),
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setTrigger2(!trigger2);
      })
      .catch((err) => console.log(err));
  };
  const handleEditQuestionName = (value) => {
    setQuestionName(value);
  };
  const [showSide, setShowSide] = useState(false);
  const [editHeader, setEditHeader] = useState(false);
  const [sideQuestions, setSideQuestions] = useState(false);
  const [categories, setCategories] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/Category`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setCategories(res.data.categoryList);
        }
      })
      .catch((err) => console.log(err));
  }, [sideQuestions]);

  const [categoryID, setcategoryID] = useState();
  const [showQuestions, setShowQuestions] = useState(false);
  const [categoryData, setCategoryData] = useState();

  const [arr, setArr] = useState([]);
  const handleCollectIds = (id) => {
    if (arr.includes(id)) {
      let newArr = arr.filter((item) => {
        return item !== id;
      });
      setArr(newArr);
    } else {
      setArr((prev) => [...prev, id]);
    }
  };
  let existingIds = [];
  const handleAddQuestion = () => {
    for (let index = 0; index < data[0].questionList.length; index++) {
      const element = data[0].questionList[index];
      existingIds.push(element.id);
    }
    let finalID = existingIds.concat(arr);
    let main = [];
    for (let index = 0; index < finalID.length; index++) {
      const element = finalID[index];
      main.push({
        id: `${element}`,
      });
    }
    let final = {
      varId: `${data[0].id}`,
      varName: `${data[0].name}`,
      questionIds: main,
    };
    axios({
      method: "put",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/edit/variant`,
      data: JSON.stringify(final),
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setTrigger2(!trigger2);
        setArr([]);
      })
      .catch((err) => console.log(err));
  };
  const deleteQuestion = (value) => {
    let delArr = [];
    for (let index = 0; index < data[0].questionList.length; index++) {
      const element = data[0].questionList[index];
      delArr.push(element.id);
    }
    let filtered = delArr.filter((item) => {
      return item !== value;
    });
    let main = [];
    for (let index = 0; index < filtered.length; index++) {
      const element = filtered[index];
      main.push({
        id: `${element}`,
      });
    }
    let final = {
      varId: `${data[0].id}`,
      varName: `${data[0].name}`,
      questionIds: main,
    };
    // console.log(JSON.stringify(final));
    axios({
      method: "put",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/edit/variant`,
      data: JSON.stringify(final),
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setTrigger2(!trigger2);
        setArr([]);
      })
      .catch((err) => console.log(err));
  };
  const handleCorrect = (value) => {
    let arr = filtered[0].answerList.map((item, i) => {
      return item.id == value
        ? { ...item, isTrue: "1" }
        : { ...item, isTrue: "0" };
    });
    let assigned = Object.assign(filtered[0], { answerList: arr });
    setFiltered([assigned]);
  };
  const [userTrigger, setUserTrigger] = useState(false);
  const [qID, setqID] = useState();
  const [aID, setaID] = useState();
  const changeisTrue = (questionId, answerId) => {
    setShowButton(true);
    setqID(questionId);
    setaID(answerId);
  };
  let newIsTrue = {
    questionId: qID,
    answerId: aID,
    isTrue: "0",
  };
  const submitNewIsTrue = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamReport/edit/question`,
      data: newIsTrue,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        console.log(res);
        setShowButton(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={`fixed ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[25px] left-0"
      } 
        bg-black bg-opacity-50 flex justify-center items-center gap-4 pl-4
        `}
    >
      <div className="shrink w-[calc(85%)] h-[600px] bg-white flex flex-col rounded-t-lg relative">
        <div className="w-full min-h-[50px] bg-gray-700 flex justify-end px-3 rounded-t-lg">
          <button onClick={handleDeleteExam} className="w-[20px] h-full mr-2">
            <i className="bi bi-trash3-fill text-red-500 text-xl font-[500] "></i>
          </button>
          <button
            onClick={() => {
              setExamModal(false);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        {editHeader === false ? (
          <ExamHeader
            array1={array1}
            chosen={chosen}
            setEditHeader={setEditHeader}
            editHeader={editHeader}
            userTrigger={userTrigger}
          />
        ) : examSummary == "Exam over" ? (
          <ExamEditHeader2
            examTri={examTri}
            setExamTri={setExamTri}
            setExamModal={setExamModal}
            array1={array1}
            chosen={chosen}
            setEditHeader={setEditHeader}
            editHeader={editHeader}
            userTrigger={userTrigger}
            setUserTrigger={setUserTrigger}
          />
        ) : (
          <ExamEditHeader
            examTri={examTri}
            setExamTri={setExamTri}
            setExamModal={setExamModal}
            array1={array1}
            chosen={chosen}
            setEditHeader={setEditHeader}
            editHeader={editHeader}
            userTrigger={userTrigger}
            setUserTrigger={setUserTrigger}
          />
        )}
        <div className="w-full h-full px-10 py-2 overflow-scroll">
          <div className="h-full pt-2">
            {data &&
              data[0]?.questionList?.map((question, index) => (
                //  QUESTION !!!
                //  QUESTION !!!
                //  QUESTION !!!
                <div
                  key={index}
                  className={`mt-3 border-t-[5px] border-l border-r border-[#50a3a2] rounded-lg realtive `}
                >
                  <div
                    className={`w-full py-3 px-3 font-[400] flex flex-col
                                    transition hover:bg-opacity-10 hover:bg-gray-700 rounded-lg
                                         pt-10 ${
                                           checked.includes(question.id) &&
                                           "bg-opacity-10 bg-gray-700 "
                                         }`}
                  >
                    <div className="flex justify-between">
                      {checked.includes(question.id) ? (
                        <div className="h-[42px] w-full">
                          <span className="font-[500]">{index + 1}.</span>
                          <input
                            defaultValue={question.question}
                            onChange={(e) => {
                              handleEditQuestionName(e.target.value);
                            }}
                            type="text"
                            className="outline-none mt-2 rounded-md ml-2 h-[40px] focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[14px] w-[calc(90%)] font-[400]"
                            autoCorrect="false"
                            spellCheck={false}
                          />
                        </div>
                      ) : (
                        <span className="m-0 font-[500]">
                          {index + 1}. {question.question}
                        </span>
                      )}
                      {checked.includes(question.id) ? (
                        <div className="h-[42px]">
                          <i
                            onClick={() => {
                              setShowSide(!showSide);
                            }}
                            className="bi active:text-teal-500 bi-images
                                                                        text-2xl mr-3 text-teal-600 "
                          ></i>
                          <span className="m-0 font-[500]">Оноо</span> :
                          <input
                            onChange={(e) => {
                              setPoints(e.target.value);
                            }}
                            defaultValue={question.points}
                            type="text"
                            className="outline-none mt-2 rounded-md ml-2 h-[40px] focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[14px] w-1/2 font-[400]"
                            autoCorrect="false"
                            spellCheck={false}
                          />
                        </div>
                      ) : (
                        <span className="m-0 font-[500]">
                          {question.points}%
                        </span>
                      )}
                    </div>
                    <div>
                      {checked.includes(question.id) ? (
                        <div className="">
                          {filtered &&
                            filtered[0]?.answerList.map((answer, i) => (
                              <EditQuestionMenu
                                answer={answer}
                                i={i}
                                key={i}
                                deleteAnswer={deleteAnswer}
                                handleEditQuestion={handleEditQuestion}
                                handleCorrect={handleCorrect}
                              />
                            ))}
                          <div className="w-full mt-4 flex justify-between">
                            <span
                              onClick={addAnswer}
                              className="text-teal-500 hover:text-teal-400 font-[500]"
                            >
                              <i className="bi bi-plus-lg mr-2"></i>
                              Хариулт нэмэх
                            </span>
                            <div className="flex gap-2">
                              <i
                                onClick={() => {
                                  deleteQuestion(question.id);
                                }}
                                className="bi bi-trash3-fill text-red-500 text-xl font-[500] mr-3"
                              ></i>
                              <button
                                onClick={() => {
                                  handleEditSubmit(question.id);
                                }}
                                className="px-3 hover:bg-teal-600 py-2 bg-teal-500 font-[500]
                                                            flex justify-center items-center text-white rounded-lg active:bg-teal-500
                                                            "
                              >
                                Өөрчлөлт хадгалах
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : checked.includes(question.id) ? (
                        filtered
                      ) : (
                        question?.answerList?.map((answer, index) => (
                          <h6
                            key={index}
                            className="mt-3 font-[400] pl-3 flex items-center"
                          >
                            {answer.isTrue == "1" ? (
                              <i
                                onClick={() => {
                                  changeisTrue(question.id, answer.id);
                                }}
                                className="bi bi-check-circle hover:scale-105 transition-all text-xl px-1 text-teal-500 cursor-pointer"
                              ></i>
                            ) : (
                              <i
                                onClick={() => {
                                  changeisTrue(question.id, answer.id);
                                }}
                                className={`bi bi-circle hover:scale-105 transition-all hover:text-teal-500 text-xl px-1 outline-none text-gray-400 cursor-pointer`}
                              ></i>
                            )}
                            <span className="ml-2 text-[14px] font-[400]">
                              {answer.answer}
                            </span>
                          </h6>
                        ))
                      )}
                      {showButton && (
                        <div
                          className="glass rounded-t absolute h-full w-full top-0 left-0 flex items-center
                        justify-center"
                        >
                          <div
                            className="w-[500px] h-[200px] bg-white rounded flex flex-col
                        justify-between p-4 shadow"
                          >
                            <div className="w-full flex justify-center">
                              <i className="bi bi-exclamation-circle text-3xl text-teal-500"></i>
                            </div>
                            <span className="font-[400] text-center">
                              Та асуултын зөв хариултыг өөрчилснөөр нийт
                              шалгалтын үр дүнд нөлөөлөхийг анхаарна уу .
                            </span>
                            <div className="flex justify-end">
                              <button
                                onClick={() => {
                                  submitNewIsTrue();
                                }}
                                className=" px-3 py-2 bg-teal-500 font-[500] flex justify-center 
        items-center text-white rounded-lg "
                              >
                                Өөрчлөх
                              </button>
                              <button
                                onClick={() => {
                                  setShowButton(false);
                                }}
                                className=" px-3 py-2 bg-gray-400 font-[500] flex justify-center 
        items-center text-white rounded-lg ml-2"
                              >
                                Цуцлах
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                //  QUESTION !!!
                //  QUESTION !!!
                //  QUESTION !!!
                //  QUESTION !!!
              ))}
            <div className="py-3"></div>
          </div>
        </div>
        {/* <button
          onClick={() => {
            setSideQuestions(!sideQuestions);
          }}
          className="w-[35px] h-[35px] shadow absolute right-[calc(3%)] bottom-[calc(5%)] rounded-full flex justify-center items-center "
        >
          <i className="bi bi-plus-circle-fill text-[35px] text-teal-600 hover:scale-110 hover:text-teal-500 active:text-teal-400"></i>
        </button> */}
      </div>
      {showSide && (
        <div className="h-screen w-[200px] bg-teal-400 transition from-left overflow-scroll">
          <div className="h-[50px]"></div>
          <input type="file" />
        </div>
      )}
    </div>
  );
}

export default ExamModalMain;
