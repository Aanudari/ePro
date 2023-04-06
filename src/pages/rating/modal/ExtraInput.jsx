import { useState } from "react";
import DatePicker from "react-datepicker";
import DeleteConfirm from "../../main-exam/modal/DeleteComfirm";
function ExtraInput({ item, index, trigger, setTrigger }) {
  const [input, setInput] = useState(item.inputName);
  const [value, setValue] = useState(new Date());
  const [confirm, setConfirm] = useState(false);
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  var datestring =
    value.getFullYear() +
    "" +
    addZero(value.getMonth() + 1) +
    addZero(value.getDate()) +
    addZero(value.getHours()) +
    addZero(value.getMinutes()) +
    addZero(value.getSeconds());
  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <div className={`w-[calc(49.5%)] bg-white rounded mb-1 mr-1 z-1`}>
      {confirm && (
        <DeleteConfirm setConfirm={setConfirm} deleteCat={handleDelete} />
      )}
      {item.inputType == 1 ? (
        <div className="flex h-12 px-3 py-2 gap-2">
          <input
            className="bg-gray-100 h-full px-3 py-2 rounded w-full !placeholder-gray-500 text-[14px]"
            type="text"
            placeholder={`${input}`}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            disabled
          />
          <div className="h-full w-[50px] bg-gray-200 rounded flex items-center justify-center">
            <i className="bi bi-vector-pen text-lg text-teal-600"></i>
          </div>
          <div
            onClick={() => {
              setConfirm(true);
            }}
            className="h-full w-[50px] bg-gray-200 rounded flex items-center justify-center parent"
          >
            <i className="bi bi-trash text-lg text-rose-600 hidden child cursor-pointer"></i>
          </div>
        </div>
      ) : (
        <div className="h-12 px-3 py-2 flex gap-2 w-full">
          <div
            className="h-full w-full px-2 select-none flex items-center rounded bg-gray-200 text-[14px] 
          truncate font-[400]"
          >
            {input}
          </div>
          <div className="h-full w-[50px] bg-gray-200 rounded flex items-center justify-center">
            <i className="bi bi-calendar-check-fill text-lg text-teal-600"></i>
          </div>
          <div
            onClick={() => {
              setConfirm(true);
            }}
            className="h-full w-[50px] bg-gray-200 rounded flex items-center justify-center parent"
          >
            <i className="bi bi-trash text-lg text-rose-600 hidden child cursor-pointer"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExtraInput;
