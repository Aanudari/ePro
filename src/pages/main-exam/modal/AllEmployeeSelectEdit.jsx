import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllEmployeeSelectEdit({
  setShow,
  getEmployees,
  setShowSelect,
  getUsers,
}) {
  let initialData = [];
  let initialDataPre = [];
  for (let initIndex = 0; initIndex < getUsers.length; initIndex++) {
    const element = getUsers[initIndex];
    let data = {
      department: element.department,
      unitId: element.unitId,
      deviceId: parseInt(element.deviceId),
    };
    initialData.push(data);
    initialDataPre.push(parseInt(element.deviceId));
  }
  useEffect(() => {
    setChosen(initialData);
    setChosenPre(initialDataPre);
  }, []);
  const navigate = useNavigate();
  const [chosen, setChosen] = useState([]);
  const [chosenPre, setChosenPre] = useState([]);
  const { activeMenu, TOKEN } = useStateContext();
  const [users, setUsers] = useState();

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User`,
    })
      .then((res) => {
        setUsers(res.data.result);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  let pre = [];
  let roles = [];
  for (let index = 0; index < users?.length; index++) {
    const element = users[index];
    pre.push(element.unitName);
  }
  roles = [...new Set(pre)];
  let main = [];
  for (let index = 0; index < roles.length; index++) {
    const element = roles[index];
    let tempo = [];
    for (let i = 0; i < users.length; i++) {
      const el = users[i];
      if (element == el.unitName) {
        tempo.push(el);
      }
    }
    main.push(tempo);
  }
  const [indexDetect, setIndexDetect] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  useEffect(() => {
    let container = [];
    for (let index = 0; index < main[currentIndex]?.length; index++) {
      const element = main[currentIndex][index];
      container.push(element.deviceId);
    }
    if (container.every((elem) => chosenPre.includes(elem))) {
      setIndexDetect((prev) => [...prev, currentIndex]);
    } else {
      let tempo = indexDetect.filter((item) => {
        return item !== currentIndex;
      });
      setIndexDetect(tempo);
    }
  }, [chosenPre, currentIndex]);
  const collector = (dep, unit, dev, ind) => {
    let data = {
      department: dep,
      unitId: unit,
      deviceId: dev,
    };
    if (chosenPre.includes(dev)) {
      let filtered = chosenPre.filter((item, index) => {
        return item !== dev;
      });
      setChosenPre(filtered);
      let filtered2 = chosen.filter((item) => {
        return item.deviceId !== dev;
      });
      setChosen(filtered2);
    } else {
      setChosenPre((prev) => [...prev, dev]);
      setChosen((prev) => [...prev, data]);
    }
    setCurrentIndex(ind);
  };
  const bigCollector = (index) => {
    setCurrentIndex(index);
    if (indexDetect.includes(index)) {
      let tempo = indexDetect.filter((value) => {
        return value !== index;
      });
      setIndexDetect(tempo);
      let devices = [];
      for (let ind = 0; ind < main[index].length; ind++) {
        const element = main[index][ind].deviceId;
        devices.push(element);
      }
      let main2 = [];
      let main2Pre = [];
      for (let i = 0; i < chosen.length; i++) {
        const element = chosen[i];
        if (!devices.includes(element.deviceId)) {
          main2.push(element);
        }
      }
      for (let i = 0; i < chosenPre.length; i++) {
        const element = chosenPre[i];
        if (!devices.includes(element)) {
          main2Pre.push(chosenPre[i]);
        }
      }
      setChosen(main2);
      setChosenPre(main2Pre);
    } else {
      let tempo = chosen.concat(main[index]);
      let tempoUnique = [...new Set(tempo)];
      let final = [];
      let finalPre = [];
      for (let i = 0; i < tempoUnique.length; i++) {
        const element = tempoUnique[i];
        let data = {
          department: element.departmentId,
          unitId: element.unitId,
          deviceId: element.deviceId,
        };
        final.push(data);
        finalPre.push(element.deviceId);
      }
      const unique = [
        ...new Map(final.map((item) => [item.deviceId, item])).values(),
      ];
      let finalUniPre = [...new Set(finalPre)];
      setChosen(unique);
      setChosenPre(finalUniPre);
      setIndexDetect((prev) => [...prev, index]);
    }
  };
  return (
    <div
      className={`${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
      } 
    top-[56px] fixed  h-[calc(100%-56px)] 
    bg-black bg-opacity-50 flex items-center justify-center z-20`}
    >
      <div className="bg-gray-200 appear-smooth w-full h-[calc(100%)] relative">
        <div className="w-full h-12 bg-teal-500 flex justify-between px-4 items-center shadow-sm">
          <div className="flex items-center">
            <div className=" flex justify-between items-center px-4 py-2">
              <span className="text-white font-[500] text-sm">
                Сонгох : {chosen.length}/{users?.length}
              </span>
              {chosen.length > 0 && (
                <span
                  onClick={() => {
                    setShow(false);
                    getEmployees(chosen);
                  }}
                  className="text-white font-[500] text-sm border-[2px] rounded  px-2 py-2 ml-2"
                >
                  <button>Хадгалах</button>
                </span>
              )}
            </div>
          </div>
          <div className="">
            <i
              onClick={() => {
                setShow(false);
              }}
              className="bi bi-x-lg text-xl cursor-pointer hover:scale-105"
            ></i>
          </div>
        </div>
        <div className="w-full h-full overflow-scroll px-2">
          {main.map((el, ind) => (
            <div
              key={ind}
              className="px-3 shadow-sm border-t border-teal-500 px-3 pt-1 pb-5 flex flex-col flex-wrap gap-2 overflow-scroll mt-2 justify-start"
            >
              <h6
                onClick={() => {
                  bigCollector(ind);
                }}
                className="text-black text-sm mt-2 flex items-center"
              >
                {el[0].unitName}{" "}
                <div className="ml-2 w-4 h-4 border-[2px] border-gray-400 rounded relative">
                  {indexDetect.includes(ind) && (
                    <i className="bi bi-check absolute text-2xl top-[-10px] left-[-6px] text-teal-500"></i>
                  )}
                </div>
              </h6>
              <div className="flex flex-wrap gap-1">
                {el?.map((item, index) => (
                  <div
                    onClick={() => {
                      collector(
                        item.departmentId,
                        item.unitId,
                        item.deviceId,
                        ind
                      );
                    }}
                    key={index}
                    className={`fea py-2 px-2 font-[400] ${
                      chosenPre.includes(item.deviceId) &&
                      "!text-white !bg-teal-500"
                    } bg-gray-400 h-8 w-[200px] flex relative items-center text-[13px] hover:shadow-teal-500
              transition-all cursor-pointer`}
                  >
                    {chosenPre.includes(item.deviceId) && (
                      <div className="transition-all">
                        <i className="bi bi-check2-all mr-2"></i>
                      </div>
                    )}
                    {item.lastName[0]}. {item.firstName}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllEmployeeSelectEdit;
