import { useStateContext } from "../../contexts/ContextProvider";
import { logout } from "../../service/examService";
import axios from "axios";
import { useState, useEffect } from "react";
import QuestionMain from "./QuestionMain";
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
          background:
            "url(https://wallup.net/wp-content/uploads/2016/01/259906-wavy_lines-abstract-blue.jpg)",
        }}
        className="bg-gray-200 appear-smooth w-full h-[calc(100%)] relative pb-10"
      >
        <div className="w-full h-12 bg-teal-600 flex justify-between px-4 items-center shadow-sm">
          <div className="flex items-center">
            <div className=" flex justify-between items-center px-4 py-2">
              <span className="text-white font-[500] text-sm">
                Сонгосон : {questionIds.length}/10
              </span>
              {questionIds.length > 0 && (
                <button
                  className="text-white cursor-pointer font-[400] text-md transition-all ml-2 fixed bottom-[20px] 
                  right-[20px] shadow z-20 custom-btn btn-13 w-[150px] text-center rounded-none"
                  onClick={() => {
                    getIds(questionIds);
                    setShow(false);
                  }}
                >
                  {questionIds.length}/ Хадгалах
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
            <div className=" flex gap-2 h-16 items-center">
              <div
                onClick={() => {
                  setSelected([]);
                }}
                className="px-3 h-10 hover:bg-teal-600 py-2 bg-teal-600 font-[500] rounded
                    shadow-md text-sm  flex justify-center cursor-pointer items-center text-white  hover:bg-teal-700 w-[200px]"
              >
                <i className="bi bi-backspace mr-2"></i>Буцах
              </div>
              <div
                className={`px-3  font-[500] flex justify-start  items-center text-white  
                w-full`}
              >
                <div className="group !bg-gray-200 mt-4">
                  <input
                    type=""
                    className="!bg-gray-200 text-black font-[500]"
                  />
                  <span className="highlight !bg-gray-200"></span>
                  <span className="bar !bg-gray-200"></span>
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
              <div key={index} className="relative parent ">
                <div
                  onClick={() => {
                    //   setCategoryModal(true);
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
