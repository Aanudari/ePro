import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function RatingModalMain({setShowModal, deviceId}) {
    const {activeMenu} = useStateContext();
    const {TOKEN} = useStateContext();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
      };
    const [data, setData] = useState();
    useEffect(() => {
        axios({
            method: "get",
            headers: {
              Authorization: `${TOKEN}`,
            },
            url: `${process.env.REACT_APP_URL}/v1/RatingTemplate/user/${deviceId}`,
          })
            .then((res) => {
              if (res.data.resultMessage === "Unauthorized") {
                logout();
              } else {
                setData(res.data.result)
              }
            })
            .catch((err) => console.log(err));
    }, [])
    console.log(data)
    return ( 
        <div className={`${activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"} 
        top-[56px] fixed  h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex items-center justify-center`}> 
        <div  className="bg-white appear-smooth w-10/12 h-[calc(80%)] rounded ">
            <div onClick={() => {
                setShowModal(false)
            }} className="w-full h-12 bg-teal-500 rounded-t"></div>
            <div className="h-full w-full px-3 pt-1 overflow-scroll">
              <h6 className="text-teal-500 mt-2 mb-3">Үнэлгээ хийх загвар сонгох: </h6>
              {
                data == null ? 
                <div className="ml-2 text-teal-500 flex items-center">
                  <i className="bi bi-exclamation text-2xl mb-[3px]"></i>
                  <span className="font-[400] text-[14px] ">Тухайн албанд тохирох үнэлгээний загвар үүсээгүй байна</span>
                  </div> : 
                data && 
                data.map((item, index) => ( 
                  <div className="mt-1 hover:bg-teal-500 cursor-pointer pl-3 flex items-center text-[13px] h-12 font-[500] text-white 
                  bg-teal-400" key={index}> 
                  {item.name} 
                  </div> 
                )) 
              }
            </div> 
        </div>
        </div>
     );
}

export default RatingModalMain;