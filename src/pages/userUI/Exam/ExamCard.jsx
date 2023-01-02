import { useStateContext } from "../../../contexts/ContextProvider";

function ExamCard( {data}) {
    const { readyCheck, setReadyCheck, setExamID, examName, setExamName } = useStateContext();
    return (
        <div className="cursor-pointer shadow-md hover:mt-[-3px] transition-all" onClick={() => {
            setReadyCheck(!readyCheck)
            setExamID(data.id)
            setExamName(data.name)
            sessionStorage.setItem("exam_id", data.id)
        }}>
            <div className="w-[250px] min-h-[320px] overflow-hidden bg-gray-100">
                    <img className="w-full h-[150px]" src="https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg?w=2000" alt="" />
                <div className="px-6 pt-2">
                    <div className="font-bold text-[15px]">{data.name}</div>
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
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2
                    ">Хугацаа : {data.duration}мин</span>
                </div>
            </div>
        </div>
    );
}

export default ExamCard;