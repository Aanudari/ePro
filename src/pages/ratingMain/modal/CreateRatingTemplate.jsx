import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRatingTemplate({setShowModal}) {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
      };
    const {activeMenu, TOKEN} = useStateContext();
    const [data, setData] = useState();
    useEffect(() => {
        axios({
          method: "get",
          headers: {
            Authorization: `${TOKEN}`,
          },
          url: `${process.env.REACT_APP_URL}/v1/User/role`,
        })
          .then((res) => {
              if (res.data.resultMessage === "Unauthorized") {
                logout();
              }
            setData(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
      console.log(data)
    return ( 
        <div className={`${activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"} 
        top-[56px] fixed  h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex items-center justify-center`}> 
        <div  className="bg-white appear-smooth w-10/12 h-[calc(80%)] rounded ">
        <div onClick={() => {
                setShowModal(false)
            }} className="w-full h-12 bg-teal-500 rounded-t"></div>
            <div className="w-full h-10">
                <select name="" id=""></select>
            </div>
            <div className="h-full w-full px-3 pt-1 overflow-scroll">
                Үнэлгээ хийх загвар үүсгэх
            </div>
        </div>
        </div>
     );
}

export default CreateRatingTemplate;