import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";
import { useState, useEffect } from "react";
import axios from "axios";
import bg from "../../../assets/bg.jpg";
import SelectSubCategoryCell from "../TemplateRelated/SelectSubCategoryCell";
function RatingModal({ showModal, setShowModal, ratingId, deviceId }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [data, setData] = useState();
  const [categoryList, setCategoryList] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/GetRatingDevice/${deviceId}/${ratingId}`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setData(res.data);
          setCategoryList(res.data.categoryList);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(categoryList);
  return (
    <div
      className={`fixed ${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "w-full left-0"
      } 
        bg-black bg-opacity-50 flex justify-center items-center z-20 h-full
        `}
    >
      <div className="shrink w-[calc(100%)] h-[calc(100%)] bg-white flex flex-col items-center ">
        <div className="w-full min-h-[56px] bg-teal-600 flex justify-between items-center px-3  gap-2 relative">
          <div className="flex h-full items-center gap-2">
            <span className="font-[500] text-[15px] text-white">
              Үнэлгээ хийх цэс
            </span>{" "}
          </div>
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500] "></i>
          </button>
        </div>
        <div
          style={{ background: `url(${bg})` }}
          className="w-full h-full flex items-center flex-col"
        >
          <div className="w-[900px] bg-white h-full p-3">
            {categoryList?.map((category, index) => {
              // console.log(category);
              return (
                <div key={JSON.stringify(category + index)} className="mb-2">
                  <div className="w-full rounded-t-lg bg-teal-600 px-3 py-2 flex justify-between text-white ">
                    <div className="text-[15px] font-[500] py-1">
                      {category.categoryName}
                    </div>
                    <div>{category.catMaxScore}%</div>
                  </div>
                  <div className="min-h-[100px] bg-gray-200 rounded-b-lg p-2">
                    {category.subCategories.map((element, i) => {
                      return (
                        <SelectSubCategoryCell
                          i={i}
                          element={element}
                          key={i}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
