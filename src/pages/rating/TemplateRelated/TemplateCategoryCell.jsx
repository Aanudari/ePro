import TemplateSubCategoryCell from "./TemplateSubCategoryCell";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";

///v1/Training/category/delete

function TemplateCategoryCell({ newDataBuffer, setIsChanged, item, index, trigger, setTrigger, /* test by mb */ dataBuffer, setDataBuffer  }) {
  const [showSub, setShowSub] = useState(true);
  const [showOption, setShowOption] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false); // Used only for rendering and useEffect triggering, study different ways it could wor.
  const { data, TOKEN } = useStateContext();
  

  /* UNDER CONSTRUCTION */

  function handleDelete() {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/getTemplateList/${item.categoryId}`, //${item.categoryId}
      data: data,
    })
      .then((res) => {
        setTrigger(!trigger);
      })
      .catch((err) => console.log(err));
  }
  /*  END UNDER CONSTRUCTION */

  function handleClick() {
    setShowSub(!showSub);
  }
  function showOptions() {
    setShowOption(!showOption);
  }
  return (
    
    <div className="mt-1 justify-center flex-col">
      <div className="flex justify-center">
        <div
          className="w-full rounded-t-lg bg-teal-600 px-3 py-2 flex justify-between text-white"
          onClick={handleClick}
        >
          
          <div className="text-[15px] font-[500] py-1">{item.categoryName}</div>
          
          <div className="flex items-center">
            {item.categoryPoint + " %"}{" "}
            <div
              className="bi bi-x ml-2 text-[24px] hover: cursor-pointer text-red-100 "
              onClick={handleDelete}
            >
              {" "}
            </div>
          </div>
        </div>
      </div>

      {showSub && (
        <div className="min-h-[50px] bg-gray-200 rounded-b-lg p-2 mb-2">
          <i className="bi bi-plus-circle-dotted text-lg mr-2 flex justify-end hover: cursor-pointer"></i>
          {item?.subCategories?.map((element, i) => (
            <TemplateSubCategoryCell
              /* test by mb */
              setIsChanged={setIsChanged}
              newDataBuffer={newDataBuffer}
              item={item}
              setDataBuffer={setDataBuffer}
              dataBuffer={dataBuffer}
              /* END test by mb */
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
