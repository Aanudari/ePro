import { useStateContext } from "../../../contexts/ContextProvider";

function ExamCard( {data}) {
    const { readyCheck, setReadyCheck, setExamID } = useStateContext();
    return (
        <div className="cursor-pointer hover:shadow-lg" onClick={() => {
            setReadyCheck(!readyCheck)
            setExamID(data.id)
            sessionStorage.setItem("exam_id", data.id)
        }}>
            <div className="max-w-sm rounded overflow-hidden shadow">
                <div className="px-6 pt-4">
                    <div className="font-bold text-xl mb-2">{data.name}</div>
                    <p className="text-gray-700 text-base font-[400] m-0">
                        Нээх цаг : {data.startDate}
                    </p>
                    <p className="text-gray-700 text-base font-[400] m-0">
                        Хаах цаг : {data.expireDate}
                    </p>
                    <p className="text-gray-700 text-base font-[400]">
                        
                    </p>
                </div>
                <div className="px-6 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">id : {data.id}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Хугацаа : {data.duration}мин</span>
                </div>
            </div>
        </div>
    );
}

export default ExamCard;