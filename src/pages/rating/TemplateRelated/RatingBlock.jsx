import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
function RatingBlock({ item }) {
  const [ratingId, setRatingId] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const score =
    (parseInt(item.adminInfo.totalUser) * 100) /
    parseInt(item.adminInfo.ratedUser);
  return (
    <div
      onClick={() => {
        setRatingId(item.ratingId);
        handleShow();
      }}
      className=" btn-13 hover:shadow text-gray-600 w-full my-1 rounded relative cursor-pointer hover:text-white"
    >
      <>
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header>
            <Offcanvas.Title>
              <div className="!w-full flex justify-between">
                <span>title</span>
                <button
                  onClick={() => {
                    handleShow();
                  }}
                  className="btn-20"
                >
                  X
                </button>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            I will not close if you click outside of me.
          </Offcanvas.Body>
        </Offcanvas>
      </>
      <div className="py-3 px-4 w-full flex justify-between items-start ">
        <div className="font-[500] h-full items-center ">
          {item.ratingName}
          <span className="absolute px-2 py-1 text-[11px] rounded bottom-2 left-5 bg-gray-500 text-white font-[400]">
            {item.createdBy}
          </span>
        </div>
        <div className="font-[500] absolute top-[15px] right-1/4 w-[70px] flex h-[40px] items-center justify-between">
          {score === Infinity ? 0 : score}%
          {score === 100 ? (
            <div
              className="transition-all z-10 rounded-full py-[5px] px-[9px] 
                  bg-emerald-500  cursor-pointer"
            >
              <i className="bi bi-check-lg text-xl text-white mb-[2px]"></i>
            </div>
          ) : (
            <div
              className="transition-all z-10 rounded-full py-[5px] px-[9px] 
                  bg-gray-400  cursor-pointer"
            >
              <i className="bi bi-arrow-repeat text-xl text-white mb-[2px]"></i>
            </div>
          )}
        </div>
        <div className="font-[500] flex flex-col items-end">
          <div className="font-[500] ">Үнэлсэн: {item.adminInfo.ratedUser}</div>
          <div className="font-[500] ">Нийт: {item.adminInfo.totalUser}</div>
        </div>
      </div>
      {/* <div className="w-full flex justify-between items-start h-4 bg-white border-b border-l border-r px-3 flex items-center">
        0%
      </div> */}
    </div>
  );
}

export default RatingBlock;
