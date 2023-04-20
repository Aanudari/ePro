import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { logout } from "../../../service/examService";
import Loading from "../../../components/Loading";

function RatingAddExtra({ id, setIsExtra, trigger, setTrigger }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const extra = {
    templateId: id,
    inputList: children,
  };
  const handleSubmit = () => {
    setLoading(true);
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/addInputsToTemplate`,
      data: extra,
    })
      .then((res) => {
        if (res.data.isSuccess == false) {
          toast.error(res.data.resultMessage, { position: "bottom-right" });
        }
        if (res.data.errorCode === 401) {
          logout();
        } else {
          setTrigger(!trigger);
          setIsExtra(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addChild = () => {
    setChildren([
      ...children,
      {
        isEdit: false,
        inputType: "1",
        inputId: "",
        inputName: "",
      },
    ]);
  };
  const handleInputChange = (index, event) => {
    // console.log(event.target.value);
    const newChildren = [...children];
    // console.log(newChildren);
    newChildren[index].inputName = event.target.value;
    // newChildren[index].value = event.target.value;
    setChildren(newChildren);
  };
  const handleTypeChange = (index, event) => {
    // console.log(event.target.value);
    const newChildren = [...children];
    // console.log(newChildren);
    newChildren[index].inputType = event.target.value;
    // newChildren[index].value = event.target.value;
    setChildren(newChildren);
  };
  const removeChild = (index) => {
    const newChildren = [...children];
    newChildren.splice(index, 1);
    setChildren(newChildren);
  };
  const renderChildren = () => {
    return children.map((child, index) => {
      return (
        <div
          className="bg-gray-200 px-2 pt-2 pb-2 rounded flex mt-1 py-2 relative parent gap-2"
          key={index}
        >
          <div className="w-[calc(85%)]">
            <input
              onChange={(e) => {
                handleInputChange(index, e);
              }}
              type="text"
              className="p-2 font-[400] text-[14px] bg-white rounded px-2 text-gray-600 w-full placeholder-gray-400"
              placeholder="Утга оруулна уу ..."
              autoFocus
            />
          </div>
          <select
            onChange={(e) => {
              handleTypeChange(index, e);
            }}
            name=""
            id=""
          >
            <option value="1">Текст</option>
            <option value="2">Огноо</option>
          </select>
          <div className="w-[40px]"></div>
          <i
            onClick={() => {
              removeChild(index);
            }}
            className="bi bi-trash3-fill text-2xl text-red-500 cursor-pointer child hidden absolute right-[20px] top-[15px]"
          ></i>
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
      {loading && <Loading />}
      <ToastContainer />
      <div className="shrink w-[calc(55%)] h-[calc(60%)] bg-white flex flex-col rounded">
        <div className="w-full min-h-[50px] bg-amber-600 flex justify-between items-center px-3  gap-2 rounded-t">
          <div className="flex gap-4 justify-between w-full px-2">
            <button
              className="custom-btn h-10 bg-amber-500 hover:bg-amber-600 active:bg-amber-400 text-[13px] parent-2"
              onClick={addChild}
            >
              Нэмэх
            </button>
            <div className="flex items-center gap-2">
              {children.length > 0 && (
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="custom-btn bg-amber-500 hover:bg-amber-600 text-[14px]"
                >
                  Хадгалах
                </button>
              )}
              <button
                onClick={() => {
                  setIsExtra(false);
                }}
                className="w-[20px] h-full mt-1"
              >
                <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="p-2">{renderChildren()}</div>
      </div>
    </div>
  );
}

export default RatingAddExtra;
