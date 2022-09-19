import React from 'react';
import UCell from './UCell';
import UComment from '../Ucomment';

function LevelOneUI() {
    return (
        <div className='w-full bg-[#f3f6fd] h-full p-4'>
            <div className='w-full h-[70px]'></div>
            <div className='w-full h-full flex justify-around'>
                <div className='bg-white rounded-cus h-[600px] w-7/12 h-full shadow-sm'>
                    <div className='w-full h-[150px] py-4 px-10 border-b'>
                        <div className='flex justify-between'>
                            <h4 className='text-[20px] font-[600]'>Үнэлгээнүүд</h4>
                            <h4 className='text-[20px] font-[600]'>2022, 09, 16</h4>
                        </div>
                        <div className='w-full flex gap-4 mt-2'>
                            <div className=''>
                                <h4 className='m-0 text-[20px] font-[600]'>45</h4>
                                <span>In progress</span>
                            </div>
                            <div>
                                <h4 className='m-0 text-[20px] font-[600]'>24</h4>
                                <span>Upcoming</span>
                            </div>
                            <div>
                                <h4 className='m-0 text-[20px] font-[600]'>62</h4>
                                <span>Total</span>
                            </div>
                        </div>
                    </div>
                    <div className='h-[450px] w-full px-10'>
                        <div className='w-full h-[450px] overflow-scroll'>
                            <UCell />
                            <UCell />
                            <UCell />
                            <UCell />
                            <UCell />
                            <UCell />
                            <UCell />
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-cus h-[600px] w-4/12 h-full shadow-sm'>
                    <div className='h-[80px] w-full px-4 py-4 border-b'>
                        <h4 className='text-[20px] font-[600]'>Сэтгэгдэл</h4>
                    </div>
                    <div className='h-[520px] w-full overflow-scroll'>
                        <UComment />
                        <UComment />
                        <UComment />
                        <UComment />
                        <UComment />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LevelOneUI;