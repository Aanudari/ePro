import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

function ExamHeader({ array1, chosen, editHeader, setEditHeader }) {
  const [data, setData] = useState();
  const { TOKEN } = useStateContext();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  //   console.log(chosen[0]);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ExamNew/GetDevicesByExamId?_examId=${chosen[0].id}`,
    })
      .then((res) => {
        setData(res.data.devices);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="h-20 w-full shadow bg-gray-600 text-white  flex items-center justify-between px-3">
      <div className="font-[500] text-[14px] h-full flex items-center gap-3">
        <div className="h-full flex items-start flex-col justify-center border-r pr-3 border-gray-400">
          <span className="text-white text-[13.5px] font-[400]">
            <i className="bi bi-circle-half mr-2"></i>
            {chosen[0].startDate}
          </span>
          <span className="text-white text-[13.5px] font-[400]">
            <i className="bi bi-circle-fill mr-2"></i>
            {chosen[0].expireDate}
          </span>
        </div>
        <div className="h-full flex items-start flex-col justify-center border-r pr-3 border-gray-400">
          <span className="text-white font-[400]">
            <i className="bi bi-card-checklist mr-2"></i>
            {chosen[0].name}
          </span>
          <span className="text-white font-[400]">
            <i className="bi bi-alarm-fill mr-2"></i>
            {chosen[0].duration}
            <span className="m-0 lowercase font-[400]"> мин</span>
          </span>
        </div>
        <div className="h-full font-[500] flex items-center">
          <select className="w-[330px] h-[37px]" name="" id="">
            {data?.map((item, index) => (
              <option
                className="!py-1"
                isdisabled="true"
                key={index}
                value={`${item.deviceId}`}
              >
                {item.deviceName} / {item.unitName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        onClick={() => {
          setEditHeader(!editHeader);
        }}
        className="h-9 bg-teal-600 rounded-sm px-3 flex items-center font-[400] text-white cursor-pointer active:bg-teal-400 hover:bg-teal-600"
      >
        <span className="mr-2 mb-1 font-[400] text-white">Засах</span>
        <div className="pl-2 h-full flex items-center border-l border-gray-300">
          <i className="bi bi-ui-checks"></i>
        </div>
      </div>
    </div>
  );
}

export default ExamHeader;
