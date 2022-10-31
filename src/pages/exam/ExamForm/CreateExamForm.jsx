import { useEffect } from "react";
import { useState, useRef } from "react";
import DateTimePicker from 'react-datetime-picker';
import CreateQuestion from "./CreateQuestion";


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
    const [varSelect, setVarSelect] = useState('');
    const [count, setCount] = useState(0);
    const [showQuestionMenu, setshowQuestionMenu] = useState(false);
    const [key, setKey] = useState(1);

    const [question, setQuestion] = useState({
        "question": ``,
        "imgUrl": "string",
        "answerList": []
    });
    const [variants, setVariants] = useState({
        "name": `${varSelect}`,
        "questionList": []
    });
    const [exam, setExam] = useState({
        "examName": `${exam_name}`,
        "startDate": `${datestring}`,
        "expireDate": `${datestring2}`,
        "duration": `${duration}`,
        "roleId": `${role_id}`,
        "variants": []
      });
    const handleChange = (value, indexX ) => {
        let arr = variants
        let newQuestions = arr.questionList?.map((item, index) => 
        (index === indexX) ? ({...item, question: value}) : item
        )
        setVariants({
            "name": `${varSelect}`,
            "questionList": [...newQuestions]
        });
    }
    const handleCreateExam = () => {
        let arr = []

        for (let index = 0; index < count; index++) {
            arr.push(question)
        }
        setVariants((prev) => ({...prev, questionList : arr }))
    }
    useEffect(() => {
        setExam((prev) => ({...prev, variants : variants}))
    }, [variants])
    // console.log(exam)
    // console.log(exam_name)
    // console.log(duration)
    // console.log(role_id)
    // console.log(count)
    // console.log(datestring)
    // console.log(datestring2)
    return (
        <div className="container-po px-2 pt-2 pb-10 md:p-20">
            <form className="form-form p-2 flex flex-col md:flex-row gap-5 mt-4 w-full justify-around">
                {
                    showQuestionMenu ?
                        <div className="w-full">
                            {
                                variants && variants.questionList &&
                                variants?.questionList?.map((element, index) => (
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        setKey(index + 1)
                                    }} key={index} className="bg-[#50a3a2] text-white px-4 py-3 rounded 
                                    hover:scale-105 
                                transition ml-1 mt-1">{index + 1}</button>
                                ))
                            }
                            {
                                variants && variants.questionList &&
                                variants?.questionList?.map((item, index) =>(
                                    <CreateQuestion key={index} index={index + 1}
                                    handleChange={handleChange}
                                    
                                     valid={key} />
                                ))
                            }
                            {/* <div className="w-full mt-10">
                                    
                                </div> */}
                            
                        </div> :
                        <div className="form-form p-2 flex flex-col md:flex-row gap-5 mt-4 w-full items-center">
                            <div className="w-full md:w-1/2 pl-0 md:pl-20">
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
                                <div className="group">
                                    <input onChange={(e) => {
                                        setCount(e.target.value)
                                    }} type="number" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Асуултын тоо</label>
                                </div>
                                <div className="group">
                                    <input onChange={(e) => {
                                        setVarSelect(e.target.value)
                                    }} type="text" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Вариант </label>
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
                            <div className="h-full w-full md:w-1/2 pr-0 md:pr-20">
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
                                <div className="w-full mt-10">
                                    <button onClick={(e) => {
                                        setshowQuestionMenu(true)
                                        handleCreateExam()
                                    }} className="cus-btn hover:shadow mt-5">
                                        Үүсгэх
                                    </button>
                                </div>
                            </div>

                        </div>
                }
            </form>
        </div>
    );
}

export default CreateExamForm;