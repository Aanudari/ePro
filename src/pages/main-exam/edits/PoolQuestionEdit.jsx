import { useState } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect } from "react";

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
  const handleEdit = (value, answerId, isTrue) => {
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
  const handleDelete = (index) => {
    let tempo = main.answers;
    let temp = tempo.filter((item, ind) => {
      if (index !== ind && tempo.length > 0) {
        return item;
      }
    });
    main.answers = temp;
    setAnswers(temp);
  };
  const addAnswer = () => {
    let tempo = main.answers;
    let blueP = { answer: "", aImgUrl: "", isTrue: "0" };
    tempo.push(blueP);
    let newSet = tempo.map((el) => {
      return el;
    });
    setAnswers(newSet);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setTrigger(!trigger);
        setEdit(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteQuestion = (val) => {
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/question/${val}`,
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
  return (
    <div className="h-full">
      <div
        className={`border-t-[5px] border-l border-r border-[#50a3a2] rounded-lg relative `}
      >
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
            className="absolute bottom-[20px] right-[20px] px-3 py-2 bg-teal-500 font-[500] flex justify-center 
        items-center text-white rounded-lg "
          >
            <i className="bi bi-lock-fill text-xl"></i>
          </button>
        ) : null}
        {data.status == "SE" && !createExam ? (
          <button
            onClick={() => {
              deleteQuestion(data.id);
            }}
            className="absolute top-[15px] right-[calc(20%)] px-3 py-2 bg-red-500 font-[500] flex justify-center 
        items-center text-white rounded-lg "
          >
            <i className="bi bi-trash-fill text-xl"></i>
          </button>
        ) : null}
        <div
          onClick={() => {
            data.status !== "NE" && setEdit(true);
          }}
          className={`w-full shadow-md py-3 px-3 font-[400] ${
            edit
              ? "!bg-opacity-10 !bg-gray-700"
              : data.status == "NE"
              ? "!bg-opacity-20 !bg-gray-700"
              : null
          }  bg-gray-50 flex flex-col transition hover:bg-opacity-10 hover:bg-gray-700 rounded-lg cursor-pointer pt-10 `}
        >
          <div className="flex justify-between gap-2">
            <div className="h-[42px] w-full flex items-start">
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
                <h6 className="mb-0 mt-1 ml-2 font-[400]">
                  {data.question}/{data.id}
                </h6>
              )}
            </div>
            {edit ? (
              <div className="h-[42px] flex items-center justify-end">
                <i className="bi active:text-teal-500 bi-images text-xl mr-3 text-teal-600 "></i>
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
              <div className="h-[42px] flex items-start">
                <i className="bi active:text-teal-500 bi-images text-xl mr-3 text-teal-600 "></i>
                <span className="mb-0 font-[400] text-[15px] mt-[1px]">
                  Оноо:
                </span>
                <span className="mb-0 font-[500] text-[16px] ml-1">
                  {data.points}
                </span>
              </div>
            )}
          </div>
          <form
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mt-3">
              {edit
                ? main.answers.map((item, index) => (
                    <div key={index} className="relative parent">
                      <h6 className=" font-[400] pl-3 flex items-center">
                        <i
                          onClick={() => {
                            handleDelete(index);
                          }}
                          className="bi active:text-red-500 bi-trash3 absolute left-[calc(55%)] text-gray-600 child hidden top-[12px]"
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
focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[14px] w-1/2 font-[400]`}
                          autoCorrect="false"
                          spellCheck={false}
                          autoFocus
                        />
                      </h6>
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
                          {item.answer}/{item.id}
                        </span>
                      </h6>
                    </div>
                  ))}
              {edit && (
                <div className="mt-4">
                  <span
                    onClick={() => {
                      addAnswer();
                    }}
                    className="text-teal-500 hover:text-teal-400 font-[500]"
                  >
                    <i className="bi bi-plus-lg mr-2"></i>
                    Хариулт нэмэх
                  </span>
                </div>
              )}
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
