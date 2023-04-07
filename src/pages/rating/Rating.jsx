import RatingLayout from "./RatingLayout";
import { useEffect, useState } from "react";
import Template from "./TemplateRelated/Template";
import RatingMain from "./TemplateRelated/RatingMain";
import RatingComment from "./TemplateRelated/RatingComment";
function Rating() {
  const [stats, setStats] = useState(0);
  const header = [
    {
      title: "Үнэлгээ",
      stats: 0,
      icon: "bi-vector-pen",
    },
    {
      title: "Загвар",
      stats: 1,
      icon: "bi-plus-circle",
    },
  ];
  return (
    <RatingLayout>
      <div className="w-full h-[calc(100vh-56px)] flex flex-col bg-gray-50">
        <div className="w-full min-h-[56px] flex items-center justify-start bg-teal-500 shadow-lg ">
          {header.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setStats(item.stats);
                }}
                className={`${
                  stats == item.stats ? "!bg-teal-600" : ""
                } bg-teal-500 shadow hover:bg-teal-600 h-full text-white text-[14px] py-2 w-[120px] `}
              >
                <i className={`bi ${item.icon} mr-1`}></i>
                <span className="font-[500] uppercase text-[13px]">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
        <div className="w-full h-full flex ">
          {stats === 0 && <RatingMain />}
          {stats === 1 && <Template />}
          {stats === 2 && <RatingComment />}
        </div>
      </div>
    </RatingLayout>
  );
}
export default Rating;
