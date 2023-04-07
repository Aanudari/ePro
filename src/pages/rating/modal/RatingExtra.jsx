import { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
import DatePicker from "react-datepicker";
import DeleteConfirm from "../../main-exam/modal/DeleteComfirm";
import { useStateContext } from "../../../contexts/ContextProvider";
function RatingExtra({
  item,
  index,
  trigger,
  setTrigger,
  handleExtras,
  handleExtraDate,
}) {
  const { TOKEN } = useStateContext();
  const [input, setInput] = useState(item.inputName);
  const [inputValue, setInputValue] = useState(item.inputValue);
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
  const handleDelete = () => {};
  // console.log(item);
  useEffect(() => {
    handleExtraDate(datestring, item.inputId);
  }, [value]);
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
            value={inputValue}
            placeholder={`${input}`}
            onChange={(e) => {
              setInput(e.target.value);
              setInputValue(e.target.value);
              handleExtras(e.target.value, item.inputId);
            }}
          />
          <div className="h-full w-[50px] bg-gray-200 rounded flex items-center justify-center">
            <i className="bi bi-vector-pen text-lg text-teal-600"></i>
          </div>
        </div>
      ) : (
        <div className="h-12 px-3 py-2 flex gap-2 w-full">
          <div className="h-full w-full select-none ">
            <DatePicker
              selected={value}
              value={value}
              onChange={(date) => setValue(date)}
              className="form-control form-control-sm cursor-pointer"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="yyyy-MM-dd h:mm aa"
            />
          </div>
          <div className="h-full w-[50px] bg-gray-200 rounded flex items-center justify-center">
            <i className="bi bi-calendar-check-fill text-lg text-teal-600"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default RatingExtra;
