import { useStateContext } from "../../contexts/ContextProvider";
import { logout } from "../../service/examService";
import axios from "axios";
import { useState, useEffect } from "react";
function GetQuestionIdsFromCategory({ setShow }) {
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
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setCategories(res.data.categoryList);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(categories);
  return (
    <div
      className={`${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
      } 
top-[56px] fixed  h-[calc(100%-56px)] 
bg-black bg-opacity-50 flex items-center justify-center z-20`}
    >
      <div className="bg-gray-200 appear-smooth w-full h-[calc(100%)] relative">
        <div className="w-full h-12 bg-teal-500 flex justify-between px-4 items-center shadow-sm">
          <div className="flex items-center">
            {/* <div className=" flex justify-between items-center px-4 py-2">
              <span className="text-white font-[500] text-sm">
                Сонгох : {chosen.length}/{users?.length}
              </span>
              {chosen.length > 0 && (
                <span
                  onClick={() => {
                    setShowSelect(false);
                    getEmployees(chosen);
                  }}
                  className="text-white font-[500] text-sm border-[2px] rounded  px-2 py-2 ml-2"
                >
                  <button>Хадгалах</button>
                </span>
              )}
            </div> */}
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
        <div>
          {categories?.map((category, index) => (
            <div key={index} className="relative parent ">
              <div
                // onClick={() => {
                //   setCategoryModal(true);
                //   handleCategoryModal(category.id, category.departmentId);
                // }}
                className={`w-full text-white mt-1 h-16  shadow-sm ${
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
              <div
                // onClick={() => {
                //   deleteCategory(category.id);
                // }}
                className="child top-[15px] mr-4 h-8 w-[50px] bg-gray-700 rounded-full flex 
                                justify-center text-white hover:!text-red-500 items-center absolute right-[calc(12%)]
                                cursor-pointer transition-all"
              >
                <i className="bi bi-trash3-fill"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetQuestionIdsFromCategory;
