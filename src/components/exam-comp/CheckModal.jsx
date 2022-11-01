function CheckModal({ datestring, datestring2, setCheckTime, setshowQuestionMenu, handleCreateExam }) {

    return (
        <div className="transition fixed md:absolute w-full h-full bg-black top-0 left-0
        bg-opacity-50 flex justify-center items-center">
            <div className="w-5/6 md:w-2/3 h-2/3 bg-gray-100 p-4 shadow">
                <div className="w-full h-[calc(100%-50px)]">
                    <h5>Та шалгалтын огноог зөв оруулсан даа итгэлтэй байна уу ?</h5>
                    <p>Нээх цаг: {datestring}</p>
                    <p>Хаах цаг: {datestring2}</p>
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
    );
}

export default CheckModal;