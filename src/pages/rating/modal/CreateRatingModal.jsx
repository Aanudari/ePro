import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import AllEmployeeSelect from "../../main-exam/modal/AllEmployeeSelect";
import TemplateSelectModal from "./TemplateSelect";
import axios from "axios";
function CreateRatingModal({ setShowModal, trigger, setTrigger }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [showUsers, setShowUsers] = useState(false);
  const [allEmployee, setAllEmployee] = useState();
  const [showTemplates, setShowTemplates] = useState(false);
  const [collected, setCollected] = useState([]);
  const [ratingName, setRatingName] = useState("");
  // extra input
  const [jobId, setJobId] = useState("");
  const [year, setYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [month, setMonth] = useState("");
  const data = {
    ratingName: ratingName,
    templateId: collected[0],
    devices: allEmployee,
    jobId: jobId,
    year: year,
    quarter: quarter,
    month: month,
  };
  // console.log(data);

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
  const submitData = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingNew/addRating`,
      data: data,
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setShowModal(false);
        setTrigger(!trigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`fixed ${
        activeMenu
          ? " left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[56px] left-0"
      } 
        bg-black top-[56px] bg-opacity-50 flex justify-center items-center z-20
        `}
    >
      {showUsers && (
        <AllEmployeeSelect
          getEmployees={getEmployees}
          setShowSelect={setShowUsers}
        />
      )}
      {showTemplates && (
        <TemplateSelectModal
          setCollected={setCollected}
          collected={collected}
          setShowTemplates={setShowTemplates}
        />
      )}
      <div className="shrink w-[calc(70%)] h-[calc(50%)] bg-white flex flex-col items-center rounded">
        <div className="w-full min-h-[50px] bg-teal-600 flex justify-between items-center px-3  gap-2 relative rounded-t">
          {collected !== [] &&
          jobId !== "" &&
          month !== "" &&
          quarter !== "" &&
          year !== "" &&
          collected[0] !== undefined &&
          allEmployee !== undefined &&
          ratingName !== "" ? (
            <button
              onClick={submitData}
              className="custom-btn bg-teal-500 hover:bg-teal-400 text-[14px]"
            >
              Үнэлгээ үүсгэх
            </button>
          ) : (
            <span className="font-[500] text-[15px] text-white">
              Үнэлгээ үүсгэх цэс
            </span>
          )}
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        <div className="h-full w-full rounded-b">
          <div className=" px-4 pt-3 mt-3">
            <div className="group w-full">
              <input
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                value={ratingName}
                onChange={(e) => setRatingName(e.target.value)}
                className={
                  "custom-validation !w-full !border-b-[2px] !border-[#50a3a2] font-[400]"
                }
                type="text"
                required
              />

              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="">
                <i className="bi bi-vector-pen"></i> Үнэлгээний нэр
              </label>
            </div>
          </div>
          <div className=" w-full flex items-center px-3 gap-2 flex-wrap">
            <button
              onClick={() => {
                setShowUsers(!showUsers);
              }}
              className={`text-[14px] font-[500] text-white rounded w-[calc(49.4%)] h-10 text-[13px] ${
                allEmployee?.length > 0 ? "bg-teal-500" : "bg-[#5CA2A1]"
              } `}
            >
              {allEmployee?.length > 0 && (
                <i className="bi bi-check-circle text-white text-md mr-2"></i>
              )}
              Ажилтан сонгох
            </button>
            <button
              onClick={() => {
                setShowTemplates(!showTemplates);
              }}
              className={`text-[14px] font-[500] text-white rounded w-[calc(49.4%)] h-10 text-[13px] ${
                collected.length > 0 ? "bg-teal-500" : "bg-[#5CA2A1]"
              }  `}
            >
              {collected.length > 0 && (
                <i className="bi bi-check-circle text-white text-md mr-2"></i>
              )}
              Загвар сонгох
            </button>

            <select
              onChange={(e) => {
                setJobId(e.target.value);
              }}
              name=""
              id=""
              className="text-center w-full h-10 text-[14px] font-[500]"
            >
              <option value="0">Ажлын байр</option>
              <option value="1">Level 1 Operator</option>
              <option value="3">Level 2 Care</option>
              <option value="4">Level 2 Complain</option>
              <option value="5">Level 2 Online</option>
              <option value="7">Level 2 Bank</option>
              <option value="13">Branch staff</option>
              <option value="16">Order operator</option>
              <option value="20">Telesales operator</option>
            </select>
            <select
              onChange={(e) => {
                setYear(e.target.value);
              }}
              name=""
              id=""
              className="text-center w-full h-10 text-[14px] font-[500]"
            >
              <option value="0">Жил</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <select
              onChange={(e) => {
                setQuarter(e.target.value);
              }}
              name=""
              id=""
              className="text-center w-full h-10 text-[14px] font-[500]"
            >
              <option value="0">Улирал</option>
              <option value="1р улирал">1-р улирал</option>
              <option value="2р улирал">2-р улирал</option>
              <option value="3р улирал">3-р улирал</option>
              <option value="4р улирал">4-р улирал</option>
            </select>
            <select
              onChange={(e) => {
                setMonth(e.target.value);
              }}
              name=""
              id=""
              className="text-center w-full h-10 text-[14px] font-[500]"
            >
              <option value="0">Сар</option>
              <option value="1-р сар">1-р сар</option>
              <option value="2-р сар">2-р сар</option>
              <option value="3-р сар">3-р сар</option>
              <option value="4-р сар">4-р сар</option>
              <option value="5-р сар">5-р сар</option>
              <option value="6-р сар">6-р сар</option>
              <option value="7-р сар">7-р сар</option>
              <option value="8-р сар">8-р сар</option>
              <option value="9-р сар">9-р сар</option>
              <option value="10-р сар">10-р сар</option>
              <option value="11-р сар">11-р сар</option>
              <option value="12-р сар">12-р сар</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRatingModal;
