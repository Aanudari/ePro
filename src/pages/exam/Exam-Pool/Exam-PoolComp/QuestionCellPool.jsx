import React, {useState} from 'react';
import AnswerCellPool from "./AnswerCellPool";

function QuestionCellPool({ item }) {
    const [show, setShow] = useState(false);
    return (

        <div className="cus-buttons ">
            <div onMouseOver={() => {
                setShow(true)
            }} 
            onMouseLeave={() => {
                setShow(false)
            }}
            className="buttons ">
                <div className="raise bg-white flex justify-between">
                    <div>
                        <div className="font-[500] text-[15px]">
                            {item.question}
                        </div>
                        <div className="mt-2">
                            {
                                item.answerList.map((item, index) => (
                                    <AnswerCellPool key={index} index={index} item={item} />
                                ))
                            }
                        </div>
                    </div>
                    <div className={show ? "min-w-[50px] min-h-full justify-center gap-2 transtion flex flex-col" : 'hidden'}>
                    <i className="bi bi-pencil-fill cursor-pointer"></i>
                    <i className="bi bi-trash-fill cursor-pointer"></i>
                    <i className="bi bi-pencil-fill cursor-pointer"></i>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default QuestionCellPool;