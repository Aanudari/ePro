import { useState } from "react";

function TemplateSubCategoryCell({ element, index, handleSubCategory }) {
  const [value, setValue] = useState(element.subcategoryName);
  const [point, setPoint] = useState(element.subcategoryPoint);
  return (
    <>
      <div className=" mt-1 py-1 px-2 bg-white hover:bg-gray-100 hover:shadow hover:bg-gray flex justify-between items-center  rounded mt-[2px] ">
        <input
          className="text-[13px] font-[400] w-[calc(90%)]"
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
          <i className="bi bi-trash text-2xl text-red-200 rounded hover:bg-gray-200 shadow ml-2 hover:text-red-400"></i>
        </div>
      </div>
    </>
  );
}

export default TemplateSubCategoryCell;
