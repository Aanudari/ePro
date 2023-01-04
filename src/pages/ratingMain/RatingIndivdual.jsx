import Navigation from "../../components/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import RatingProcess from "./process/RatingProcess";

function RatingIndividual() {
    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }
    const [selectV, setSelectV] = useState(new Date())
    const [value, setValue] = useState(new Date());
    var datestring = value.getFullYear() + "" + addZero((value.getMonth() + 1)) + addZero(value.getDate()) +
        addZero(value.getHours()) + addZero(value.getMinutes()) + addZero(value.getSeconds());
    var datestring2 = selectV.getFullYear() + "" + addZero((selectV.getMonth() + 1)) + addZero(selectV.getDate()) +
        addZero(selectV.getHours()) + addZero(selectV.getMinutes()) + addZero(selectV.getSeconds());
    const { TOKEN } = useStateContext();
    const [content, setContent] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    let data = location.state
    let template = data.data[0]
    let userId = data.user
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
                if (res.data.resultMessage === "Unauthorized") {
                    logout();
                } else {
                    setContent(res.data.result)
                }
            })
            .catch((err) => console.log(err));
    }, [])
    let filtered = content?.filter((item, index) => {
        return item.deviceId == userId
    })
    let main = {
        "userId": userId,
        "startDate": `${datestring}`,
        "endDate": `${datestring2}`,
        "rating": 0,
        "categories": [],
        "extras": []
      }
    const handleSubmit = () => {
        console.log(main)
    }
    // console.log(filtered)
    return (
        <div className="w-full max-h-[calc(100vh-100px)] relative">
            <Navigation />
            <div className="w-full h-full relative">
                <div className="w-full h-14 bg-gray-100 border-b-[2px] border-gray-300 shadow-sm flex justify-between
        items-center px-10">
                    <div className="!flex h-full items-center ">
                        <div onClick={() => navigate(-1)} className="h-9 bg-teal-500 rounded-sm px-3 flex items-center font-[400] text-white
            cursor-pointer active:bg-teal-400 mr-2">
                            <span className="mr-2 mb-1 font-[400] text-white">
                                Буцах
                            </span>
                            <div className="pl-2 h-full flex items-center border-l border-gray-300">
                                <i className="bi bi-backspace"></i>
                            </div>
                        </div>
                        <div className="!flex h-full items-center ">
                            <DatePicker
                                selected={value}
                                value={value}
                                onChange={date => setValue(date)}
                                className='form-control form-control-sm
                        !py-[7px] border-teal-500 !w-[150px] !bg-teal-500 !font-[500] text-white'
                                showTimeSelect
                                timeFormat='HH:mm'
                                timeIntervals={15}
                                timeCaption='time'
                                dateFormat='yyyy-MM-dd h:mm aa'
                            />
                            <DatePicker
                                selected={selectV}
                                value={selectV}
                                onChange={date => setSelectV(date)}
                                className='form-control form-control-sm
                        !py-[7px] border-teal-500 ml-2 !w-[150px] !bg-teal-500 !font-[500] 
                        text-white'
                                showTimeSelect
                                timeFormat='HH:mm'
                                timeIntervals={15}
                                timeCaption='time'
                                dateFormat='yyyy-MM-dd h:mm aa'
                            />

                        </div>

                    </div>
                    <div onClick={() => {
                        handleSubmit()
                    }} className="h-9 bg-teal-500 rounded-sm pl-3 flex items-center font-[400] text-white">
                        <span className="mr-2 mb-1 font-[400] text-white">
                            {filtered && filtered[0].roleName}
                        </span>
                        <div className="pl-2 h-full flex items-center border-l border-gray-300">
                            <span className="mr-2 mb-1 font-[400] text-white">
                                {filtered && filtered[0].lastName[0]}. {filtered && filtered[0].firstName}
                            </span>
                        </div>
                        <div className="pl-2 h-full flex items-center border-l border-gray-300 px-3
                        bg-green-500 cursor-pointer">
                            <span className="mr-2 mb-1 font-[400] text-white">
                                Хадгалах
                            </span>
                        </div>
                    </div>
                </div>
                <div className="px-4 pt-2">
                    {
                        template.categories.map((item, index) => (
                            <RatingProcess item={item} key={index} />
                        ))
                    }
                </div>
                <div className="h-12 w-full bg-red-100 fixed bottom-0">feafe</div>
            </div>
        </div>
    );
}

export default RatingIndividual;