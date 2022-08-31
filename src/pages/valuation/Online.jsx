import React from "react";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import UserCell from "../../components/sub-components/userCell";

function Online() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://192.168.10.248:9000/api/User/role/5",
    })
      .then(
        res => setData(res.data.result)
      )
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="w-full h-full bg-gray-50">
      <Navigation />
      <div className="h-full px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5">
          {
            data ? data.map((user, index) =>
              <UserCell key={index} data={user} />
            ) : null
          }
        </div>
      </div>
    </div>
  );
}

export default Online;
