import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function UserCell(data) {
    // data дотор тухайн нэг ажилтан ий мэдээлэл дамжуулагдав
    console.log(data)
    let navi = useNavigate()
    let location = useLocation();
    let lastName = data.data.lastName.slice(0, 1)
    const handleEdit = () => {
        navi(`${location.pathname}-edit`, { state: { deviceId: data.data.deviceId, firstName: data.data.firstName } })
    }
    return (
        <div onClick={handleEdit} className='w-full hover:cursor-pointer h-20 hover:bg-gray-100 border rounded-md my-1 flex gap-2 justify-between items-center py-2 px-3'>
            <div className='w-1/3 flex items-center gap-2'>
                <div className='w-16 h-16 bg-red-100 rounded-full overflow-hidden'>
                    <img src="avatar2.jpg" alt="" className='w-16' />
                </div>
                <div className='flex gap-2 ml-2'>
                    <span className='text-[14px]'>{lastName}.</span>
                    <span className='text-[14px]'>{data.data.firstName}</span>
                </div>
            </div>
            <div>
                <span>{data.data.roleName}</span>
            </div>
            <div>
                <div className='w-[15px] h-[15px] bg-red-400 rounded-full'></div>
            </div>
            <div>
                <div className='flex items-center'>
                   <i className="bi bi-clipboard"/>
                    <span className='ml-2'>Үнэлгээ оруулах</span>
                </div>
            </div>
        </div>
    );
}

export default UserCell;
