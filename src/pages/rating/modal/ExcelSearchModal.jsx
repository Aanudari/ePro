import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import TemplateSelectModal from "./TemplateSelect";
import axios from "axios";
import excel from "../../../assets/excel.svg";
import CertainEmployeeSelect from "../../main-exam/modal/CertainEmployeeSelect";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
function ExcelSearchModal({ setShowSearch, trigger, setTrigger }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [showUsers, setShowUsers] = useState(false);
  const [allEmployee, setAllEmployee] = useState([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [collected, setCollected] = useState([]);
  const [ratingName, setRatingName] = useState("");
  // extra input
  const [jobId, setJobId] = useState("0");
  const [year, setYear] = useState("0");
  const [quarter, setQuarter] = useState("0");
  const [month, setMonth] = useState("0");
  const [templateSelectedId, setTemplateSelectedId] = useState("");
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
  const [employeeName, setEmployeeName] = useState("");

  const getEmployees = (employees, name) => {
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
    setEmployeeName(name);
    getTemplateSelection(arr[0].deviceId);
    setExcelUrl("");
    // handleTemplateSelect();
  };

  const [selectType, setSelectType] = useState("0");
  const [templateList, setTemplateList] = useState([]);
  const getTemplateSelection = (id) => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ReportDownload/reportGet/1/${id}`,
    })
      .then((res) => {
        if (res.data.resultMessage == "Not Found") {
          toast.info(
            "Тухайн ажилтантай холбоотой үнэлгээний түүх байхгүй байна.",
            {
              position: "bottom-right",
            }
          );
        } else {
          setTemplateList(res.data.templateList);
        }
      })
      .catch((err) => console.log(err));
  };
  const getTemplateSelectionByJobId = (id) => {
    console.log(id);
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/ReportDownload/reportGet/2/${id}`,
    })
      .then((res) => {
        if (res.data.resultMessage == "Not Found") {
          toast.info("Үнэлгээний түүх хоосон байна.", {
            position: "bottom-right",
          });
        } else {
          setTemplateList(res.data.templateList);
        }
      })
      .catch((err) => console.log(err));
  };

  let ratingDtl = {
    year: year,
    quarter: quarter,
    month: month,
    jobId: jobId,
    templateId: templateSelectedId,
    deviceId:
      allEmployee[0]?.deviceId == undefined ? "0" : allEmployee[0]?.deviceId,
  };
  const [excelUrl, setExcelUrl] = useState("");
  let final = {
    reportType: "2",
    examDtl: {
      deviceId: "",
    },
    ratingDtl: ratingDtl,
    trainingDtl: {
      r1: "",
    },
  };
  const handleExcelIfExist = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/ReportDownload/reportFilterDownloader`,
      data: final,
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.isSuccess == false) {
          toast.info(res.data.resultMessage, {
            position: "bottom-right",
          });
        } else {
          setExcelUrl(res.data.excelFile);
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
          ? " left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[56px] left-0"
      } 
        bg-black top-[56px] bg-opacity-50 flex justify-center items-center z-20
        `}
    >
      <ToastContainer />
      {showUsers && (
        <CertainEmployeeSelect
          employeeName={employeeName}
          setEmployeeName={setEmployeeName}
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
        <div className="w-full py-2 bg-teal-600 flex justify-between  px-3  gap-2 relative rounded-t">
          {templateSelectedId?.length > 0 || jobId != 0 ? (
            <div className="flex justify-start gap-2 items-center">
              <img
                className="bg-white p-2 rounded-full"
                src={`${excel}`}
                alt=""
              />
              {excelUrl !== "" && (
                <a
                  href={`${excelUrl}`}
                  className="custom-btn shrink bg-emerald-500 h-10 hover:text-gray-200 hover:bg-emerald-400 text-[14px]"
                >
                  <i className="bi bi-file-earmark-arrow-down-fill mr-2"></i>
                  Татах: {excelUrl.slice(45)}
                </a>
              )}
              {excelUrl == "" && allEmployee.length > 0 && (
                <button
                  disabled={false}
                  onClick={handleExcelIfExist}
                  className="custom-btn bg-sky-500 h-10 hover:bg-sky-400 text-[14px]"
                >
                  <i className="bi bi-search mr-2"></i>
                  Хайх
                </button>
              )}
              {excelUrl == "" && jobId !== "0" && (
                <button
                  disabled={false}
                  onClick={handleExcelIfExist}
                  className="custom-btn bg-sky-500 h-10 hover:bg-sky-400 text-[14px]"
                >
                  <i className="bi bi-search mr-2"></i>
                  Хайх
                </button>
              )}
            </div>
          ) : (
            <>
              <img
                className="bg-white p-2 rounded-full"
                src={`${excel}`}
                alt=""
              />
            </>
          )}
          <button
            onClick={() => {
              setShowSearch(false);
            }}
            className="w-[20px] h-full flex items-start"
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        <div className="h-full w-full rounded-b">
          <div className=" px-3 pt-3 mb-3 relative">
            <select
              defaultValue={selectType}
              onChange={(e) => {
                setExcelUrl("");
                setAllEmployee([]);
                setEmployeeName([]);
                setTemplateList([]);
                setJobId("0");
                setSelectType(e.target.value);
              }}
              className="!w-full text-[15px] font-[500] "
              name=""
              id=""
            >
              <option value="0">Сонгох</option>
              <option value="1">Ажилтнаар</option>
              <option value="2">Загвараар</option>
            </select>
            {selectType == "0" ? (
              <div className="absolute right-8 top-[18px]">
                <i className="bi bi-arrow-bar-down text-lg text-white"></i>
              </div>
            ) : (
              <div className="absolute right-8 top-[18px]">
                <i className="bi bi-check text-lg text-white"></i>
              </div>
            )}
          </div>
          <div className=" w-full flex items-center px-3 gap-2 flex-wrap relative">
            {selectType == "1" && (
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
                {employeeName == "" ? "Ажилтан сонгох" : employeeName}
              </button>
            )}
            {selectType !== "0" && selectType != "1" && (
              <button
                className={`text-[14px] font-[500] text-white rounded w-[calc(49%)] h-10 text-[13px]`}
              >
                <select
                  onChange={(e) => {
                    setJobId(e.target.value);
                    setExcelUrl("");
                    getTemplateSelectionByJobId(e.target.value);
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
              </button>
            )}
            {templateList.length > 0 && (
              <button
                className={`text-[14px] font-[500] text-white rounded w-[calc(49.4%)] h-10 text-[13px] relative`}
              >
                <select
                  onChange={(e) => {
                    setTemplateSelectedId(e.target.value);
                    setExcelUrl("");
                  }}
                  className="text-center w-full h-10 text-[14px] font-[500]"
                  name=""
                  id=""
                >
                  <option value="0">Ур чадварын үнэлгээ хийгдсэн загвар</option>
                  {templateList.map((temp, indexOfTemps) => {
                    return (
                      <option key={indexOfTemps} value={`${temp.templateId}`}>
                        {temp.templateName}
                      </option>
                    );
                  })}
                </select>
                {templateSelectedId == "" ? (
                  <div className="absolute right-3 top-[5px]">
                    <i className="bi bi-arrow-bar-down text-lg text-white"></i>
                  </div>
                ) : (
                  <div className="absolute right-3 top-[5px]">
                    <i className="bi bi-check text-lg text-white"></i>
                  </div>
                )}
              </button>
            )}

            {selectType !== "0" && (
              <select
                onChange={(e) => {
                  setYear(e.target.value);
                  setExcelUrl("");
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
            )}
            {selectType !== "0" && (
              <select
                onChange={(e) => {
                  setQuarter(e.target.value);
                  setExcelUrl("");
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
            )}
            {selectType !== "0" && (
              <select
                onChange={(e) => {
                  setMonth(e.target.value);
                  setExcelUrl("");
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExcelSearchModal;
