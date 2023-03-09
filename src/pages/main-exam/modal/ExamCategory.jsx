import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import DeleteConfirm from "./DeleteComfirm";
import EditCategoryModal from "./EditCategoryModal";

function ExamCategory({
  categories,
  setCategoryModal,
  handleCategoryModal,
  setShowCategoryMenu,
  trigger,
  setTrigger,
  showAddCategory,
  setShowAddCategory,
}) {
  const { TOKEN, activeMenu } = useStateContext();
  const [catID, setcatID] = useState();
  const deleteCategory = (value) => {
    setConfirm(true);
    setcatID(value);
  };
  const deleteCat = () => {
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/${catID}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setConfirm(false);
        setTrigger(!trigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [confirm, setConfirm] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [key, setKey] = useState("");
  const handleEditModal = (value) => {
    setEditModal(true);
    setKey(value);
  };
  // console.log(categories);
  return (
    <div
      className={`absolute top-[56px] z-10 shadow bg core-bg-g h-[calc(100%-68px)] mb-2 h-full flex  px-3 
        py-3 gap-2  ${
          activeMenu ? "w-[calc(100%-14px)] left-[7px]" : "w-full left-0"
        } `}
    >
      {confirm && (
        <DeleteConfirm setConfirm={setConfirm} deleteCat={deleteCat} />
      )}
      {editModal && (
        <EditCategoryModal
          close={setEditModal}
          index={key}
          categories={categories}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      )}
      <button
        onClick={() => {
          setShowAddCategory(!showAddCategory);
        }}
        className="px-3 py-2 text-white uppercare bg-teal-300 hover:shadow-white h-12 mt-1"
      >
        <i className="bi bi-plus-circle"></i>
      </button>
      <div className="w-full h-full overflow-scroll pr-2">
        {categories?.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="relative parent ">
              <div
                onClick={() => {
                  setCategoryModal(true);
                  handleCategoryModal(category.id, category.departmentId);
                }}
                className={`w-full text-white mt-1 h-16  shadow-sm ${
                  category.status == "A"
                    ? "bg-teal-400 hover:bg-teal-500 cursor-pointer"
                    : "bg-gray-400"
                } 
               flex justify-between px-3 py-2 hover:shadow-cus transition-all`}
              >
                <div className="flex flex-col justify-center ">
                  <h6 className="font-[500] text-[12px] uppercase">
                    {category.status == "O" && (
                      <i className="bi bi-clock-history mr-2 text-lg"></i>
                    )}
                    {category.departmentName}
                  </h6>
                </div>
                <div className="flex justify-between w-[calc(70%)]">
                  <div className="flex items-center gap-20 w-[calc(70%)]">
                    <div className="flex justify-between items-start w-[200px] ">
                      {/* <h6 className="font-[500] text-[12px] uppercase">
                        Эхлэх: {category.startDate}
                      </h6> */}
                      <h6 className=" flex items-center">
                        {category.status == "A" && (
                          <i className="bi bi-hourglass-top text-lg mb-[-5px] mr-1"></i>
                        )}
                        <span className="mt-1 font-[500] text-[12px] uppercase">
                          {category.startDate.split(" ", 1)}
                        </span>
                      </h6>
                      <h6 className=" flex items-center">
                        {category.status == "A" && (
                          <i className="bi bi-hourglass-bottom text-lg mb-[-5px] mr-1"></i>
                        )}
                        <span className="mt-1 font-[500] text-[12px] uppercase">
                          {category.endDate.split(" ", 1)}
                        </span>
                      </h6>
                    </div>
                    <div className="flex flex-row justify-center">
                      <h6 className="font-[500] text-[12px] uppercase">
                        {category.name}
                      </h6>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <div
                      className="h-8 w-[100px] bg-gray-700 rounded-full flex 
                        justify-center items-center"
                    >
                      <h6 className="m-0 text-[13px]">
                        {category.questionCount}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={(index) => {
                  handleEditModal(category.id);
                }}
                className="child top-[15px] mr-4 h-8 w-[50px] bg-gray-700 rounded-full flex 
                                justify-center text-gray-500 hover:!text-white items-center absolute right-[calc(18%)]
                                cursor-pointer transition-all"
              >
                <i className="bi bi-pencil-square"></i>
              </div>
              <div
                onClick={() => {
                  deleteCategory(category.id);
                }}
                className="child top-[15px] mr-4 h-8 w-[50px] bg-gray-700 rounded-full flex 
                                justify-center text-white hover:!text-red-500 items-center absolute right-[calc(12%)]
                                cursor-pointer transition-all"
              >
                <i className="bi bi-trash3-fill"></i>
              </div>
            </div>
          ))
        ) : (
          <div className="mt-2 text-white font-[400]">
            Асуултын сан үүсээгүй байна.{" "}
          </div>
        )}
      </div>
      <div className="min-w-[50px] max-w-[50px] ml-2">
        <button
          className="p-2 hover:scale-110 transition"
          onClick={() => {
            setShowCategoryMenu(false);
          }}
        >
          <i className="bi bi-x-lg text-2xl"></i>
        </button>
      </div>
    </div>
  );
}
export default ExamCategory;
