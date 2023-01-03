import axios from "axios"
import { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";

function EditSubCategory({ id, mainId, setIds }) {
    const { TOKEN } = useStateContext();
    const [name, setName] = useState('');
    const [point, setPoint] = useState('');
    let main = {
        "categoryId": mainId,
        "name": `${name}`,
        "maxPoints": `${point}`
    }
    const handleSubCategory = () => {
        axios({
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            url: `${process.env.REACT_APP_URL}/v1/Category/sub`,
            data: main,
        })
            .then((res) => {
                setIds([])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={`${id.includes(mainId) ? "flex items-center gap-2 pt-4 pb-3" : "hidden"} font-[400] text-[13px]`}>
            <div className="group !m-0">
                <input onChange={(e) => {
                    setName(e.target.value)
                }} className='!w-full !text-[14px] font-[400]'
                    type="text" required />
                <span className="highlight"></span>
                <span className="bar "></span>
                <label className="!text-[14px]">Hэр</label>
            </div>
            <div className="group !m-0">
                <input onChange={(e) => {
                    setPoint(e.target.value)
                }} className='!w-full !text-[14px] font-[400]'
                    type="number" required />
                <span className="highlight"></span>
                <span className="bar "></span>
                <label className="!text-[14px]">Оноо</label>
            </div>
            <div className="ml-auto flex flex-col">
                <i onClick={handleSubCategory} className="bi bi-plus-circle-fill text-2xl 
                text-teal-500 hover:text-teal-600 cursor-pointer"></i>

            </div>
        </div>
    );
}

export default EditSubCategory;