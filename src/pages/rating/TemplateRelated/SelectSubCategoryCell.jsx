import { useState } from "react";
function SelectSubCategoryCell({ i, element, handleInputChange }) {
  const container = [
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
  const [pointValue, setPointValue] = useState("0");
  // console.log(pointValue);
  return (
    <div
      key={i}
      className="border py-1 px-2 flex justify-between items-center bg-white rounded mt-[2px]"
    >
      <div className="text-[13px] font-[400] w-[calc(90%)] ">
        {element.subCategoryName}
      </div>
      <div className="h-full flex items-start">
        <select
          onChange={(e) => {
            setPointValue(e.target.value);
            handleInputChange(i, e);
          }}
          value={pointValue}
          className="w-[80px] "
        >
          {options}
        </select>
      </div>
    </div>
  );
}

export default SelectSubCategoryCell;
