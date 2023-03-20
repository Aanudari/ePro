import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect, useRef } from "react";
import { logout } from "../../../service/examService";
import axios from "axios";

function CommentModal({ modalShow, setModalShow, conversationId }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [comments, setComments] = useState();
  const [trigger, setTrigger] = useState(false);
  // console.log(modalShow);
  // console.log(conversationId);

  const scrollableRef = useRef(null);

  useEffect(() => {
    const scrollable = scrollableRef.current;
    if (scrollable !== null) {
      scrollable.scrollTop = scrollable.scrollHeight;
    }
  });
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/GetComments/${conversationId}`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setComments(res.data.commentList);
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  const [value, setValue] = useState("");
  const submitComment = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/doComment?conversationId=${conversationId}&comment=${value}`,
    })
      .then((res) => {
        // console.log(res.data);
        setTrigger(!trigger);
        setValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      <div
        onClick={() => {
          setModalShow(false);
        }}
        className="w-full h-full relative "
      ></div>
      <div className="w-[calc(60%)] h-[calc(60%)] shrink bg-white flex flex-col items-center rounded-[22px] absolute ">
        <div
          onBlur={() => {
            setModalShow(false);
          }}
          className="w-full min-h-[50px] bg-[#52b5a5] flex justify-end items-center px-3  gap-2 relative rounded-t-[20px]"
        >
          <button
            onClick={() => {
              setModalShow(false);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        <div className="h-full w-full rounded-b-[20px] flex flex-col">
          <div
            className=" w-full h-full bg-white p-4 overflow-scroll scrollable "
            ref={scrollableRef}
          >
            {comments?.map((comment, index) => {
              return (
                <div
                  key={index}
                  className={`bubble ${
                    comment.commentType === "1" ? "me" : "you"
                  }`}
                >
                  {comment.comment}
                </div>
              );
            })}
          </div>
          <div className=" w-full min-h-[60px] bg-gray-200 rounded-b-[20px] px-3 py-[10px] flex gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitComment();
              }}
              className="h-full w-full"
              action=""
            >
              <input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                type="text"
                className="rounded h-full text-[14px] px-2 font-[400] w-full"
                autoFocus
              />
              <button type="submit"></button>
            </form>
            <button className="bg-[#52b5a5] hover:bg-teal-600 px-3 rounded text-white font-[500] text-[14px]">
              Илгээх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
