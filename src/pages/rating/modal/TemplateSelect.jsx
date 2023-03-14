import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useEffect } from "react";
import { logout } from "../../../service/examService";
import tempAPI from "../../../service/templateAPI";
function TemplateSelectModal({ setShowTemplates, collected, setCollected }) {
  const { activeMenu } = useStateContext();
  const [temps, setTemps] = useState();
  useEffect(() => {
    tempAPI.getTemaplates().then((res) => {
      if (res.data.errCode === 401) {
        alert(res.data.resultMessage);
        logout();
      } else {
        setTemps(res.data.templates);
      }
    });
  }, []);
  return (
    <div
      className={`fixed ${
        activeMenu
          ? " left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[56px] left-0"
      } 
      bg-black top-[56px] bg-opacity-50 flex justify-center items-center z-20
      `}
    >
      <div className="shrink w-[calc(100%)] h-[calc(100%)] bg-white flex flex-col items-center ">
        <div className="w-full min-h-[50px] bg-teal-600 flex justify-between items-center px-3  gap-2 relative">
          <div className="flex h-full items-center gap-2">
            <span className="font-[500] text-[15px] text-white">
              Загвар сонгох цэс
            </span>{" "}
            {collected > 0 && (
              <button
                onClick={() => {
                  setShowTemplates(false);
                }}
                className="custom-btn bg-teal-500 hover:bg-teal-400 text-[14px]"
              >
                Хадгалах
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setShowTemplates(false);
              setCollected([]);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>
        <div className="h-full w-full rounded-b">
          <div className="h-[480px] shadow-inner rounded w-full rounded-b p-2 flex flex-col items-center overflow-scroll">
            {temps?.length > 0 ? (
              temps.map((element, index) => {
                // console.log(element);
                return (
                  <div
                    key={JSON.stringify(element.templateName + index)}
                    className=" mt-2 w-[900px]
                  relative parent flex justify-end"
                  >
                    <div
                      onClick={() => {
                        collected.includes(element.templateId)
                          ? setCollected([])
                          : setCollected([element.templateId]);
                      }}
                      className="border-t border-b border-l border-r custom-btn bg-teal-500 shadow hover:bg-teal-400 w-[800px]
                relative parent transition-all"
                    >
                      <div className="p-2 font-[500] uppercase flex justify-between">
                        <span className="font-[500]">
                          {element.templateName}
                        </span>
                        <span className="font-[500]">{element.templateId}</span>
                      </div>
                    </div>
                    <div
                      className={`absolute top-[10%] left-[5.5%] child  z-10 rounded-full py-[5px] px-[9px] 
                  ${
                    collected.includes(element.templateId)
                      ? "bg-teal-400 hover:bg-teal-400  flex"
                      : "bg-gray-200 hover:bg-gray-200 "
                  } `}
                    >
                      <i className="bi bi-check-lg text-xl text-white mb-[2px]"></i>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img src="/notfound.webp" alt="" className="h-[calc(50%)]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateSelectModal;
