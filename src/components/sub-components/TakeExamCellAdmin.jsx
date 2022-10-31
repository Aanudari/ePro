import React from 'react';
import { useNavigate } from 'react-router-dom';

function TakeExamCellAdmin({ data, index }) {
    const navigate = useNavigate();
    // console.log(data)
    return (
        <div className="w-[250px] h-[280px] rounded overflow-hidden 
        cursor-pointer
        shadow bg-gray-100 hover:shadow-lg">
            <img className="w-full h-[120px]" src="https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg?w=2000" alt="" />
            <div className="px-6 pt-4 ">
                <div className="font-bold text-[15px] mb-2">{data.name}</div>
                <p className="text-gray-700 text-base text-[14px] font-[400] m-0">
                    Нээх цаг : {data.startDate}
                </p>
                <p className="text-gray-700 text-base text-[14px] font-[400] m-0">
                    Хаах цаг : {data.expireDate}
                </p>
                <p className="text-gray-700 text-base font-[400]">

                </p>
            </div>
            <div className="px-3 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Хугацаа : {data.duration}мин</span>
            </div>
        </div>
    );
}

export default TakeExamCellAdmin;