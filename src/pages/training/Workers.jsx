import { useStateContext } from "../../contexts/ContextProvider";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { logout } from "../../service/examService";

function Workers({ setShow, getEmployees }) {
  const { activeMenu, TOKEN } = useStateContext();

  const [users, setUsers] = useState([]);
  const [chosenPre, setChosenPre] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [indexDetect, setIndexDetect] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User`,
    })
      .then((res) => {
        setUsers(res.data.result || []);

        if (res.data.resultMessage === "Unauthorized") {
          logout();
        }
      })
      .catch((err) => console.log(err));
  }, [TOKEN]);

  const roles = useMemo(() => {
    return [...new Set(users.map((item) => item.unitName))];
  }, [users]);

  const main = useMemo(() => {
    return roles.map((role) => users.filter((user) => user.unitName === role));
  }, [roles, users]);

  useEffect(() => {
    if (currentIndex === undefined || !main[currentIndex]) return;

    const container = main[currentIndex].map((item) => item.deviceId);

    if (container.every((elem) => chosenPre.includes(elem))) {
      setIndexDetect((prev) =>
        prev.includes(currentIndex) ? prev : [...prev, currentIndex],
      );
    } else {
      setIndexDetect((prev) => prev.filter((item) => item !== currentIndex));
    }
  }, [chosenPre, currentIndex, main]);

  const collector = (dep, unit, dev, ind) => {
    const data = {
      department: dep,
      unitId: unit,
      deviceId: dev,
    };

    if (chosenPre.includes(dev)) {
      setChosenPre((prev) => prev.filter((item) => item !== dev));
      setChosen((prev) => prev.filter((item) => item.deviceId !== dev));
    } else {
      setChosenPre((prev) => [...prev, dev]);
      setChosen((prev) => [...prev, data]);
    }

    setCurrentIndex(ind);
  };

  const bigCollector = (index) => {
    setCurrentIndex(index);

    if (indexDetect.includes(index)) {
      const devices = main[index].map((item) => item.deviceId);

      setIndexDetect((prev) => prev.filter((value) => value !== index));
      setChosen((prev) =>
        prev.filter((item) => !devices.includes(item.deviceId)),
      );
      setChosenPre((prev) => prev.filter((item) => !devices.includes(item)));
    } else {
      const selectedUsers = main[index].map((item) => ({
        department:
          item.departmentId === undefined ? item.department : item.departmentId,
        unitId: item.unitId,
        deviceId: item.deviceId,
      }));

      const merged = [...chosen, ...selectedUsers];

      const unique = [
        ...new Map(merged.map((item) => [item.deviceId, item])).values(),
      ];

      setChosen(unique);
      setChosenPre(unique.map((item) => item.deviceId));
      setIndexDetect((prev) =>
        prev.includes(index) ? prev : [...prev, index],
      );
    }
  };

  return (
    <div
      className={`${
        activeMenu ? "left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
      } 
      top-[40px] fixed h-[calc(100%-56px)] 
      bg-black bg-opacity-50 flex items-center justify-center z-20`}
    >
      <div className="bg-gray-200 appear-smooth w-full h-[calc(100%)] relative">
        <div className="flex items-center justify-between w-full h-12 px-4 bg-teal-500 shadow-sm">
          <div className="flex items-center">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-white font-[500] text-sm">
                Сонгох : {chosen.length}/{users.length}
              </span>

              {chosen.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setShow(false);
                    getEmployees(chosen);
                  }}
                  className="text-white font-[500] text-sm border-[2px] rounded px-2 py-2 ml-2"
                >
                  Хадгалах
                </button>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShow(false)}
            className="text-sm cursor-pointer bi bi-x-lg hover:scale-105"
          />
        </div>

        <div className="w-full h-full px-2 overflow-scroll">
          {main.map((el, ind) => (
            <div
              key={ind}
              className="flex flex-col flex-wrap justify-start gap-2 px-3 pt-1 pb-5 mt-2 overflow-scroll border-t border-teal-500 shadow-sm"
            >
              <button
                type="button"
                onClick={() => bigCollector(ind)}
                className="flex items-center mt-2 text-sm text-left text-black"
              >
                {el[0]?.unitName}

                <span className="ml-2 w-4 h-4 border-[2px] border-gray-400 rounded relative">
                  {indexDetect.includes(ind) && (
                    <i className="bi bi-check absolute text-sm top-[-10px] left-[-6px] text-teal-500" />
                  )}
                </span>
              </button>

              <div className="flex flex-wrap gap-1">
                {el.map((item, index) => (
                  <button
                    type="button"
                    onClick={() =>
                      collector(
                        item.departmentId,
                        item.unitId,
                        item.deviceId,
                        ind,
                      )
                    }
                    key={item.deviceId || index}
                    className={`fea py-2 px-2 font-[400] ${
                      chosenPre.includes(item.deviceId) &&
                      "!text-white !bg-teal-500"
                    } bg-gray-400 h-8 w-[200px] flex relative items-center text-[13px] hover:shadow-teal-500 transition-all cursor-pointer`}
                  >
                    {chosenPre.includes(item.deviceId) && (
                      <span className="transition-all">
                        <i className="mr-2 bi bi-check2-all" />
                      </span>
                    )}
                    {item.lastName?.[0]}. {item.firstName}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workers;
