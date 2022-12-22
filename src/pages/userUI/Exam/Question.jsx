import React, {
    useRef,
    useState,
    useEffect
} from "react";
import gsap from "gsap";

export default function Question({
    data, indexQ, setContainer
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
    }, []);
    const [count, setCount] = useState(0);
    const handleCheck = (answerId, questionId, isTrue) => {
        setCount(count + 1)
        let arr = {
            AquestionId : questionId,
            answerId : answerId,
            count : isTrue
        }
            setContainer((prev) => [...prev, arr])
    }
    return (
        <div className="question " ref={questionRef}>
            <div className="question-inner">
                <h4 className="question-text mb-10">{indexQ + 1}. {data.question}</h4>
                {
                    data.imgUrl && 
                    <img src={`${data.imgUrl}`} alt="" className="mb-4 w-full h-[150px] md:h-[280px] mb-4 rounded"/>
                }
                <ul className="question-answers ">
                    {data && data.answerList.map((text, index) => {
                        const value = `q${text.id}-${index}`;
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
                                        setAnswer(text.id)
                                        handleCheck(text.id, data.id, text.isTrue)
                                    }}
                                    checked={
                                        text.id === answer
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