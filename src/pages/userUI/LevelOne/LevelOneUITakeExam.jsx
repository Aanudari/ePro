import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import TakeExamCell from '../../../components/sub-components/TakeExamCell';
import { useStateContext } from '../../../contexts/ContextProvider';
import ReadyCheck from '../../../components/sub-components/ReadyCheck';
import UserLayout from '../../../layout/UserLayout';
import { useNavigate } from 'react-router-dom';
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
            <div className='flex h-screen '>
                <div className="relative h-full w-[230px] hidden md:block">
                    <ul className="sidebar">
                        <li onClick={() => {
                            setKey("1")
                        }}><a href="#">Шалгалт өгөх</a></li>
                        <li onClick={() => {
                            setKey("2")
                        }}><a href="#">Суваг нэмэх</a></li>
                        <li onClick={() => {
                            setKey("3")
                        }}><a href="#">Өөрчлөлт оруулах</a></li>
                        <li onClick={() => {
                            setKey("4")
                        }}><a href="#">Цэс</a></li>
                    </ul>
                </div>
                <div className='px-5 py-3'>

                    <div className="flex flex-col">
                        <div className="">
                            <div className=" w-full inline-block align-middle">
                                <div className="overflow-hidden border rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                >
                                                    ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                >
                                                    Нэр
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                >
                                                    Нээх цаг
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                                >
                                                    Хаах Цаг
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                                >
                                                    Хугацаа
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                                >
                                                    Статус
                                                </th>
                                            </tr>
                                        </thead>
                                        {
                                            data ? data.map((item, index) => (
                                                <TakeExamCell key={index} data={item} />
                                            )) : <tbody>
                                                <tr>
                                                    <td>
                                                        Идэвхитэй шалгалт байхгүй байна.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    readyCheck && <div className='h-screen flex justify-center items-center w-full top-0 left-0 fixed z-10 bg-black bg-opacity-50'>
                        <div className='w-1/3  bg-white rounded px-3 py-2'><span>Та "<strong>{examID}</strong>" ID дугаартай шалгалт эхлүүлэхдээ итгэлтэй байна уу. ?</span>
                            <div className='flex justify-end mt-2'>
                                <button onClick={() => {
                                    navigate('/exam-init', {state : examID})
                                    setReadyCheck(false)
                                }} className='bg-green-500 px-3 py-1 rounded text-white font-[400] text-[12px]'>Тийм</button>
                                <button onClick={() => {
                                    setReadyCheck(false)
                                }} className='bg-red-500 px-3 py-1 rounded text-white font-[400] ml-2 text-[12px]'>Үгүй</button>
                            </div></div>
                    </div>
                }
            </div>

        </UserLayout>

    );
}

export default LevelOneUITakeExam;
