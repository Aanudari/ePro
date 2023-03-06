import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../service/examService";
import { useStateContext } from "../../contexts/ContextProvider";
import DatePicker from "react-datepicker";

function ExamEditHeader2({
  chosen,
  editHeader,
  setEditHeader,
  setExamModal,
  examTri,
  setExamTri,
  handleCorrect,
  userTrigger,
  setUserTrigger,
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
  const { TOKEN } = useStateContext();
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  let tempo = [];
  for (let index = 0; index < initial?.length; index++) {
    const element = initial[index];
    let temp = {
      department: element.department,
      unitId: element.unitId,
      deviceId: element.deviceId,
    };
    tempo.push(temp);
  }
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
  const [rechosen, setRechosen] = useState();
  const [name, setName] = useState(chosen[0].name);
  const [duration, setDuration] = useState(chosen[0].duration);
  let schema = {
    id: `${chosen[0].id}`,
    examName: `${name}`,
    startDate: `${datestring}`,
    expireDate: `${datestring2}`,
    duration: duration,
    devices: rechosen !== undefined ? rechosen : tempo,
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
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        // setExamModal(false);
        setExamTri(!examTri);
        setUserTrigger(!userTrigger);
      })
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(false);
  const getEmployees = (val) => {
    let tempo = [];
    for (let index = 0; index < val.length; index++) {
      let element = val[index];
      let data = {
        department: element.department,
        unitId: element.unitId,
        deviceId: `${element.deviceId}`,
      };
      tempo.push(data);
    }
    setRechosen(tempo);
  };
  return (
    <div
      className="h-40 overflow-hidden appear-smooth-height w-full px-2 uppercase bg-teal-700 text-white  flex items-center 
          shadow justify-between px-4"
    >
      <div className="font-[500] text-[14px] h-full flex items-center gap-3">
        <div className="h-full flex items-start flex-col justify-center border-r pr-3 border-gray-400">
          <span className="font-[400]">Эхлэх{chosen[0].startDate}</span>
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
        <div className="h-full flex items-center justify-center border-r pr-3 border-gray-400 w-[140px]">
          <span className="font-[400]">Нэр: {name}</span>
        </div>
        <div className="h-full flex items-center justify-center border-r pr-3 border-gray-400 w-[140px]">
          <span className="font-[400]">Хугацаа: {duration}мин</span>
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
    </div>
  );
}

export default ExamEditHeader2;
