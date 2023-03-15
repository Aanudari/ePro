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
    {
      title: "Сэтгэгдэл",
      stats: 2,
      icon: "bi-chat-left-quote",
    },
  ];
  return (
    <RatingLayout>
      <div className="w-full h-[calc(100vh-56px)] flex flex-col bg-gray-50">
        <div className="w-full h-14 px-3 flex gap-4 items-center justify-start bg-teal-500 shadow">
          {header.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setStats(item.stats);
                }}
                className={`custom-btn btn-13 w-[120px]`}
              >
                <i className={`bi ${item.icon} mr-1`}></i>
                <span className="font-[500]">{item.title}</span>
              </button>
            );
          })}
        </div>
        <div className="w-full h-full flex bg-white ">
          {stats === 0 && <RatingMain />}
          {stats === 1 && <Template />}
          {stats === 2 && <RatingComment />}
        </div>
      </div>
    </RatingLayout>
  );
}
export default Rating;
