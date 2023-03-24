import { useState, useEffect } from "react";
import { logout } from "../../../service/examService";
import tempAPI from "../../../service/templateAPI";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import DeleteConfirm from "../../main-exam/modal/DeleteComfirm";
import TemplateModal from "../modal/TemplateModal";
import bg from "../../../assets/bg.jpg";

function Template() {
  const [temps, setTemps] = useState();
  const [trigger, setTrigger] = useState(false);
  const [value, setValue] = useState("");
  const { TOKEN } = useStateContext();
  const [collected, setCollected] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const data = {
    isEdit: false,
    templateId: "",
    templateName: value,
    categories: [
      {
        categoryId: "",
      },
    ],
  };

  useEffect(() => {
    tempAPI.getTemaplates().then((res) => {
      if (res.data.errCode === 401) {
        alert(res.data.resultMessage);
        logout();
      } else {
        setTemps(res.data.templates);
      }
    });
  }, [trigger]);
  // console.log(temps);
  const handleAddtemplate = (e) => {
    // console.log("message");
    // e.preventDefault();
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/createTemplate`,
      data: JSON.stringify(data),
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setTrigger(!trigger);
          setValue("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [valueEdit, setValueEdit] = useState("");
  const dataEdit = {
    templateId: collected[0],
    templateName: valueEdit,
  };

  const handleEdittemplate = (e) => {
    // e.preventDefault();
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/editTemplateName`,
      data: JSON.stringify(dataEdit),
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setTrigger(!trigger);
          setCollected([]);
          setValue("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [deleteId, setdeleteId] = useState();
  const handleDeleteTemplate = () => {
    axios({
      method: "post",
      headers: {
        Authorization: `${TOKEN}`,
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      url: `${process.env.REACT_APP_URL}/v1/RatingTemplateNew/deleteTemplate/${deleteId}`,
    })
      .then((res) => {
        if (res.data.isSuccess === false) {
          toast.error(res.data.resultMessage, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setTrigger(!trigger);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [templateId, setTemplateId] = useState();
  return (
    <div
      style={{ background: `url(${bg})` }}
      className="p-2 w-full h-full bg-gray-200"
    >
      <ToastContainer />
      {showConfirm && (
        <DeleteConfirm
          setConfirm={setShowConfirm}
          deleteCat={handleDeleteTemplate}
        />
      )}
      {showModal && (
        <TemplateModal
          setShow={setShowModal}
          id={templateId}
          categoryName={categoryName}
        />
      )}
      <div className="w-full h-full  rounded">
        <div className="h-[calc(10%)] w-full justify-center rounded-t p-2 flex gap-2 transition-all relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddtemplate(e);
            }}
            className="transition-all"
          >
            <div className="group">
              <input
                className={"!text-[14px] font-[500] glass text-white"}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                value={value}
                type="text"
              />
              <span className="highlight"></span>
              <span className="bar "></span>
              <button type="submit"></button>
            </div>
            {value.length > 0 && (
              <button
                type="submit"
                className="bg-teal-500 px-3 custom-btn btn-13 h-10 text-[14px] absolute top-[6px] right-[calc(30%)]"
              >
                + Нэмэх
              </button>
            )}
          </form>
        </div>
        <div
          // style={{ background: `url(${bg})` }}
          className="h-[430px] glass shadow-inner rounded w-full rounded-b p-2 flex flex-col justify-start items-center overflow-scroll"
        >
          {temps?.length > 0 ? (
            temps.map((element, index) => {
              // console.log(element);
              return (
                <div
                  key={JSON.stringify(element.templateName + index)}
                  className=" mt-2 w-[calc(85%)]
                  relative parent flex gap-2 "
                >
                  <div
                    className="border-t border-b border-l border-r btn-20 rounded px-3 py-2 shadow text-gray-600 hover:text-white w-[calc(85%-60px)]
                relative parent"
                  >
                    {collected.includes(element.templateId) ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleEdittemplate();
                        }}
                      >
                        <input
                          className="p-2 font-[500] bg-white rounded px-2 text-gray-400 w-1/2"
                          value={valueEdit}
                          onChange={(e) => {
                            setValueEdit(e.target.value);
                          }}
                          onBlur={() => {
                            setCollected([]);
                          }}
                          type={"text"}
                          autoFocus
                        />
                        <button type="submit"></button>
                      </form>
                    ) : (
                      <div
                        onClick={() => {
                          setCategoryName(element.templateName);
                          setTemplateId(element.templateId);
                          setShowModal(true);
                        }}
                        className="p-2 cursor-pointer font-[500] uppercase flex justify-between"
                      >
                        <span className="font-[500]">
                          {element.templateName}
                        </span>
                        <span className="font-[500]">{element.templateId}</span>
                      </div>
                    )}
                  </div>
                  <div className=" top-[10%] right-[1%]  child transition-all z-10 ">
                    <div
                      onClick={() => {
                        collected.includes(element.templateId)
                          ? setCollected([])
                          : setCollected([element.templateId]);
                        setValueEdit(element.templateName);
                      }}
                      className="rounded-full py-[5px] px-[9px] 
                  bg-gray-300 hover:bg-gray-400 active:bg-gray-500 transition-all cursor-pointer mr-2 py-2 px-3"
                    >
                      <i className="bi bi-vector-pen text-xl text-white mb-[2px]"></i>
                    </div>
                    <div
                      onClick={() => {
                        setShowConfirm(true);
                        setdeleteId(element.templateId);
                        // handleDeleteTemplate(element.templateId);
                      }}
                      className="transition-all z-10 rounded-full  py-[5px] px-[9px] py-2 px-3
                  bg-gray-300 hover:bg-gray-400 active:bg-gray-500 cursor-pointer"
                    >
                      <i className="bi bi-trash3-fill text-xl text-white mb-[2px] "></i>
                    </div>
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
  );
}

export default Template;
