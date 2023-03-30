import SelectSubCategoryCell from "./SelectSubCategoryCell";
import { useEffect, useState, useRef } from "react";
function SelectCategoryCell({ category, index, handleSelect, handleTotal }) {
  const [constant, setConstant] = useState(0);
  const [score, setScore] = useState(0);
  const isInitialRender = useRef(true);
  let initial = 0;
  useEffect(() => {
    if (isInitialRender.current) {
      for (let index = 0; index < category.subCategories.length; index++) {
        const element = category.subCategories[index];
        initial += parseInt(
          element.subCatUserScore == "" ? 0 : element.subCatUserScore
        );
      }
      setConstant(initial);
      setScore(initial);
    } else {
      isInitialRender.current = false;
    }
  }, []);
  useEffect(() => {
    handleTotal(score);
  }, [score]);

  // console.log(score);
  const [raw, setRaw] = useState([]);
  const collector = (point, id) => {
    let tempo = {
      point: parseInt(point),
      id: parseInt(id),
    };
    let filtered = raw.filter((item) => {
      return item.id != id;
    });
    setRaw(filtered);
    setRaw((prev) => [...prev, tempo]);
  };
  useEffect(() => {
    if (!isInitialRender.current) {
      let count = 0;
      for (let index = 0; index < raw.length; index++) {
        const element = raw[index];
        count += element.point;
      }
      let pre = count + constant;
      // console.log(constant);
      setScore(pre);
    } else {
      isInitialRender.current = false;
    }
  }, [raw]);
  // // console.log(initial);
  // console.log(score);
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
