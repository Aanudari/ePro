import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TakeExamCell from '../../../components/sub-components/TakeExamCell';
function LevelOneUITakeExam() {
    const [data, setData] = useState();
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: "http://192.168.10.248:9000/api/Exam",
        })
            .then(
                res => {
                    setData(res.data.result)
                }
            )
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='w-full bg-[#f3f6fd] h-full p-4'>
            <div className='w-full h-[70px]'></div>
            <div className='w-full h-full flex justify-around'>
                <div className='bg-white rounded-cus h-[600px] w-7/12 h-full shadow-sm'>
                    <div className='w-full h-[150px] py-4 px-10 border-b'>
                        <div className='flex justify-between'>
                            <h4 className='text-[20px] font-[600]'>Идэвхитэй шалгалтууд</h4>
                        </div>
                {
                    data ? data.map((item, index) => (
                        <TakeExamCell key={index} data={item} />
                    )) : <div>Идэвхитэй шалгалт байхгүй байна.</div>
                }
                    </div>
                </div>
                <div className='bg-white rounded-cus h-[600px] w-4/12 h-full shadow-sm px-2'>
                    <div className='h-[80px] w-full px-4 py-4 border-b'>
                        <h4 className='text-[20px] font-[600]'>Шалгалтын дүнгүүд</h4>
                    </div>
                    <div className='h-[500px] w-full overflow-scroll'>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default LevelOneUITakeExam;
