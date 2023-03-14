import TemplateSubCategoryCell from "./TemplateSubCategoryCell";

function TemplateCategoryCell({ item, index }) {
  console.log(item);
  return (
    <div className="w-full flex  mt-2 justify-center flex-col">
      <div className="flex "> 
      <div className="grow basis-4/5 p-1 h-full w-3/4 bg-red-100">{item.categoryName + " " }</div>
      <div className="grow basis-1/5 p-1 h-full w-3/4 bg-red-100">{item.categoryPoint + " " }</div>
      </div>
      <div className="w-full h-full bg-red-200">
        {item.subCategories.map((element, i) => (
          <TemplateSubCategoryCell
            element={element}
            key={JSON.stringify(item + i)}
          />
        ))}
      </div>
    </div>
  );
}

export default TemplateCategoryCell;
