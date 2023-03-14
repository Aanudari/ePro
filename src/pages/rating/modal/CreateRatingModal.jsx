import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import AllEmployeeSelect from "../../main-exam/modal/AllEmployeeSelect";
import TemplateSelectModal from "./TemplateSelect";
import axios from "axios";
function CreateRatingModal({ setShowModal }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [showUsers, setShowUsers] = useState(false);
  const [allEmployee, setAllEmployee] = useState();
  const [showTemplates, setShowTemplates] = useState(false);
  const [collected, setCollected] = useState([]);
  const [ratingName, setRatingName] = useState("");
  const data = {
    ratingName: ratingName,
    templateId: collected[0],
    devices: allEmployee,
  };
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
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setShowModal(false);
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
      <div className="shrink w-[calc(70%)] h-[calc(70%)] bg-white flex flex-col items-center rounded">
        <div className="w-full min-h-[50px] bg-teal-600 flex justify-between items-center px-3  gap-2 relative rounded-t">
          {collected != [] && allEmployee != undefined && ratingName != "" ? (
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
          <div className="h-20 w-full flex items-center px-3 gap-2">
            <button
              onClick={() => {
                setShowUsers(!showUsers);
              }}
              className={`custom-btn w-full text-[13px] ${
                allEmployee?.length > 0 ? "bg-teal-500" : "bg-gray-500"
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
              className={`custom-btn w-full text-[13px] ${
                collected.length > 0 ? "bg-teal-500" : "bg-gray-500"
              }  `}
            >
              {collected.length > 0 && (
                <i className="bi bi-check-circle text-white text-md mr-2"></i>
              )}
              Загвар сонгох
            </button>
          </div>
          <div className=" p-3">
            <div className="group w-1/2">
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
        </div>
      </div>
    </div>
  );
}

export default CreateRatingModal;
