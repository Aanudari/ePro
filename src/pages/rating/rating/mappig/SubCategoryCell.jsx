import React from 'react';
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../../contexts/ContextProvider";
import axios from "axios";

function SubCategoryCell (subcategory) {
    const subID = (subcategory.subcategory && subcategory.subcategory.id);
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const deleteSubCategory = () => {
        axios({
            method: "delete",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/Category/sub/${subID}`,
        })
            .then(
                res => {
                    if (res.data.isSuccess === true) {
                        navigate(0);
                    } else {
                        console.log(res.data.resultMessage)
                    }
                }
            )
            .catch(err => console.log(err))
    }
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
            <button className="btn btn-warning btn-sm"><i className="bi bi-hand-index-thumb"/></button>
            <button onClick={deleteSubCategory} className="btn btn-danger btn-sm"><i className="bi bi-trash"/></button>
        </div>
    );
}
  export default SubCategoryCell;
