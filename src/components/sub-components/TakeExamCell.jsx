import React from 'react';

function TakeExamCell() {
    return (
        <div className='relative w-full shadow py-3 px-3 cellt font-[400] flex justify-between'>
            <div className='font-[400] flex flex-col'>
                <div>
                    <span className='font-[500]'>Шалгалтын нэр:</span> СХМ шалгалт 2022-09 сар /CC өглөө ээлж, telesales/
                </div>
                <div>
                    <span className='font-[500]'>Огноо:</span> 2022-9-25
                </div>
            </div>
            <div className='font-[400] flex justify-start gap-2'>
                <div>
                    <span className='font-[500]'>Эхлэх цаг:</span> 	08:30:00
                </div>
                <div>
                    <span className='font-[500]'>Хаах цаг:</span> 09:00:00
                </div>
                <div>
                    <span className='font-[500]'>Үргэлжлэх хугацаа:</span> 09:00:00
                </div>
            </div>
            <div className='font-[400] flex justify-start gap-2'>
                <div>
                    <span className='font-[500]'>Үүсгэсэн ажилтан:</span> 	Чулуунцэцэг Нямдорж
                </div>
            </div>
        </div>
    );
}

export default TakeExamCell;