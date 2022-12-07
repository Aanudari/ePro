import { useEffect, useState } from "react"
import axios from "axios"
import { useStateContext } from "../../contexts/ContextProvider"
import { useNavigate } from "react-router-dom";
function ExamModalMain({setExamModal, id}) {
    const [data, setData] = useState();
    const {TOKEN} = useStateContext();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: `http://192.168.10.248:9000/v1/ExamNew/variants?examId=${id}`,
        })
            .then(
                res => {
                    if(res.data.errorCode == 401) {
                        logout()
                    } else {
                        setData(res.data.variants)
                    }
                }
            )
            .catch(err => console.log(err))
    }, [])

    return ( 
        <div className="fixed top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex justify-center items-center
        ">
            <div className="w-10/12 h-[600px] bg-white flex flex-col ">
            <div className="w-full h-14 bg-gray-700 flex justify-end px-3">
                    <button onClick={() => {
                        setExamModal(false)
                    }}
                        className="w-[20px] h-full ">
                        <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
                    </button>
                </div>
                {id}
            </div>
        </div>
     );
}

export default ExamModalMain;