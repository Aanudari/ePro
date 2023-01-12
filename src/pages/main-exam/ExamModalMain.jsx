import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import ExamHeader from "./ExamHeader";
import ExamEditHeader from "./ExamEditHeader";
import EditQuestionMenu from "./edits/EditQuestionMenu";
function ExamModalMain({ setExamModal, id, exams, examTri, setExamTri }) {
  const [filtered, setFiltered] = useState();
  const [data, setData] = useState();
  const { TOKEN, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  let chosen = exams.filter((item, index) => {
    return item.id == id;
  });
  let deviceIds = [];
  // for (let index = 0; index < chosen[0].devInfos.length; index++) {
  //   const element = chosen[0].devInfos[index].deviceId;
  //   deviceIds.push(element);
  // }
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
  }, [trigger2]);
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
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/Question/${categoryID}`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setCategoryData(res.data.questionList);
        }
      })
      .catch((err) => console.log(err));
  }, [categoryID]);

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
        setTrigger2(!trigger2);
        setArr([]);
      })
      .catch((err) => console.log(err));
  };
  // console.log(filtered && filtered[0]?.answerList)
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
                    onClick={() => {
                      checked.length < 1 &&
                        handleQuestion(
                          question.id,
                          question.question,
                          question.points
                        );
                    }}
                    className={`w-full py-3 px-3 font-[400] flex flex-col
                                    transition hover:bg-opacity-10 hover:bg-gray-700 rounded-lg
                                        cursor-pointer pt-10 ${
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
                              <i className="bi bi-check-circle text-xl px-1 text-teal-500"></i>
                            ) : (
                              <i
                                className={`bi bi-circle text-xl px-1 outline-none text-gray-400`}
                              ></i>
                            )}
                            <span className="ml-2 text-[14px] font-[400]">
                              {answer.answer}
                            </span>
                          </h6>
                        ))
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
        <button
          onClick={() => {
            setSideQuestions(!sideQuestions);
          }}
          className="w-[35px] h-[35px] shadow absolute right-[calc(3%)] bottom-[calc(5%)] rounded-full flex justify-center items-center "
        >
          <i className="bi bi-plus-circle-fill text-[35px] text-teal-600 hover:scale-110 hover:text-teal-500 active:text-teal-400"></i>
        </button>
      </div>
      {showSide && (
        <div className="h-screen w-[200px] bg-teal-400 transition from-left overflow-scroll">
          <div className="h-[50px]"></div>
          <input type="file" />
        </div>
      )}
      {sideQuestions && (
        <div className="h-screen w-[400px] bg-white transition from-left overflow-scroll shadow  flex flex-col justify-between">
          <div className="px-2 py-2">
            <div className="h-[30px]"></div>
            {!showQuestions ? (
              <h6 className="text-teal-600 text-[14px] flex justify-between">
                <span className="font-[500]">
                  <i className="bi bi-caret-down-square-fill mr-2"></i>
                  Шалгалтын категориуд
                </span>
                <i
                  onClick={() => {
                    setSideQuestions(false);
                  }}
                  className="bi bi-x-circle cursor-pointer"
                ></i>
              </h6>
            ) : (
              <h6 className="text-teal-600 text-[14px] flex justify-between">
                <span className="font-[500]">
                  <i className="bi bi-caret-down-square-fill mr-2"></i>
                  Асуултууд
                </span>
                <i
                  onClick={() => {
                    setSideQuestions(false);
                    setShowQuestions(false);
                  }}
                  className="bi bi-x-circle cursor-pointer"
                ></i>
              </h6>
            )}
            {!showQuestions
              ? categories?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setcategoryID(item.id);
                      setShowQuestions(true);
                    }}
                    className="h-10 w-full bg-teal-500 mb-1 flex items-center pl-3 justify-between shadow-sm cursor-pointer hover:bg-teal-600 "
                  >
                    <span className="font-[500] text-white text-[12px]">
                      {item.name}
                    </span>
                    <div className="h-full flex"></div>
                  </div>
                ))
              : categoryData?.map((item, index) => (
                  <div
                    key={index}
                    className=" py-2 w-full border mb-1 flex items-center pl-3 justify-between shadow-sm cursor-pointer  "
                  >
                    <span className="font-[500] text-teal-600 text-[12px]">
                      {item.question}
                    </span>
                    <div
                      onClick={() => {
                        handleCollectIds(item.id);
                      }}
                      className="h-[20px] min-w-[20px] flex mr-2 border rounded flex items-center justify-center"
                    >
                      {arr.includes(item.id) && (
                        <i className="bi bi-check text-2xl text-teal-600"></i>
                      )}
                    </div>
                  </div>
                ))}
          </div>
          <div className="h-[80px] bg-white shadow flex items-start w-full justify-between px-3 pt-3">
            {showQuestions && (
              <div
                onClick={() => {
                  setShowQuestions(false);
                }}
                className="h-[30px] w-[100px] bg-teal-500 rounded-sm px-3 flex items-center font-[400] text-white
                            cursor-pointer active:bg-teal-400 hover:bg-teal-600"
              >
                <span className="mr-2 mb-1 font-[400] text-white">Буцах</span>
                <div className="pl-2 h-full flex items-center border-l border-gray-300">
                  <i className="bi bi-ui-checks"></i>
                </div>
              </div>
            )}
            {arr.length > 0 && (
              <div
                onClick={() => {
                  handleAddQuestion();
                }}
                className="h-[30px] min-w-[150px] bg-teal-500 rounded-sm px-3 flex items-center font-[400] text-white
                            cursor-pointer active:bg-teal-400 hover:bg-teal-600"
              >
                <span className="mr-2 mb-1 font-[400] text-white">
                  Асуулт нэмэх
                </span>
                <div className="pl-2 h-full flex items-center border-l border-gray-300">
                  <i className="bi bi-ui-checks"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamModalMain;
