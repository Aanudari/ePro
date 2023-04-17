import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import React, { useEffect } from "react";
import axios from "axios";
import DepartmentSelect from "../SelectOptions/DepartmentSelect";
import DatePicker from "react-datepicker";
import { logout } from "../../../service/examService";
import { ToastContainer, toast } from "react-toastify";

function AddCategoryMenu({ setShowAddCategory, trigger, setTrigger }) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const [selectV, setSelectV] = useState(new Date());
  const [value, setValue] = useState(new Date());
  var datestring =
    value.getFullYear() +
    "" +
    addZero(value.getMonth() + 1) +
    addZero(value.getDate()) +
    addZero(value.getHours()) +
    addZero(value.getMinutes()) +
    addZero(value.getSeconds());
  var datestring2 =
    selectV.getFullYear() +
    "" +
    addZero(selectV.getMonth() + 1) +
    addZero(selectV.getDate()) +
    addZero(selectV.getHours()) +
    addZero(selectV.getMinutes()) +
    addZero(selectV.getSeconds());
  const { TOKEN } = useStateContext();
  const { activeMenu } = useStateContext();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [data, setData] = useState();
  let arr = {
    name: `${name}`,
    startDate: `${datestring}`,
    endDate: `${datestring2}`,
    department: null,
  };
  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${TOKEN}`,
      },
      url: `${process.env.REACT_APP_URL}/v1/User/department`,
    })
      .then((res) => {
        if (res.data.errorCode === 401) {
          logout();
        } else {
          setData(res.data.departments);
          setTrigger(!trigger);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleOptions = (value) => {
    setDepartment(value);
  };
  const submitCategory = () => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Pool/add/Category`,
      data: arr,
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
          setShowAddCategory(false);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div
      className={`fixed ${
        activeMenu
          ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
          : "w-full h-full top-[25px] left-0"
      } 
        bg-black bg-opacity-50 flex justify-center items-center z-top2 z-20
        `}
    >
      <ToastContainer />
      <div className="shrink w-[calc(75%)] h-[calc(70%)] bg-white flex flex-col rounded-lg">
        <div className="w-full min-h-[50px] bg-teal-700 flex justify-between items-center px-3 rounded-t shadow">
          <h5 className="text-white m-0 text-[17px]">Категори нэмэх</h5>
          <button
            onClick={() => {
              setShowAddCategory(false);
            }}
            className="w-[20px] h-full "
          >
            <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
          </button>
        </div>

        <div className="h-[calc(100%)] w-full px-3 overflow-scroll flex justify-center items-center pt-20">
          <div className="w-1/2 h-1/2">
            <div className="group w-full">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={
                  "custom-validation !w-full !border-b-[2px] !border-[#50a3a2] font-[400]"
                }
                type="text"
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="">Категори нэр</label>
            </div>
            <div className="w-full flex gap-2 mb-3">
              <div className="flex w-full flex-col">
                <p className="font-[400] mb-0">Эхлэх:</p>
                <DatePicker
                  selected={value}
                  value={value}
                  onChange={(date) => setValue(date)}
                  className="form-control form-control-sm
                                            py-2 ml-0 border border-dark"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy-MM-dd h:mm aa"
                />
              </div>
              <div className="flex w-full flex-col">
                <p className="font-[400] mb-0">Дуусах:</p>
                <DatePicker
                  selected={selectV}
                  value={selectV}
                  onChange={(date) => setSelectV(date)}
                  className="form-control form-control-sm
                                            py-2 ml-0 border border-dark"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy-MM-dd h:mm aa"
                />
              </div>
            </div>

            {/* <DepartmentSelect data={data} handleOptions={handleOptions} /> */}
          </div>
        </div>
        {name !== "" && (
          <div
            onClick={submitCategory}
            className="min-h-[50px] bg-teal-700 flex justify-center 
                    cursor-pointer hover:bg-teal-600 items-center text-white font-[500]"
          >
            Категори үүсгэх
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCategoryMenu;
