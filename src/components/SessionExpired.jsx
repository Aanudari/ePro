import React from 'react';

function SessionExpired(props) {
    const refresh = () => {
        window.location.reload();
    }
    return (
        <div className='fixed top-0 left-0 w-screen h-screen flex front-et justify-center items-center linear'>
            <div className='font-[500] w-[800px] h-[500px] rounded shadow bg-white flex justify-start items-center flex-col p-5'>
                <div>
                    <img src="software-testing.png" className='w-[200px]' alt="" />
                </div>
                <h4 className='text-gray-500 mt-3'>Нэвтрэх эрхийн хүчинтэй хугацаа дууслаа.</h4>
                <p className='text-gray-500 mt-3'>Та сэргээх товчыг дарж нэвтрэх эрхийн хугацааг сунгана уу.</p>
                <button onClick={refresh} className='rounded-full px-4 h-10 bg-sky-500 text-white linear active:scale-105 transition'>
                    <span className=''>Token сэргээх</span>
                </button>
                <p>{props.time}</p>
            </div>
        </div>
    );
}

export default SessionExpired;