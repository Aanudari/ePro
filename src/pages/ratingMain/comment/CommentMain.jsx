import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";

function CommentMain({
  data,
  showChatMenu,
  setShowChatMenu,
  trigger,
  setTrigger,
}) {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { deviceId, TOKEN } = useStateContext();
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };
  let schema = {
    eventId: data && data[0].id,
    content: input,
    type: "rating",
  };
  //   console.log(schema);
  const handleComment = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingComment/add`,
      data: schema,
    })
      .then((res) => {
        setInput("");
        setTrigger(!trigger);
        setShowEmoji(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let comments = data[0].comments;
  let sorted = comments.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <div
      className="!bg-black !bg-opacity-50 w-[calc(100%-250px)] fixed h-[calc(100%-56px)] top-[56px] left-[250px] z-20 flex
            justify-end"
    >
      <div
        className={`h-full w-[400px] bg-gray-100 shadow ${
          showChatMenu == 1 ? "from-left" : showChatMenu == 2 ? "to-left" : null
        }  absolute `}
      >
        <div className="w-full h-12 text-gray-300 bg-gray-700 text-[13px] flex items-center justify-between px-4 ">
          <div className="font-[500]">
            To:{" "}
            <span className="text-white font-[500] text-[13px] ml-2">
              {data && data[0]?.user.lastName[0]}.{" "}
              {data && data[0]?.user.firstName}
            </span>
          </div>
          <i
            onClick={() => {
              setShowChatMenu(2);
            }}
            className="bi bi-x-circle-fill text-lg text-white"
          ></i>
        </div>
        <div className="px-3 py-2 h-[calc(100%-95px)] overflow-scroll">
          {sorted.map((element, index) => (
            <div
              key={index}
              className={`bubble ${
                element.user.deviceId == deviceId ? "me" : "you"
              }`}
            >
              {element.content}
            </div>
          ))}
        </div>
        <div className="h-12 w-full z-20">
          <div className="write">
            <a href="" className="write-link attach"></a>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="!text-md z-20"
            ></input>
            <a
              onClick={() => {
                handleComment();
              }}
              className="write-link send"
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentMain;
