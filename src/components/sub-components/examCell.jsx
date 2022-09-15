import React, { useState } from 'react';

function ExamCell(data) {
    return (
        <div className='shadow-cus-2 p-2 flex justify-between px-4'>
            <span>

                {data.data.question}
            </span>
            <span>
                {data.data.points}
            </span>
        </div>
    );
}

export default ExamCell;