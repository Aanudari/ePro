import React from 'react';
import { useNavigate } from "react-router-dom";

function UserCell(data) {
    // data дотор тухайн нэг ажилтан ий мэдээлэл дамжуулагдав
    let navi = useNavigate()
    let lastName = data.data.lastName.slice(0, 1)
    const handleEdit = () => {
        navi("/level-one-edit", { state: { deviceId: data.data.deviceId, firstName: data.data.firstName } })
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                    >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                    </svg>
                    <span className='ml-2'>Үнэлгээ оруулах</span>
                </div>
            </div>
        </div>
    );
}

export default UserCell;