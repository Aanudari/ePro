import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import AllEmployeeSelectEdit from "./modal/AllEmployeeSelectEdit";
import { logout } from "../../service/examService";
function ExamEditHeader({
  chosen,
  editHeader,
  setEditHeader,
  setExamModal,
  examTri,
  setExamTri,
}) {
  const [initial, setInitial] = useState();

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/GetDevicesByExamId?_examId=${chosen[0].id}`,
    })
      .then((res) => {
        setInitial(res.data.devices);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  const { TOKEN } = useStateContext();
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const [department, setDepartment] = useState();
  const [departmentId, setdepartmentId] = useState();
  const [division, setDivision] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/department`,
    })
      .then((res) => {
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        } else {
          setDepartment(res.data.departments);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/division?depId=${departmentId}`,
    })
      .then((res) => {
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        } else {
          // setDepartment(res.data.departments)
          setDivision(res.data.divisions);
        }
      })
      .catch((err) => console.log(err));
  }, [departmentId]);
  const [divisionId, setdivisionId] = useState(0);
  const [unitId, setUnitId] = useState();
  // console.log(department)
  const [value, setValue] = useState(new Date(chosen[0].startDate));
  const [selectV, setSelectV] = useState(new Date(chosen[0].expireDate));
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
  const handleDepartment = (value) => {
    setdepartmentId(value);
  };
  const handleDivision = (value) => {
    setdivisionId(value);
  };
  const handleUnit = (value) => {
    setUnitId(value);
  };
  const [rechosen, setRechosen] = useState();
  const [name, setName] = useState(chosen[0].name);
  const [duration, setDuration] = useState(chosen[0].duration);
  let schema = {
    id: `${chosen[0].id}`,
    examName: `${name}`,
    startDate: `${datestring}`,
    expireDate: `${datestring2}`,
    duration: duration,
    devices: rechosen !== undefined ? rechosen : null,
  };
  const handleSubmit = () => {
    axios({
      method: "put",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/edit`,
      data: JSON.stringify(schema),
    })
      .then((res) => {
        setExamTri(!examTri);
      })
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(false);
  const getEmployees = (val) => {
    setRechosen(val);
  };

  return (
    <div
      className="h-40 overflow-hidden appear-smooth-height w-full px-2 uppercase bg-gray-600 text-white  flex items-center 
        shadow justify-between px-4"
    >
      <div className="font-[500] text-[14px] h-full flex items-center gap-3">
        <div className="h-full flex items-start flex-col justify-center border-r pr-3 border-gray-400">
          <DatePicker
            selected={value}
            value={value}
            onChange={(date) => setValue(date)}
            className="form-control form-control-sm py-2 mt-2 ml-0 border border-dark"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="yyyy-MM-dd h:mm aa"
          />
          <DatePicker
            selected={selectV}
            value={selectV}
            onChange={(date) => setSelectV(date)}
            className="form-control form-control-sm py-2 mt-2 ml-0 border border-dark"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="yyyy-MM-dd h:mm aa"
          />
        </div>
        <div className="h-full flex items-start flex-col justify-center border-r pr-3 border-gray-400">
          <input
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className={`outline-none text-black mt-2
                    rounded-md ml-2 h-[38px] focus:border-b-[2px] border-teal-500 px-2 text-[14px] font-[400]`}
            autoCorrect="false"
            spellCheck={false}
          />
          <input
            defaultValue={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            type="text"
            className={`outline-none text-black mt-2
                    rounded-md ml-2 h-[38px] focus:border-b-[2px] border-teal-500 px-2 text-[14px] font-[400]`}
            autoCorrect="false"
            spellCheck={false}
          />
        </div>
      </div>
      {/* <div className=""

      >
        Сонгох
      </div> */}
      <div
        onClick={() => {
          setShow(true);
        }}
        className="h-9 bg-teal-600 rounded-sm px-3 flex items-center font-[400] text-white cursor-pointer active:bg-teal-400 
                hover:!bg-teal-500"
      >
        <span className="mr-2 mb-1 font-[400] text-white">Ажилтан сонгох</span>
        <div className="pl-2 h-full flex items-center border-l border-gray-300">
          <i className="bi bi-gear-fill"></i>
        </div>
      </div>
      <div
        onClick={() => {
          setEditHeader(!editHeader);
          handleSubmit();
        }}
        className="h-9 bg-teal-600 rounded-sm px-3 flex items-center font-[400] text-white cursor-pointer active:bg-teal-400 
                hover:!bg-teal-500"
      >
        <span className="mr-2 mb-1 font-[400] text-white">хадгалах</span>
        <div className="pl-2 h-full flex items-center border-l border-gray-300">
          <i className="bi bi-ui-checks"></i>
        </div>
      </div>
      {show && (
        <AllEmployeeSelectEdit
          getEmployees={getEmployees}
          setShow={setShow}
          getUsers={initial}
        />
      )}
    </div>
  );
}

export default ExamEditHeader;
