import { useEffect, useState } from "react"
import axios from "axios"
import { useStateContext } from "../../contexts/ContextProvider"
import { useNavigate } from "react-router-dom";
function ExamModalMain({ setExamModal, id }) {
    const [data, setData] = useState();
    const { TOKEN } = useStateContext();
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
                    if (res.data.errorCode == 401) {
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
            <div className="w-[calc(85%)] h-[600px] bg-white flex flex-col ">
                <div className="w-full h-14 bg-gray-700 flex justify-end px-3">
                    <button onClick={() => {
                        setExamModal(false)
                    }}
                        className="w-[20px] h-full ">
                        <i className="bi bi-x-lg text-red-500 text-2xl font-[500]"></i>
                    </button>
                </div>
                <div className="w-full h-full px-3 py-2">
                    <h6 className="h-6 text-gray-500 font-[400]">Вариантууд</h6>
                    <div className="h-[calc(100%-34px)]">
                        {
                            data && 
                            data[0]?.questionList?.map((question, index) => (
                                <div key={index} className="w-full h-14 font-[400] border-b flex items-center hover:text-sky-500 
                                cursor-pointer px-2"
                                        >{question.question}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamModalMain;