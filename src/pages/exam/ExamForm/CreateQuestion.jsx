import React, { useState } from 'react';
import CreateAnswer from './CreateAnswer';
function CreateQuestion({ index, valid, handleChange }) {
    const [answerSchema, setAnswerSchema] = useState({
        "answer": "ngoean",
        "answerImgUrl": "",
        "isTrue": ""
    });
    const [store, setStore] = useState([]);
    const [answer, setAnswer] = useState('');
    const [count, setcount] = useState(0);
    const [showAnswerMenu, setShowAnswerMenu] = useState(false);
    const generateAnswers = (key) => {
        let arr = []
        for (let index = 0; index < key; index++) {
            arr.push(answerSchema)
        }
        setStore(arr)
    }

    return (
        <div className={valid === index ? "block" : "hidden"}>
            <div className="mt-10 ">
                <div className="group2 w-full">
                    <input
                        onChange={(e) => {
                            setAnswer(e.target.value)
                        }}
                        type="text" />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Асуулт {index}</label>
                </div>
                <div className="group">
                    <input onChange={(e) => {
                        setcount(e.target.value)
                        generateAnswers(e.target.value)
                    }} type="number" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Хариултын тоо</label>
                </div>
                    {
                        store?.map((element, index) => (
                            <CreateAnswer key={index} index={index} data={element}/>
                        ))
                    }
                <button onClick={(e) => {
                    e.preventDefault()
                    handleChange(answer, index - 1)
                }} className="cus-btn hover:shadow mt-2">
                    Хадгалах
                </button>
            </div>
        </div>
    );
}

export default CreateQuestion;