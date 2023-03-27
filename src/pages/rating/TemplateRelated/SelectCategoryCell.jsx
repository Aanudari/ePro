import SelectSubCategoryCell from "./SelectSubCategoryCell";
import { useState } from "react";
function SelectCategoryCell({ category, index, handleSelect }) {
  const [isSecond, setIsSecond] = useState(0);
  let score = 0;
  let arr = [];
  for (let ind = 0; ind < category.subCategories.length; ind++) {
    const element = category.subCategories[ind];
    // console.log(element);
    let tempo = {
      score: parseInt(
        element.subCatUserScore === "" ? 0 : element.subCatUserScore
      ),
      id: element.subCategoryId,
    };
    score =
      score +
      parseInt(element.subCatUserScore === "" ? 0 : element.subCatUserScore);
    arr.push(tempo);
  }
  const collector = () => {};
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
