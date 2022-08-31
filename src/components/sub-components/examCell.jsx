import React, {useState} from 'react';

function ExamCell() {
    const [correct, setCorrect] = useState(0);
    return (
        <div className='shadow-cus-2 w-full h-full p-2'>
            <div className=''>
                <span className='ml-1'>Асуулт: </span>
                <input type="text" className='w-full border mt-1 custom-input' autoFocus />
            </div>
            <div className='mt-2 ml-2 h-full'>
                <div className='flex justify-between'>
                    <span>Хариулт:</span>
                    <span className='mr-10'>Зөв Хариулт:</span>
                </div>
                <div className='flex items-center mt-1 h-full'>
                    <span>A.</span> <input type="text" className='custom-input ml-2 border' />
                    <div onClick={() => {
                        setCorrect(1)
                    }} className='w-10 ml-3 border h-[35px] rounded-cus flex items-center justify-center hover:bg-gray-200'>
                        {
                            correct === 1 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg> : null
                        }
                    </div>
                </div>
                <div className='flex items-center mt-1'>
                    <span>B.</span> <input type="text" className='custom-input ml-2 border' />
                    <div onClick={() => {
                        setCorrect(2)
                    }} className='w-10 ml-3 border h-[35px] rounded-cus flex items-center justify-center hover:bg-gray-200'>
                        {
                            correct === 2 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg> : null
                        }
                    </div>
                </div>
                <div className='flex items-center mt-1'>
                    <span>C.</span> <input type="text" className='custom-input ml-2 border' />
                    <div onClick={() => {
                        setCorrect(3)
                    }} className='w-10 ml-3 border h-[35px] rounded-cus flex items-center justify-center hover:bg-gray-200'>
                        {
                            correct === 3 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg> : null
                        }
                    </div>
                </div>
                <div className='flex items-center mt-1'>
                    <span>D.</span> <input type="text" className='custom-input ml-2 border' />
                    <div onClick={() => {
                        setCorrect(4)
                    }} className='w-10 ml-3 border h-[35px] rounded-cus flex items-center justify-center hover:bg-gray-200'>
                        {
                            correct === 4 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg> : null
                        }
                    </div>
                </div>
                <div className='flex items-center mt-1'>
                    <span>E.</span> <input type="text" className='custom-input ml-2 border' />
                    <div onClick={() => {
                        setCorrect(5)
                    }} className='w-10 ml-3 border h-[35px] rounded-cus flex items-center justify-center hover:bg-gray-200'>
                        {
                            correct === 5 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg> : null
                        }
                    </div>
                </div>
                <div className='w-full flex items-center justify-center h-full p-2'>
                    <button className='border px-2 py-1 rounded-md active:bg-green-300'>Хадгалах</button>
                </div>
            </div>
        </div>
    );
}

export default ExamCell;