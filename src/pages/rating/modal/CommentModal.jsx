import { useStateContext } from "../../../contexts/ContextProvider";

function CommentModal({ setShowComment }) {
  const { activeMenu } = useStateContext();
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
          setShowComment(false);
        }}
        className="w-full h-full relative "
      ></div>
      <div className="w-[calc(60%)] h-[calc(60%)] bg-white flex flex-col items-center rounded-[22px] absolute ">
        <div
          onBlur={() => {
            setShowComment(false);
          }}
          className="w-full min-h-[50px] bg-teal-500 flex justify-end items-center px-3  gap-2 relative rounded-t-[20px]"
        >
          <button
            onClick={() => {
              setShowComment(false);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        <div className="h-full w-full rounded-b-[20px] flex flex-col">
          <div className=" w-full h-full bg-white p-4 overflow-scroll">
            <div className="bubble you">Hello there !!</div>
            <div className="bubble you">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
              deserunt. !!
            </div>
            <div className="bubble you">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble me">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble me">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble me">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble you">Hello there !!</div>
            <div className="bubble you">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
              deserunt. !!
            </div>
            <div className="bubble you">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble me">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble me">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble me">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble you">Hello there !!</div>
            <div className="bubble you">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
              deserunt. !!
            </div>
            <div className="bubble you">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble me">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble me">Lorem ipsum dolor sit amet. !!</div>
            <div className="bubble me">Lorem ipsum dolor sit amet. !!</div>
          </div>
          <div className=" w-full min-h-[60px] bg-gray-200 rounded-b-[20px] px-3 py-[10px] flex gap-2">
            <form className="h-full w-full" action="">
              <input
                type="text"
                className="rounded h-full text-[14px] px-2 font-[400] w-full"
                autoFocus
              />
            </form>
            <button className="bg-teal-500 hover:bg-teal-600 px-3 rounded text-white font-[500] text-[14px]">
              Илгээх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
