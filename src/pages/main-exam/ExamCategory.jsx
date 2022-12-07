function ExamCategory({ categories, categoryModal, setCategoryModal,handleCategoryModal }) {
    return (
        <div  className="mb-2 h-full flex gap-2 overflow-scroll">
            {
                categories?.map((category, index) => (
                    <div onClick={() => {
                        setCategoryModal(true)
                        handleCategoryModal(category.id)
                    }} className="w-[200px] cursor-pointer shadow-sm bg-white hover:text-sky-500 flex flex-col 
                    justify-between px-3 py-2 hover:shadow-cus" key={index}>
                        <div className="flex flex-col">
                            <h6 className="font-[500] text-[12px] uppercase">{category.name}</h6>
                        </div>
                        <div className="h-8 w-[100px] bg-gray-200 rounded-full flex 
                        justify-center items-center">
                        <h6 className="m-0 text-[13px] text-black">16</h6>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
export default ExamCategory;