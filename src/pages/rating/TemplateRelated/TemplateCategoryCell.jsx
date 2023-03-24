import TemplateSubCategoryCell from "./TemplateSubCategoryCell";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import NewTemplateSubCategoryCell from "./NewTemplateSubCategoryCell";
///v1/Training/category/delete

function TemplateCategoryCell({
  newDataBuffer,
  setIsChanged,
  item,
  index,
  trigger,
  setTrigger,
  /* test by mb */ dataBuffer,
  setDataBuffer,
}) {
  const [showSub, setShowSub] = useState(true);
  const [showOption, setShowOption] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false); // Used only for rendering and useEffect triggering, study different ways it could wor.
  const { data, TOKEN } = useStateContext();
  const [newComponents, setnewComponents] = useState({});
  const [components, setComponents] = useState([]);
  const [triggerComp, setTriggerComp] = useState(false);




  const count = useRef(0);


  useEffect(() => {
    /* A */
    /* */
  }, [triggerComp]);
  



  let givenSubCategoryId = 0;
  let highestSubCategoryId = 0;
  /* const setComp = useCallback(() => {
    setComponents([...components, <NewTemplateSubCategoryCell givenSubCategoryId={givenSubCategoryId} catId={item.categoryId} item={item} newDataBuffer={newDataBuffer} setIsChanged={setIsChanged}/>]);
  }, [components, setIsChanged, trigger]); */

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

  function handleClick() {
    setShowSub(!showSub);
  }
  function showOptions() {
    setShowOption(!showOption);
  }
  function AddSubcategory() {
    console.log("just added a new category");
    return <div> new test and stuff </div>;
  }

  function addTheComponent() {
  // setTriggerComp(!triggerComp);
    console.log("A dotor orj irlee"); 
    for (const category of newDataBuffer) {
      for (const subcategory of category.subCategories) {
        if (subcategory.subcategoryId >= highestSubCategoryId) {
          highestSubCategoryId = subcategory.subcategoryId;
        }
      }
    }
    givenSubCategoryId = parseInt(highestSubCategoryId) + 1;
    setComponents([
      ...components,
      <NewTemplateSubCategoryCell
        //key={givenSubCategoryId}
        givenSubCategoryId={givenSubCategoryId}
        catId={item.categoryId}
        item={item}
        newDataBuffer={newDataBuffer}
        setIsChanged={setIsChanged}
      />,
    ]);
  }

  return (
    <div className="mt-1 justify-center flex-col">
      <div className="flex justify-center">
        <div
          className="w-full rounded-t-lg bg-teal-600 px-3 py-2 flex justify-between text-white "
          onClick={handleClick}
        >
          <div className="text-[15px] font-[500] py-1 focus:bg-white-25 focus:bg-gray-500 focus:shadow focus:rounded hover:text-black-500 hover:bg-white-100" contentEditable="true" suppressContentEditableWarning="true" >{item.categoryName}</div>

          <div className="flex items-center ">
            {item.categoryPoint + " %"}{" "}
            <div
              className="bi bi-x ml-2 text-2xl shadow rounded p-1 hover:cursor-pointer hover:bg-teal-700"
              onClick={handleDelete}
            >
              {" "}
            </div>
          </div>
        </div>
      </div>

      {showSub && (
        <div className="min-h-[50px] bg-gray-200 rounded-b-lg p-2 mb-2">
          <div className="flex align-end justify-end"> 
          <i 
            className="bi bi-folder-plus shadow rounded p-1 text-2xl mr-2 flex justify-end hover:cursor-pointer hover:bg-gray-300 "
            onClick={addTheComponent}
          ></i>
          </div>{" "}
          {/* plus button */}
          {components}
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
