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
    return (
        <div className="fixed top-[56px] left-[250px] w-[calc(100%-250px)] h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex justify-center items-center
        ">
            <div className="w-10/12 h-[600px] bg-white flex flex-col ">
                <div className="w-full h-14 bg-gray-700 flex justify-between px-3">
                    <button onClick={() => {
                        setAddAnswer(!addAnswer)
                    }}
                        className="w-[20px] h-full ">
                            {
                                addAnswer ? 
                                <i className="bi bi-x-circle text-white text-2xl font-[500]"></i>
                                : 
                                <i className="bi bi-plus-circle text-white text-2xl font-[500]"></i>
                            }
                    </button>
                    <button onClick={() => {
                        setCategoryModal(false)
                    }}
                        className="w-[20px] h-full ">
                        <i className="bi bi-x-lg text-white text-2xl font-[500]"></i>
                    </button>
                </div>
                {
                    addAnswer ? 
                <div className="w-full h-full px-4">
                    <CreateQuestionMain setQuestion={setQuestion} setPoint={setPoint} setQImgUrl={setQImgUrl}/>
                </div>
                : 
                <div className="w-full h-full px-3">
                    <div>
                        {
                            data?.map((question, index) => (
                                <div key={index}>
                                    <div onClick={() => {
                                        setAnswers(true)
                                    }} className="w-full h-14 font-[400] border-b flex items-center hover:text-sky-500 
                            cursor-pointer px-2"
                                    >{question.question}
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
                justify-center items-center font-[500] text-white
                ">Асуулт үүсгэх</div>
                }
            </div>
        </div>
    );
}

export default CategoryModal;