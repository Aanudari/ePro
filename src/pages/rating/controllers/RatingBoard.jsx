import { useEffect, useState } from "react";
import CreateRatingModal from "../modal/CreateRatingModal";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { logout } from "../../../service/examService";
import RatingBlock from "../TemplateRelated/RatingBlock";
import moment from "moment";
function RatingBoard({ showModal, setShowModal, data, setTrigger, trigger }) {
  const months = {};
  let date = "01/11/1992"; // string
  for (let i = 0; i < 12; i++) {
    const month = moment(new Date(date)).month(i).format("MMMM");
    const year = moment(new Date(date)).year(2023).month(i).format("YYYY");
    months[`${month} ${year}`] = [];
  }
  for (let index = 0; index < data?.length; index++) {
    const element = data[index];
    const monthYear = moment(element.createdDate).format("MMMM YYYY");
    months[monthYear].push(element);
  }
  const result = Object.entries(months).map(([monthYear, items]) => ({
    monthYear,
    items,
  }));

  return (
    <div className="w-[calc(90%)] bg-white p-2 h-full rounded">
      {showModal && (
        <CreateRatingModal
          setTrigger={setTrigger}
          trigger={trigger}
          setShowModal={setShowModal}
        />
      )}
      <div className="h-[calc(100vh-160px)] overflow-scroll py-2">
        {result.map((month, ind) => {
          return (
            <div key={ind} className=" w-full my-2 px-3">
              <div>
                {month.items.length > 0 && (
                  <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded text-[12px] w-[150px] font-[500]">
                    {month.monthYear}
                  </div>
                )}
              </div>

              <div>
                {month.items.map((item, index) => {
                  return (
                    <RatingBlock
                      item={item}
                      key={JSON.stringify(item + index)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RatingBoard;
