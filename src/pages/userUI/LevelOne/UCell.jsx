import React from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';

function UCell() {
    const { showModal, setShowModal } = useStateContext()
    return (
        <div onClick={() => {
            setShowModal(!showModal)
        }} className='cellu rounded-lg px-3 py-2 mt-3 flex'>
            <div className=' h-full flex flex-col'>
                <span className='font-[500] whitespace-nowrap'>9р сарын үнэлгээ</span>
                <span>Г. Нармандах</span>
                <span>2022.09.09</span>
            </div>
            <div className='w-full h-full ml-5'>
                <span className='font-[500] whitespace-nowrap'>Үзүүлэлт</span>
                <div className='w-full mt-4 bg-green-600 h-[4px]'></div>
            </div>
            <div className=' h-full ml-5 flex flex-col'>
                <span className='font-[500] whitespace-nowrap'>Статус</span>
                <span>Сайн</span>
            </div>
        </div>
    );
}

export default UCell;