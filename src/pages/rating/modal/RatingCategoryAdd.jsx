import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
function RatingCategoryAdd({
  showModal,
  setShowModal,
  id,
  trigger,
  setTrigger,
}) {
  const { activeMenu, TOKEN } = useStateContext();
  const [children, setChildren] = useState([]);
  const [catName, setCatName] = useState("");
  const schema = {
    isEdit: false,
    templateId: id,
    categoryId: "",
    categoryName: catName,
    subCategories: children,
  };

  const addChild = () => {
    setChildren([...children, { subcategoryName: "", subcategoryPoint: "" }]);
  };
  // console.log(children);

  const removeChild = (index) => {
    const newChildren = [...children];
    newChildren.splice(index, 1);
    setChildren(newChildren);
  };
  const [total, setTotal] = useState(0);
  const handleInputChange = (index, event) => {
    // console.log(event.target.value);
    const newChildren = [...children];
    // console.log(newChildren);
    newChildren[index].subcategoryName = event.target.value;
    // newChildren[index].value = event.target.value;
    setChildren(newChildren);
  };
  const handleInputChangePoint = (index, event) => {
    // console.log(event.target.value);
    const newChildren = [...children];
    // console.log(newChildren);
    newChildren[index].subcategoryPoint = event.target.value;
    // newChildren[index].value = event.target.value;
    setChildren(newChildren);
  };
  // console.log(children);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/category`,
      data: schema,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setTrigger(!trigger);
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderChildren = () => {
    return children.map((child, index) => {
      // console.log(child);
      return (
        <div
          className="bg-gray-200 px-2 pt-2 pb-2 rounded flex flex-col mt-1 py-2 relative parent"
          key={index}
        >
          <input
            type="text"
            className="p-2 font-[500] bg-white rounded px-2 text-gray-600 w-full"
            placeholder="Enter value"
            value={child.subcategoryName}
            onChange={(e) => handleInputChange(index, e)}
            autoFocus
          />
          <div>
            <input
              type="number"
              className="p-2 font-[500] bg-white rounded px-2 text-gray-600 w-[50px] mt-2"
              placeholder="Enter value"
              onBlur={(e) => {
                e.target.value == "" && total < 100
                  ? setTotal(total + 0)
                  : setTotal(total + parseInt(e.target.value));
              }}
              value={child.subcategoryPoint}
              onChange={(e) => handleInputChangePoint(index, e)}
            />
            <span className="text-[12px] font-[500] text-gray-600 ml-1">
              оноо
            </span>
            <i
              onClick={() => {
                removeChild(index);
                setTotal(total - parseInt(child.subcategoryPoint));
              }}
              className="bi bi-trash3-fill text-xl text-red-500 child hidden absolute right-[10px] bottom-[10px]"
            ></i>
            {/* </button> */}
          </div>
        </div>
      );
    });
  };
  return (
    <div
      className={`fixed ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[56px] left-0"
      } 
        bg-black bg-opacity-50 flex justify-center items-center z-20
        `}
    >
      <div className="shrink w-[calc(75%)] h-[calc(80%)] bg-white flex flex-col rounded">
        <div className="w-full min-h-[50px] bg-teal-600 flex justify-between items-center px-3  gap-2 rounded-t">
          <div className="flex gap-2">
            <button
              className="custom-btn bg-teal-500 hover:bg-teal-600 active:bg-teal-400 text-[13px]"
              onClick={addChild}
            >
              Нэмэх
            </button>
            <button
              className="custom-btn border-none shadow-none  text-[13px]"
              // onClick={addChild}
            >
              Total: {total}/100
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="custom-btn bg-teal-500 hover:bg-teal-600 active:bg-teal-400 text-[13px]"
            >
              Хадгалах
            </button>

            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="w-[20px] h-full mt-1"
            >
              <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
            </button>
          </div>
        </div>
        <div className="w-full min-h-[50px] bg-teal-600 flex justify-between items-center px-3  gap-2 ">
          <div className="flex gap-2 w-full custom-placeholder">
            <input
              type="text"
              className="p-2 font-[500] bg-gray-50 rounded px-3 w-full"
              placeholder="Категори нэр"
              value={catName}
              onChange={(e) => {
                setCatName(e.target.value);
              }}
              autoFocus
            />
          </div>
        </div>
        <div className="h-full w-full rounded-b-lg p-3">
          {" "}
          <form
            className="h-[400px]  relative overflow-scroll"
            onSubmit={handleSubmit}
          >
            {renderChildren()}
            {/* <button
              className="w-full h-12 custom-btn bg-emerald-500 bottom-0 absolute"
              type="submit"
            >
              Хадгалах
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RatingCategoryAdd;
