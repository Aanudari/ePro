import React from "react";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import UserCell from "../../components/sub-components/userCell";

function Telesales() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://192.168.10.248:9000/api/User/role/168",
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
          <div className="w-full bg-gray-100 p-3 rounded flex">
            <div className="w-1/2 flex">
              <span className="mr-2 mt-2 font-[400]">Нэрээр хайх:</span>
              <input type="text" className="custom-input-2 h-10" />
            </div>
            <div className="w-1/2 bg-gray-200">
              <select className="w-full h-full">
                <option selected  value="grapefruit">Бүгд</option>
                <option value="lime">Үнэлгээ хийгдсэн</option>
                <option value="coconut">Үнэлгээ дутуу</option>
                <option value="coconut">Огт хийгдээгүй</option>
                <option value="mango">Тодорхойгүй</option>
              </select>
            </div>
          </div>
          {
            data ? data.map((user, index) =>
              // Ажилтан тус бүрийг UserCell conponent д хувиарлах замаар мэдээллүүдийг харуулав 
              <UserCell key={index} data={user} />
            ) : null
          }
        </div>
      </div>
    </div>
  );
}

export default Telesales;
