function ExamBoardController({showCategoryMenu, setShowCategoryMenu}) {
    return ( 
        <div className="w-full h-full bg-red-100 ml-2 bg-white shadow-sm
        px-4 py-3
        ">
            <button onClick={() => {
                setShowCategoryMenu(true)
            }} className="w-full py-2 border">
            Категори үзэх
            </button>
        </div>
     );
}

export default ExamBoardController;