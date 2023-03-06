import { useEffect } from "react";
import { useState } from "react";
import ImageUploader from "./SelectOptions/ImageOptions";
import AnswerCellMain from "./AnswerCellMain";
import $ from "jquery";
function CreateQuestionMain({
  question,
  point,
  setPoint,
  setQImgUrl,
  handleSchema,
  qImgUrl,
  handleCreateQuesiton,
}) {
  $("scoreInput").keypress(function (e) {
    var verified = String.fromCharCode(e.which).match(/[^0-9]/);
    if (verified) {
      e.preventDefault();
    }
  });
  const [length, setLength] = useState();
  const [checked, setChecked] = useState([]);

  const handleAnswers = (value) => {
    value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
    setLength(value);
  };
  const obj = {
    answer: "",
    aImgUrl: "",
    isTrue: "string",
  };
  let arr = [];
  for (let index = 0; index < length; index++) {
    arr.push(obj);
  }
  const [object, setObject] = useState();
  const handleChecked = (value) => {
    checked.length > 0
      ? setChecked([value])
      : setChecked((prev) => [...prev, value]);
  };
  const handleValues = (value, index) => {
    let newObj = {
      value: value,
      index: index,
    };
    let final = object?.map((item, index) => {
      return index == newObj.index ? { ...item, answer: newObj.value } : item;
    });
    setObject(final);
  };
  const handleObject = () => {
    setObject(arr);
    // console.log(object)
  };
  useEffect(() => {
    handleCreateQuesiton(object, checked[0]);
  }, [checked, object, qImgUrl]);
  useEffect(() => {
    handleObject();
  }, [length]);
  return (
    <div className="w-full h-screen flex justify-center items-center  pb-20">
      <div className="w-5/6 h-full bg-white px-5 pt-4 overflow-scroll pb-20">
        <div className="group w-full">
          <input
            className={
              "custom-validation !w-full !border-b-[2px] !border-[#50a3a2] font-[400]"
            }
            type="text"
            onChange={(e) => {
              handleSchema(e.target.value, point, qImgUrl);
            }}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="">Асуулт </label>
        </div>
        <div className="flex border pt-4 px-3 rounded mb-4">
          <div className="h-full ">
            <div className="m-auto">
              <div className="group w-full !bg-red-200">
                <input
                  onChange={(e) => {
                    handleSchema(question, e.target.value, qImgUrl);
                  }}
                  className={
                    "custom-validation !appearance-none !border-b-[2px] !border-[#50a3a2] font-[400]"
                  }
                  type="number"
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="">Оноо </label>
              </div>
              <div className="group w-full">
                <input
                  onChange={(e) => {
                    handleAnswers(e.target.value);
                  }}
                  className={
                    "custom-validation !appearance-none !border-b-[2px] !border-[#50a3a2] font-[400]"
                  }
                  id="scoreInput"
                  type="number"
                  step={2}
                  max={2}
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="appearance-none">Хариултын тоо </label>
              </div>
            </div>
          </div>
          <div className="group w-full ml-5 mt-[20px]">
            <ImageUploader setImageUrl={setQImgUrl} />
          </div>
        </div>
        <div className="">
          {arr?.map((item, index) => (
            <AnswerCellMain
              arr={arr[index]}
              checked={checked}
              handleChecked={handleChecked}
              item={item}
              handleValues={handleValues}
              handleCreateQuesiton={handleCreateQuesiton}
              key={index}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateQuestionMain;
