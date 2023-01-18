import { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import ShowSubCategory from "./ShowSubCategory";
import CommentMain from "../comment/CommentMain";
function ShowRatingResult({ setShowResult, personId }) {
  const { TOKEN, activeMenu } = useStateContext();
  let time = {
    startDate: "",
    endDate: "",
  };
  const [showChatMenu, setShowChatMenu] = useState(0);
  const [data, setData] = useState();
  const [trigger, setTrigger] = useState(false);
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
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setData(res.data.ratings);
      })
      .catch((err) => {
        alert(err);
      });
  }, [trigger]);
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
          <CommentMain
            data={data}
            setShowChatMenu={setShowChatMenu}
            showChatMenu={showChatMenu}
            trigger={trigger}
            setTrigger={setTrigger}
          />
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
                  <div className="bg-teal-500 text-white px-3 py-2 w-full flex flex-col">
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
