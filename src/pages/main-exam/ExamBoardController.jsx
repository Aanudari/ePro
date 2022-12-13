function ExamBoardController({showCategoryMenu, setShowCategoryMenu, imgStatus, setImgStatus}) {
    return ( 
        <div className="w-full h-full bg-red-100 ml-2 bg-white shadow-sm
        px-4 py-3 
        ">
            <button onClick={() => {
                setShowCategoryMenu(true)
            }} className="w-full py-2 border active:bg-gray-200 hover:bg-gray-100">
            Категори үзэх
            </button>
            <button onClick={() => {
                setImgStatus(!imgStatus)
            }} className="w-full py-2 border mt-2 active:bg-gray-200 hover:bg-gray-100">
            Зурагнууд
            </button>
        </div>
     );
}

export default ExamBoardController;