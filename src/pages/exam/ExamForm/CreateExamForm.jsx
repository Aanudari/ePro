import { useState } from "react";
import DateTimePicker from 'react-datetime-picker';


function CreateExamForm() {
    const [selectV, setSelectV] = useState()
    const [value, onChange] = useState(new Date());
    return (
        <div className="container-po ">
            <form className="form-form p-2 flex gap-5">

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
                    <div className="p-3"></div>
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
                <div className="">
                    <div className="flex flex-col ">
                        <span>Нээх цаг</span>
                        <DateTimePicker value={value} onChange={date => onChange(date)} timeFormat="HH:mm" />
                    </div>
                </div>



            </form>
        </div>
    );
}

export default CreateExamForm;