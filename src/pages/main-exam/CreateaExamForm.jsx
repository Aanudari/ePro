import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import AllEmployeeSelect from "./modal/AllEmployeeSelect";
import axios from "axios";
import GetQuestionIdsFromCategory from "./GetQuestionIdsFromCategory";
import { ToastContainer, toast } from "react-toastify";
import { notification } from "../../service/toast.js";
import "react-toastify/dist/ReactToastify.css";
function CreateExamForm({ closeForm, examTri, setExamTri }) {
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
          toast.success("Шалгалт ажилттай үүслээ !", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          const timer = setTimeout(() => {
            closeForm(false);
            setExamTri(!examTri);
          }, 2000);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`fixed ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[25px] left-0"
      } 
        bg-black bg-opacity-50 flex justify-center items-center
        `}
    >
      <ToastContainer />
      {show && <GetQuestionIdsFromCategory setShow={setShow} getIds={getIds} />}
      <div className="shrink w-[calc(85%)] h-[600px] bg-white flex flex-col ">
        <div className="w-full min-h-[50px] bg-gray-700 flex justify-end px-3 flex items-center ">
          <i
            onClick={() => {
              closeForm(false);
            }}
            className="bi bi-x text-white text-3xl cursor-pointer"
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
                  <div className="group">
                    <input
                      className={noti_examName ? "custom-validation" : ""}
                      onChange={(e) => {
                        setExam_name(e.target.value);
                        setNoti_examName(false);
                      }}
                      type="text"
                    />
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
                  <div>
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
                    <div className="flex flex-col mt-3">
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
                      className="px-3 hover:bg-green-700 py-2 bg-green-600 font-[500] 
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
                      flex justify-center cursor-pointer items-center text-white rounded hover:bg-teal-700 mt-4 w-[200px]"
                    >
                      Ажилтан сонгох
                    </div>
                  )}
                  {AllQuestions?.length > 0 ? (
                    <div
                      onClick={(e) => {
                        handleCreateQuestions(e);
                      }}
                      className="px-3 hover:bg-green-700 py-2 bg-green-600 font-[500] 
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
                      flex justify-center cursor-pointer items-center text-white rounded hover:bg-teal-700 mt-4 w-[200px]"
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
          {AllQuestions?.length > 0 && allEmployee?.length > 0 && (
            <div
              onClick={() => {
                handleCreateExam();
              }}
              className="h-12 flex items-center justify-center bg-green-600 text-white font-[500] rounded
          cursor-pointer hover:bg-green-700 active:bg-green-600"
            >
              Шалгалт үүсгэх
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateExamForm;
