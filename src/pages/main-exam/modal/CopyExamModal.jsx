import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
function CopyModal({
  setCopyModal,
  setSmallMenuid,
  id,
  examNames,
  examTri,
  setExamTri,
}) {
  const { activeMenu, TOKEN } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [noti_examName, setNoti_examName] = useState(false);
  const [exam_name, setExam_name] = useState("");
  const [nameError, setNameError] = useState(false);
  const handleNameCheck = (e) => {
    if (examNames.includes(e.target.value.toLowerCase())) {
      setNameError(true);
    }
  };
  const [selectV, setSelectV] = useState(new Date());
  const [value, setValue] = useState(new Date());
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

  let schema = {
    examId: id,
    examName: exam_name,
    startDate: datestring,
    expireDate: datestring2,
  };
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const handleSubmit = () => {
    setLoading(true);
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/copyExam/`,
      data: schema,
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.isSuccess === false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
          });
        } else {
          setLoading(false);
          setExamTri(!examTri);
          setCopyModal(false);
          setSmallMenuid(0);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className={`fixed ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[25px] left-0"
      } 
      bg-black bg-opacity-50 flex justify-center items-center z-top z-20
      `}
    >
      <div className="shrink w-[calc(70%)] h-[calc(35%)] bg-white flex flex-col rounded-lg">
        <ToastContainer />
        <div className="w-full min-h-[50px] bg-teal-700 flex justify-end items-center px-3 rounded-t-md">
          {/* <i className="bi bi-search text-2xl text-white"></i> */}
          <button
            onClick={() => {
              setCopyModal(false);
              setSmallMenuid(0);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>

        <div className="h-[calc(100%-60px)] w-full rounded-b-lg p-3 flex items-center">
          <div className="h-[100px] w-full flex items-end justify-around">
            <div className="group relative">
              <input
                className={
                  noti_examName
                    ? "custom-validation font-[400] "
                    : "font-[400] "
                }
                onChange={(e) => {
                  setExam_name(e.target.value);
                  setNoti_examName(false);
                  setNameError(false);
                }}
                onBlur={(e) => {
                  handleNameCheck(e);
                }}
                type="text"
              />
              {nameError && (
                <div className="flex flex-col justify-center items-center absolute">
                  <div className="arrow-up "></div>
                  <div className=" bg-[#fd1f1f] rounded h-12 z-20 flex items-center font-[400] text-white px-2 text-[14px]">
                    Шалгалтын нэр давхардаж байна !
                  </div>
                </div>
              )}
              {noti_examName && (
                <i
                  className="bi bi-exclamation-lg text-2xl text-red-500
                                    animate-bounce absolute top-[10px] left-[-15px]"
                ></i>
              )}
              <span className="highlight"></span>
              <span className="bar "></span>
              <label className="!font-[500]">Шалгалтын нэр</label>
            </div>
            <div className="relative z-10 flex h-full gap-2 ml-2">
              <div className="flex flex-col ">
                <span className="font-[500] text-gray-500/80  text-[17.5px]">
                  Нээх цаг :
                </span>
                <DatePicker
                  selected={value}
                  value={value}
                  onChange={(date) => setValue(date)}
                  className="form-control form-control-sm
                                            py-2 mt-2 ml-0 border border-dark"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy-MM-dd h:mm aa"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-[500] text-gray-500/80 text-[17.5px]">
                  Хаах цаг :
                </span>
                <DatePicker
                  selected={selectV}
                  value={selectV}
                  onChange={(date) => setSelectV(date)}
                  className="form-control form-control-sm
                                            py-2 mt-2 ml-0 border border-dark"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy-MM-dd h:mm aa"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            handleSubmit();
          }}
          className=" w-full min-h-[50px] px-2 py-2 cursor-pointer active:bg-opacity-100 bg-teal-700 bg-opacity-90 rounded-b flex items-center justify-center text-white font-[500]"
        >
          Шалгалт үүсгэх
        </div>
      </div>
    </div>
  );
}

export default CopyModal;
