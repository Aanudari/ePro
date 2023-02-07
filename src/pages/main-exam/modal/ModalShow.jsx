import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";

function ModalShow({ cat, close, trigger, setTrigger }) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const [selectV, setSelectV] = useState(new Date(cat.endDate));
  const [value, setValue] = useState(new Date(cat.startDate));
  var datestring =
    value.getFullYear() +
    "" +
    addZero(value.getMonth() + 1) +
    addZero(value.getDate()) +
    addZero(value.getHours()) +
    addZero(value.getMinutes()) +
    addZero(value.getSeconds());
  var datestring2 =
    selectV.getFullYear() +
    "" +
    addZero(selectV.getMonth() + 1) +
    addZero(selectV.getDate()) +
    addZero(selectV.getHours()) +
    addZero(selectV.getMinutes()) +
    addZero(selectV.getSeconds());
  const { TOKEN } = useStateContext();
  const [name, setName] = useState(cat.name);
  let arr = {
    id: `${cat.id}`,
    name: `${name}`,
    startDate: `${datestring}`,
    endDate: `${datestring2}`,
    department: null,
  };
  const submitCategory = () => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool`,
      data: arr,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setTrigger(!trigger);
          close(false);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="w-full h-full bg-white flex flex-col pt-2">
      <ToastContainer />
      <div className="h-full w-full px-3 overflow-scroll flex flex-col justify-end items-end ">
        <div className="">
          <div className="group w-full">
            <input
              defaultValue={cat.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className={
                "custom-validation !w-full !border-b-[2px] !border-[#50a3a2] font-[400]"
              }
              type="text"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            {/* <label className="">Категори нэр</label> */}
          </div>
          <div className="w-full flex gap-2 mb-3">
            <div className="flex w-full flex-col">
              <p className="font-[400] mb-0">Эхлэх:</p>
              <DatePicker
                selected={value}
                value={value}
                onChange={(date) => setValue(date)}
                className="form-control form-control-sm
                                              py-2 ml-0 border border-dark"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy-MM-dd h:mm aa"
              />
            </div>
            <div className="flex w-full flex-col">
              <p className="font-[400] mb-0">Дуусах:</p>
              <DatePicker
                selected={selectV}
                value={selectV}
                onChange={(date) => setSelectV(date)}
                className="form-control form-control-sm
                                              py-2 ml-0 border border-dark"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="yyyy-MM-dd h:mm aa"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end h-full items-end">
          <button
            onClick={() => {
              submitCategory();
            }}
            className="px-3 py-2 border rounded mt-2 mb-1 font-[500] text-[14px] text-gray-600 hover:bg-teal-500
            hover:text-white hover:!border-teal-500 transition-all"
          >
            Хадгалах
          </button>

          <button
            onClick={() => {
              close(false);
            }}
            id={"intro-bg"}
            className="px-3 py-2 border hover:bg-teal-500 transition-all
          hover:text-white hover:!border-teal-500 rounded ml-2 mt-2 mb-1 text-[14px] border-box min-w-[50px]"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalShow;
