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
        sessionStorage.clear();
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
        if (checked.includes(id)) {
            setChecked([])
        } else {
            setChecked([id])
            setFilteredQuestion(id)
        }
    }
    const [filteredQuestion, setFilteredQuestion] = useState('');
    let questions = data &&
        data[0]?.questionList?.map((item) => {
            return item
        })
    const [filtered, setFiltered] = useState();
    const handleFilter = () => {
        let filtered = questions?.filter((item, index) => {
            return item.id == filteredQuestion
        })
        setFiltered(filtered)
    }
    useEffect(() => {
        handleFilter()
    }, [filteredQuestion])
    const handleEditQuestion = (value, index) => {
        let arr = filtered[0].answerList.map((item, i) => {
            return index == i ? ({ ...item, answer: value }) : item
        })
        let assigned = Object.assign(filtered[0], { answerList: arr })
        setFiltered([assigned])
    }
    const deleteAnswer = (id) => {
        let removed = filtered[0].answerList.filter((item, index) => {
            return index !== id
        })
        let assigned = Object.assign(filtered[0], { answerList: removed })
        setFiltered([assigned])
    }
    const addAnswer = (id) => {
        let obj = {
            answer: "",
            isTrue: "0",
            answerImgUrl: ""
        }
        let arr = filtered[0].answerList
        arr.push(obj)
        let assigned = Object.assign(filtered[0], { answerList: arr })
        setFiltered([assigned])
    }
    const schema = {
        "questionId": `${checked[0]}`,
        "qCategory": `${id}`,
        "question": "string",
        "points": "string",
        "qimgUrl": "string",
        "answers": [
            {
                "id": "string",
                "answer": "string",
                "aImgUrl": "string",
                "isTrue": "string"
            }
        ]
    }
    const handleEditSubmit = (id) => {
        if (checked.includes(id)) {
            setChecked([])
            // console.log(schema)
            // axios({
            //     method: "put",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": TOKEN
            //     },
            //     url: `${process.env.REACT_APP_URL}/v1/Pool/update/question`,
            //     data: schema,
            // })
            //     .then((res) => {
            //         console.log(res)
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })
        } else {
            setChecked([id])
            setFilteredQuestion(id)
        }
    }
    const [showSide, setShowSide] = useState(false);
    // console.log(filtered && filtered[0].answerList)
    return (
        <div className={`fixed ${activeMenu ? "top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)]"
            : "w-full h-full top-[25px] left-0"
            } 
        bg-black bg-opacity-50 flex justify-center items-center gap-4 pl-4
        `}>
            <div className="shrink w-[calc(85%)] h-[600px] bg-white flex flex-col rounded-t-lg">
                <div className="w-full min-h-[50px] bg-gray-700 flex justify-end px-3 rounded-t-lg">
                    <button onClick={handleDeleteExam}
                        className="w-[20px] h-full mr-2">
                        <i className="bi bi-trash3-fill text-red-500 text-xl font-[500] "></i>
                    </button>
                    <button
                        onClick={() => {
                            setExamModal(false)
                        }}
                        className="w-[20px] h-full ">
                        <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
                    </button>
                </div>
                <div className="w-full h-full px-10 py-2 overflow-scroll">
                    <div className="h-full pt-2">
                        {
                            data &&
                            data[0]?.questionList?.map((question, index) => (
                                <div key={index} className={`mt-3 border-t-[5px] border-l border-r border-[#50a3a2] rounded-lg`}>
                                    <div
                                        onClick={() => {
                                            checked.length < 1
                                                &&
                                                handleQuestion(question.id)

                                        }}
                                        className={`w-full py-3 px-3 font-[400] flex flex-col
                                    transition hover:bg-opacity-10 hover:bg-gray-700 rounded-lg
                                        cursor-pointer pt-10 ${checked.includes(question.id) && "bg-opacity-10 bg-gray-700 "}`}
                                    >
                                        <div className="flex justify-between ">
                                            {
                                                checked.includes(question.id) ?
                                                    <div className="h-[42px] w-full">
                                                        <span className="font-[500]">
                                                            {index + 1}.
                                                        </span>
                                                        <input defaultValue={question.question} type="text" className="outline-none mt-2 
                                rounded-md ml-2 h-[40px] 
                                 focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[14px] w-[calc(90%)] font-[400]"
                                                            autoCorrect="false" spellCheck={false} />
                                                    </div> :
                                                    <span className="m-0 hover:text-sky-500 font-[500]">
                                                        {index + 1}. {question.question}
                                                    </span>
                                            }
                                            {
                                                checked.includes(question.id) ?
                                                    <div className="h-[42px]">
                                                        <i onClick={() => {
                                                            setShowSide(!showSide)
                                                        }} className="bi active:text-teal-500 bi-images
                                                                        text-2xl mr-3 text-teal-600 "></i>
                                                        <span className="m-0 font-[500]">
                                                            Оноо
                                                        </span> :
                                                        <input defaultValue={question.points} type="text" className="outline-none mt-2 
                                rounded-md ml-2 h-[40px]
                                 focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[14px] w-1/2 font-[400]"
                                                            autoCorrect="false" spellCheck={false} />

                                                    </div> :
                                                    <span className="m-0 font-[500]">
                                                        {question.points}%
                                                    </span>

                                            }
                                        </div>
                                        <div>
                                            {
                                                checked.includes(question.id) ?
                                                    <div>
                                                        {
                                                            question?.answerList.map((answer, index) => (
                                                                <div key={index} className="">
                                                                    <div className="h-[42px] mt-1 relative parent">
                                                                        {
                                                                            answer.isTrue == "1" ?
                                                                                <i className="bi bi-check-circle text-xl px-1 text-teal-500"></i>
                                                                                :
                                                                                <i className={`bi bi-circle text-xl px-1 outline-none text-gray-400`}></i>
                                                                        }
                                                                        <input onChange={(e) => {
                                                                            handleEditQuestion(e.target.value, index)
                                                                        }} defaultValue={answer.answer} type="text" className={`outline-none mt-2 
                                                            rounded-md ml-2 h-[40px] 
                                                             focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[14px] w-1/2 font-[400]`}
                                                                            autoCorrect="false" spellCheck={false} />
                                                                        <i onClick={() => {
                                                                            deleteAnswer(index)
                                                                        }} className="bi active:text-red-500 bi-trash3 absolute left-[calc(55%)]
                                                                            text-gray-600 child hidden top-[20px]"></i>
                                                                        <i className="bi active:text-teal-500 bi-images absolute left-[calc(50%)]
                                                                            text-teal-600 child hidden top-[20px]"></i>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        <div className="w-full mt-4 flex justify-between">
                                                            <span onClick={addAnswer} className="text-teal-500 hover:text-teal-400 font-[500]">
                                                                <i className="bi bi-plus-lg mr-2"></i>
                                                                Хариулт нэмэх</span>
                                                            <button
                                                                onClick={() => {
                                                                    handleEditSubmit(question.id)
                                                                }} className="px-3 hover:bg-teal-600 py-2 bg-teal-500 font-[500]
                                                            flex justify-center items-center text-white rounded-lg active:bg-teal-500
                                                            ">Өөрчлөлт хадгалах</button>
                                                        </div>
                                                    </div>
                                                    :
                                                    checked.includes(question.id) ? filtered : question?.answerList?.map((answer, index) => (
                                                        <h6 key={index} className="mt-3 font-[400] pl-3 flex items-center">
                                                            <i className="bi bi-circle text-gray-400 text-xl"></i>
                                                            <span className="ml-2 text-[14px] font-[400]">{answer.answer}</span>
                                                        </h6>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="py-3"></div>
                    </div>
                </div>
            </div>
            {
                showSide &&
            <div className="h-screen w-[200px] bg-teal-400 transition from-left overflow-scroll">
                <div className="h-[50px]"></div>
                <input
        type="file"
      />
            </div>
            }
        </div>
    );
}

export default ExamModalMain;