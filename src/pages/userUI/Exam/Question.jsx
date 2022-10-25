import React, {
    useRef,
    useState,
    useEffect
} from "react";
import gsap from "gsap";

export default function Question({
    data,
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
    return (
        <div className="question" ref={questionRef}>
            <div className="question-inner">
                <h2 className="question-text">{data.question}</h2>
                <ul className="question-answers">
                    {data && data.answerList.map((text, index) => {
                        const value = `q${data.id}-${index}`;
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