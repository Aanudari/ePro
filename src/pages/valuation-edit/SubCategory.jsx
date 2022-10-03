import React from 'react';

function SubCategory(props) {
    return (
        <div className='border w-full flex justify-between pl-3 box items-center'>
            <span className=''>{props.data.description}</span>
            <select name="" id="" className=''>
                <option value="">0</option>
                <option value="">{props.data.maxPoints}%</option>
            </select>
        </div>
    );
}

export default SubCategory;