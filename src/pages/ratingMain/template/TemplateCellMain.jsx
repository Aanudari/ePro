import React, {useState} from 'react';
import { useStateContext } from '../../../contexts/ContextProvider';
import TemplateEditModal from "../modal/TemplateEditModal"

function TemplateCellMain({ data, trigger, setTrigger }) {
    const {templateID, setTemplateID} = useStateContext();
    const [showModal, setShowModal] = useState();
    return (
        <div className="h-10 w-full bg-teal-500 mb-1 flex items-center pl-3 justify-between shadow-sm">
            <span className="font-[500] text-white text-[12px]">
                {data.name}
            </span>
            <div className="h-full flex">
                <div onClick={() => {
                    setShowModal(!showModal)
                    setTemplateID(data.id)
                }} className="font-[500] text-white text-[12px] min-w-[150px] bg-violet-500 h-full
                flex items-center justify-center border-r-[2px] cursor-pointer active:bg-violet-400">Дэлгэрэнгүй
                </div>
            </div>
            {
                showModal &&
                <TemplateEditModal trigger={trigger} setTrigger={setTrigger} 
                data={data} setShowModal={setShowModal}/>
            }
        </div>
    );
}
export default TemplateCellMain;