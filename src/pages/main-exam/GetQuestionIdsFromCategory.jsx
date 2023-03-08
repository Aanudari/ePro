import { useStateContext } from "../../contexts/ContextProvider";
import { logout } from "../../service/examService";
import axios from "axios";
import { useState, useEffect } from "react";
import QuestionMain from "./QuestionMain";
import bg from "../../assets/background-blue.jpg";
import Select from "react-select";
function GetQuestionIdsFromCategory({ setShow, getIds }) {
  const { activeMenu, TOKEN } = useStateContext();
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
  }, []);
  const [questionIds, setQuestionIds] = useState([]);
  const remover = (value) => {
    let tempo = questionIds.filter((item) => {
      return item !== value;
    });
    setQuestionIds(tempo);
  };
  const collector = (value) => {
    setQuestionIds((prev) => [...prev, value]);
  };
  const [selected, setSelected] = useState([]);
  const [catName, setCatName] = useState("");
  const [catStatus, setCatStatus] = useState("");
  const selectCatId = (value, catName, status) => {
    if (selected.length > 0) {
      setSelected([value]);
      setCatName(catName);
      setCatStatus(status);
    } else {
      setSelected((prev) => [...prev, value]);
      setCatName(catName);
      setCatStatus(status);
    }
  };
  const [questions, setQuestions] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/Question/${
        selected[0] == undefined ? 0 : selected[0]
      }`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setQuestions(res.data.questionList);
        }
      })
      .catch((err) => console.log(err));
  }, [selected]);
  let ids = [
    {
      name: "Асуултын тоо сонгох",
      label: "Асуултын тоо сонгох",
    },
  ];
  let container = [];
  for (let index = 0; index < questions?.length; index++) {
    const element = questions[index];
    ids.push({
      name: element.id,
      label: index + 1,
    });
    container.push(element.id);
  }
  const [catId, setCatId] = useState("");
  const pickRandomNumbers = (value) => {
    let value2 = value.target.value;
    let copyArr = container.slice();
    for (let i = copyArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }
    let arr = [...copyArr.slice(0, value2)];
    setQuestionIds(arr);
  };
  // console.log(questionIds);
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className={`${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
      } 
top-[56px] fixed  h-[calc(100%-56px)] 
bg-black bg-opacity-50 flex items-center justify-center z-20`}
    >
      <div
        style={{
          background: `url(${bg})`,
        }}
        className="bg-gray-200 appear-smooth w-full h-[calc(100%)] relative pb-10"
      >
        {showModal && (
          <NotiModal
            length={questionIds.length}
            setShowModal={setShowModal}
            showModal={showModal}
            getIds={getIds}
            questionIds={questionIds}
            setShow={setShow}
          />
        )}
        <div className="w-full h-14 bg-teal-600 flex justify-between px-4 items-center shadow-sm">
          <div className="flex items-center">
            <div className=" flex justify-between items-center px-4 py-2">
              <span className="text-white font-[500] text-sm">
                Сонгосон : {questionIds.length}/10
              </span>
              {questionIds.length > 0 && (
                <button
                  className="custom-btn btn-13 ml-4 h-11"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Хадгалах
                </button>
              )}
            </div>
          </div>
          <div className="">
            <i
              onClick={() => {
                setShow(false);
              }}
              className="bi bi-x-lg text-xl cursor-pointer hover:scale-105"
            ></i>
          </div>
        </div>
        {selected.length > 0 ? (
          <div className="h-full px-4 py-1 overflow-scroll flex flex-col items-center">
            <div className=" flex gap-2 h-16 items-center justify-between w-[900px]">
              <div
                onClick={() => {
                  setSelected([]);
                }}
                className="px-3 h-9 custom-btn btn-13 hover:bg-teal-600 py-2 bg-teal-600 font-[500] rounded
                    shadow-md text-sm  flex justify-center cursor-pointer items-center text-white  hover:bg-teal-700 w-[200px]"
              >
                <i className="bi bi-backspace mr-2"></i>Буцах
              </div>
              <div className="flex justify-end w-[340px] gap-0">
                <div
                  className={`font-[500] flex justify-end  items-center text-white  
                w-full`}
                >
                  <label>
                    <select
                      onChange={(e) => {
                        pickRandomNumbers(e);
                      }}
                      name=""
                      id=""
                      // disabled
                      className="cursor-pointer"
                    >
                      {ids.map((id, indexOfIds) => (
                        <option
                          key={indexOfIds}
                          value={JSON.stringify(id.label)}
                        >
                          {id.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <div
              className="mt-4 pb-16 w-[900px]
            "
            >
              {questions?.map((question, index) => (
                <QuestionMain
                  key={index}
                  data={question}
                  indexed={index}
                  ids={questionIds}
                  remover={remover}
                  collector={collector}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="px-4 bg-white w-full h-full pt-2 overflow-scroll">
            {categories?.map((category, index) => (
              <div
                key={index}
                className={`relative parent ${
                  category.status == "O" && "hidden"
                }`}
              >
                <div
                  onClick={() => {
                    setCatId(category.id);
                    selectCatId(category.id, category.name, category.status);
                  }}
                  className={`w-full text-white mb-1 h-16  shadow-sm ${
                    category.status == "A"
                      ? "bg-teal-400 hover:bg-teal-500 cursor-pointer"
                      : "bg-gray-400"
                  } 
               flex justify-between px-3 py-2 hover:shadow-cus transition-all`}
                >
                  <div className="flex flex-col justify-center ">
                    <h6 className="font-[500] text-[12px] uppercase">
                      {category.status == "O" && (
                        <i className="bi bi-clock-history mr-2 text-lg"></i>
                      )}
                      {category.departmentName}
                    </h6>
                  </div>
                  <div className="flex justify-between w-[calc(60%)]">
                    <div className="flex flex-col justify-center">
                      <h6 className="font-[500] text-[12px] uppercase">
                        {category.name}
                      </h6>
                    </div>
                    <div className="flex justify-center items-center">
                      <div
                        className="h-8 w-[100px] bg-gray-700 rounded-full flex 
                        justify-center items-center"
                      >
                        <h6 className="m-0 text-[13px]">
                          {category.questionCount}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GetQuestionIdsFromCategory;

function NotiModal({
  length,
  showModal,
  setShowModal,
  getIds,
  questionIds,
  setShow,
}) {
  return (
    <div
      className="glass rounded-t absolute h-full w-full top-0 left-0 flex items-center
                        justify-center !shadow-none z-20"
    >
      <div
        className="w-[500px] h-[200px] bg-white rounded flex flex-col
                        justify-between p-4 shadow"
      >
        <div className="w-full flex justify-center">
          <i className="bi bi-emoji-smile text-3xl text-teal-500"></i>
        </div>
        <span className="font-[400] text-center">
          Нийт {length}-н асуулттай шалгалт үүснэ. "OK" товчийг дарснаар асуулт
          сонгох цэсээс гархийг анхаарна уу.
        </span>
        <div className="flex justify-end">
          <button
            onClick={() => {
              getIds(questionIds);
              setShow(false);
            }}
            className=" px-3 py-2 bg-teal-500 font-[500] flex justify-center 
        items-center text-white rounded-lg ml-2"
          >
            OK
          </button>
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className=" px-3 py-2 bg-gray-400 font-[500] flex justify-center 
        items-center text-white rounded-lg ml-2"
          >
            Буцах
          </button>
        </div>
      </div>
    </div>
  );
}
