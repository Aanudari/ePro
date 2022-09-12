import React from "react";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import axios from "axios";
import UserCell from "../../components/sub-components/userCell";
import SearchCell from "../../components/sub-components/SearchCell";
function Level1() {
  // API аас ирж буй data г хадгалах state
  const [data, setData] = useState([]);
  const [certainUser, setcertainUser] = useState();
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(false);
  // level 1 operator уудын жагсаалтыг авах API
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://192.168.10.248:9000/api/User/role/1",
    })
      .then(
        res => {
          setData(res.data.result)
        }
      )
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="w-full h-full bg-gray-50">
      <Navigation />
      <div className="h-full px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5">
          <div className="w-full bg-gray-100 p-3 rounded flex justify-between">
            <div className="w-1/6 bg-gray-200">
              <select className="w-full h-full">
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
            <div className="w-1/6 bg-gray-200">
              <select className="w-full h-full">
                <option value="season-one">1-р улирал</option>
                <option value="season-two">2-р улирал</option>
                <option value="season-three">3-р улирал</option>
                <option value="season-four">4-р улирал</option>
              </select>
            </div>
            <div className="w-1/3 bg-gray-200">
              <select className="w-full h-full">
                <option value="all">Бүгд</option>
                <option value="done">Үнэлгээ хийгдсэн</option>
                <option value="yet">Үнэлгээ дутуу</option>
                <option value="uncertain">Тодорхойгүй</option>
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

export default Level1;
