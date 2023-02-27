import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../../service/examService";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

function AllEmployeeSelect({ setShow, getEmployees, setShowSelect }) {
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
      if (element == el.unitName) {
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
      // let finalUni = [...new Set(final)];
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
        <div className="w-full h-12 bg-teal-600 flex justify-between px-4 items-center shadow-sm">
          <div className="flex items-center">
            <div className=" flex justify-between items-center px-4 py-2">
              <span className="text-white font-[500] text-sm mr-2">
                Сонгох : {chosen.length}/{users?.length}
              </span>
              {chosen.length > 0 && (
                // <span

                //   className="text-white font-[500] text-sm border-[2px] rounded  px-2 py-2 ml-2"
                // >
                <Button
                  onClick={() => {
                    setShowSelect(false);
                    getEmployees(chosen);
                  }}
                  variant="dark"
                >
                  Хадгалах
                </Button>
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
                  <h6 className="text-gray-700 text-sm mt-2 flex items-center">
                    <div
                      onClick={() => {
                        bigCollector(ind);
                      }}
                      className="mr-2 w-4 h-4 border-[2px] border-gray-400 rounded relative cursor-pointer"
                    >
                      {indexDetect.includes(ind) && (
                        <i className="bi bi-check absolute text-2xl top-[-10px] left-[-6px] text-teal-500 cursor-pointer"></i>
                      )}
                    </div>
                    Бүгдийг сонгох
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
                        } bg-gray-200 h-8 w-[200px] flex relative items-center text-[13px] hover:bg-gray-300
              transition-all cursor-pointer rounded text-gray-500 font-[600]`}
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

export default AllEmployeeSelect;
