function EditQuestionMenu({answer, i, deleteAnswer, handleEditQuestion}) {
    console.log(answer)
    return (
        <div className="">
            <div className="h-[42px] mt-1 relative parent">
                {
                    answer.isTrue == "1" ?
                        <i className="bi bi-check-circle text-xl px-1 text-teal-500"></i>
                        :
                        <i className={`bi bi-circle text-xl px-1 outline-none text-gray-400`}></i>
                }
                <input onChange={(e) => {
                    handleEditQuestion(e.target.value, i)
                }} defaultValue={answer.answer} type="text" className={`outline-none mt-2 rounded-md ml-2 h-[40px] 
                                                             focus:border-b-[2px] focus:h-[42px] border-teal-500 px-2 text-[14px] w-1/2 font-[400]`}
                    autoCorrect="false" spellCheck={false} />
                <i onClick={() => {
                    deleteAnswer(i)
                }} className="bi active:text-red-500 bi-trash3 absolute left-[calc(55%)] text-gray-600 child hidden top-[20px]"></i>
                <i className="bi active:text-teal-500 bi-images absolute left-[calc(50%)] text-teal-600 child hidden top-[20px]"></i>
            </div>
        </div>
    );
}

export default EditQuestionMenu;