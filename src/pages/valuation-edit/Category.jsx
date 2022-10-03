import React from 'react';
import SubCategory from './SubCategory';


function Category(props) {
    return (
        <div className='mt-3 bg-white rounded-lg'>
            <div className='w-full h-14 flex items-center justify-between bg-[#0563af] rounded-t px-3 font-[400] text-white'>
                <span className='font-[500]'>{props.data.description}</span>
                <div className='w-[120px] flex gap-2'>
                    <span className='font-[300]'>Max Point:</span>
                    <span className='font-[300]'>100%</span>
                </div>
            </div>
            <div className='w-full flex flex-col'>
                {
                    props ? props.data.subCategory.map((item, index) => (
                        <SubCategory key={index} data={item} />
                    )) : null
                }
            </div>
        </div>
    );
}

export default Category;