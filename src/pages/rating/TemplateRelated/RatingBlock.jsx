import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import { logout } from "../../../service/examService";
import RatingModal from "../modal/RatingModal";
function RatingBlock({ item, trigger, setTrigger }) {
  const { TOKEN } = useStateContext();
  const [ratingId, setRatingId] = useState(0);
  const [data, setData] = useState();
  const score =
    (parseInt(item.adminInfo.ratedUser) * 100) /
    parseInt(item.adminInfo.totalUser);
  const [show, setShow] = useState(false);
  const [recallList, setRecallList] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/getListDeviceRating/${ratingId}`,
    })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setData(res.data.deviceRatings);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [ratingId, recallList]);
  const [showModal, setShowModal] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [certainUser, setCertainUser] = useState();
  return (
    <>
      <div
        onClick={() => {
          setRatingId(item.ratingId);
          handleShow();
        }}
        className="btn-13 hover:shadow text-gray-600 w-full my-1
         rounded relative cursor-pointer hover:text-white"
      >
        <div className="py-3 px-4 w-full flex justify-between items-start ">
          <div className="font-[500] h-full items-center w-[calc(70%)] container-header-text2">
            {item.ratingName}
            <span className="absolute px-2 py-1 text-[11px] rounded bottom-2 left-5 bg-gray-500 text-white font-[500]">
              {item.createdBy}
            </span>
          </div>
          <div className="font-[500] absolute top-[15px] right-[calc(10%)] w-[70px] flex h-[40px] items-center justify-between">
            {score === Infinity ? 0 : Math.round(score)}%
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
                  bg-gray-500  cursor-pointer"
              >
                <i className="bi bi-arrow-repeat text-xl text-white mb-[2px]"></i>
              </div>
            )}
          </div>
          <div className="font-[500] flex flex-col items-end">
            <div className="font-[500] ">
              Үнэлсэн: {item.adminInfo.ratedUser}
            </div>
            <div className="font-[500] ">Нийт: {item.adminInfo.totalUser}</div>
          </div>
        </div>
        {/* <div className="w-full flex justify-between items-start h-4 bg-white border-b border-l border-r px-3 flex items-center">
        0%
      </div> */}
      </div>

      <Offcanvas placement="end" show={show} onHide={handleClose}>
        {showModal && (
          <RatingModal
            setShowModal={setShowModal}
            showModal={showModal}
            deviceId={deviceId}
            ratingId={ratingId}
            trigger={trigger}
            setTrigger={setTrigger}
            recallList={recallList}
            setRecallList={setRecallList}
            user={certainUser}
          />
        )}

        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="font-[500] text-white text-[16px] container-header-text">
              {item.ratingName}:{" "}
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {data?.map((user, index) => {
            // console.log(user);
            return (
              <div
                onClick={() => {
                  setShowModal(true);
                  setDeviceId(user.deviceId);
                  setCertainUser(user);
                }}
                key={index}
                className={`${
                  user.score == "" ? "bg-gray-300" : "btn-20 "
                } py-2 px-3 hover:shadow text-[13px] flex justify-between items-center text-gray-600 
                w-full my-1 rounded relative cursor-pointer hover:text-white mt-1 `}
              >
                {user.score == "100" && (
                  <div
                    className="absolute w-[25px] left-[-11px] rounded-full text-white h-[25px]  flex items-center justify-center 
                bg-[#FF7F50]"
                  >
                    <i className="bi bi-check2-circle text-md"></i>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-[400]">{user.deviceName}</span>
                  <span className="font-[400]">{user.unitName}</span>
                </div>
                <div>
                  {" "}
                  <span className="font-[400]">
                    {user.score == "" ? "0" : user.score}%
                  </span>
                </div>
              </div>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default RatingBlock;
