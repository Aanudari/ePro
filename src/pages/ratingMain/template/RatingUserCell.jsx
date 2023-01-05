import { useState } from "react";
import RatingModalMain from "../modal/RatingModalMain";
import ShowRatingResult from "./ShowRatingResult";

function RatingUserCell({ data }) {
    const [showModal, setShowModal] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const [showResult, setShowResult] = useState(false);
    // console.log(data)
    const handleModal = (value) => {
        setShowModal(true)
        setDeviceId(value)
    }
    return (
        <div className="h-10 w-full text-white bg-teal-500 mb-1 flex items-center pl-3 justify-between shadow-sm hover:!text-gray-700">
            <div className="min-w-[250px] flex justify-between">
                <span className="font-[500] text-[12px] ">
                {data.lastName[0]}. {data.firstName}/ {data.deviceId}
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
                {
                    data.ratingCount > 0 ?
                <div onClick={() => {
                    setShowResult(true)
                }} className="font-[500] text-[12px] min-w-[150px] bg-emerald-500 h-full
                flex items-center justify-center border-r-[2px] cursor-pointer">
                    Үнэлгээ хийгдсэн
                </div>
                :
                <div className="font-[500] text-[12px] min-w-[150px] bg-red-500/90 h-full
                flex items-center justify-center border-r-[2px] ">
                    Үнэлгээ хийгдээгүй
                </div>
                }
            </div> 
            {
                showModal && 
                <RatingModalMain deviceId={deviceId} setShowModal={setShowModal}/>
            }
            {
                showResult && 
                <ShowRatingResult setShowResult={setShowResult} personId={data.deviceId}/>
            }
        </div>
    );
}

export default RatingUserCell;