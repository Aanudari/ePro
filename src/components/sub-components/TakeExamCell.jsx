import React from 'react';
import { useNavigate } from 'react-router-dom';

function TakeExamCell(data) {
    const navigate = useNavigate()
    return (
        <div onClick={() => {
            navigate('/exam')
        }} className='relative w-full shadow py-3 px-3 cellt font-[400] flex justify-between'>
            <div className='font-[400] flex flex-col'>
                <div>
                    <span className='font-[500]'>Шалгалтын нэр:</span> {data.data.name}
                </div>
                <div>
                    <span className='font-[500]'>Огноо:</span> {data.data.createdDate}
                </div>
            </div>
            <div className='font-[400] flex flex-col gap-2'>
                <div>
                    <span className='font-[500]'>Эхлэх цаг:</span> 	{data.data.openDate}
                </div>
                <div>
                    <span className='font-[500]'>Хаах цаг:</span> {data.data.closedDate}
                </div>

            </div>
            <div className='font-[400] flex flex-col justify-start gap-2'>
                <div>
                    <span className='font-[500]'>Үргэлжлэх хугацаа:</span> {data.data.duration}
                </div>
                <div>
                    <span className='font-[500]'>Үүсгэсэн ажилтан:</span> 	Чулуунцэцэг Нямдорж
                </div>
            </div>
        </div>
    );
}

export default TakeExamCell;