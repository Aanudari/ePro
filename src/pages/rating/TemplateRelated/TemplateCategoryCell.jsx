import TemplateSubCategoryCell from "./TemplateSubCategoryCell";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import NewTemplateSubCategoryCell from "./NewTemplateSubCategoryCell";
///v1/Training/category/delete

function TemplateCategoryCell({
  item,
  index,
  trigger,
  setTrigger,
  templateId,
}) {
  const [showSub, setShowSub] = useState(true);
  const [showOption, setShowOption] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false); // Used only for rendering and useEffect triggering, study different ways it could wor.
  const { data, TOKEN } = useStateContext();
  const [newComponents, setnewComponents] = useState({});
  const [components, setComponents] = useState([]);
  const [triggerComp, setTriggerComp] = useState(false);
  const [catName, setCatName] = useState(item.categoryName);
  // console.log(catName);
  let copy = [];
  // console.log(item.subCategories);
  for (let index = 0; index < item.subCategories.length; index++) {
    const element = item.subCategories[index];
    let tempo = {
      subcategoryName: element.subcategoryName,
      subcategoryPoint: element.subcategoryPoint,
    };
    copy.push(tempo);
  }
  const [modified, setModified] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setModified(copy);
  }, [isEdit]);
  let final = {
    isEdit: true,
    templateId: templateId,
    categoryId: item.categoryId,
    categoryName: catName,
    subCategories: modified,
  };
  // console.log(final);
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
  const handleSubCategory = (value, point, id) => {
    let tempo = modified.map((item, index) => {
      // index === id
      //   ?  { ...item, subcategoryName: value, subcategoryPoint: point }
      //   : item;
      if (index == id) {
        return { ...item, subcategoryName: value, subcategoryPoint: point };
      } else {
        return item;
      }
    });
    setModified(tempo);
  };
  const handleSubmit = () => {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/json",
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/category`,
      data: final,
    })
      .then((res) => {
        console.log(res.data);
        setTrigger(!trigger);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mt-1 justify-center flex-col">
      <div className="flex justify-center">
        <div
          className="w-full rounded-t-lg bg-teal-600 px-3 py-2 flex justify-between text-white "
          // onClick={handleClick}
        >
          {isEdit ? (
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="custom-btn btn-13"
            >
              <i
                className="bi bi-vector-pen text-md mr-2"
                // onClick={addTheComponent}
              ></i>
              save
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEdit(!isEdit);
              }}
              className="custom-btn btn-13"
            >
              <i
                className="bi bi-vector-pen text-md mr-2"
                // onClick={addTheComponent}
              ></i>
              edit
            </button>
          )}

          {isEdit ? (
            <input
              type="text"
              value={catName}
              onChange={(e) => {
                setCatName(e.target.value);
              }}
              className={
                "text-gray-600 text-[15px] px-2 rounded shadow-inner font-[400]"
              }
            />
          ) : (
            <div className="text-[15px] font-[500] py-1 focus:bg-white-25 focus:bg-gray-500 focus:shadow focus:rounded hover:text-black-500 hover:bg-white-100">
              {item.categoryName}
            </div>
          )}

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
            <i className="bi bi-folder-plus shadow rounded p-1 text-2xl mr-2 flex justify-end hover:cursor-pointer hover:bg-gray-300 "></i>
          </div>
          {isEdit
            ? modified.map((element, i) => (
                <TemplateSubCategoryCell
                  catId={item.categoryId}
                  element={element}
                  index={i}
                  key={JSON.stringify(item + i)}
                  handleSubCategory={handleSubCategory}
                />
              ))
            : item?.subCategories?.map((element, i) => (
                <TemplateSubCategoryCell
                  catId={item.categoryId}
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
