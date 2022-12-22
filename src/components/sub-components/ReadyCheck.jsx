import { useStateContext } from "../../contexts/ContextProvider";

function ReadyCheck(props) {
    const {readyCheck, setReadyCheck, varientID, setVarientID} = useStateContext();
    return ( 
        <div className="h-screen w-full fixed bg-black top-0 left-0 z-10 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow p-3">
                <button onClick={() => {
                    setReadyCheck(!readyCheck)
                }} className="w-full flex justify-end">
                <i className="bi bi-x-circle"></i>
                </button>
            <div className="auto-cols-auto">
                <div>
                <h6>Шалгалтын нэр : {props.data.examName}</h6>
                <h6>Үргэлжлэх хугацаа : {props.data.duration} мин</h6>
                </div>
                <button className="w-full h-10 bg-cyan-700 hover:bg-cyan-600 rounded-lg font-[400] text-white">Эхлүүлэх</button>
            </div>
            </div>
        </div>
     );
}

export default ReadyCheck;