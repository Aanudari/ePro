import { useState } from "react";
import DateTimePicker from 'react-datetime-picker';


function CreateExamForm() {
    const [selectV, setSelectV] = useState(new Date())
    const [value, setValue] = useState(new Date());
    var datestring = value.getFullYear()  + "-" + (value.getMonth()+1) + "-" + value.getDate() + " " +
value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();
    var datestring2 = selectV.getFullYear()  + "-" + (selectV.getMonth()+1) + "-" + selectV.getDate() + " " +
selectV.getHours() + ":" + selectV.getMinutes() + ":" + selectV.getSeconds();
    return (
        <div className="container-po pl-2 pr-2 pt-2 pb-10">
            <form className="form-form p-2 flex flex-col md:flex-row gap-5 mt-2">

                <div>
                    <div className="group">
                        <input type="text" required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Шалгалтын нэр</label>
                    </div>

                    <div className="group">
                        <input type="number" required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Үргэлжлэх хугацаа</label>
                    </div>
                    <div className="p-0 md:p-3"></div>
                    <div className="select-con">
                        <div className="select">
                            <select name="format" id="format" required>
                                <option disabled>Категори</option>
                                <option value="188">Branch</option>
                                <option value="208">Installer</option>
                                <option value="1">Level1</option>
                                <option value="3">Care</option>
                                <option value="7">Bank</option>
                                <option value="168">Telesales</option>
                                <option value="4">Complain</option>
                                <option value="5">Online</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="h-full">
                    <div className="flex flex-col ">
                        <span className="font-[500] text-gray-500">Нээх цаг :</span>
                        <DateTimePicker value={value} onChange={date => setValue(date)} timeFormat="HH:mm" />
                        {/* <TimePicker/> */}
                    </div>
                    <div className="flex flex-col mt-5">
                        <span className="font-[500] text-gray-500">Хаах цаг :</span>
                        <DateTimePicker value={value} onChange={date => setSelectV(date)} timeFormat="HH:mm" />
                        {/* <TimePicker/> */}
                    </div>
                </div>



            </form>
        </div>
    );
}

export default CreateExamForm;