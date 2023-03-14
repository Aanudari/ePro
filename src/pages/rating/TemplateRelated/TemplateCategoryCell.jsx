import TemplateSubCategoryCell from "./TemplateSubCategoryCell";

function TemplateCategoryCell({ item, index }) {
  return (
    <div className="w-full flex bg-red-100 mt-2 justify-center flex-col">
      <div className=" h-full">{JSON.stringify(item)}</div>
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
