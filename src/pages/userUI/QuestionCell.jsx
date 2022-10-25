import AnswerCell from "./AnswerCell";

function QuestionCell(props) {
    return ( 
        <div className="p-2 border-b">{props.data.question}
        {
            props.data.answerList.map((item, index) => (
                <AnswerCell key={index} data={item}/>
            ))
        }
        </div>
     );
}

export default QuestionCell;