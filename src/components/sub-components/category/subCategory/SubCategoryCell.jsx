import React from 'react';

function SubCategoryCell (subcategory) {
    return (
        <div  className='w-full hover:cursor-pointer h-20 hover:bg-gray-100 border rounded-md my-1 flex gap-2 justify-between items-center py-2 px-3'>
            <div className='w-1 flex items-center gap-2'>
                <div className='flex gap-2 ml-2'>
                    <span className='text-[14px]'>{subcategory.subcategory.id}</span>
                </div>
            </div>
            <div className='w-1/2 flex items-center gap-2'>
                <div className='flex gap-2 ml-2'>
                    <span className='text-[14px]'>{subcategory.subcategory.name}</span>
                </div>
            </div>
            <div className='w-20 flex items-center gap-2'>
                <div className='flex gap-2 ml-2'>
                    <span className='text-[14px]'>{subcategory.subcategory.maxPoints}%</span>
                </div>
            </div>
            <button className="btn btn-danger btn-sm">Delete subcategory</button>
        </div>
    );
}
  export default SubCategoryCell;
