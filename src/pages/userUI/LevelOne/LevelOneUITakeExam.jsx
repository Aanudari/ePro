import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import TakeExamCell from '../../../components/sub-components/TakeExamCell';
import { useStateContext } from '../../../contexts/ContextProvider';
import ReadyCheck from '../../../components/sub-components/ReadyCheck';
import UserLayout from '../../../layout/UserLayout';
import { useNavigate } from 'react-router-dom';
import ExamCard from '../Exam/ExamCard';
function LevelOneUITakeExam() {
    const [data, setData] = useState();
    const [questions, setquestions] = useState();
    const [key, setKey] = useState('1');
    const navigate = useNavigate();
    const { TOKEN, readyCheck, setReadyCheck, examID } = useStateContext();
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: "http://192.168.10.248:9000/v1/Exam",
        })
            .then(
                res => {
                    setData(res.data.examList)
                }
            )
            .catch(err => console.log(err))
    }, [])
    return (
        <UserLayout>
            <div className='flex h-full core-bg-b'>
                <div className="relative h-full w-[230px] hidden md:block ">
                    <ul className="sidebar">
                        <li onClick={() => {
                            setKey("1")
                        }}><a href="#">Шалгалт өгөх</a></li>
                        <li onClick={() => {
                            setKey("2")
                        }}><a href="#">Өөрчлөлт оруулах</a></li>
                        <li onClick={() => {
                            setKey("3")
                        }}><a href="#">Цэс</a></li>
                        <li onClick={() => {
                            setKey("4")
                        }}><a href="#">Цэс</a></li>
                    </ul>
                </div>
                <div className='px-5 py-3'>
                    <div className="">
                        <div className="">
                            <div className=" w-full inline-block align-middle">
                                <div className='flex gap-4 flex-wrap md:pl-10'>

                                    {
                                        data ? data.map((item, index) => (
                                            <ExamCard key={index} data={item} />
                                        )) : <div>

                                            Идэвхитэй шалгалт байхгүй байна.

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    readyCheck &&
                    <div className='h-screen flex justify-center items-center w-full top-0 left-0 fixed z-10 bg-black bg-opacity-50'>
                        <div className='p-3 body-bg-cus2 rounded-lg'>
                            <div className='body-bg-cus rounded-lg px-10 py-4'><span className='text-white text-[18px] font-bold'>Та "<strong>{examID}</strong>" ID дугаартай шалгалт эхлүүлэхдээ итгэлтэй байна уу. ?</span>
                                <div className='flex justify-end'>
                                    <button onClick={() => {
                                        navigate('/exam-init', { state: examID })
                                        setReadyCheck(false)
                                    }} className='intro-button'>Тийм</button>
                                    <button onClick={() => {
                                        setReadyCheck(false)
                                    }} id={"intro-bg"} className='intro-button ml-2'><i className="bi bi-x-lg"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </UserLayout>

    );
}

export default LevelOneUITakeExam;
