import Navigation from "../../components/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import RatingProcess from "./process/RatingProcess";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";

function RatingIndividual() {
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
  const { TOKEN, activeMenu } = useStateContext();
  const [content, setContent] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  let data = location.state;
  let template = data.data[0];
  let userId = data.user;
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
          setContent(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  let filtered = content?.filter((item, index) => {
    return item.deviceId == userId;
  });
  const [ratingTotal, setRatingTotal] = useState(0);
  let arr = [];
  for (let index = 0; index < template.categories.length; index++) {
    const element = template.categories[index];
    arr.push({
      id: element.id,
      points: 0,
      subCategory: [],
    });
  }
  let main = {
    userId: userId,
    startDate: `${datestring}`,
    endDate: `${datestring2}`,
    rating: ratingTotal,
    categories: arr,
    extras: [],
  };
  const [schema, setSchema] = useState(main);
  const handleSubmit = (category, total, itemId) => {
    let pre = schema.categories.map((item) => {
      return item.id == itemId
        ? { ...item, subCategory: category, points: total }
        : item;
    });

    setSchema({
      userId: userId,
      startDate: `${datestring}`,
      endDate: `${datestring2}`,
      rating: final2,
      categories: pre,
      extras: [],
    });
  };
  let mainTotal = [];
  for (let index = 0; index < schema.categories.length; index++) {
    const element = schema.categories[index];
    mainTotal.push(element.points);
  }
  let final = mainTotal
    .map((e) => Number(e))
    .reduce((a, b) => Math.round(a + b), 0);
  let final2 = Math.round(final / schema.categories.length);
  const [show, setShow] = useState(false);
  const handleSubmitData = () => {
    schema.rating = final2;
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      url: `${process.env.REACT_APP_URL}/v1/Rating`,
      data: schema,
    })
      .then((res) => {
        notification.success(`Амжилттай`);
        const timer = setTimeout(() => navigate(-1), 1000);
        return () => clearTimeout(timer);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full max-h-[calc(100vh-100px)] relative">
      <ToastContainer />
      {show && (
        <div
          className={`${
            activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
          } 
        top-[56px] fixed  h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex items-center justify-center z-10`}
        >
          <div className="bg-white w-6/12  rounded-t ">
            <div className="w-full h-12 bg-teal-500 rounded-t px-3 flex justify-end items-center">
              <i
                onClick={() => {
                  setShow(false);
                }}
                className="bi bi-x-lg text-xl text-white"
              ></i>
            </div>
            <div className="p-2 font-[400]">
              Үнэлгээ хадгалах бол "Тийм" товчыг дарна уу ?
            </div>
            <div className=" flex justify-end px-2 py-2">
              <button className="p-2 border px-4 mx-1 my-1 rounded font-[400]">
                Тийм
              </button>
              <button className="p-2 border px-4 mx-1 my-1 rounded font-[400]">
                Үгүй
              </button>
            </div>
          </div>
        </div>
      )}
      <Navigation />
      <div className="w-full h-full relative">
        <div className="h-14 relative">
          <div
            className={` ${
              activeMenu ? "w-[calc(100%-250px)]" : "w-full"
            } fixed h-14 bg-gray-100 border-b-[2px] border-gray-300 shadow-sm flex justify-between
        items-center px-4`}
          >
            <div className="!flex h-full items-center">
              <div
                onClick={() => navigate(-1)}
                className="h-9 bg-teal-500 rounded-sm px-3 flex items-center font-[400] text-white
            cursor-pointer active:bg-teal-400 mr-2"
              >
                <span className="mr-2 mb-1 font-[400] text-white">Буцах</span>
                <div className="pl-2 h-full flex items-center border-l border-gray-300">
                  <i className="bi bi-backspace"></i>
                </div>
              </div>
              <div className="!flex h-full items-center ">
                <DatePicker
                  selected={value}
                  value={value}
                  onChange={(date) => setValue(date)}
                  className="form-control form-control-sm
                        !py-[7px] border-teal-500 !w-[150px] !bg-teal-500 !font-[500] text-white"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy-MM-dd h:mm aa"
                />
                <DatePicker
                  selected={selectV}
                  value={selectV}
                  onChange={(date) => setSelectV(date)}
                  className="form-control form-control-sm
                        !py-[7px] border-teal-500 ml-2 !w-[150px] !bg-teal-500 !font-[500] 
                        text-white"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="yyyy-MM-dd h:mm aa"
                />
              </div>
            </div>
            <div className="h-9 bg-teal-500 rounded-sm pl-3 flex items-center font-[400] text-white">
              <span className="mr-2 mb-1 font-[400] text-white">
                {filtered && filtered[0].roleName}
              </span>
              <div className="pl-2 h-full flex items-center border-l border-gray-300">
                <span className="mr-2 mb-1 font-[400] text-white">
                  {filtered && filtered[0].lastName[0]}.{" "}
                  {filtered && filtered[0].firstName}
                </span>
              </div>
              <div
                onClick={() => {
                  handleSubmitData();
                }}
                className="pl-2 h-full flex items-center border-l border-gray-300 px-3
                        bg-green-500 cursor-pointer hover:bg-green-600 active:bg-green-500"
              >
                <span className="mr-2 mb-1 font-[400] text-white">
                  Хадгалах
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2 pb-20">
          {template.categories.map((item, index) => (
            <RatingProcess
              item={item}
              key={index}
              handleSubmit={handleSubmit}
            />
          ))}
        </div>
        <div className="h-14  fixed bottom-0 right-0 flex items-center px-4 justify-end">
          <div
            className="h-9 shadow-lg bg-teal-500 rounded-sm pl-3 flex items-center font-[400] text-white
                    cursor-pointer hover:bg-teal-400 active:bg-teal-600"
          >
            <input type="file" className="" />
            <label htmlFor="file-upload">
              <span className="mr-2 mb-1 font-[400] text-white">
                File хавсаргах
              </span>
            </label>
            <div className="pl-2 h-full flex items-center border-l border-gray-300">
              <span className="mr-2 mb-1 font-[400] text-white">
                <i className="bi bi-file-earmark-zip"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingIndividual;
