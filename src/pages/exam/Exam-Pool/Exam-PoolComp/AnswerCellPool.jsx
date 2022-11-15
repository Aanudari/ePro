function AnswerCellPool({item, index}) {
    return ( 
        <div className={`${item.isTrue === "1" && `relative`}`}>
            {index + 1}. {item.answer}
            {
                item.isTrue === "1" &&
            <i className="bi bi-check-lg absolute left-[-18px]"></i>    
            }
        </div>
     );
}

export default AnswerCellPool;