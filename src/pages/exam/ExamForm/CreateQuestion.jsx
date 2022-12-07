import React, { useEffect, useState } from 'react';
import CreateAnswer from './CreateAnswer';
import ImageOption from './ImageOptions';
import ImageUploader from './ImageUploader';
function CreateQuestion({ index, valid, handleChange, countNum, listNum, pointStatus }) {
    const [answerSchema, setAnswerSchema] = useState({
        "answer": "",
        "answerImgUrl": "",
        "isTrue": ''
    });
    const [store, setStore] = useState([]);
    const [answer, setAnswer] = useState('');
    const [point, setPoint] = useState(0);
    const [count, setcount] = useState(0);
    const [showAnswerMenu, setShowAnswerMenu] = useState(false);
    const [imageMenu, setImageMenu] = useState(false);
    const [imageValue, setImageValue] = useState();
    const generateAnswers = (key) => {
        let arr = []
        for (let index = 0; index < key; index++) {
            arr.push(answerSchema)
        }
        setStore(arr)
    }
    const [status, setStatus] = useState(0);
    const [value, setValue] = useState(0);
    const handleRadio = (someKey) => {
        setStatus(someKey)
    }
    const [checkEmpty, setcheckEmpty] = useState([]);
    const uniqueList = [... new Set(checkEmpty)]
    const handleStore = (inputValue, indexZ, radioSelected) => {
        let arr = store
        let newStore = arr?.map((item, index) =>
            (index === indexZ) ? ({ ...item, answer: inputValue, isTrue: '0' }) : item
        )
        let itemChecked = newStore.map((e, i) =>
            (radioSelected === i) ? ({ ...e, isTrue: '1' }) : e
        )
        setcheckEmpty(prev => [...prev, indexZ])
        setStore(itemChecked)
    }

    const [noti_answer, setNoti_answer] = useState(false);
    const [noti_count, setNoti_count] = useState(false);
    const [noti_store, setnoti_store] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setnoti_store(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [noti_store]);
    const handleValidation = (event) => {
        event.preventDefault();
        if (answer === "") {
            setNoti_answer(true)
        }
        if (count === 0) {
            setNoti_count(true)
        }
        if (!uniqueList.includes(0 && 1 && 2 && 3)) {
            setnoti_store(true)
        }
        if (count !== "" && answer !== 0 && uniqueList.includes(0 && 1 && 2 && 3)) {
            handleChange(answer, index - 1, store)
        }
    }

    return (
        <div className={valid === index ? "block" : "hidden"}>
            {
                noti_store &&
                <div className='fixed md:absolute w-full h-screen md:h-[calc(100vh-112px)]
                bg-black bg-opacity-50 top-0 left-0 z-10'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className='w-2/3 md:w-1/3 h-1/3 flex flex-col justify-center
                        items-center bg-[#50a3a2] text-white p-4 md:p-10
                        '>
                            <i class="bi bi-exclamation-circle text-[40px]"></i>
                            <h6 className='font-bold'>Асуулт, хариултын утгыг бүрэн оруулна уу!</h6>
                        </div>
                    </div>
                </div>
            }


            <div className="mt-10 px-4">
                <div className="group2 w-full">
                    <input
                        className={noti_answer ? 'custom-validation' : ""}
                        onChange={(e) => {
                            setAnswer(e.target.value)
                            setNoti_answer(false)
                        }}
                        type="text" required/>
                    {
                        noti_answer &&
                        <i className="bi bi-exclamation-lg text-2xl text-red-500
                                    animate-bounce absolute top-[10px] left-[-15px]"></i>
                    }
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className=''>Асуулт {index}</label>
                </div>
                <ImageOption setImageValue={setImageValue}/>
                {
                    imageValue?.value == "image" &&
            <ImageUploader/>
                }

                {
                    pointStatus.value === "fixed" &&
                <div className="group">
                    <input className={noti_answer ? 'custom-validation' : ""}
                        // onChange={(e) => {
                        //     setExam_name(e.target.value)
                        //     setNoti_examName(false)
                        // }}
                        type="number" required/>
                    {
                        noti_answer &&
                        <i className="bi bi-exclamation-lg text-2xl text-red-500
                                    animate-bounce absolute top-[10px] left-[-15px]"></i>
                    }
                    <span className="highlight"></span>
                    <span className="bar "></span>
                    <label className="">Оноо (%)</label>
                </div>
                }

                <div className="group">
                    <input onChange={(e) => {
                        setcount(e.target.value)
                        setNoti_count(false)
                        generateAnswers(e.target.value)
                    }} type="number" required
                        className={noti_count ? 'custom-validation' : ""}
                    />
                    {
                        noti_count &&
                        <i className="bi bi-exclamation-lg text-2xl text-red-500
                                    animate-bounce absolute top-[10px] left-[-15px]"></i>
                    }
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Хариултын тоо</label>
                </div>
                {
                    store?.map((element, index) => (
                        <CreateAnswer key={index} index={index} data={element}
                            value={value} setValue={setValue} handleStore={handleStore}
                            handleRadio={handleRadio} setnoti_store={setnoti_store}
                        />
                    ))
                }
                {
                    countNum != listNum ?
                        <div className='w-full flex justify-center'>
                            <div className="cus-buttons">
                                <div className="buttons">
                                    <button
                                        onClick={(e) => {
                                            handleValidation(e)
                                        }}
                                        className="raise">Хадгалах</button>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>
    );
}

export default CreateQuestion;
