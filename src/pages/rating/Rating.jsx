import RatingLayout from "./RatingLayout";
import { useState } from "react";
import Template from "./TemplateRelated/Template";
import RatingMain from "./TemplateRelated/RatingMain";
import RatingComment from "./TemplateRelated/RatingComment";
function Rating() {
  const [stats, setStats] = useState(0);
  const header = [
    {
      title: "Үнэлгээ",
      stats: 0,
    },
    {
      title: "Загвар",
      stats: 1,
    },
    {
      title: "Сэтгэгдэл",
      stats: 2,
    },
  ];
  return (
    <RatingLayout>
      <div className="w-full h-full flex flex-col bg-gray-50">
        <div className="w-full h-14 px-3 flex gap-4 items-center justify-start bg-teal-500 shadow">
          {header.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setStats(item.stats);
                }}
                className="custom-btn btn-13 w-[100px]"
              >
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
