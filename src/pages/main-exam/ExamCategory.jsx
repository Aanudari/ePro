import axios from "axios"
import { useStateContext } from "../../contexts/ContextProvider"

function ExamCategory({ categories, categoryModal, setCategoryModal, handleCategoryModal, setShowCategoryMenu,
    trigger, setTrigger, showAddCategory, setShowAddCategory }) {
    const {TOKEN, activeMenu} = useStateContext();
    const deleteCategory = (value) => {
        axios({
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            url: `${process.env.REACT_APP_URL}/v1/Pool/${value}`,
        })
            .then((res) => {
                setTrigger(!trigger)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className={`absolute top-[56px]  shadow bg core-bg-g h-[calc(100%-68px)] mb-2 h-full flex  px-3 
        py-3 gap-2 drop-down ${activeMenu ? "w-[calc(100%-14px)]" : "w-full left-0"} `}>
            <div className="w-full">
                <button onClick={() => {
                    setShowAddCategory(!showAddCategory)
                }} className="px-3 py-2 text-white uppercare bg-teal-300 hover:shadow-white">
                    <i className="bi bi-plus-circle"></i>
                </button>
                {
                    categories?.map((category, index) => (
                        <div key={index} className="relative parent">
                            <div onClick={() => {
                                setCategoryModal(true)
                                handleCategoryModal(category.id, category.departmentId)
                            }} className="w-full text-white mt-1 h-16 cursor-pointer shadow-sm bg-teal-300 hover:!text-sky-600 flex 
                    justify-between px-3 py-2 hover:shadow-cus " >
                                <div className="flex flex-col w-[100px] justify-center">
                                    <h6 className="font-[500] text-[12px] uppercase">{category.name}</h6>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h6 className="font-[500] text-[12px] uppercase">{category.departmentName}</h6>
                                </div>
                                <div className="flex justify-center items-center">
                                    
                                    <div className="h-8 w-[100px] bg-gray-700 rounded-full flex 
                        justify-center items-center">
                                        <h6 className="m-0 text-[13px]">{category.questionCount}</h6>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => {
                                        deleteCategory(category.id)
                                    }} className="child top-[15px] hidden mr-4 h-8 w-[50px] bg-gray-700 rounded-full flex 
                                justify-center text-white hover:!text-red-500 items-center absolute right-[calc(12%)]
                                cursor-pointer">
                                        <i className="bi bi-trash3-fill"></i>
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