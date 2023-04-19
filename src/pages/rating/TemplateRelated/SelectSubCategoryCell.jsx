import { useState } from "react";

function SelectSubCategoryCell({ i, element, handleSelect, catIndex }) {
  const container = [
    {
      value: "Сонгох",
      point: "Сонгох",
    },
    {
      value: 0,
      point: 0,
    },
  ];
  for (let index = 0; index < parseInt(element.subCatMaxScore); index++) {
    const arr = {
      value: index + 1,
      point: index + 1,
    };
    container.push(arr);
  }
  const options = container.map((item, index) => {
    return (
      <option key={index} value={`${item.value}`} className={""}>
        {item.point}
      </option>
    );
  });
  const [pointValue, setPointValue] = useState(element.subCatUserScore);
  const [progress, setProgress] = useState(
    parseInt((element.subCatUserScore * 100) / element.subCatMaxScore)
  );
  const [comment, setComment] = useState(element.comment);
  // console.log(element.subCatUserScore);
  return (
    <div className="w-full rounded mt-2">
      <div className="w-full h-1 rounded-t bg-gray-300 relative">
        <div
          style={{
            width: `${
              Math.round(progress) === undefined ? 0 : Math.round(progress)
            }%`,
          }}
          className={`h-1 bg-teal-500 rounded-t absolute transition-all`}
        ></div>
      </div>
      <div className="border py-1 px-2 flex justify-between items-center bg-white rounded-b">
        <div className="text-[14px] font-[400] w-[calc(90%)] p-2">
          {element.subCategoryName}
        </div>

        <div className="h-full flex items-start flex-col gap-1">
          <select
            onChange={(e) => {
              setPointValue(e.target.value);
              setProgress((e.target.value * 100) / element.subCatMaxScore);
              handleSelect(
                catIndex,
                element.subCategoryId,
                e.target.value,
                comment
              );
            }}
            value={pointValue}
            className="w-[100px]"
          >
            {options}
          </select>
        </div>
      </div>
      <div className="w-full  bg-white h-11 border border-b rounded-b-lg px-2 py-1 ">
        <input
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            handleSelect(
              catIndex,
              element.subCategoryId,
              pointValue,
              event.target.value
            );
          }}
          type="text"
          className="w-full h-full text-[14px] font-[400] placeholder-gray-400 px-2 text-gray-500"
          placeholder="Сэтгэгдэл бичих ..."
        />
      </div>
    </div>
  );
}

export default SelectSubCategoryCell;
