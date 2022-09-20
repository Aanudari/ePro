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
        <div className='w-full bg-[#f3f6fd] h-full px-4'>
            <div className='w-full h-[70px]'></div>

            <div className='w-9/12 h-full p-3 flex flex-col gap-2'>
                <h6>Идэвхитэй шалгалтууд</h6>
                {
                    data ? data.map((item, index) => (
                        <TakeExamCell key={index} data={item} />
                    )) : <div>Идэвхитэй шалгалт байхгүй байна.</div>
                }
            </div>


        </div>
    );
}

export default LevelOneUITakeExam;