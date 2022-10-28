import React, {
    useRef,
    useState,
    useEffect
} from "react";
import gsap from "gsap";

export default function Question({
    data, indexQ, handleScore, handleWrong
}) {
    const [answer, setAnswer] = useState(null);
    const questionRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(
            questionRef.current.querySelector(".question-text"),
            {
                x: 40,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.4
            }
        );
        gsap.fromTo(
            questionRef.current.querySelectorAll("li"),
            {
                opacity: 0,
                x: 40
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1
            }
        );
    }, [data]);
    const correct = data.answerList.filter((answer) => {
        return answer.isTrue === '1'
    })
    const handleCheck = (check, value, id) => {
        if(check === value) {
            handleScore(value)
        } else {
            handleWrong(value)
        }
    }

    return (
        <div className="question " ref={questionRef}>
            <div className="question-inner">
                <h4 className="question-text">{indexQ + 1}. {data.question}</h4>
                {
                    data.imgUrl && 
                    <img src={`${data.imgUrl}`} alt="" className="mb-4 w-full h-[150px] md:h-[280px] mb-4 rounded"/>
                }
                <ul className="question-answers ">
                    {data && data.answerList.map((text, index) => {
                        const value = `q${text.id}-${index}`;
                        const check = `q${correct[0].id}-${index}`;
                        const actualIndex = `q${data.id}-${index}`;
                        return (
                            <li
                            
                                key={index}
                            >
                                <input
                                    type="radio"
                                    name={text.id}
           
                                    value={value}
                                    id={value}
                                    onChange={(e) => {
                                        setAnswer(e.target.value)
                                        handleCheck(check, value, actualIndex)
                                    }}
                                    checked={
                                        value === answer
                                    }
                                />
                                <label className="question-answer" htmlFor={value}>
                                    {text.answer}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}