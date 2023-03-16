import SelectSubCategoryCell from "./SelectSubCategoryCell";
function SelectCategoryCell({ category, index, handleSelect }) {
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
