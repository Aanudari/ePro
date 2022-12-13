import { useEffect, useState } from "react"
import axios from "axios"
import { useStateContext } from "../../contexts/ContextProvider"
import { useNavigate } from "react-router-dom";
import EditQuestionMain from "./EditQuestionMain";
import EditQuestionMain2 from "./EditQuestionMain2";
function ExamModalMain({ setExamModal, id }) {
    const [data, setData] = useState();
    const { TOKEN, activeMenu } = useStateContext();
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
    const handleDeleteExam = () => {
        axios({
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: `http://192.168.10.248:9000/v1/ExamNew/delete?examId=${id}`,
        })
            .then(
                res => {
                    if (res.data.errorCode == 401) {
                        logout()
                    } else {
                        setExamModal(false)
                    }
                }
            )
            .catch(err => console.log(err))
    }
    const [checked, setChecked] = useState([]);
    const handleQuestion = (id) => {
        if(checked.includes(id)) {
            setChecked([])
        } else {
            setChecked([id])
        }
    }
    return (
        <div className={`fixed ${activeMenu ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
    : "w-full h-full top-[25px] left-0"
    } 
        bg-black bg-opacity-50 flex justify-center items-center
        `}>
            <div className="shrink w-[calc(85%)] h-[600px] bg-white flex flex-col ">
                <div className="w-full min-h-[50px] bg-gray-700 flex justify-end px-3">
                    <button onClick={handleDeleteExam}
                        className="w-[20px] h-full mr-2">
                        <i className="bi bi-trash3-fill text-red-500 text-xl font-[500] "></i>
                    </button>
                    <button onClick={() => {
                        setExamModal(false)
                    }}
                        className="w-[20px] h-full ">
                        <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
                    </button>
                </div>
                <div className="w-full h-full px-3 py-2 overflow-scroll ">
                    <h6 className="text-gray-500 font-[400] text-[18px] flex gap-2 items-center">
                        <span className="text-gray-500 font-[400] m-0">
                            Вариантууд :
                        </span>
                        {
                            data &&
                            data.map((item, index) => (
                                <button key={index} className="px-3 py-2 border active:bg-gray-200">{item.name}</button>
                            ))
                        }
                    </h6>

                    <div className="h-full">
                        {
                            data &&
                            data[0]?.questionList?.map((question, index) => (
                                <div key={index}>
                                    <div onClick={() => {
                                        handleQuestion(question.id)
                                    }}  className={`w-full h-14 font-[400] border-b flex items-center hover:text-sky-500 
                                cursor-pointer px-2 flex justify-between ${checked.includes(question.id) && `text-sky-500`}`}
                                    >
                                        <span className="m-0 hover:text-sky-500 font-[400]">
                                            {question.question}
                                        </span>
                                        <span className="m-0 font-[400]">
                                            {question.points}%
                                        </span>

                                    </div>
                                    {
                                        checked.includes(question.id) &&
                                        <EditQuestionMain2 question={question}/>
                                    }
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