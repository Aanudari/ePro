import React from 'react';
import {useNavigate} from "react-router-dom";
import {useStateContext} from "../../../../contexts/ContextProvider";
import axios from "axios";

function SubCategoryCell (subcategory) {
    const subID = (subcategory.subcategory && subcategory.subcategory.id);
    const navigate = useNavigate();
    const {TOKEN} = useStateContext();
    const deleteSubCategory = () => {
        axios({
            method: "delete",
            headers: {
                "Authorization": `${TOKEN}`,
                "accept": "text/plain",
            },
            url: `http://192.168.10.248:9000/v1/Category/sub/${subID}`,
        })
            .then(
                res => {
                    if (res.data.isSuccess === true) {
                        navigate(0);
                    } else {
                        console.log(res.data.resultMessage)
                    }
                }
            )
            .catch(err => console.log(err))
    }
    return (
        <div className="ml-4 mt-2 flex items-center text-black">
            <div className="flex-grow">
                <h3 className="text-sm mb-1">Subcategory name: {subcategory.subcategory.name}</h3>
                <h4 className="text-xs italic">Subcategory point: {subcategory.subcategory.maxPoints}%</h4>
            </div>
            {/*<button className="bg-[#50A3A2] text-white font-bold text-xs px-3 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">*/}
            {/*    <i className="bi bi-pen"/> Edit*/}
            {/*</button>*/}
            <button onClick={deleteSubCategory}
                className="bg-[#50A3A2] text-white font-bold text-xs px-3 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                <i className="bi bi-trash"/> Delete
            </button>
            {/*<div className="fixed h-screen right-0 top-0 items-center flex">*/}
            {/*    <div className="p-2 bg-white border-l-4 border-t-4 border-b-4 border-indigo-400 inline-flex items-center rounded-tl-lg shadow-2xl rounded-bl-lg z-10 flex-col">*/}
            {/*        <button className="bg-red-500 w-5 h-5 rounded-full mb-0 outline-none focus:outline-none"/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}
  export default SubCategoryCell;
