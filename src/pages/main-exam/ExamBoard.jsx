function ExamBoard({exams, examModal, setExamModal, handleExamModal}) {
    return ( 
        <div className="min-w-[850px] min-h-full max-h-full bg-white py-3 px-4 shadow-sm">
            <h6 className="text-gray-500 font-[400]">Шалгалтууд</h6>
            <div className="w-full h-8 flex gap-1">
                <div className="w-1/4 h-full flex justify-center items-center bg-gray-200 text-[11px] uppercase font-[400]">Нэр</div>
                <div className="w-1/4 h-full flex justify-center items-center bg-gray-200 text-[11px] uppercase font-[400]">эхлэх</div>
                <div className="w-1/4 h-full flex justify-center items-center bg-gray-200 text-[11px] uppercase font-[400]">дуусах</div>
                <div className="w-1/4 h-full flex justify-center items-center bg-gray-200 text-[11px] uppercase font-[400]">Хугацаа</div>
            </div>
            <div className="w-full h-full h-[570px]  overflow-scroll mt-2">
            {
                exams?.map((exam, index) => (
                <div onClick={() => {
                    setExamModal(true)
                    handleExamModal(exam.id)
                }} key={index} className="w-full h-14 flex gap-1 mt-1 border-b hover:border-sky-600 
                hover:text-sky-600 cursor-pointer">
                    <div className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[400]">{exam.name}</div>
                    <div className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[400]">{exam.startDate}</div>
                    <div className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[400]">{exam.expireDate}</div>
                    <div className="w-1/4 h-full flex justify-center items-center text-[11px]
                     uppercase font-[400]">{exam.duration} мин {exam.id}
                     </div>
                </div>
                ))
            }
            </div>
        </div>
     );
}

export default ExamBoard;