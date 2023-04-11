import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
import Accordion from "react-bootstrap/Accordion";

function CertainEmployeeSelect({ setShow, getEmployees, setShowSelect }) {
  const { activeMenu, TOKEN } = useStateContext();
  const [users, setUsers] = useState();
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User`,
    })
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data.result);
        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(users);
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
      if (element === el.unitName) {
        tempo.push(el);
      }
    }
    main.push(tempo);
  }
  const [chosenPre, setChosenPre] = useState([]);
  const [chosen, setChosen] = useState([]);
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
      setChosenPre([dev]);
      setChosen([data]);
    }
    setCurrentIndex(ind);
  };
  // console.log(chosen);
  return (
    <div
      className={`${
        activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
      } 
    top-[56px] fixed  h-[calc(100%-56px)] 
    bg-black bg-opacity-50 flex items-center justify-center z-20`}
    >
      <div className="bg-gray-200 appear-smooth w-full h-[calc(100%)] relative">
        <div className="w-full h-14 bg-teal-600 flex justify-between px-4 items-center shadow-sm">
          <div className="flex items-center">
            <div className=" flex justify-between items-center px-4 py-2">
              <span className="text-white font-[500] text-sm mr-2">
                Сонгох : {chosen.length}/{users?.length}
              </span>
              {chosen.length > 0 && (
                // <span

                //   className="text-white font-[500] text-sm border-[2px] rounded  px-2 py-2 ml-2"
                // >
                <button
                  onClick={() => {
                    setShowSelect(false);
                    getEmployees(chosen);
                  }}
                  className={"custom-btn btn-13"}
                >
                  Хадгалах
                </button>
              )}
            </div>
          </div>
          <div className="">
            <i
              onClick={() => {
                setShowSelect(false);
              }}
              className="bi bi-x-lg text-xl cursor-pointer hover:scale-105"
            ></i>
          </div>
        </div>
        <div className="w-full h-full overflow-scroll px-4 pt-3">
          <Accordion flush>
            {main.map((el, ind) => (
              <Accordion.Item key={ind} eventKey={`${ind}`}>
                <Accordion.Header>
                  <h6 className="text-black text-sm mt-2 flex items-center">
                    {el[0].unitName}{" "}
                  </h6>
                </Accordion.Header>
                <Accordion.Body>
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
                        } bg-gray-200 h-8 w-[200px] flex relative items-center text-[13px] hover:bg-gray-300
              transition-all cursor-pointer rounded text-gray-500 font-[600] select-none`}
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
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default CertainEmployeeSelect;
