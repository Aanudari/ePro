import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../../../contexts/ContextProvider';
import UserLayout from '../../../layout/UserLayout';
import { useNavigate } from 'react-router-dom';
import ExamCard from '../Exam/ExamCard';
function LevelOneUITakeExam() {
    const [data, setData] = useState();
    const [key, setKey] = useState('1');
    const navigate = useNavigate();
    const { TOKEN, readyCheck, setReadyCheck, examID, examName } = useStateContext();

    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: `${process.env.REACT_APP_URL}/v1/ExamNew`,
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
            <div className='flex min-h-[calc(100%-50px)] h-full core-bg-b'>
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
                                        )) : 
                                        <div>
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
                        <div className='p-3 body-bg-cus2 rounded-lg w-3/4 md:w-1/3'>
                            <div className='body-bg-cus rounded-lg px-2 md:px-10 py-4'>
                                <div className='flex flex-col items-center justify-center'>
                                <span className='text-white text-[18px] font-[500]'>
                                {examName}</span>
                                <p className='text-white text-[18px] font-[500] m-0'>
                                    Та энэ шалгалтыг өгөх дөө итгэлтэй байна уу. ?</p>
                                </div>
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
