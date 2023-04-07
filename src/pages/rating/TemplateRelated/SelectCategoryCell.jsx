import SelectSubCategoryCell from "./SelectSubCategoryCell";
import { useEffect, useState, useRef } from "react";
function SelectCategoryCell({
  category,
  handleSelect,
  children,
  collectCatScore,
}) {
  const [score, setScore] = useState("");
  useEffect(() => {
    let count = 0;
    const filtered = children.filter((item, i) => {
      return item.categoryId == category.categoryId;
    });
    for (let inde = 0; inde < filtered[0]?.subCategories.length; inde++) {
      const element = filtered[0]?.subCategories[inde];
      count += element.score == "" ? 0 : parseInt(element.score);
    }
    setScore(count);
    // console.log(filtered);
  }, [children]);
  useEffect(() => {
    let count = 0;

    for (let inde = 0; inde < category?.subCategories.length; inde++) {
      const element = category?.subCategories[inde];
      count +=
        element.subCatUserScore == "" ? 0 : parseInt(element.subCatUserScore);
    }
    setInitial(count);
    // console.log(filtered);
  }, []);
  const [initial, setInitial] = useState(0);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // code to run on first render
    } else {
    }
    collectCatScore(children.length > 0 ? score : initial, category.categoryId);
  }, [score]);
  return (
    <div className="mb-2">
      <div className="w-full rounded-t-lg bg-teal-600 px-3 py-2 flex justify-between text-white ">
        <div className="text-[15px] font-[500] py-1">
          {category.categoryName}
        </div>
        <div>{children.length > 0 ? score : initial}%</div>
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default SelectCategoryCell;
