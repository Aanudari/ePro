import TemplateSubCategoryCell from "./TemplateSubCategoryCell";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import RatingEditCategory from "../modal/RatingEditCategory";
import DeleteConfirm from "../../main-exam/modal/DeleteComfirm";
function TemplateCategoryCell({
  item,
  index,
  trigger,
  setTrigger,
  templateId,
}) {
  const [showSub, setShowSub] = useState(true);
  const { data, TOKEN } = useStateContext();
  const [catName, setCatName] = useState(item.categoryName);
  let copy = [];
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
  function handleDelete() {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/getTemplateList/${item.categoryId}`,
      data: data,
    })
      .then((res) => {
        if (res.data.isSuccess == false) {
          toast.error(res.data.resultMessage, { position: "bottom-right" });
        }
        setTrigger(!trigger);
      })
      .catch((err) => console.log(err));
  }
  const handleSubCategory = (value, point, id) => {
    let tempo = modified.map((item, index) => {
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
        setTrigger(!trigger);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="mt-1 justify-center flex-col">
      <ToastContainer />
      {confirm && (
        <DeleteConfirm setConfirm={setConfirm} deleteCat={handleDelete} />
      )}
      {isEdit && (
        <RatingEditCategory
          setIsEdit={setIsEdit}
          id={templateId}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      )}
      <div className="flex justify-center">
        <div
          className="w-full rounded-t-lg bg-teal-600 px-3 py-2 flex justify-between text-white "
          // onClick={handleClick}
        >
          <button
            onClick={() => {
              setIsEdit(!isEdit);
              localStorage.setItem("category", JSON.stringify(item));
            }}
            className="custom-btn btn-13"
          >
            Засах
          </button>

          <div className="text-[15px] h-full flex items-center font-[500] py-1 focus:bg-white-25 focus:bg-gray-500 focus:shadow focus:rounded hover:text-black-500 hover:bg-white-100">
            {item.categoryName}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setConfirm(true);
              }}
              className="custom-btn  bg-rose-500 hover:bg-rose-600"
            >
              Устгах
            </button>
            <div className="flex items-center text-[14px] font-[600]">
              {`${item.categoryPoint} %`}{" "}
            </div>
          </div>
        </div>
      </div>

      {showSub && (
        <div className="min-h-[50px] bg-gray-200 rounded-b-lg p-2 mb-2">
          {item?.subCategories?.map((element, i) => (
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
