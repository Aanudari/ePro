import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import RatingUserCell from "./template/RatingUserCell";


function RatingControll() {
  const { TOKEN } = useStateContext();
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
      url: `${process.env.REACT_APP_URL}/v1/User`,
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
  let roles = []
  // console.log(data)
  data?.map((item) => {
    return roles.push(item.roleName)
  })
  let finalArr = [... new Set(roles)]
  return (
    <div className="h-[calc(100%-56px)] w-full px-4 pt-2">
      <div className="w-full h-10 text-white pr-8 flex justify-between">
        <span className="text-teal-600 font-[500] text-[14px] " >
          <i className="bi bi-caret-down-square-fill mr-2"></i>
          Үнэлгээ хийх
        </span>
        <div className="h-full w-[calc(100%-200px)] flex justify-end">
          <select name="" id="" className="min-w-[150px] max-w-[150px] mb-1">
            {
              finalArr?.map((item, index) => (
                <option key={index} value={`${index}`}>{item}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className=" h-[calc(100%-25px)] overflow-scroll px-4 pt-2">
        {
          data &&
          data.map((item, index) => (
            <RatingUserCell key={index} data={item} />
          ))
        }
      </div>
    </div>
  );
}

export default RatingControll;