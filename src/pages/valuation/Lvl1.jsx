import React from "react";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import axios from "axios";
import UserCell from "../../components/sub-components/userCell";
import ExpandedMenu from "../../components/ExpandedMenu";
import { useStateContext } from "../../contexts/ContextProvider";
function Level1() {
  // API аас ирж буй data г хадгалах state
  const [data, setData] = useState([]);
  // level 1 operator уудын жагсаалтыг авах API
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.REACT_APP_URL}/api/User/role/1`,
    })
      .then(
        res => {
          setData(res.data.result)
        }
      )
      .catch(err => console.log(err))
  }, [])
  const { expandedMenu, setExpandedMenu } = useStateContext()
  return (
    <div className="w-full h-full bg-gray-50 relative overflow-hidden">
      <ExpandedMenu />
      <Navigation />
      <div className="h-full px-5 py-3">
        <div className="w-full h-full bg-white rounded-lg p-5">
          <div className="w-full bg-gray-100 p-3 rounded flex justify-between">

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
            <div onClick={() => {
              setExpandedMenu(!expandedMenu)
            }} className="px-2 rounded-full bg-gray-200 transition cursor-pointer active:scale-105">
              <i class="bi bi-arrow-bar-left text-[25px]"></i>
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
