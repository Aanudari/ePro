import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function UserCell(data) {
    let navi = useNavigate()
    let location = useLocation();
    let lastName = data.data.lastName.slice(0, 1);
    const handleEdit = () => {
        navi(`${location.pathname}-edit`, { state: { data: data.data, firstName: data.data.firstName } })
    }
    return (
        <div onClick={handleEdit} className="cus-buttons2 ">
            <div className="">
                <div className=' w-[170px] md:w-[303px] h-[200px] hover:shadow-lg raise2
                p-2 shadow
            '>
                <div className='h-[50px] w-full flex'>
                    <img src="user2.png"  className='h-[50px]' alt="" />
                    <div className='w-full flex items-center justify-end '>
                        <h6 className='mb-0 ml-[2px] md:ml-5 text-white'> {lastName}. {data.data.firstName}</h6>
                    </div>
                </div>
                    <p className='text-white m-0 text-[13px] flex justify-between'>
                        <span className='m-0'>
                        Role name:
                        </span>
                        <span className='m-0'>
                        {data.data.roleName}
                        </span>
                    </p>
                    <p className='text-white m-0 text-[13px] flex justify-between'>
                        <span className='m-0'>
                        Worker Level:
                        </span>
                        <span className='m-0'>
                        {data.data.workerLevel}
                        </span>
                    </p>
                    <p className='text-white m-0 text-[13px] flex justify-between'>
                        <span className='m-0'>
                        Organization:
                        </span>
                        <span className='m-0'>
                        {data.data.organizationUnitId}
                        </span>
                    </p>
                    <p className='text-white m-0 text-[13px] flex justify-between'>
                        <span className='m-0'>
                        Эхлэл огноо:
                        </span>
                        <span className='m-0 '>
                        2022/10/10
                        </span>
                    </p>
                    <p className='text-white m-0 text-[13px] flex justify-between'>
                        <span className='m-0'>
                        Дуусах огноо:
                        </span>
                        <span className='m-0 '>
                        2022/12/01
                        </span>
                    </p>
                    <p className='text-white m-0 text-[13px] flex justify-between'>
                        <span className='m-0'>
                        Үнэлгээний нэр:
                        </span>
                        <span className='m-0 '>
                        not yet
                        </span>
                    </p>
                    <p className='text-white m-0 text-[13px] flex justify-between'>
                        <span className='m-0'>
                        Статус:
                        </span>
                        <span className='m-0 bg-red-400 px-2 rounded text-black'>
                        not yet
                        </span>
                    </p>
                </div>
            </div>
        </div>
        // </div>
    );
}

export default UserCell;
