import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import { logout } from "../../../service/examService";
import RatingModal from "../modal/RatingModal";
import CommentModal from "../modal/CommentModal";
import { toast, ToastContainer } from "react-toastify";
import DeleteConfirm from "../../main-exam/modal/DeleteComfirm";
import ExcelConfirm from "../../main-exam/modal/ExcelConfirm";

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
        if (res.data.isSuccess === true) {
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
  const [comfirm, setComfirm] = useState(false);
  const [name, setName] = useState("");
  return (
    <>
      <div className="w-full relative flex parent hover:bg-gray-100">
        {confirm && (
          <DeleteConfirm deleteCat={handleDelete} setConfirm={setConfirm} />
        )}
        <div
          onClick={() => {
            setRatingId(item.ratingId);
            handleShow();
          }}
          className="w-full pl-5"
        >
          <ul className="folder-content !mb-0 !p-0">
            <li className="folder-item js_folder-item  cursor-pointer">
              <div className="folder-item__icon">
                {item.adminInfo.totalUser == item.adminInfo.ratedUser ? (
                  <svg
                    width="50"
                    height="70"
                    viewBox="0 0 50 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33 0H5a5 5 0 00-5 5v60a5 5 0 005 5h40a5 5 0 005-5V17L33 0z"
                      fill="#36A95E"
                    />
                    <path
                      d="M50 29L35 16l15 .867V29z"
                      fill="url(#paint0_linear)"
                      opacity=".1"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33 0l17 17H38a5 5 0 01-5-5V0z"
                      fill="#A0D0B3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 60V39h25v21H12zm14-3h8v-3h-8v3zm-3-3v3h-8v-3h8zm3-3h8v-3h-8v3zm-3-3v3h-8v-3h8zm3-3h8v-3h-8v3zm-3-3v3h-8v-3h8z"
                      fill="#fff"
                      fillOpacity=".75"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="42.5"
                        y1="16"
                        x2="42.5"
                        y2="29"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop />
                        <stop offset="1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : item.adminInfo.ratedUser == "0" ? (
                  <svg
                    width="50"
                    height="70"
                    viewBox="0 0 50 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33 0H5a5 5 0 00-5 5v60a5 5 0 005 5h40a5 5 0 005-5V17L33 0z"
                      fill="#E8B52C"
                    />
                    <path
                      d="M50 29L35 16l15 .867V29z"
                      fill="url(#paint0_linear)"
                      opacity=".1"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33 0l17 17H38a5 5 0 01-5-5V0z"
                      fill="#EEDA86"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M34 39H13v21h24V39h-3zM16 54.75h18v-10.5H16v10.5z"
                      fill="#fff"
                      fillOpacity=".75"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="42.5"
                        y1="16"
                        x2="42.5"
                        y2="29"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop />
                        <stop offset="1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="50"
                    height="70"
                    viewBox="0 0 50 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33 0H5a5 5 0 00-5 5v60a5 5 0 005 5h40a5 5 0 005-5V17L33 0z"
                      fill="#5085E8"
                    />
                    <path
                      d="M50 29L35 16l15 .867V29z"
                      fill="url(#paint0_linear)"
                      opacity=".1"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33 0l17 17H38a5 5 0 01-5-5V0z"
                      fill="#A4BEF6"
                    />
                    <path
                      fill="#fff"
                      fillOpacity=".75"
                      d="M13 39h24v3H13zM13 57h17v3H13zM13 51h24v3H13zM13 45h24v3H13z"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="42.5"
                        y1="16"
                        x2="42.5"
                        y2="29"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop />
                        <stop offset="1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
              <div className="folder-item__details">
                <div className="folder-item__details__name">
                  {item.ratingName}
                </div>
                <div className="folder-item__details__date">
                  {item.createdDate}
                </div>
              </div>
              <div className="folder-item__size flex">
                <div>
                  <div className="folder-item__size mt-[-5px]">
                    {item.adminInfo.ratedUser}/{item.adminInfo.totalUser}
                  </div>
                  <div className="text-[13px] text-[#BEBDBF] mt-[10px]">
                    {item.adminInfo.avgScore == ""
                      ? 0
                      : item.adminInfo.avgScore}
                    %
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          onClick={() => {
            setConfirm(true);
          }}
          className="child absolute left-0 hidden top-[25px] left-[10px] cursor-pointer mr-2  flex items-center"
        >
          <i className="bi bi-trash-fill text-xl hover:text-red-500"></i>
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
              name={name}
            />
          )}
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="w-full flex">
                {comfirm && (
                  <ExcelConfirm setConfirm={setComfirm} excelUrl={excelUrl} />
                )}
                <button
                  onClick={() => {
                    setComfirm(true);
                  }}
                  // href={`${excelUrl}`}
                  className={`font-[500]  mr-2 text-[19px] text-[#174B4B] ${
                    excelUrl != null ? "cursor-pointer" : "cursor-not-allowed"
                  }  hover:text-black`}
                >
                  <i className="bi bi-file-earmark-spreadsheet-fill "></i>
                </button>
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
                  <div
                    onClick={() => {
                      setModalShow(true);
                      setConversationId(user.conversationId);
                      setName(user.deviceName);
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
