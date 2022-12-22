import { useState } from "react";
import RatingModalMain from "../modal/RatingModalMain";

function RatingUserCell({ data }) {
    const [showModal, setShowModal] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    // console.log(data)
    const handleModal = (value) => {
        setShowModal(true)
        setDeviceId(value)
    }
    return (
        <div className="h-10 w-full text-white bg-teal-500 mb-1 flex items-center pl-3 justify-between shadow-sm hover:!text-gray-700">
            <div className="min-w-[250px] flex justify-between">
                <span className="font-[500] text-[12px] ">
                    {data.username}
                </span>
                <div className="h-full flex items-center">
                <span className="font-[500] text-[12px] ">
                    {data.roleName}
                </span>
                </div>
            </div>
            <div className="h-full flex">
                <div onClick={() => {
                    handleModal(data.deviceId)
                }} className="font-[500] text-[12px] min-w-[150px] bg-violet-500 h-full
                flex items-center justify-center border-r-[2px] cursor-pointer active:bg-violet-400">
                    Үнэлгээ хийх
                </div>
                <div className="font-[500] text-[12px] min-w-[150px] bg-emerald-500 h-full
                flex items-center justify-center border-r-[2px] ">
                    Үнэлгээ хийгдсэн
                </div>
            </div> 
            {
                showModal && 
                <RatingModalMain deviceId={deviceId} setShowModal={setShowModal}/>
            }
        </div>
    );
}

export default RatingUserCell;