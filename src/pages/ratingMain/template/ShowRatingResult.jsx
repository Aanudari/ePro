import { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import ShowSubCategory from "./ShowSubCategory";
function ShowRatingResult({ setShowResult, personId }) {
  const { TOKEN, activeMenu } = useStateContext();
  let time = {
    startDate: "",
    endDate: "",
  };
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [data, setData] = useState();
  const [showEmoji, setShowEmoji] = useState(false);
  useEffect(() => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Rating/${personId}`,
      data: time,
    })
      .then((res) => {
        setData(res.data.ratings);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const [showChatMenu, setShowChatMenu] = useState(0);
  const [input, setInput] = useState("");
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };
  console.log(data && data[0].categories[0].scoreId);
  console.log(data && data);
  return (
    <div
      className={`${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
      } 
        top-[56px] fixed  h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex items-center justify-center`}
    >
      <div className="bg-gray-200 appear-smooth w-full h-[calc(100%)] relative">
        <button
          onClick={() => {
            setShowChatMenu(1);
          }}
          className="px-[12px] py-2 bg-blue-700 absolute bottom-[70px] right-[70px] shadow rounded-full
        active:bg-blue-500"
        >
          <i className="bi bi-chat-dots-fill text-2xl text-white"></i>
          <div className="w-[13px] h-[13px] absolute bg-green-500 rounded-full border-[2px] border-white right-0 bottom-[2px]"></div>
        </button>
        {showChatMenu === 1 && (
          <div
            className="!bg-black !bg-opacity-50 w-[calc(100%-250px)] fixed h-[calc(100%-56px)] top-[56px] left-[250px] z-20 flex
            justify-end"
          >
            <div
              className={`h-full w-[400px] bg-gray-100 shadow ${
                showChatMenu == 1
                  ? "from-left"
                  : showChatMenu == 2
                  ? "to-left"
                  : null
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
                <div className="bubble you">I'm in California dreaming</div>
                <div className="bubble me">... about who we used to be.</div>
                <div className="bubble me">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt deserunt incidunt vitae aspernatur officia a?
                </div>
                <div className="bubble you">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt deserunt incidunt vitae aspernatur officia a?
                </div>
                <div className="bubble you">... about who we used to be.</div>
                <div className="bubble you">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt deserunt incidunt vitae aspernatur officia a?
                </div>
              </div>
              {showEmoji && (
                <div
                  className="bg-black bg-opacity-50 absolute h-[calc(100%-148px)] flex justify-center items-center w-[400px] z-20 
                bottom-[100px]"
                >
                  <EmojiPicker
                    onEmojiClick={addEmoji}
                    autoFocusSearch={false}
                  />
                </div>
              )}
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
                      setShowEmoji(!showEmoji);
                    }}
                    className="write-link smiley active:scale-105"
                  ></a>
                  <a href="" className="write-link send"></a>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full h-12 bg-teal-500 flex justify-between px-4 items-center shadow">
          <div className="flex items-center">
            <div className=" flex justify-start px-4 py-2">
              <span className="text-white font-[500] text-sm">
                {data && data[0]?.user.lastName}.{" "}
                {data && data[0]?.user.firstName} /{" "}
                {data && data[0]?.user.roleName}
              </span>
            </div>
          </div>
          <div className="">
            <i
              onClick={() => {
                setShowResult(false);
              }}
              className="bi bi-x-lg text-xl cursor-pointer hover:scale-105"
            ></i>
          </div>
        </div>
        <div className="h-[calc(100%-50px)] w-full px-3 pt-1 overflow-scroll pb-5">
          <div className="mt-2 bg-teal-500"></div>
          <div className="w-full mt-1 flex flex-col items-center justify-center px-2">
            {data &&
              data.map((element, ind) => (
                <div key={ind} className="w-full border p-2 my-4 bg-teal-500">
                  <div className="bg-teal-500 w-[] text-white px-3 py-2 w-full flex flex-col">
                    <div className="flex w-full justify-between">
                      <div className=" flex gap-4">
                        <span className="text-sm font-[500]">
                          {element.startDate}
                        </span>
                        <span className="text-sm font-[500]">
                          {element.endDate}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-sm font-[500]">
                          {element.isSeen}
                        </span>
                        <span className="text-sm font-[500]">
                          Total : {element.rating}%
                        </span>
                      </div>
                    </div>
                  </div>
                  {element.categories.map((item, index) => (
                    <div className="bg-teal-500" key={index}>
                      <div className=" flex justify-between px-4 py-2 relative">
                        <div className="">
                          <span className="text-white font-[500] text-sm">
                            Нэр: {item.name}
                            {item.endDate}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-white font-[500] text-sm">
                            {item.points}
                            <i className="bi bi-percent"></i>
                          </span>
                        </div>
                      </div>
                      <div className="px-4 bg-white border-l border-teal-500 border-r">
                        {item?.subCategory.map((it, i) => (
                          <ShowSubCategory key={i} it={it} mainId={item.id} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowRatingResult;
