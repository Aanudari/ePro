import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import { logout } from "../../../service/examService";
import RatingModal from "../modal/RatingModal";
import CommentModal from "../modal/CommentModal";
import { toast, ToastContainer } from "react-toastify";
import DeleteConfirm from "../../main-exam/modal/DeleteComfirm";

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
  const [recallChild, setRecallChild] = useState(false);
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
  }, [ratingId, recallList, recallChild]);
  const [showModal, setShowModal] = useState(false);
  const [deviceId, setDeviceId] = useState(0);
  const [certainUser, setCertainUser] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [conversationId, setConversationId] = useState("0");
  const [confirm, setConfirm] = useState(false);
  const handleDelete = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/deleteRating/${item.ratingId}`,
    })
      .then((res) => {
        if (res.data.isSuccess) {
          setRecallList(!recallList);
          setTrigger(!trigger);
        } else {
          toast.info(res.data.resultMessage, {
            position: "bottom-right",
          });
        }
      })
      .catch((err) => {});
  };
  const [excelUrl, setExcelUrl] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ReportDownload/reportDownloader/2/${item.ratingId}`,
    })
      .then((res) => {
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        } else {
          setExcelUrl(res.data.excelFile);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const removeUser = (certain) => {
    const final = {
      ratingId: "string",
      ratingName: "string",
      devices: [
        {
          department: "string",
          unitId: "string",
          deviceId: "string",
        },
      ],
    };
    console.log(certain);
  };
  return (
    <>
      <div className="w-full relative flex parent gap-2">
        {confirm && (
          <DeleteConfirm deleteCat={handleDelete} setConfirm={setConfirm} />
        )}
        <div
          onClick={() => {
            setRatingId(item.ratingId);
            handleShow();
          }}
          className="btn-20 min-h-[56px] bg-teal-500 hover:shadow text-gray-600 my-1
         rounded relative cursor-pointer hover:text-white !w-[calc(94%)] transition-all "
        >
          <div className="py-2 px-3 w-full flex justify-between items-start ">
            <div className="font-[500] uppercase  h-full items-center w-[calc(70%)] container-header-text2">
              {item.ratingName}
              <span className="absolute px-2 text-[11px] rounded bottom-2 left-5 bg-gray-500 text-white font-[500]">
                {item.createdBy}
              </span>
            </div>
            <div className="font-[500] top-[15px] right-[calc(10%)] w-[70px] flex h-[40px] items-center justify-between">
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
                  <i className="bi bi-arrow-repeat text-lg text-white mb-[2px]"></i>
                </div>
              )}
            </div>
            <ToastContainer />

            <div className="w-[70px] font-[500] flex flex-col items-end">
              <div className="font-[500] ">
                Үнэлсэн: {item.adminInfo.ratedUser}
              </div>
              <div className="font-[500] ">
                Нийт: {item.adminInfo.totalUser}
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setConfirm(true);
          }}
          className="child transition-all z-10 rounded-full py-[5px] px-[9px] 
                  bg-gray-300  active:bg-gray-400 cursor-pointer
                  w-[50px] h-[50px] mt-[12px] p-[10px] relative"
        >
          <i className="bi bi-trash3-fill text-xl text-white mb-[2px] absolute top-[10px] left-[15px]"></i>
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
          {modalShow && (
            <CommentModal
              modalShow={modalShow}
              setModalShow={setModalShow}
              conversationId={conversationId}
              recallChild={recallChild}
              setRecallChild={setRecallChild}
            />
          )}
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="w-full flex">
                <a
                  download={`${excelUrl}`}
                  className={`font-[500]  mr-2 text-[19px] text-[#174B4B] ${
                    excelUrl != null ? "cursor-pointer" : "cursor-not-allowed"
                  }  hover:text-black`}
                >
                  <i className="bi bi-file-earmark-spreadsheet-fill "></i>
                </a>
                <div className="font-[500] text-white text-[16px] container-header-text">
                  {item.ratingName}
                </div>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {data?.map((user, index) => {
              // console.log(user);
              return (
                <div key={JSON.stringify(user + index)} className="flex h-16">
                  <div
                    onClick={() => {
                      setShowModal(true);
                      setDeviceId(user.deviceId);
                      setCertainUser(user);
                    }}
                    style={{
                      background:
                        user.adminStatus == "P" &&
                        "linear-gradient(to right, #89d8d3 40%, #e4e3e3 70%)",
                    }}
                    key={index}
                    className={`${
                      user.adminStatus == "C" && user.userStatus == "Y"
                        ? "btn-20 "
                        : user.adminStatus == "C" && user.userStatus == "N"
                        ? "btn-20 "
                        : user.adminStatus == "P"
                        ? "btn-25"
                        : "bg-gray-200"
                    } py-2 px-3 hover:shadow text-[13px] flex justify-between items-center text-gray-600 
                        w-full my-1 rounded relative cursor-pointer hover:text-white mt-1 `}
                  >
                    {user.adminStatus == "C" && user.userStatus == "Y" && (
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
                      {user.adminStatus !== "P" && (
                        <span className="font-[400]">
                          {user.score == "" ? "" : user.score + "%"}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* {user.adminStatus == "N" ? (
                    <div
                      onClick={() => {
                        removeUser(user);
                        // setModalShow(true);
                        // setConversationId(user.conversationId);
                      }}
                      className="w-[50px] relative h-14 rounded cursor-pointer hover:text-white ml-1 bg-rose-400 hover:bg-rose-500 text-rose-200 my-1 flex items-center justify-center"
                    >
                      <i className="bi bi-x-lg"></i>
                      {user.unseenCommentCount !== "0" && (
                        <div className="text-[11px] rounded-full top-[-10px] right-[-10px] bg-red-500 px-2 py-[2px] absolute">
                          {user.unseenCommentCount}
                        </div>
                      )}
                    </div>
                  ) : ( */}
                  <div
                    onClick={() => {
                      setModalShow(true);
                      setConversationId(user.conversationId);
                    }}
                    className={`w-[50px] relative h-14 rounded cursor-pointer hover:text-white ml-1
                     ${
                       user.hasFile != "0"
                         ? "bg-gray-400 hover:bg-gray-500"
                         : "bg-emerald-500 hover:bg-emerald-600"
                     } text-gray-200 my-1 flex items-center justify-center`}
                  >
                    <i className="bi bi-chat-dots"></i>
                    {user.unseenCommentCount !== "0" && (
                      <div className="text-[11px] rounded-full top-[-10px] right-[-10px] bg-red-500 px-2 py-[2px] absolute">
                        {user.unseenCommentCount}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}

export default RatingBlock;
