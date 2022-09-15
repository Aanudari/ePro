import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';

function ValCell() {
    const { showTop, setShowTop } = useStateContext();
    console.log(showTop)
    return (
        <div className='borderx h-10 flex cursor-pointer'>
            <div className='h-full w-[170px] border-r font-[400] flex items-center justify-center certain-item hover:bg-[#f0f8ff] text-[14px]'>Нармандах</div>
            <div className='h-full w-[150px] border-r font-[400] flex items-center justify-center hover:bg-[#f0f8ff] text-[14px]'>IT</div>
            <div className='h-full w-[170px] border-r font-[400] flex items-center justify-center hover:bg-[#f0f8ff] text-[14px]'> 2022.09.16</div>
            <div className='h-full w-[170px] border-r font-[400] flex items-center justify-center bg-green-200 text-[14px]'>Хийгдсэн</div>
            <div onClick={() => {
                setShowTop(!showTop)
            }} className='h-full w-[170px] border-r font-[400] flex items-center justify-center hover:bg-[#f0f8ff] text-[14px]'>Сэтгэгдэл үзэх</div>
            <div className='h-full w-[200px] font-[400] flex items-center justify-center hover:bg-[#f0f8ff] text-[14px] overflow-hidden'>

                <a className='flex items-center no-underline font-[400] text-[14px]' href="mailto:">narmandakh.g@ddishtv.mn</a>

            </div>
        </div>
    );
}

export default ValCell;