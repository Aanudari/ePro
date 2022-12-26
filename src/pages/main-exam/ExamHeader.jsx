function ExamHeader({array1, chosen, editHeader, setEditHeader}) {
    return ( 
        <div className="h-20 w-full shadow px-2 uppercase bg-gray-600 text-white  flex items-center justify-between px-4">
                    <div className="font-[500] text-[14px] h-full flex items-center gap-3">
                        <div className="h-full flex items-start flex-col justify-center border-r pr-3 border-gray-400">
                            <span className="text-teal-500 font-[400]">
                                Эхлэх: {chosen[0].startDate}
                            </span>
                            <span className="text-red-400 font-[400]">
                                Дуусах: {chosen[0].expireDate}
                            </span>
                        </div>
                        <div className="h-full flex items-start flex-col justify-center border-r pr-3 border-gray-400">
                            <span className="text-white font-[400]">
                                нэр: {chosen[0].name}
                            </span>
                            <span className="text-white font-[400]">
                                хугацаа: {chosen[0].duration}<span className="m-0 lowercase font-[400]">мин</span>
                            </span>
                        </div>
                        <div className="h-full font-[500] flex items-center">
                            <select name="" id="">
                                {
                                    array1?.map((item, index) => (
                                        <option isdisabled="true" key={index} value={`${item.deviceId}`}>{item.lastName[0]}. {item.firstName}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div
                                onClick={() => {
                            setEditHeader(!editHeader)
                        }}
                        className="h-9 bg-teal-600 rounded-sm px-3 flex items-center font-[400] text-white cursor-pointer active:bg-teal-400 hover:bg-teal-600">
                        <span className="mr-2 mb-1 font-[400] text-white">
                            Засах
                        </span>
                        <div className="pl-2 h-full flex items-center border-l border-gray-300">
                            <i className="bi bi-ui-checks"></i>
                        </div>
                    </div>
                </div>
     );
}

export default ExamHeader;