function AnswerCell(props) {
    return ( 
        <div><input type="checkbox" /> {props.data.answer}
        </div>
     );
}

export default AnswerCell;