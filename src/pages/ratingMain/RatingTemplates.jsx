import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import TemplateCellMain from "./template/TemplateCellMain";
import { logout } from "../../service/examService";

function RatingTemplates({ setSideMenu, setShowModal, tri }) {
  const { TOKEN } = useStateContext();
  const [data, setData] = useState();
  const [trigger, setTrigger] = useState(false);
  // console.log(data)
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplate`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        } else {
          setData(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, [trigger, tri]);
  // const [showModal, setShowModal] = useState(false);
  const { activeMenu } = useStateContext();
  // console.log(data)
  return (
    <div
      className={`fixed ${activeMenu ? "w-[calc(100%-250px)]" : "w-full"}  
         !bg-black top-[56px] h-[calc(100%-56px)] !bg-opacity-50  flex justify-end`}
    >
      <div className="from-left bg-white w-[400px] h-full  flex flex-col justify-between shadow">
        <div className="px-2 pt-3">
          <h6 className="text-teal-600 text-[14px] flex justify-between">
            <span className="font-[500]">
              <i className="bi bi-caret-down-square-fill mr-2"></i>
              Үнэлгээний загварууд
            </span>

            <i
              onClick={() => {
                setSideMenu(false);
              }}
              className="bi bi-x-circle cursor-pointer"
            ></i>
          </h6>
          <div className=" h-[calc(100%-25px)] overflow-scroll px-4">
            {data &&
              data.map((item, index) => (
                <TemplateCellMain
                  trigger={trigger}
                  setTrigger={setTrigger}
                  data={item}
                  key={index}
                  setShowModal={setShowModal}
                />
              ))}
          </div>
        </div>
        <div className="bg-gray-100 border-t shadow-lg h-[56px] flex items-center px-3">
          <div
            onClick={() => {
              setShowModal(true);
            }}
            className="h-9 min-w-[170px] hover:bg-teal-600 bg-teal-500 rounded-sm px-3 flex items-center font-[400] text-white
            cursor-pointer active:bg-teal-400"
          >
            <span className="mr-2 mb-1 font-[400] text-white">
              Загвар үүсгэх
            </span>
            <div className="pl-2 h-full flex items-center border-l border-gray-300 ">
              <i className="bi bi-file-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingTemplates;
