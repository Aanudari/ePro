function QuestionMain({ data, indexed, ids, remover, collector }) {
  return (
    <div
      className={`border-t-[5px] border-l border-r border-[#50a3a2] rounded-lg relative mb-2`}
    >
      {ids.includes(data.id) ? (
        <button
          onClick={() => {
            remover(data.id);
          }}
          className="absolute bottom-[20px] right-[20px] px-3 hover:bg-red-600 py-2 bg-red-500 font-[500] flex justify-center 
        items-center text-white rounded-lg active:bg-red-500"
        >
          <i className="bi bi-x-circle text-xl"></i>
        </button>
      ) : (
        <button
          onClick={() => {
            collector(data.id);
          }}
          className="absolute bottom-[20px] right-[20px] px-3 hover:bg-teal-600 py-2 bg-teal-500 font-[500] flex justify-center 
      items-center text-white rounded-lg active:bg-teal-500"
        >
          <i className="bi bi-plus-circle text-xl"></i>
        </button>
      )}

      <div
        className={`w-full shadow-md py-3 px-3 font-[400] ${
          ids.includes(data.id) ? "bg-green-100" : "bg-gray-50"
        }  flex flex-col transition rounded-lg pt-10 `}
      >
        <div className="flex justify-between gap-2">
          {/* <div className="h-[42px] w-full flex items-start">
            <span className="font-[500] mt-[2px]">{indexed + 1}.</span>
            <h6 className="mb-0 mt-1 ml-2 font-[400]">{data.question}</h6>
          </div> */}
          <div className="w-full">
            <h6 className="mb-0 mt-1 ml-2 font-[400]">{data.question}</h6>
            <div
              className={`${
                data.qimgUrl !== ""
                  ? "border bg-gray-100 p-2 w-full mt-2 rounded flex justify-center"
                  : "hidden"
              }`}
            >
              <img
                className="h-[400px] mt-2"
                src={`http://${data.qimgUrl}`}
                alt=""
              />
            </div>
          </div>

          <div className="h-[42px] flex items-start">
            <i className="bi active:text-teal-500 bi-images text-xl mr-3 text-teal-600 "></i>
            <span className="mb-0 font-[400] text-[15px] mt-[1px]">Оноо:</span>
            <span className="mb-0 font-[500] text-[16px] ml-1">
              {data.points}
            </span>
          </div>
        </div>
        <div className="mt-3">
          {data.answers.map((item, index) => (
            <div key={index} className="">
              <h6 className=" font-[400] pl-3 flex items-center">
                {item.isTrue == "1" ? (
                  <i className="bi bi-check-circle text-xl px-1 text-teal-500"></i>
                ) : (
                  <i className="bi bi-circle text-xl px-1 text-gray-400"></i>
                )}
                <span className="ml-2 text-[14px] font-[400]">
                  {item.answer}
                </span>
              </h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionMain;
