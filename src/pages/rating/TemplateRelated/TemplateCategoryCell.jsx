import TemplateSubCategoryCell from "./TemplateSubCategoryCell";
import { useState}  from "react"


function TemplateCategoryCell({ item, index }) {

  const [showSub, setShowSub] = useState(false);

  function handleClick(){
    setShowSub(!showSub);
  }
  
  console.log(item);
  return (
    <div className="mt-1 justify-center flex-col shadow">
      <div className="flex justify-center bg-gray-100 hover:bg-gray-200 shadow" onClick={handleClick}> 
        <div  className="w-4/5 from-left3 border text-center font-bold text-lg  h-full p-1 flex flex-col justify-between">{item.categoryName}</div>
        <div  className="w-1/5 from-left4 border text-center font-bold text-lg  h-full p-1 flex flex-col justify-between">{item.categoryPoint + " %" }</div>
      </div>
      {showSub && <div className="w-full h-full ">
        {item?.subCategories?.map((element, i) => (
          <TemplateSubCategoryCell
            element={element}
            key={JSON.stringify(item + i)}
          />
        ))}
      </div>}
    </div>
  );
}

export default TemplateCategoryCell;
