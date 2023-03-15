import SelectSubCategoryCell from "./SelectSubCategoryCell";
import { useState } from "react";
function SelectCategoryCell({ category, index }) {
  const [children, setChildren] = useState(category);
  const handleInputChange = (index, event) => {
    let newChildren = children;
    newChildren.subCategories[index].subCatUserScore = event.target.value;
    setChildren(newChildren);
  };
  return (
    <div className="mb-2">
      <div className="w-full rounded-t-lg bg-teal-600 px-3 py-2 flex justify-between text-white ">
        <div className="text-[15px] font-[500] py-1">
          {category.categoryName}
        </div>
        <div>{category.catMaxScore}%</div>
      </div>
      <div className=" bg-gray-200 rounded-b-lg p-2">
        {category.subCategories.map((element, i) => {
          return (
            <SelectSubCategoryCell
              i={i}
              element={element}
              key={i}
              handleInputChange={handleInputChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SelectCategoryCell;
