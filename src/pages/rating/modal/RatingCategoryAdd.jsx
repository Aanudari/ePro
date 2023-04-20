import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
import { toast, ToastContainer } from "react-toastify";
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
    setChildren([...children, { subcategoryName: "", subcategoryPoint: "20" }]);
    handleCalculate();
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
  useEffect(() => {
    let count2 = 0;
    for (let index = 0; index < children.length; index++) {
      const element = children[index];
      count2 += parseInt(element.subcategoryPoint);
    }
    setCalculated(count2);
  }, [children]);
  const [calculated, setCalculated] = useState(0);
  const handleCalculate = () => {
    let count2 = 0;
    for (let index = 0; index < children.length; index++) {
      const element = children[index];
      count2 += parseInt(element.subcategoryPoint);
    }
    setCalculated(count2);
  };
  // console.log(calculated);

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
        if (res.data.errorCode === 401) {
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
  const [keysPressed, setKeysPressed] = useState([]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (!keysPressed.includes(event.keyCode) && event.altKey) {
        setKeysPressed([...keysPressed, event.keyCode]);
      }
    }

    function handleKeyUp(event) {
      setKeysPressed(
        keysPressed.filter((keyCode) => keyCode !== event.keyCode)
      );
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysPressed]);

  useEffect(() => {
    if (
      keysPressed.length === 2 &&
      keysPressed.includes(18) &&
      keysPressed.includes(49)
    ) {
      calculated >= 100
        ? toast.error("Категорийн дээд оноо 100 байна", {
            position: "bottom-right",
          })
        : addChild();
    }
  }, [keysPressed]);

  const renderChildren = () => {
    return children.map((child, index) => {
      return (
        <div
          className="bg-gray-200 px-2 pt-2 pb-2 rounded flex flex-col mt-1 py-2 relative parent"
          key={index}
        >
          <ToastContainer />
          <textarea
            type="text"
            className="p-2 font-[400] text-[14px] bg-white rounded px-2 text-gray-600 w-full"
            placeholder="Enter value"
            value={child.subcategoryName}
            onChange={(e) => {
              handleInputChange(index, e);
              handleCalculate();
            }}
            autoFocus
          />
          <div>
            <input
              type="number"
              className="p-2 font-[500] bg-white rounded px-2 text-gray-600 w-[50px] mt-2"
              placeholder="Enter value"
              value={child.subcategoryPoint}
              onChange={(e) => {
                handleInputChangePoint(index, e);
                handleCalculate();
              }}
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
            {calculated != 100 && (
              <button
                className="custom-btn mt-2 h-10 bg-teal-500 hover:bg-teal-600 active:bg-teal-400 text-[13px] parent-2"
                onClick={addChild}
              >
                Ур чадвар нэмэх
                <div className="child-2">
                  <div className="triangle"></div>
                  <div className="bg-[#FFFF00] px-3 py-2 rounded shadow font-[400] text-gray-500 whitespace-nowrap">
                    ALT + 1 хослол
                  </div>
                </div>
              </button>
            )}
            <div
              className="custom-btn border-none shadow-none  text-[17px] relative h-full flex gap-1 items-center"
              // onClick={addChild}
            >
              Оноо:{" "}
              <span
                className={`${
                  calculated > 100 && "px-2 py-1 m-0 rounded bg-[#ff0000] "
                } font-[500]`}
              >
                {calculated > 100 && <i className="bi bi-exclamation-lg"></i>}
                {calculated}
              </span>
              <span className="m-0 font-[500]">/100</span>
            </div>
          </div>
          <div className="flex gap-4">
            {calculated == 100 && (
              <button
                onClick={handleSubmit}
                className="custom-btn mt-2 h-10 bg-teal-500 hover:bg-teal-600 active:bg-teal-400 text-[13px]"
              >
                Хадгалах
              </button>
            )}

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
              className="py-2 text-[16px] font-[400]  rounded px-3 w-full "
              placeholder="Гарчиг оруулна уу ..."
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default RatingCategoryAdd;
