function CheckModal({ datestring, datestring2, setCheckTime, setshowQuestionMenu, handleCreateExam }) {

    return (
        <div className="cus-buttons">
            <div className="buttons">
                <div className="transition fixed md:absolute w-full h-full bg-black top-0 left-0
        bg-opacity-50 flex justify-center items-center">
                    <div className="w-5/6 md:w-3/6 bg-gray-100 p-10 shadow-lg core-bg">
                        <div className="w-full h-[calc(100%-50px)]">
                            <div className="w-full flex justify-center text-2xl text-white ">
                                <div className="px-2 py-1 rounded-full border border-white">
                            <i className="bi bi-question-lg"></i>
                                </div>
                            </div>
                            <h5 className="text-white text-center
                            ">Шалгалтын огноог зөв оруулсан эсэхийг нягтална уу ...</h5>
                            <p className="text-white ml-2 mb-0 mt-5 md:ml-7">Нээх цаг: {datestring}</p>
                            <p className="text-white ml-2 md:ml-7">Хаах цаг: {datestring2}</p>
                        </div>
                        <div className="w-full flex justify-end ">
                            <button onClick={() => {
                                setCheckTime(false)
                            }} className="cus-btn w-1/3 ">Буцах</button>
                            <button onClick={(e) => {
                                e.preventDefault()
                                setshowQuestionMenu(true)
                                handleCreateExam()
                                setCheckTime(false)
                            }} className="cus-btn ml-2">Үргэлжүүлэх</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CheckModal;