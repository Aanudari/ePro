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
      url: `http://192.168.10.248:9000/v1/User/role/1`,
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
    <div className="w-full min-h-screen relative bg-[#23b499]">
      <ExpandedMenu />
      <Navigation />
            <div onClick={() => {
              setExpandedMenu(!expandedMenu)
            }} className="px-2 py-2 bg-gray-200 transition cursor-pointer ">
              <i className="bi bi-arrow-bar-left text-[25px]"></i>
            </div>
            <div className="p-2 flex flex-wrap gap-3 justify-around md:justify-start">
          {
            data ? data.map((user, index) =>
              // Ажилтан тус бүрийг UserCell conponent д хувиарлах замаар мэдээллүүдийг харуулав
              <UserCell key={index} data={user} />
            ) : null
          }
            </div>

    </div>
  );
}

export default Level1;
