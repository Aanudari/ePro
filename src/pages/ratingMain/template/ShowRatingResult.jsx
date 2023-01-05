import { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
function ShowRatingResult({setShowResult, personId}) {
    const {TOKEN, activeMenu} = useStateContext();
    let time = {
        "startDate": "",
        "endDate": ""
      }
    const [data, setData] = useState();
    useEffect(() => {
        axios({
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            url: `${process.env.REACT_APP_URL}/v1/Rating/${personId}`,
            data: time,
        })
            .then((res) => {
                setData(res.data.ratings)
            })
            .catch((err) => {
                alert(err)
            })
    }, [])
    return ( 
        <div className={`${activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"} 
        top-[56px] fixed  h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex items-center justify-center`}> 
        <div  className="bg-white appear-smooth w-10/12 h-[calc(80%)] rounded ">
            <div  className="w-full h-12 bg-teal-500 rounded-t px-3 flex justify-end items-center">
              <i onClick={() => {
                setShowResult(false)
            }} className="bi bi-x-lg text-xl text-white"></i>
            </div>
            <div className="h-full w-full px-3 pt-1 overflow-scroll">
              <h6 className="text-teal-500 mt-2 mb-3">Үнэлгээ хийх загвар сонгох: </h6>
              <div>
                {
                    data && 
                    data.map((item, i) => (
                        <div key={i}>{JSON.stringify(item)}</div>
                    ))
                }
              </div>
            </div> 
        </div>
        </div>
     );
}

export default ShowRatingResult;