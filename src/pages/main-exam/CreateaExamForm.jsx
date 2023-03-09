import { useState, useRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import AllEmployeeSelect from "./modal/AllEmployeeSelect";
import axios from "axios";
import GetQuestionIdsFromCategory from "./GetQuestionIdsFromCategory";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function CreateExamForm({ closeForm, examTri, setExamTri, examNames }) {
  const [showSelect, setShowSelect] = useState(false);
  const [allEmployee, setAllEmployee] = useState();
  const getEmployees = (employees) => {
    let arr = [];
    for (let index = 0; index < employees.length; index++) {
      const element = employees[index];
      let data = {
        department: element.department,
        unitId: element.unitId,
        deviceId: JSON.stringify(element.deviceId),
      };
      arr.push(data);
    }
    setAllEmployee(arr);
  };

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const { TOKEN, activeMenu } = useStateContext();
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
  var showstring =
    value.getFullYear() +
    "-" +
    addZero(value.getMonth() + 1) +
    "-" +
    addZero(value.getDate()) +
    " " +
    addZero(value.getHours()) +
    ":" +
    addZero(value.getMinutes()) +
    ":" +
    addZero(value.getSeconds());
  var showstring2 =
    selectV.getFullYear() +
    "-" +
    addZero(selectV.getMonth() + 1) +
    "-" +
    addZero(selectV.getDate()) +
    " " +
    addZero(selectV.getHours()) +
    ":" +
    addZero(selectV.getMinutes()) +
    ":" +
    addZero(selectV.getSeconds());
  const [duration, setDuration] = useState(0);
  const [role_id, setRole_id] = useState(1);
  const [exam_name, setExam_name] = useState("");
  const [varSelect, setVarSelect] = useState("A");
  const [count, setCount] = useState();
  const [AllQuestions, setAllQuestions] = useState([]);

  const main = {
    examName: `${exam_name}`,
    startDate: `${datestring}`,
    expireDate: `${datestring2}`,
    duration: duration,
    devices: allEmployee,
    variants: [
      {
        name: `${varSelect}`,
        questionIdList: AllQuestions,
      },
    ],
  };

  const [noti_examName, setNoti_examName] = useState(false);
  const [noti_diration, setNoti_diration] = useState(false);
  const [noti_role, setNoti_role] = useState(false);
  const handleCreateQuestions = (event) => {
    event.preventDefault();
    if (exam_name === "") {
      setNoti_examName(true);
    }
    if (duration === 0) {
      setNoti_diration(true);
    }
    if (exam_name !== "" && duration !== 0 && count !== 0 && varSelect !== "") {
      handleSubmitMain();
    }
  };
  const [show, setShow] = useState(false);
  const handleSubmitMain = () => {
    setShow(true);
  };
  const getIds = (value) => {
    let temp = [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      let tempo = {
        id: element,
      };
      temp.push(tempo);
    }
    setAllQuestions(temp);
  };
  const handleCreateExam = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/add`,
      data: main,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          closeForm(false);
          setExamTri(!examTri);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [nameError, setNameError] = useState(false);
  const handleNameCheck = (e) => {
    if (examNames.includes(e.target.value.toLowerCase())) {
      setNameError(true);
    }
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
      <ToastContainer />
      {show && <GetQuestionIdsFromCategory setShow={setShow} getIds={getIds} />}
      <div className="shrink w-[calc(85%)] h-[calc(80%)] bg-white flex flex-col rounded">
        <div className="w-full min-h-[50px] bg-teal-700 flex justify-between px-3 flex items-center rounded-t">
          {AllQuestions?.length > 0 && allEmployee?.length > 0 && !nameError ? (
            <div
              onClick={() => {
                handleCreateExam();
              }}
              className="h-9 flex items-center justify-center bg-teal-600 text-white font-[500]
          cursor-pointer  active:bg-teal-600 rounded hover:bg-teal-500 uppercase text-[13px] w-[250px]"
            >
              <i className="bi bi-vector-pen text-lg text-md mr-2 "></i>
              Шалгалт үүсгэх
            </div>
          ) : (
            <div></div>
          )}
          <i
            onClick={() => {
              closeForm(false);
            }}
            className="bi bi-x text-white text-3xl cursor-pointer hover:scale-110 hover:mt-[-3px]"
          ></i>
        </div>
        <div className="w-full h-full relative p-2 flex flex-col justify-between">
          {showSelect && (
            <AllEmployeeSelect
              getEmployees={getEmployees}
              setShowSelect={setShowSelect}
              getIds={getIds}
            />
          )}
          <div className="container-po px-0 md:px-4 pt-2 ">
            <form className="form-form p-2 flex flex-col md:flex-row gap-5 w-full justify-around">
              <div
                className="form-form flex gap-5 mt-4 w-full
                            justify-center items-center
                            "
              >
                <div className="pl-10 w-1/2">
                  <div className="group relative">
                    <input
                      className={noti_examName ? "custom-validation" : ""}
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
                    <label className="">Шалгалтын нэр</label>
                  </div>

                  <div className="group">
                    <input
                      className={noti_diration ? "custom-validation " : ""}
                      onChange={(e) => {
                        setDuration(parseInt(e.target.value));
                        setNoti_diration(false);
                      }}
                      type="number"
                    />
                    {noti_diration && (
                      <i
                        className="bi bi-exclamation-lg text-2xl text-red-500
                                    animate-bounce absolute top-[10px] left-[-15px]"
                      ></i>
                    )}
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Үргэлжлэх хугацаа (мин)</label>
                  </div>
                  <div className="p-0 md:p-3"></div>
                  <div className="select-con relative hidden">
                    {noti_role && (
                      <i
                        className="bi bi-exclamation-lg text-2xl text-red-500
                                    animate-bounce absolute left-[-20px] top-[10px]"
                      ></i>
                    )}
                    <h6 className="text-gray-500/80 text-[17.5px]">
                      Ажлын байр сонгох:
                    </h6>
                    <div
                      className={
                        noti_role
                          ? "custom-validation select select2 "
                          : "select"
                      }
                    >
                      <select
                        onChange={(e) => {
                          setRole_id(parseInt(e.target.value));
                          setNoti_role(false);
                        }}
                        name="format"
                        id="format"
                      >
                        <option>Ажлын байр</option>
                        <option value="188">Branch</option>
                        <option value="208">Installer</option>
                        <option value="1">Level1</option>
                        <option value="3">Care</option>
                        <option value="7">Bank</option>
                        <option value="168">Telesales</option>
                        <option value="4">Complain</option>
                        <option value="5">Online</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="h-full w-full md:w-1/2 pr-0 flex flex-col justify-between">
                  <div className="relative z-10">
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
                    <div className="flex flex-col mt-3 ">
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
                  {allEmployee?.length > 0 ? (
                    <div
                      onClick={() => {
                        setShowSelect(true);
                      }}
                      className="px-3 hover:bg-teal-700 py-2 bg-teal-600 font-[500] 
                      flex justify-center items-center text-white rounded mt-4 w-[200px]"
                    >
                      Нийт: {allEmployee?.length} ажилтан
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setShowSelect(true);
                      }}
                      className="px-3 hover:bg-teal-600 py-2 bg-teal-600 font-[500] 
                      flex justify-center cursor-pointer items-center text-white rounded hover:bg-teal-700 mt-4 w-[200px] custom-btn btn-13 rounded-none"
                    >
                      Ажилтан сонгох
                    </div>
                  )}
                  {AllQuestions?.length > 0 ? (
                    <div
                      onClick={(e) => {
                        handleCreateQuestions(e);
                      }}
                      className="px-3 hover:bg-teal-700 py-2 bg-teal-600 font-[500] 
                    flex justify-center items-center text-white rounded mt-4 w-[200px]"
                    >
                      Нийт: {AllQuestions?.length} Асуулт
                    </div>
                  ) : (
                    <div
                      onClick={(e) => {
                        handleCreateQuestions(e);
                      }}
                      className="px-3 hover:bg-teal-600 py-2 bg-teal-600 font-[500] 
                      flex justify-center cursor-pointer items-center text-white rounded hover:bg-teal-700 mt-4 w-[200px] custom-btn btn-13 rounded-none"
                    >
                      Асуулт сонгох
                    </div>
                  )}
                </div>
                <div></div>
              </div>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateExamForm;
