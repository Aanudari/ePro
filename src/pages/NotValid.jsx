import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';


function NotValid() {
    const {error, setError} = useStateContext();

    return (
        <div className='fixed top-0 w-screen h-screen front-eth glass transition flex flex-col justify-center items-center p-5'>
            <span className='font-[500] cursor-default hover:scale-105 transition '>
                Алдаа гарлаа
            </span>
            <button onClick={() => {
                setError(false)
            }} className='mt-5 px-5 py-2 rounded font-[500] bg-cyan-600 hover:scale-105 transition' >Refresh</button>
        </div>
    );
}

export default NotValid;