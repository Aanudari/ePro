import DatePicker from "react-datepicker";
import { useState } from "react";
function RatingHeader({ setSideMenu, sideMenu }) {
    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }
    const [selectV, setSelectV] = useState(new Date())
    const [value, setValue] = useState(new Date());
    var datestring = value.getFullYear() + "" + addZero((value.getMonth() + 1)) + addZero(value.getDate()) +
        addZero(value.getHours()) + addZero(value.getMinutes()) + addZero(value.getSeconds());
    return (
        <div className="w-full h-14 bg-gray-100 border-b-[2px] border-gray-300 shadow-sm flex justify-between
        items-center px-10">
            <div className="!flex h-full items-center ">
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
            <div className="h-9 bg-teal-500 rounded-sm px-3 flex items-center font-[400] text-white
            cursor-pointer active:bg-teal-400 ml-2">
                <span className="mr-2 mb-1 font-[400] text-white">
                    Тайлан
                </span>
                <div className="pl-2 h-full flex items-center border-l border-gray-300">
                <i className="bi bi-file-earmark-spreadsheet"></i>
                </div>
            </div>
            </div>
            <div onClick={() => {
                setSideMenu(!sideMenu)
            }} className="h-9 bg-teal-500 rounded-sm px-3 flex items-center font-[400] text-white
            cursor-pointer active:bg-teal-400 hover:bg-teal-600">
                <span className="mr-2 mb-1 font-[400] text-white">
                    Үнэлгээ үүсгэх
                </span>
                <div className="pl-2 h-full flex items-center border-l border-gray-300">
                    <i className="bi bi-ui-checks"></i>
                </div>
            </div>
        </div>
    );
}

export default RatingHeader;