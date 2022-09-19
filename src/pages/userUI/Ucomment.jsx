import React from 'react';

function UComment() {
    return (
        <div className='w-full h-[120px] border-t hover:bg-gray-50 hover:border-sky-100 p-2 flex'>
            <div className='w-[70px] h-full'>
                <img src="avatar2.jpg" className='rounded-full w-full' alt="" />
            </div>
            <div className='ml-4 w-full'>
                <h6>Админ</h6>
                <p>9н сарын үнэлгээ хийгдлээ. 9н сарын үнэлгээ хийгдлээ. Эхний хагасын 🥳 </p>
            </div>
        </div>
    );
}

export default UComment;