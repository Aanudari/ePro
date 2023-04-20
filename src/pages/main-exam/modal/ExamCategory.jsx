import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import DeleteConfirm from "./DeleteComfirm";
import EditCategoryModal from "./EditCategoryModal";
import SearchModalQuestion from "./SearchModalQuestion";

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
  const [show, setShow] = useState(false);
  // console.log(categories);
  return (
    <div
      className={`fixed top-[56px] z-20 core-bg-g h-[calc(100%-56px)] mb-2 h-full flex  px-3 
        py-3 gap-2  ${
          activeMenu ? "w-[calc(100%-250px)] left-[250px]" : "w-full left-0"
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
      {show && <SearchModalQuestion show={show} setShow={setShow} />}
      <button
        onClick={() => {
          setShowAddCategory(!showAddCategory);
        }}
        className="h-12 mt-1"
      >
        <img
          className="w-12 hover:scale-105  transition-all"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFVElEQVR4nO1dS28cRRBuAoLABQEJEiAeJ0Bcc3Gy3bsgzPuNEn4CESAC4nHOlQOghMchIDhw9MGEqbJNCJI1CMQNEvBjq9eLcUxyWCDYh0hwsAfVzAbBwXh3Z3p6erc+qaSVdm1N19dd1V1VXaOUQCAQCAQCgUAgEFQIe5dOXG9a8IAmPGQI3jcWv9QWfjAW24bwvLH4VyrZ53b3u5P8W034orHR/dpO7/Y9jmCw52x0lWnhE8bC0VSZBJvGYpJLsv9xWhMeqbfg8bEzE1f6Hme1kBzeUWtG2lg8ZgjWcyt8e0LWDcEnNRs9diCZuFSNKhrLszu1xee1xZ+cK31rYbP13IN2+go1UmaG8DVt4ZxHxf9H+Fl0M3qFn00NM3jZawvLvhVutiKCYFVb2K+GDY3FmdsMAfhWsOmZCPys1o5uUcMA3Yye7G4Tk6CEYL3ewmdUqGDHxttJ74q0ueVYcE763oXJ6wzBtxVQXlKMwNdjc59fq0LAvsXjN3ZPpMkwibawYFqf3qyqjEYzulMTnvGtLONKCFf2Lc7coaqIMYKbDMHP3pVkncsve+fxVlU1m58uUf/KScpZCTBfGZ+Q7nYcOtz4QieXuHouTfBNJXZH2sJ7LmdbXFECMoGjvpW/3/VyjytNACZ1wqe9hRc0wdqoE6AJ//DilA1h5HpwJgACMhLgePnxnRIGZgIhgIUjvSXG88vb78eBEMCJpVLSnYbw9bIGZQIiIBN4uYQIJ54VAnCLVQDnONXqjADO4ZY7ozCwFZDGiw660X5yeIePBHocHAGwpJLkksL1X2/hPaUPxgZIQLYK6oUTYAg/FgKwJwK0hQ8LVT5vr8o49ZqhWQGwXuiWNCsX9DAQGygBmRl6pDgCPCbX40AJ0BbfLIwAnzneOFACjIXviysRL6JKedQIINxoNKNduQng+nwfiou7khdFPccgOtCE47kJSC9HCAHJQKugOfVC/hWQ3UyRFWAH8gPv5CeAr/wIAcmAJuhEbgI04Y9CQGdQZ3w6/woYMPkiThjTJE1+Aiz8LgR0BjNBFn8tgID0KqisADuID4A/hYALwRMgJij2aoLECSdenbBsQzuet6FyEEu8HsQkFNHxG4qQYFzHczBOwtGJ33C0nd4tCRnsnwDCDb66lZuAjARJSZr+D2HfFaL8lADCIwNuw0Y2JamLTMpzpykhAPsioE7wcGEESGEW9mt+1gq/K2AIPxIThL2S8IEqGrUW3C0EYK/mxzgpT0/bRYoTTv7f/GDLSXk6gxvcCQG4HQHPKleQK0q4nfNddd6+oE7wqpwDcKvZf0iVcU21zM6HcSgHMYIlpxf0/o1ac+ohIQDd3QfoBdzaUVYAXiRgUpUN7qvJjSpG3gQRnvfWS07bqUddh6rjKvsAgs0awVPKJ1xfX4qrTcDbyjd438vtu0aNAG3xq7vmJi5XVcB4++TVxuIpp7PNVkgI5yrTtG/U2lZqgtXKNvbmpqbc3HSIZ/6KXpi6XVUZZmHmBq4IGz7lw3zlWxdfBNtHl47ZlCzscPUKXqNCQmN29jJD+IbPkhaTf9Zv8ja7MrudgftMBPoCB93CA2oYwH01y4odmWJkMhh732/owvNrq5JtpF16VLNscLkGdxfkNvDGv8L/2dvXLbxUWjy/Ol3X8SAnMvwpHlucww3ayRYBvYR7svdH4m8lzPY1fpVhWrnsqnohVDSWZ3eyDeYoI/fb4Qrj3Eon3OBCWWPxLS4XHCkzkxeNZrSrbqfu44sO2uK7muCLbtCv3b29mb3ONvvMNUun+FoQ/zb9G8LxwkrEBQKBQCAQCAQCgUAVg78BSL2jrANg4eQAAAAASUVORK5CYII="
        ></img>
      </button>
      <div className="w-full  h-[calc(100%-56px)] overflow-scroll !py-5 pr-2">
        {categories?.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="relative parent ">
              <div
                onClick={() => {
                  setCategoryModal(true);
                  handleCategoryModal(category.id, category.departmentId);
                }}
                className={`w-full text-white mt-1 h-16  shadow-sm ${
                  category.status === "A"
                    ? "bg-teal-400 hover:bg-teal-500 cursor-pointer"
                    : "bg-gray-400"
                } 
               flex justify-between px-3 py-2 hover:shadow-cus transition-all`}
              >
                <div className="flex flex-col justify-center ">
                  <h6 className="font-[500] text-[12px] uppercase">
                    {category.status === "O" && (
                      <i className="bi bi-clock-history mr-2 text-lg"></i>
                    )}
                    {category.departmentName == "Борлуулалт үйлчилгээний алба"
                      ? "БҮА"
                      : category.departmentName}
                  </h6>
                </div>
                <div className="flex justify-between w-[calc(90%)]">
                  <div className="flex items-center gap-20 w-[calc(70%)]">
                    <div className="flex justify-between items-start w-[200px] ">
                      {/* <h6 className="font-[500] text-[12px] uppercase">
                        Эхлэх: {category.startDate}
                      </h6> */}
                      <h6 className=" flex items-center">
                        {category.status === "A" && (
                          <i className="bi bi-hourglass-top text-lg mb-[-5px] mr-1"></i>
                        )}
                        <span className="mt-1 font-[500] text-[12px] uppercase">
                          {category.startDate.split(" ", 1)}
                        </span>
                      </h6>
                      <h6 className=" flex items-center">
                        {category.status === "A" && (
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
      <div className="min-w-[50px] max-w-[50px] ml-2 flex flex-col gap-4">
        <button
          className="hover:scale-110 transition bg-teal-500 text-gray-200 rounded-full h-[50px] w-[50px]"
          onClick={() => {
            setShowCategoryMenu(false);
          }}
        >
          <i className="bi bi-x-lg text-2xl"></i>
        </button>
        <button
          className="hover:scale-110 transition bg-teal-500 text-gray-200 rounded-full h-[50px] w-[50px]"
          onClick={() => {
            setShow(true);
          }}
        >
          <i className="bi bi-search text-xl"></i>
        </button>
      </div>
    </div>
  );
}
export default ExamCategory;
