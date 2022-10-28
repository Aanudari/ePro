import { useState } from "react";
import DateTimePicker from 'react-datetime-picker';


function CreateExamForm() {
    const [selectV, setSelectV] = useState(new Date())
    const [value, setValue] = useState(new Date());
    var datestring = value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate() + " " +
        value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();
    var datestring2 = selectV.getFullYear() + "-" + (selectV.getMonth() + 1) + "-" + selectV.getDate() + " " +
        selectV.getHours() + ":" + selectV.getMinutes() + ":" + selectV.getSeconds();
    const [duration, setDuration] = useState(0);
    const [role_id, setRole_id] = useState(0);
    const [exam_name, setExam_name] = useState('');
    const [count, setCount] = useState(0);
    const [showQuestionMenu, setshowQuestionMenu] = useState(false);
    // console.log(exam_name)
    // console.log(duration)
    // console.log(role_id)
    // console.log(datestring)
    // console.log(datestring2)
    let varients = []
    let question = {
        "id": "string",
        "name": "string",
        "questionList": [
            {
                "id": "string",
                "question": "string",
                "imgUrl": "string",
                "answerList": [
                    {
                        "id": "string",
                        "answer": "string",
                        "answerImgUrl": "string",
                        "isTrue": "string"
                    }
                ]
            }
        ]
    }
    for (let index = 0; index < count; index++) {
        varients.push(question)
    }
    // console.log(varients)
    return (
        <div className="container-po px-2 pt-2 pb-10 md:p-20">
            <form className="form-form p-2 flex flex-col md:flex-row gap-5 mt-4 w-full justify-around">
                {
                    showQuestionMenu ? 
                    <div>
                        {
                            varients && 
                            varients.map((element, index) => (
                                <button className="bg-[#50a3a2] text-white px-4 py-3 rounded hover:scale-105 
                                transition ml-1 mt-1">{index}</button>
                            ))
                        }
                        {
                            varients && 
                            varients.map((item, index) => (
                                <div key={index}>{JSON.stringify(index)}</div>
                            ))
                        }
                    </div> :
                <div className="form-form p-2 flex flex-col md:flex-row gap-5 mt-4 w-full justify-around">
                <div>
                    <div className="group">
                        <input onChange={(e) => {
                            setExam_name(e.target.value)
                        }} type="text" required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Шалгалтын нэр</label>
                    </div>

                    <div className="group">
                        <input onChange={(e) => {
                            setDuration(e.target.value)
                        }} type="number" required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Үргэлжлэх хугацаа</label>
                    </div>
                    <div className="p-0 md:p-3"></div>
                    <div className="select-con">
                        <div className="select">
                            <select onChange={(e) => {
                                setRole_id(e.target.value)
                            }} name="format" id="format" required>
                                <option >Категори</option>
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
                        <DateTimePicker className={''} value={value} onChange={date => setValue(date)} timeFormat="HH:mm" />
                        {/* <TimePicker/> */}
                    </div>
                    <div className="flex flex-col mt-5">
                        <span className="font-[500] text-gray-500">Хаах цаг :</span>
                        <DateTimePicker value={value} onChange={date => setSelectV(date)} timeFormat="HH:mm" />
                        {/* <TimePicker/> */}
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                    <div className="group">
                        <input onChange={(e) => {
                            setCount(e.target.value)
                        }} type="number" required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Асуултын тоо</label>
                    </div>
                    <button onClick={(e) => {
                        setshowQuestionMenu(true)
                        console.log('button')
                    }} className="cus-btn hover:shadow">
                        Үүсгэх
                    </button>
                </div>
                </div>
                }
            </form>
        </div>
    );
}

export default CreateExamForm;