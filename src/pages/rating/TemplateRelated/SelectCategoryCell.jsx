import SelectSubCategoryCell from "./SelectSubCategoryCell";
import { useEffect, useState, useRef } from "react";
function SelectCategoryCell({ category, index, handleSelect, handleTotal }) {
  const [score, setScore] = useState(100);
  let allCategories = [];
  let preScore = 0;
  useEffect(() => {
    for (let index = 0; index < category.subCategories.length; index++) {
      const element = category.subCategories[index];
      preScore +=
        element.subCatUserScore == "" ? 0 : parseInt(element.subCatUserScore);
    }
    setScore(preScore);
  }, []);
  console.log(score);
  const collector = (value, id) => {
    console.log(value);
    console.log(id);
  };
  return (
    <div className="mb-2">
      <div className="w-full rounded-t-lg bg-teal-600 px-3 py-2 flex justify-between text-white ">
        <div className="text-[15px] font-[500] py-1">
          {category.categoryName}
        </div>
        <div>{score}%</div>
      </div>
      <div className="bg-gray-200 rounded-b-lg p-3">
        {category.subCategories.map((element, i) => {
          // console.log(element);
          return (
            <SelectSubCategoryCell
              i={i}
              element={element}
              key={i}
              handleSelect={handleSelect}
              catIndex={category.categoryId}
              collector={collector}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SelectCategoryCell;
