import { useState } from "react";

function TemplateSubCategoryCell({ element, index, handleSubCategory }) {
  const [value, setValue] = useState(element.subcategoryName);
  const [point, setPoint] = useState(element.subcategoryPoint);
  return (
    <>
      <div className="select-none mt-1 py-2 px-2 bg-white hover:bg-gray-100 hover:shadow hover:bg-gray flex justify-between items-center  rounded mt-[2px] ">
        <div className="text-[13px] font-[400] w-[calc(92%)] rounded p-2 bg-gray-100">
          {element.subcategoryName}
        </div>
        <div className="h-full flex items-start">
          <div className="flex bg-[#50a3a2] p-2 rounded text-white hover:bg-[#50a3a3] hover:shadow font-[500]">
            {`${element.subcategoryPoint} %`}{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default TemplateSubCategoryCell;
