import { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import AllEmployeeSelect from "./modal/AllEmployeeSelect";

function CreateExamMain({
  checked,
  depId,
  setCategoryModal,
  setShowCategoryMenu,
  setTriggerCat,
  triggerCat,
}) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const [showSelect, setShowSelect] = useState(false);
  const [optionss, setOptionss] = useState();
  const [unit, setUnit] = useState();
  const [unitData, setUnitData] = useState();
  const [deviceId, setdeviceId] = useState();
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
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/org/${depId}`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setOptionss(res.data.organizations);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/role/${unit}`,
    })
      .then((res) => {
        if (res.data.errorCode == 401) {
          logout();
        } else {
          setUnitData(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, [unit]);
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const { TOKEN } = useStateContext();
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
  const [showQuestionMenu, setshowQuestionMenu] = useState(false);
  const [key, setKey] = useState(1);
  let qIds = [];
  for (let index = 0; index < checked.length; index++) {
    const element = checked[index];
    let ids = {
      id: `${element}`,
    };
    qIds.push(ids);
  }
  // console.log(allEmployee[0]);
  const main = {
    examName: `${exam_name}`,
    startDate: `${datestring}`,
    expireDate: `${datestring2}`,
    duration: duration,
    devices: allEmployee,
    variants: [
      {
        name: `${varSelect}`,
        questionIdList: qIds,
      },
    ],
  };
  const [question, setQuestion] = useState({
    question: ``,
    imgUrl: "string",
    answerList: [],
  });
  const [variants, setVariants] = useState({
    name: `${varSelect}`,
    questionList: [],
  });
  const [exam, setExam] = useState({
    examName: `${exam_name}`,
    startDate: `${datestring}`,
    expireDate: `${datestring2}`,
    duration: duration,
    roleId: `${role_id}`,
    variants: [],
  });
  const [doneList, setDoneList] = useState([]);
  let uniqueList = [...new Set(doneList)];
  const handleChange = (value, indexX, answerList) => {
    let arr = variants;
    let newQuestions = arr.questionList?.map((item, index) =>
      index === indexX ? { ...item, question: value, answerList } : item
    );
    setKey(key + 1);
    setDoneList((prev) => [...prev, indexX]);
    setVariants({
      name: `${varSelect}`,
      questionList: [...newQuestions],
    });
  };
  const handleCreateExam = () => {
    let arr = [];
    for (let index = 0; index < count; index++) {
      arr.push(question);
    }
    setVariants((prev) => ({ ...prev, questionList: arr }));
  };
  useEffect(() => {
    setExam((prev) => ({ ...prev, variants: variants }));
  }, [variants]);
  let final = {
    examName: `${exam_name}`,
    startDate: `${datestring}`,
    expireDate: `${datestring2}`,
    duration: duration,
    roleId: role_id,
    variants: [variants],
  };
  const [showSuccess, setShowSuccess] = useState(false);
  const [noti_examName, setNoti_examName] = useState(false);
  const [noti_diration, setNoti_diration] = useState(false);
  const [noti_count, setNoti_count] = useState(false);
  const [noti_variant, setNoti_variant] = useState(false);
  const [checkTime, setCheckTime] = useState(false);
  const [noti_role, setNoti_role] = useState(false);
  const handleCreateQuestions = (event) => {
    event.preventDefault();
    if (exam_name === "") {
      setNoti_examName(true);
    }
    if (duration === 0) {
      setNoti_diration(true);
    }
    if (count === undefined) {
      setNoti_count(true);
    }
    if (varSelect === "") {
      setNoti_variant(true);
    }
    if (exam_name !== "" && duration !== 0 && count !== 0 && varSelect !== "") {
      handleSubmitMain();
    }
  };
  const handleSubmitMain = () => {
    console.log(JSON.stringify(main));
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
        setCategoryModal(false);
        setShowCategoryMenu(false);
        setTriggerCat(triggerCat);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSelect = (value) => {
    setUnit(value);
  };
  const handleDeviceId = (id) => {
    setdeviceId(id?.value);
  };
  const [pointStatus, setPointStatus] = useState({
    value: "",
    label: "Ажилтан сонгох",
  });
  return (
    <div className="w-full min-h-[calc(100vh-112px)] relative p-2">
      {showSelect && (
        <AllEmployeeSelect
          getEmployees={getEmployees}
          setShowSelect={setShowSelect}
        />
      )}
      <div className="container-po px-0 md:px-4 pt-2 ">
        <form className="form-form p-2 flex flex-col md:flex-row gap-5 w-full justify-around">
          {showQuestionMenu ? (
            <div className="w-full">
              <div className="flex flex-wrap px-4 pt-3">
                {variants &&
                  variants.questionList &&
                  variants?.questionList?.map((element, index) => (
                    <div key={index} className="cus-buttons ">
                      <div className="">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setKey(index + 1);
                          }}
                          key={index}
                          id={doneList.includes(index) ? "done" : ""}
                          className="transition raise flex px-2"
                        >
                          {doneList.includes(index) && (
                            <div>
                              <i className="bi bi-check-lg mt-2 block md:hidden"></i>
                              <i className="bi bi-check-lg md:block hidden"></i>
                            </div>
                          )}
                          <span className="mt-0 hidden md:flex mr-1">
                            Асуулт
                            <span className="mb-0 ml-1">{index + 1}</span>
                          </span>
                          <span className="p-2 m-0 block md:hidden">
                            {index + 1}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              {variants &&
                variants.questionList &&
                variants?.questionList?.map((item, index) => (
                  <div>here was create Question Componenet !</div>
                ))}
            </div>
          ) : (
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
                    required
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
                    required
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
                      noti_role ? "custom-validation select select2 " : "select"
                    }
                  >
                    <select
                      onChange={(e) => {
                        setRole_id(parseInt(e.target.value));
                        setNoti_role(false);
                      }}
                      name="format"
                      id="format"
                      required
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
                    className="w-full mt-10"
                  >
                    {/* <button
                      onClick={() => {
                        setShowSelect(true);
                      }}
                      className="cus-btn hover:shadow h-[48px]"
                    > */}
                    Ажилтан сонгох {allEmployee?.length}
                    {/* </button> */}
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setShowSelect(true);
                    }}
                    className="w-full mt-10"
                  >
                    {/* <button
                      
                      className="cus-btn hover:shadow h-[48px]"
                    > */}
                    Ажилтан сонгох
                    {/* </button> */}
                  </div>
                )}

                <div className="w-full mt-10">
                  <button
                    onClick={(e) => {
                      handleCreateQuestions(e);
                    }}
                    className="cus-btn hover:shadow h-[48px]"
                  >
                    Шалгалт үүсгэх
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          )}
        </form>
        {count === uniqueList.length && (
          <div className="w-full flex justify-center">
            <div className="cus-buttons">
              <div className="buttons">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="raise"
                >
                  Шалгалт үүсгэх
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateExamMain;
