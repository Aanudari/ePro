function CreateQuestionMain({setQuestion, setPoint, setQImgUrl}) {
    
    return ( 
        <div className="w-full h-full pt-5">
            <div className="w-full h-full">
            <div className="group w-full">
                    <input
                        className={'custom-validation !border-b-[2px] !border-[#50a3a2] font-[400]'}
                        type="text" onChange={(e) => {
                            setQuestion(e.target.value)
                        }} required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className=''>Асуулт </label>
            </div>

            <div className="group w-full">
                    <input
                        className={'custom-validation !border-b-[2px] !border-[#50a3a2] font-[400]'}
                        type="number" required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className=''>Оноо </label>
            </div>

            <div className="group w-full">
                    <input
                        className={'custom-validation !border-b-[2px] !border-[#50a3a2] font-[400]'}
                        type="number" required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className=''>Хариултын тоо </label>
            </div>
            </div>
        </div>
     );
}

export default CreateQuestionMain;