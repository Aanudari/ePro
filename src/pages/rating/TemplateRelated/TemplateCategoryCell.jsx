import TemplateSubCategoryCell from "./TemplateSubCategoryCell";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "./contexts/ContextProvider";


  function TemplateCategoryCell({ item, index }) {
  const [showSub, setShowSub] = useState(true);
  const [showOption, setShowOption] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false); // Used only for rendering and useEffect triggering, study different ways it could wor.

    /* UNDER CONSTRUCTION */
  useEffect(() => {
    console.log("delete button is pressed");
         
  }, [deleteCategory]);
 /*  END UNDER CONSTRUCTION */



  function handleClick() {
    setShowSub(!showSub);
  }
  function showOptions() {
    setShowOption(!showOption);
  }

  //console.log(item);
  return (
    <div className="mt-1 justify-center flex-col shadow">
      <div className="flex justify-center bg-gray-100 hover:bg-gray-200 shadow ">
        <div
          className="w-4/5 from-left3 border text-center font-bold text-lg  h-full p-1 justify-between"
          onClick={handleClick}
        >
          {item.categoryName}{" "}
        </div>
        <div className="w-1/5 from-left4 border text-center font-bold text-lg  h-full p-1 justify-between">
          {" "}
          {item.categoryPoint + " %"}{" "}
          <i
            className="bi bi-three-dots-vertical text-lg ml-7 relative"
            onClick={showOptions}
          >
            {showOption && (
              <>
                <div className="absolute -left-5 z-50">
                  <div className="bg-gray-200 hover:bg-gray-300 w-200 p-2 border"> 
                    <div className="flex"  onClick={()=>{setDeleteCategory(!deleteCategory)}} /*дарангуут delete category geed api duudah uuniig usestate ашиглана. */> 
                      <i class="bi bi-trash inline-block mr-2"></i>
                        Устгах
                    </div>
                    
                  </div>
                  <div className="bg-gray-200 hover:bg-gray-300 w-200 p-2 border">
                    <div className="flex" /* onClick={} */>     
                      <i class="bi bi-plus-circle inline-block mr-2 left-0"></i>
                        Нэмэх 
                    </div>
                    
                     </div>
                </div>
              </>
            )}
          </i>
        </div>
      </div>

      {showSub && (
        <div className="w-full h-full ">
          {item?.subCategories?.map((element, i) => (
            <TemplateSubCategoryCell
              element={element}
              key={JSON.stringify(item + i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TemplateCategoryCell;
