import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect } from "react";
import { logout } from "../../../service/examService";
import axios from "axios";

function CreateRatingTemplate({ setShowModal, tri, setTri }) {
  const { activeMenu, TOKEN } = useStateContext();
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
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const roles = [
    {
      id: "1",
      roleName: "L-1 operator",
      description: "L-1 operator",
    },
    {
      id: "3",
      roleName: "L-2 care",
      description: "L-2 care",
    },
    {
      id: "4",
      roleName: "L-2 complain",
      description: "L-2 complain",
    },
    {
      id: "5",
      roleName: "L-2 online",
      description: "L-2 online",
    },
    {
      id: "7",
      roleName: "L-2 bank",
      description: "L-2 bank",
    },
    {
      id: "168",
      roleName: "L-2 Telesales operator",
      description: "L-2 Telesales operator",
    },
    {
      id: "188",
      roleName: "Branch staff",
      description: "Branch staff",
    },
    {
      id: "191",
      roleName: "Order specialist",
      description: "Order specialist",
    },
    {
      id: "195",
      roleName: "Avlaga",
      description: "Avlaga",
    },
  ];
  const [name, setName] = useState(roles[0].roleName);
  const [selected, setSelected] = useState(roles[0].id);
  let main = {
    name: `${name}`,
    roleID: `${selected}`,
    categories: [],
    extras: [],
  };
  const handleTemplate = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplate/add`,
      data: main,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          alert(res.data.resultMessage);
        }
        setShowModal(false);
        setTri(!tri);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={`${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
      } 
        top-[56px] fixed  h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex flex-col items-center justify-center`}
    >
      <div className="bg-white appear-smooth w-10/12 h-[calc(80%)] rounded-t ">
        <div
          onClick={() => {
            setShowModal(false);
          }}
          className="w-full h-12 bg-teal-500 rounded-t"
        ></div>
        <div className="w-full py-4 px-3 flex gap-2 justify-between">
          <div className="group w-2/3 pr-4">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="!w-full"
              type="text"
              required
            />
            <span className="highlight"></span>
            <span className="bar "></span>
            <label className="">Template нэр</label>
          </div>
          <select
            onChange={(e) => {
              setSelected(e.target.value);
            }}
            className="h-12"
            name=""
            id=""
          >
            {roles.map((item, index) => (
              <option key={index} value={`${item.id}`}>
                {item.roleName}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <div className="w-full px-3 pt-1 overflow-scroll">
            Үнэлгээ хийх загвар үүсгэх
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          handleTemplate();
        }}
        className="py-2 bg-teal-600 text-white font-[500] w-10/12 rounded-b flex items-center justify-center cursor-pointer
          hover:bg-teal-500 active:bg-teal-500 appear-smooth"
      >
        Хадгалах{" "}
      </div>
    </div>
  );
}

export default CreateRatingTemplate;
