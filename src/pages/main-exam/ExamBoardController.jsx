function ExamBoardController({showCategoryMenu, setShowCategoryMenu, imgStatus, setImgStatus}) {
    return ( 
        <div className="max-w-[calc(9%)] min-w-[calc(9%)] h-full ml-2 bg-white shadow-sm
        px-4 py-3 
        ">
            <button onClick={() => {
                setShowCategoryMenu(true)
            }} className="w-full py-3 rounded-full active:bg-gray-200 hover:bg-gray-100">
            <i className="bi bi-bookmarks text-2xl text-teal-600"></i>
            </button>
            <button onClick={() => {
                setImgStatus(!imgStatus)
            }} className="w-full py-3 rounded-full active:bg-gray-200 hover:bg-gray-100">
            <i className="bi bi-card-image text-2xl text-teal-600"></i>
            </button>
        </div>
     );
}

export default ExamBoardController;