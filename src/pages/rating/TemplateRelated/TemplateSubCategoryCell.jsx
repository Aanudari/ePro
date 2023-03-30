import { useState } from "react";

function TemplateSubCategoryCell({ element, index, handleSubCategory }) {
  const [value, setValue] = useState(element.subcategoryName);
  const [point, setPoint] = useState(element.subcategoryPoint);
  return (
    <>
      <div className=" mt-1 py-2 px-2 bg-white hover:bg-gray-100 hover:shadow hover:bg-gray flex justify-between items-center  rounded mt-[2px] ">
        <textarea
          className="text-[13px] font-[400] w-[calc(88%)] rounded p-2 bg-gray-100"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleSubCategory(e.target.value, point, index);
          }}
        />
        <div className="h-full flex items-start">
          <div className="flex bg-[#50a3a2] p-2 rounded text-white hover:bg-[#50a3a3] hover:shadow">
            <div className="flex">
              <input
                type="number"
                value={point}
                onChange={(e) => {
                  setPoint(e.target.value);
                  handleSubCategory(value, e.target.value, index);
                }}
                className={"w-[30px] rounded glass px-2"}
              />
              <span>%</span>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default TemplateSubCategoryCell;
