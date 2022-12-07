function CreateAnswerMain() {
    return (
        <div className="w-full">
            <div className="group w-full">
                <input
                    className={'custom-validation !border-b-[2px] !border-[#50a3a2] font-[400]'}
                    type="number" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className=''>Хариулт </label>
            </div>
        </div>
    );
}

export default CreateAnswerMain;