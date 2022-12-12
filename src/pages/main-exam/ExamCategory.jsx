function ExamCategory({ categories, categoryModal, setCategoryModal, handleCategoryModal, setShowCategoryMenu }) {
    return (
        <div className="absolute top-[56px] w-[calc(100%-15px)] shadow bg core-bg-g h-[calc(100%-68px)] mb-2 h-full flex  px-3 
        py-3 gap-2 drop-down">
            <div className="w-full">
                {
                    categories?.map((category, index) => (
                        <div onClick={() => {
                            setCategoryModal(true)
                            handleCategoryModal(category.id, category.departmentId)
                        }} className="w-full text-white mt-1 h-16 cursor-pointer shadow-sm bg-teal-300 hover:!text-sky-600 flex 
                    justify-between px-3 py-2 hover:shadow-cus" key={index}>
                            <div className="flex flex-col w-[100px] justify-center">
                                <h6 className="font-[500] text-[12px] uppercase">{category.name}</h6>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h6 className="font-[500] text-[12px] uppercase">{category.departmentName}</h6>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="h-8 w-[100px] bg-gray-700 rounded-full flex 
                        justify-center items-center">
                                    <h6 className="m-0 text-[13px]">{category.questionCount}</h6>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="min-w-[50px] max-w-[50px] ml-2">
                <button className="p-2 hover:scale-110 transition" onClick={() => {
                    setShowCategoryMenu(false)
                }}>
                    <i className="bi bi-x-lg text-2xl"></i>
                </button>
            </div>
        </div>
    );
}
export default ExamCategory;