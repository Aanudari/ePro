import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";
import { useState, useEffect } from "react";
import axios from "axios";
import bg from "../../../assets/bg.jpg";
import SelectSubCategoryCell from "../TemplateRelated/SelectSubCategoryCell";
import SelectCategoryCell from "../TemplateRelated/SelectCategoryCell";
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
  const [list, setList] = useState([]);
  const final = {
    ratingId: ratingId,
    deviceId: deviceId,
    categoryList: [],
  };
  // console.log(final);
  let raw = [];
  for (let index = 0; index < categoryList?.length; index++) {
    const element = categoryList[index];
    let cat = [];
    let temp = {
      categoryId: element.categoryId,
      subCategories: cat,
    };
    for (let j = 0; j < element.subCategories.length; j++) {
      const el = element.subCategories[j];
      let tempo = {
        subCategoryId: el.subCategoryId,
        score: el.subCatUserScore,
      };
      cat.push(tempo);
    }
    raw.push(temp);
  }
  // setList(raw);
  const handleSubmit = () => {
    console.log(JSON.stringify(raw));
  };
  // const handleSubmit = () => {
  //       axios({
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: TOKEN,
  //     },
  //     url: `${process.env.REACT_APP_URL}/v1/Rating/role/${temp[0].id}`,
  //     data: time,
  //   })
  //     .then((res) => {
  //       if (res.data.isSuccess === false) {
  //         alert(res.data.resultMessage);
  //       }
  //       setStatusData(res.data.result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <div
      className={`fixed ${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "w-full left-0"
      } 
        bg-black bg-opacity-50 flex justify-center items-center z-20 h-full
        `}
    >
      <div
        style={{ background: `url(${bg})` }}
        className="shrink w-[calc(100%)] h-[calc(100%)] bg-white flex flex-col items-center "
      >
        <div className="w-full min-h-[56px] bg-teal-600 flex justify-between items-center px-3  gap-2 relative">
          <div className="flex h-full items-center gap-2">
            <span className="font-[500] text-[15px] text-white">
              Үнэлгээ хийх цэс
            </span>{" "}
          </div>
          <div className="flex h-full flex gap-5 p-1">
            <button
              onClick={() => {
                handleSubmit();
              }}
              className=" custom-btn
             btn-20 active:mt-[2px]"
            >
              Хадгалах
            </button>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="w-[20px] h-full "
            >
              <i className="bi bi-x-lg text-white text-2xl font-[500] "></i>
            </button>
          </div>
        </div>
        <div className="w-full h-full flex items-center flex-col overflow-scroll justify-center">
          <div className="w-[900px] px-3 pt-5 h-full">
            {categoryList?.map((category, index) => {
              return (
                <SelectCategoryCell
                  key={JSON.stringify(category + index)}
                  category={category}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        {/* <div className="h-16 glass w-full">Хадгалах</div> */}
      </div>
    </div>
  );
}

export default RatingModal;
