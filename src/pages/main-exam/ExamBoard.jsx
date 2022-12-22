function ExamBoard({ exams, examModal, setExamModal, handleExamModal, setShowReport }) {
    return (
        <div className="min-w-[1150px] min-h-full max-h-full bg-white py-3 px-4 shadow-sm">
            <h6 className="text-gray-500 font-[400]">Шалгалтууд</h6>
            <div className="w-full h-8 flex gap-1">
                <div className="w-1/4 h-full flex justify-center items-center bg-gray-200 text-[11px] uppercase font-[500]">Нэр</div>
                <div className="w-1/4 h-full flex justify-center items-center bg-gray-200 text-[11px] uppercase font-[500]">эхлэх</div>
                <div className="w-1/4 h-full flex justify-center items-center bg-gray-200 text-[11px] uppercase font-[500]">дуусах</div>
                <div className="w-1/4 h-full flex justify-center items-center bg-gray-200 text-[11px] uppercase font-[500]">Хугацаа</div>
                <div className="w-1/4 h-full flex justify-center items-center  text-[11px] uppercase font-[500] mr-2"></div>
            </div>
            <div className="w-full h-full h-[570px]  overflow-scroll mt-2 border-b">
                {
                    exams?.map((exam, index) => (
                        <div key={index} className="h-14 w-full flex border-b">
                            <div onClick={() => {
                                setExamModal(true)
                                handleExamModal(exam.id)
                            }} className="w-full h-14 flex gap-1 border-b
                font-[600] hover:text-sky-600 cursor-pointer">
                                <div className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[500]">{exam.name}</div>
                                <div className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[500]">{exam.startDate}</div>
                                <div className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[500]">{exam.expireDate}</div>
                                <div className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[500]">{exam.duration} мин {exam.id}
                                </div>

                            </div>
                            <div onClick={() => {
                                setShowReport(true)
                            }} className="w-[calc(25%-50px)] h-full flex justify-between items-center text-[11px] cursor-pointer
                     uppercase font-[500] bg-teal-500 !text-white active:bg-teal-500 hover:bg-teal-600">
                                <div className="w-full flex justify-center items-center font-[500]">
                                    Тайлан
                                </div>
                                <div className="h-full min-w-[50px] border-l flex justify-center items-center">
                                    <i className="bi bi-file-earmark-bar-graph text-[16px]"></i>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    );
}

export default ExamBoard;