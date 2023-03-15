import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import RatingBlock from "../TemplateRelated/RatingBlock";
function RatingSearchModal({ setShowSearch, data }) {
  const { activeMenu } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data?.filter((item) =>
    item.ratingName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div
      className={`fixed ${
        activeMenu
          ? " left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[56px] left-0"
      } 
    bg-black top-[56px] bg-opacity-50 flex justify-center items-center z-20
    `}
    >
      <div className="shrink w-[calc(80%)] h-[calc(70%)] bg-white flex flex-col items-center rounded">
        <div className="w-full min-h-[50px] bg-teal-600 flex justify-between items-center px-3  gap-2 relative rounded-t">
          <div className="flex h-full items-center gap-2">
            {/* <span className="font-[500] text-[15px] text-white">Хайлт</span>{" "} */}
          </div>
          <button
            onClick={() => {
              setShowSearch(false);
            }}
            className="w-[20px] h-full"
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        <div className="h-full w-full rounded-b-lg p-3">
          <div className="h-[100px] w-full flex items-end gap-2 justify-center ">
            <div className="group">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={
                  "custom-validation !w-full !border-b-[2px] !border-[#50a3a2] font-[400]"
                }
                type="text"
                required
                autoFocus
              />

              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="">
                <i className="bi bi-search"></i> Үнэлгээний нэр
              </label>
            </div>
          </div>
          <div
            // style={{
            //   background: `url(${bg})`,
            // }}
            className="h-[calc(65%)] w-full bg-gray-100 border rounded shadow-inner overflow-scroll px-2 py-2 flex flex-col items-center"
          >
            {filteredData.map((element, index) => {
              // console.log(element);
              return (
                <RatingBlock
                  item={element}
                  key={JSON.stringify(element + index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingSearchModal;
