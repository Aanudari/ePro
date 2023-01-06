import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import React, { useState, useEffect } from "react";
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
  const accepted = ["1", "3", "4", "5", "7", "168", "188", "191", "195"];
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
          setData(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  let roles = [];
  // console.log(data)
  data?.map((item) => {
    return roles.push(item.roleName);
  });
  let main = [];
  for (let index = 0; index < data?.length; index++) {
    const element = data[index];
    if (accepted.includes(element.role)) {
      main.push({
        org: element.organizationUnitId,
        index: index,
        id: element.role,
        name: element.roleName,
      });
    }
  }
  let unique = main.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.id === value.id && t.name === value.name)
  );
  let users = [];
  for (let index = 0; index < unique.length; index++) {
    const element = unique[index];
    let filtered = data.filter((item, i) => {
      return item.role == element.id;
    });
    users.push(filtered);
  }
  let time = {
    startDate: "",
    endDate: "",
  };
  const [statusData, setStatusData] = useState([]);
  useEffect(() => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Rating/role/4`,
      data: time,
    })
      .then((res) => {
        setStatusData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(users)
  const handleChangeOptions = (value) => {
    setIndex(value);
    let temp = unique.filter((item, index) => {
      return index == value;
    });
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Rating/role/${temp[0].id}`,
      data: time,
    })
      .then((res) => {
        setStatusData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [index, setIndex] = useState(0);
  // console.log(statusData)
  return (
    <div className="h-[calc(100%-56px)] w-full px-4 pt-2">
      <div className="w-full h-10 text-white pr-8 flex justify-between">
        <span className="text-teal-600 font-[500] text-[14px] ">
          <i className="bi bi-caret-down-square-fill mr-2"></i>
          Үнэлгээ хийх
        </span>
        <div className="h-full w-[calc(100%-200px)] flex justify-end">
          <select
            onChange={(e) => {
              handleChangeOptions(e.target.value);
            }}
            name=""
            id=""
            className="min-w-[150px] max-w-[150px] mb-1"
          >
            {unique?.map((item, index) => (
              <option key={index} value={`${index}`}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className=" h-[calc(100%-25px)] overflow-scroll px-4 pt-2">
        {data &&
          statusData.map((item, index) => (
            <RatingUserCell key={index} data={item.user} />
          ))}
      </div>
    </div>
  );
}

export default RatingControll;
