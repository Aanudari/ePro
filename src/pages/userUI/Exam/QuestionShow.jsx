import React, {
    useRef,
    useState,
    useEffect
} from "react";
import gsap from "gsap";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function QuestionShow({
    data, indexQ
}) {
    const [answer, setAnswer] = useState(null);
    const {wrongValue, someValue} = useStateContext();
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
    var correct =  [... new Set(someValue.current)]
    var wrong = [... new Set(wrongValue.current)]
    let FinalAnswer = wrong !== [] ? [wrong[0]] : correct;

    console.log(correct) 
    console.log(wrong) 
    console.log(FinalAnswer)
    // console.log(correct)
    return (
        <div className="question " ref={questionRef}>
            <div className="question-inner">
                <h4 className="question-text">{indexQ + 1}. {data.question}</h4>
                {
                    data.imgUrl && 
                    <img src={`${data.imgUrl}`} alt="" className="mb-4 w-full rounded h-[150px] md:h-[250px]"/>
                }
                <ul className="question-answers">
                    {data && data.answerList.map((text, index) => {
                        const value = `q${text.id}-${index}`;
                        return (
                            <li
                                key={index}
                                className={wrongValue.current.includes(value) ? "bg-red-500 rounded" :
                            someValue.current.includes(value) ? "bg-green-500 rounded" : null
                            }
                            >
                                <input
                                    type="radio"
                                    name={text.id}
                                    value={value}
                                    id={value}
                                    checked={
                                        value === answer
                                    }
                                    disabled
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