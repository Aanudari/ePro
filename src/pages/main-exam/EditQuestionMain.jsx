function EditQuestionMain({question}) {
    return ( 
        <div className="h-[250px] w-full px-4 flex flex-col gap-4 border-b pt-4 bg-gray-100 drop-smooth overflow-scroll border">
            <div className="flex justify-between w-full items-center">
            <h6 className="text-[13px] m-0">Оноо: {question.points}</h6>
            <i className="bi bi-image cursor-pointer text-2xl"></i>

            </div>
            {
                question?.answers?.map((item, index) => (
                    <div key={index} className="w-full border-b border-gray-400 pb-1 flex justify-between appear-smooth">{item.answer}
                    {
                        item.isTrue == "1" &&
                        <i className="bi bi-check-circle text-green-400"></i>
                    }
                    </div>
                ))
            }
        </div>
     );
}

export default EditQuestionMain;