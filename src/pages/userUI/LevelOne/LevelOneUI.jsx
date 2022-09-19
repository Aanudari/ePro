import React, { useState } from 'react';
import UCell from './UCell';
import UComment from '../Ucomment';
import { useStateContext } from '../../../contexts/ContextProvider';

function LevelOneUI() {
    const { showModal, setShowModal } = useStateContext();
    const [showComment, setshowComment] = useState(false);
    const d = new Date();
    console.log()
    return (
        <div className='w-full bg-[#f3f6fd] h-full p-4'>
            <div className='w-full h-[70px]'></div>
            <div className='w-full h-full flex justify-around'>
                <div className='bg-white rounded-cus h-[600px] w-7/12 h-full shadow-sm'>
                    <div className='w-full h-[150px] py-4 px-10 border-b'>
                        <div className='flex justify-between'>
                            <h4 className='text-[20px] font-[600]'>Үнэлгээнүүд</h4>
                            <h4 className='text-[20px] font-[600]'>{d.getFullYear()}, {d.getMonth() + 1}, {d.getDate()}</h4>
                        </div>
                        <div className='w-full flex gap-4 mt-2'>
                            <div className=''>
                                <h4 className='m-0 text-[20px] font-[600]'>45</h4>
                                <span>Нийт</span>
                            </div>
                            <div>
                                <h4 className='m-0 text-[20px] font-[600]'>24</h4>
                                <span>Мэдэгдэл</span>
                            </div>
                            <div>
                                <h4 className='m-0 text-[20px] font-[600]'>62</h4>
                                <span>Сэтгэгдэл</span>
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
                <div className='bg-white rounded-cus h-[600px] w-4/12 h-full shadow-sm '>
                    <div className='h-[80px] w-full px-4 py-4 border-b'>
                        <h4 className='text-[20px] font-[600]'>Мэдэгдэл</h4>
                    </div>
                    <div className='h-[500px] w-full overflow-scroll'>
                        <UComment />
                        <UComment />
                        <UComment />
                        <UComment />
                        <UComment />
                    </div>
                </div>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Үнэлгээний дэлгэрэнгүй
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        I always felt like I could do anything. That’s the main
                                        thing people are controlled by! Thoughts- their perception
                                        of themselves! They're slowed down by their perception of
                                        themselves. If you're taught you can’t do anything, you
                                        won’t do anything. I was taught I could do everything.
                                    </p>
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        I always felt like I could do anything. That’s the main
                                        thing people are controlled by! Thoughts- their perception
                                        of themselves! They're slowed down by their perception of
                                        themselves. If you're taught you can’t do anything, you
                                        won’t do anything. I was taught I could do everything.
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-[#55b2d3] mr-3 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false)
                                            setshowComment(true)
                                        }}
                                    >
                                        Сэтгэгдэл үлдээх
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Буцах
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            {showComment ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Сэтгэгдэл
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <textarea className='p-3 text-[20px]' name="" id="" cols="70" rows="5" autoFocus></textarea>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-[#55b2d3] mr-3 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setshowComment(false)}
                                    >
                                        Хадгалах
                                    </button>
                                    <button
                                        className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setshowComment(false)}
                                    >
                                        Цуцлах
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
}

export default LevelOneUI;