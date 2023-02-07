import { useState } from "react";
import RatingLayout from "./RatingLayout";
import Template from "./template/Template";

function Rating() {
  const [show, setShow] = useState(0);

  return (
    <RatingLayout>
      <div className="w-full h-full flex">
        <div className="w-[calc(92%)] h-full flex">
          {show === 0 && (
            <div className="w-full h-full bg-white border-r-[2px] border-gray-200">
              2
            </div>
          )}
          {show === 1 && <Template />}
        </div>
        <div className="w-[calc(8%)] h-full bg-white flex flex-col justify-between items-center py-4">
          <div className="flex flex-col gap-3 items-center">
            {show === 0 ? (
              <div
                onClick={() => {
                  setShow(1);
                }}
                className="w-[32px] h-[32px]  flex items-center justify-center bg-black rounded-full cursor-pointer hover:shadow hover:scale-105 "
              >
                <i className="bi bi-plus-lg text-white"></i>
              </div>
            ) : (
              <div
                onClick={() => {
                  setShow(0);
                }}
                className="w-[32px] h-[32px]  flex items-center justify-center bg-black rounded-full cursor-pointer hover:shadow hover:scale-105 "
              >
                <i className="bi bi-x-lg text-white"></i>
              </div>
            )}

            <div
              onClick={() => {
                setShow(0);
              }}
              className="w-[35px] h-[35px] flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:shadow hover:scale-105 "
            >
              <i className="bi bi-vector-pen text-black"></i>
            </div>
            <div className="w-[35px] h-[35px] flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:shadow hover:scale-105 ">
              <i className="bi bi-chat-left-dots-fill text-black text-sm"></i>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </RatingLayout>
  );
}

export default Rating;
