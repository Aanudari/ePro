import React from "react";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import UserCell from "../../components/sub-components/userCell";

function Level1() {
  const { user } = useStateContext();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://192.168.10.248:9000/api/User/role/1",
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
          <div className="w-full rounded-md my-1 flex gap-2 justify-between items-center py-2 px-3">
            <span>Нэр</span>
          </div>
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

export default Level1;
