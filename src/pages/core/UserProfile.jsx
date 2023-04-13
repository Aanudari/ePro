import { useLocation } from "react-router-dom";
import Navigation from "../../components/Navigation";
import bg from "../../assets/bg.jpg";
import excel from "../../assets/excel.svg";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import ExcelConfirm from "../main-exam/modal/ExcelConfirm";
function UserProfile() {
  const [excelurl, setExcelurl] = useState("");
  const location = useLocation();
  const user = location.state;
  const { TOKEN } = useStateContext();
  let final = {
    reportType: "1",
    examDtl: {
      deviceId: `${user.deviceId}`,
    },
    ratingDtl: {
      year: "",
      quarter: "",
      month: "",
      jobId: "",
      templateId: "",
      deviceId: "",
    },
    trainingDtl: {
      r1: "",
    },
  };
  const [excelConfirm, setExcelConfirm] = useState(false);

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
        console.log(res.data);
        if (res.data.isSuccess == false) {
          toast.info(res.data.resultMessage, {
            position: "bottom-right",
          });
        } else {
          setExcelurl(res.data.excelFile);
          setExcelConfirm(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full h-full">
      {excelConfirm && (
        <ExcelConfirm setConfirm={setExcelConfirm} excelUrl={excelurl} />
      )}
      <ToastContainer />
      <Navigation />
      <div
        style={{
          background: `url(${bg})`,
        }}
        className="w-full h-[calc(100vh-56px)] p-2 "
      >
        <div className=" rounded glass shadow w-1/2 h-20 p-2 text-sm flex items-center justify-between text-white px-4">
          <div className="h-full w-1/4 flex flex-col justify-center">
            <span>
              {user.lastName[0]}. {user.firstName}
            </span>
            <span>{user.unitName}</span>
          </div>
          <div className="h-full w-1/4 flex  justify-end items-center">
            <span className="white-space">Шалгалтын тайлан</span>
            <img
              onClick={handleExcelIfExist}
              src={`${excel}`}
              className="hover:scale-105 w-10 transition-all cursor-pointer ml-2"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
