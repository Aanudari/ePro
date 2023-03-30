import { useState } from "react";

function SelectSubCategoryCell({
  i,
  element,
  handleSelect,
  catIndex,
  collector,
}) {
  const container = [
    {
      value: 0,
      point: 0,
    },
  ];
  for (let index = 0; index < parseInt(element.subCatMaxScore); index++) {
    const arr = {
      value: index + 1,
      point: index + 1,
    };
    container.push(arr);
  }
  const options = container.map((item, index) => {
    return (
      <option key={index} value={`${item.value}`} className={""}>
        {item.point}
      </option>
    );
  });
  const [pointValue, setPointValue] = useState(element.subCatUserScore);
  const [progress, setProgress] = useState(
    parseInt((element.subCatUserScore * 100) / element.subCatMaxScore)
  );
  const [subId, setSubId] = useState([]);
  const [comment, setComment] = useState(element.comment);
  return (
    <div className="w-full rounded mt-2">
      <div className="w-full h-1 rounded-t bg-gray-300 relative">
        <div
          style={{
            width: `${
              Math.round(progress) == undefined ? 0 : Math.round(progress)
            }%`,
          }}
          className={`h-1 bg-teal-500 rounded-t absolute transition-all`}
        ></div>
      </div>
      <div className="border py-1 px-2 flex justify-between items-center bg-white rounded-b">
        <div className="text-[13px] font-[400] w-[calc(90%)] ">
          {element.subCategoryName}
        </div>

        <div className="h-full flex items-start flex-col gap-1">
          <select
            onChange={(e) => {
              setPointValue(e.target.value);
              setProgress((e.target.value * 100) / element.subCatMaxScore);
              handleSelect(
                catIndex,
                element.subCategoryId,
                e.target.value,
                comment
              );
              collector(e.target.value, element.subCategoryId);
            }}
            value={pointValue}
            className="w-[80px] "
          >
            {options}
          </select>
        </div>
        {subId.includes(element.subCategoryId) ? (
          <div
            onClick={() => {
              setSubId([]);
            }}
            className="w-9 h-9 bg-rose-600 hover:bg-rose-500 rounded ml-1 flex items-center justify-center cursor-pointer"
          >
            <i className="bi bi-x-circle text-white"></i>
          </div>
        ) : (
          <div
            onClick={() => {
              setSubId([element.subCategoryId]);
            }}
            className="w-9 h-9 bg-teal-600 hover:bg-teal-500 rounded ml-1 flex items-center justify-center cursor-pointer"
          >
            <i className="bi bi-chat-dots-fill text-white"></i>
          </div>
        )}
      </div>
      <div className="w-full  bg-white h-11 border border-b rounded-b-lg px-2 py-1 ">
        <input
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
            handleSelect(
              catIndex,
              element.subCategoryId,
              pointValue,
              event.target.value
            );
          }}
          type="text"
          className="w-full h-full text-[13px] font-[400] placeholder-gray-400 px-2 text-gray-500"
          placeholder="Сэтгэгдэл бичих ..."
        />
      </div>
    </div>
  );
}

export default SelectSubCategoryCell;
