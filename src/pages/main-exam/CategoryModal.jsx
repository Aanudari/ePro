import { useEffect, useState } from "react"
import axios from "axios"
import { useStateContext } from "../../contexts/ContextProvider"
import { useNavigate } from "react-router-dom";
import CreateQuestionMain from "./CreateQuestionMain";
function CategoryModal({ setCategoryModal, id }) {
    const { TOKEN } = useStateContext();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };
    const [data, setData] = useState();
    useEffect(() => {
        axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `${TOKEN}`
            },
            url: `http://192.168.10.248:9000/v1/Pool/Question/${id}`,
        })
            .then(
                res => {
                    if (res.data.errorCode == 401) {
                        logout()
                    } else {
                        setData(res.data.questionList)
                    }
                }
            )
            .catch(err => console.log(err))
    }, [])
    const [answers, setAnswers] = useState(false);
    const [addAnswer, setAddAnswer] = useState(false);
    const [question, setQuestion] = useState('');
    const [point, setPoint] = useState('');
    const [qImgUrl, setQImgUrl] = useState('');
    const [answerSchema, setAnswerSchema] = useState({
        "id": id,
        "newQuestions": [
            {
                "question": question,
                "points": point,
                "qimgUrl": qImgUrl,
                "addAnswers": [
                    {
                        "answer": "string",
                        "aImgUrl": "string",
                        "isTrue": "string"
                    }
                ]
            }
        ]
    });
    const [checked, setChecked] = useState([]);
    const handleCheck = (id) => {
        if(checked.includes(id)) {
            setChecked(checked.filter((item, index) => {
                return item !== id
            }))
        } else {
            setChecked((prev) => [...prev, id])
        }
    }
    const [createExam, setCreateExam] = useState(false);
    return (
        <div className="fixed  top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex justify-center items-center
        ">
            <div className="w-[calc(85%)] shrink h-[600px] bg-white flex flex-col ">
                <div className="w-full h-14 bg-gray-700 flex justify-between px-3">
                    <button onClick={() => {
                        setAddAnswer(!addAnswer)
                        setCreateExam(false)
                    }}
                        className="w-[20px] h-full ">
                        {
                            addAnswer ?
                                <i className="bi bi-x-circle text-sky-500 text-2xl font-[500]"></i>
                                :
                                <i className="bi bi-plus-circle text-white text-2xl font-[500]"></i>
                        }
                    </button>

                    <div>
                        {
                            data?.length !== undefined &&
                            <button onClick={() => {
                                setCreateExam(!createExam)
                                setAddAnswer(false)
                            }}
                                className="w-[20px] h-full ">
                                {
                                    createExam && !addAnswer && data?.length !== undefined ?
                                        <i className="bi bi-bookmark-x text-sky-500 text-2xl font-[500] "></i>
                                        :
                                        <i className="bi bi-bookmark-plus text-white text-2xl font-[500] "></i>
                                }
                            </button>
                        }
                        <button onClick={() => {
                            setCategoryModal(false)
                        }}
                            className="w-[20px] h-full ml-5 ">
                            <i className="bi bi-x-lg text-red-500 text-2xl font-[500]"></i>
                        </button>
                    </div>

                </div>
                {
                    addAnswer ?
                        <div className="w-full h-full px-4">
                            <CreateQuestionMain setQuestion={setQuestion} setPoint={setPoint} setQImgUrl={setQImgUrl} />
                        </div>
                        :
                        <div className="w-full h-full px-3">
                            <div>
                                {
                                    data?.map((question, index) => (
                                        <div key={index}>
                                            <div onClick={() => {
                                                setAnswers(true)
                                            }} className={`w-full  h-14 font-[400] border-b flex items-center hover:text-sky-500 px-2 
                                            ${ checked.includes(question.id) && "text-sky-400"} relative`}
                                            >
                                                {question.question}
                                                {/* <input type="text" className="w-full" value={question.question} /> */}
                                                {
                                                    createExam && !addAnswer && data?.length !== undefined &&
                                                    <div onClick={() => {
                                                        handleCheck(question.id)
                                                    }} className={`absolute cursor-pointer right-[20px] w-[20px] h-[20px] rounded border-[2px] 
                                             hover:!border-sky-400 ${ checked.includes(question.id) && "!border-sky-400"}`}>
                                                        {
                                                            checked.includes(question.id) &&
                                                            <i className="bi bi-check2 text-xl absolute top-[-7px] right-[-1.5px] text-sky-500"></i>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                            {
                                                answers &&
                                                <div className={`hidden`}>1</div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                }
                {
                    addAnswer &&
                    <div className="w-full h-14 bg-gray-600 hover:bg-gray-700 cursor-pointer flex 
                justify-center items-center font-[500] text-sky-500
                ">Асуулт үүсгэх</div>
                }
                {
                    createExam && !addAnswer && data?.length !== undefined ?
                        <div className="w-full h-14 bg-gray-600 hover:bg-gray-700 cursor-pointer flex 
                justify-center items-center font-[500] text-sky-500
                ">Шалгалт үүсгэх</div> : null
                }

            </div>
        </div>
    );
}

export default CategoryModal;