import { useStateContext } from "../../../contexts/ContextProvider";

function TemplateEditModal({setShowModal, data}) {
    const {activeMenu} = useStateContext()
    // console.log(data)
    return ( 
        <div className={`${activeMenu ? " left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"} 
        top-[56px] fixed  h-[calc(100%-56px)] 
        bg-black bg-opacity-50 flex items-center justify-center`}> 
        <div  className="bg-white appear-smooth w-10/12 h-[calc(80%)] rounded">
            <div onClick={() => {
                setShowModal(false)
            }} className="w-full h-12 bg-teal-500 rounded-t"></div>
            <div className="h-full w-full px-3 pt-1 overflow-scroll">
                Үнэлгээ хийх загварын дэлгэрэнгүй
            </div>
        </div>
        </div>
     );
}

export default TemplateEditModal;